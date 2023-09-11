/* eslint-disable-next-line */
import { useRef} from 'react';
import { throttle } from 'lodash';
import { getRefValue, useStateRef } from '../../lib/hooks';
// import { getClientX } from '../../lib/dom';
import SwiperItem from './SwiperItem';

const cardList = [
  { number: 1 },
  { number: 2 },
  { number: 3 },
  // {  number: 4 },
  // {  number: 5 },
  // {  number: 6 },
];

const DISTANCE_FOR_START_AUTO_SWIPE = 30;

export default function SwiperTest() {
  const isSwipingRef = useRef(false);
  const startXRef = useRef(0);
  const currentX = useRef(0);
  const currentOffsetXRef = useRef(0);
  const swiperRef = useRef<HTMLDivElement>(null);

  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);

  let distance: number;

  function swipeSwiper(distanceLocal:number) {
    const newOffsetX = getRefValue(currentOffsetXRef) - distanceLocal;
    setOffsetX(newOffsetX);
  }

  function onTouchMove(event: TouchEvent | MouseEvent) {
    isSwipingRef.current = true;

    if (window.TouchEvent && event instanceof TouchEvent) {
      currentX.current = event.changedTouches[0].clientX;
    } else if (event instanceof MouseEvent) {
      currentX.current = event.clientX;
    }

    distance = getRefValue(startXRef) - currentX.current;

    if (distance > DISTANCE_FOR_START_AUTO_SWIPE) {
      if (swiperRef.current !== null) {
        const swiperItem = swiperRef.current.children[0].children[0];
        if (swiperItem instanceof HTMLLIElement) {
          const swiperItemStyle = window.getComputedStyle(swiperItem);
          const marginRight = Number(swiperItemStyle.getPropertyValue('margin-right').slice(0, -2));
          distance = swiperItem.offsetWidth + marginRight;
        }
      }
      swipeSwiper(distance);
    } else {
      swipeSwiper(distance);
    }
  }

  const throttleOnTouchMove = throttle(onTouchMove, 16);

  function onTouchEnd(event: TouchEvent | MouseEvent) {
    if (event instanceof MouseEvent && isSwipingRef.current) {
      event.stopImmediatePropagation();
      isSwipingRef.current = false;
    }

    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('mousemove', onTouchMove);
    window.removeEventListener('mouseup', onTouchEnd, true);

    if (distance <= DISTANCE_FOR_START_AUTO_SWIPE) {
      setOffsetX(getRefValue(currentOffsetXRef));
    }
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
      window.addEventListener('mouseup', onTouchEnd, true);
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
            <SwiperItem key={item.number} />
          ))
        }
      </ul>
    </div>
  );
}
