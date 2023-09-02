/* eslint-disable-next-line */
import { useRef } from 'react';
import { getRefValue, useStateRef } from '../../lib/hooks';
// import { getClientX } from '../../lib/dom';
import SwiperItemTest from './SwiperItemTest';

export default function SwiperTest() {
  const startXRef = useRef(0);
  const currentOffsetXRef = useRef(0);
  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);

  function onTouchMove(event: TouchEvent | MouseEvent) {
    let currentX = 0;

    if (window.TouchEvent && event instanceof TouchEvent) {
      currentX = event.changedTouches[0].clientX;
    } else if (event instanceof MouseEvent) {
      currentX = event.clientX;
    }

    const distance = getRefValue(startXRef) - currentX;
    const newOffsetX = getRefValue(currentOffsetXRef) - distance;
    setOffsetX(newOffsetX);
  }

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

      window.addEventListener('touchmove', onTouchMove);
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
    >
      <ul
        className="swiper__list"
        style={{ transform: `translate3d(${offsetX}px, 0, 0)` }}
      >
        <SwiperItemTest />
        <SwiperItemTest />
        <SwiperItemTest />
      </ul>
    </div>
  );
}
