/* eslint-disable-next-line */
import { useRef } from 'react';
import { throttle } from 'lodash';
import { getRefValue, useStateRef } from '../../lib/hooks';
// import { getClientX } from '../../lib/dom';
import SwiperItemTest from './SwiperItemTest';

export default function SwiperTest() {
  const startXRef = useRef(0);
  const currentX = useRef(0);
  const currentOffsetXRef = useRef(0);
  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);

  // function throttle<S>(callee:(args:S) => void, timeout:number) {
  //   let timer: ReturnType<typeof setTimeout> | undefined;

  //   return function perform<T>(...args:Array<T>):void {
  //     if (timer !== null) return;
  //     timer = setTimeout(() => {
  //       callee(...args);
  //       clearTimeout(timer);
  //       timer = undefined;
  //     }, timeout);
  //   };
  // }

  function onTouchMove(event: TouchEvent | MouseEvent) {
    const previousX = currentX.current;

    if (window.TouchEvent && event instanceof TouchEvent) {
      currentX.current = event.changedTouches[0].clientX;
    } else if (event instanceof MouseEvent) {
      currentX.current = event.clientX;
    }
    if (currentX.current < previousX) {
      const distance = getRefValue(startXRef) - currentX.current;
      const newOffsetX = getRefValue(currentOffsetXRef) - distance;
      setOffsetX(newOffsetX);
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
