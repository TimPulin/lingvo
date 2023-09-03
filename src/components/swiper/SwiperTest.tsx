/* eslint-disable-next-line */
import { useRef, useEffect, useState } from 'react';
import { throttle } from 'lodash';
import { getRefValue, useStateRef } from '../../lib/hooks';
// import { getClientX } from '../../lib/dom';
import SwiperItemTest from './SwiperItemTest';

const cardList = [
  { number: 1 },
  { number: 2 },
  { number: 3 },
  // {  number: 4 },
  // {  number: 5 },
  // {  number: 6 },
];

export default function SwiperTest() {
  const startXRef = useRef(0);
  const currentX = useRef(0);
  const currentOffsetXRef = useRef(0);
  const swiperRef = useRef<HTMLDivElement>(null);

  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);

  function swipeSwiper(distance:number) {
    const newOffsetX = getRefValue(currentOffsetXRef) - distance;
    setOffsetX(newOffsetX);
  }

  function onTouchMove(event: TouchEvent | MouseEvent) {
    const previousX = currentX.current;

    if (window.TouchEvent && event instanceof TouchEvent) {
      currentX.current = event.changedTouches[0].clientX;
    } else if (event instanceof MouseEvent) {
      currentX.current = event.clientX;
    }
    if (currentX.current < previousX) {
      console.log('backward');
    }

    let distance = getRefValue(startXRef) - currentX.current;

    if (distance > 50) {
      if (swiperRef.current !== null) {
        if (swiperRef.current.children[0].children[0] instanceof HTMLLIElement) {
          const swiperItem = swiperRef.current.children[0].children[0];
          const nodeStyle = window.getComputedStyle(swiperItem);
          const marginRight = Number(nodeStyle.getPropertyValue('margin-right').slice(0, -2));
          distance = swiperItem.offsetWidth + marginRight;
        }
      }
      swipeSwiper(distance);
    } else {
      swipeSwiper(distance);
    }
  }

  const throttleOnTouchMove = throttle(onTouchMove, 16);

  function onTouchEnd() {
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('mousemove', onTouchMove);
    window.removeEventListener('mouseup', onTouchEnd);
  }

  function onTouchStart(event:React.TouchEvent | React.MouseEvent) {
    currentOffsetXRef.current = getRefValue(offsetXRef);

    if (window.TouchEvent && event.nativeEvent instanceof TouchEvent) {
      startXRef.current = event.nativeEvent.changedTouches[0].clientX;

      window.addEventListener('touchmove', throttleOnTouchMove);
      window.addEventListener('touchend', onTouchEnd);
    } else if (event.nativeEvent instanceof MouseEvent) {
      startXRef.current = event.nativeEvent.clientX;

      window.addEventListener('mousemove', onTouchMove);
      window.addEventListener('mouseup', onTouchEnd);
    }
  }

  return (
    <div
      className="swiper"
      onMouseDown={onTouchStart}
      onTouchStart={onTouchStart}
      role="button"
      tabIndex={0}
      ref={swiperRef}
    >
      <ul
        className="swiper__list"
        style={{ transform: `translate3d(${offsetX}px, 0, 0)` }}
      >
        {
          cardList.map((item) => (

            <SwiperItemTest itemNumber={item.number} key={item.number} />

          ))
        }
      </ul>
    </div>
  );
}
