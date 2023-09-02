import { v4 as getUniqId } from 'uuid';
import { useRef } from 'react';
import SwiperItem from './SwiperItem';

const cardList = [
  { key: getUniqId(), number: 1 },
  { key: getUniqId(), number: 2 },
  { key: getUniqId(), number: 3 },
  // { key: getUniqId(), number: 4 },
  // { key: getUniqId(), number: 5 },
  // { key: getUniqId(), number: 6 },
];

export default function Swiper() {
  const refSwiperList = useRef<HTMLDivElement>(null);
  const throttle = useRef<boolean>(false);
  const swiperOffset = useRef<number>(0);
  const touchedPosition = useRef<number>(0);
  function onTouchMove(event: TouchEvent | MouseEvent):boolean {
    event.preventDefault();

    if (event instanceof TouchEvent) {
      if (refSwiperList.current) {
        if (!throttle.current) {
          throttle.current = true;
          const { pageX } = event.changedTouches[0];
          const distance = pageX - touchedPosition.current;
          refSwiperList.current.style.left = `${swiperOffset.current + distance}px`;
          setTimeout(() => {
            throttle.current = false;
          }, 16);
        } else {
          return false;
        }
      }
    }
    return false;
  }

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    document.addEventListener('touchmove', onTouchMove);
    touchedPosition.current = event.changedTouches[0].pageX;
  };

  const onTouchEnd = () => {
    document.removeEventListener('touchmove', onTouchMove);
    if (refSwiperList.current) {
      swiperOffset.current = refSwiperList.current.offsetLeft;
    }
  };

  return (
    <div className="swiper" key="swiper">
      <div
        className="swiper__list"
        key="swiper-window"
        ref={refSwiperList}
      >
        {
          cardList.map((item, index) => (

            <SwiperItem
              key={item.number}
              itemIndex={index}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            />

          ))
        }
      </div>
    </div>
  );
}
