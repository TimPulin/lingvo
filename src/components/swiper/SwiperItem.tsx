// import { useRef, useEffect, useState } from 'react';
import { useRef, useEffect } from 'react';

import Card from '../cards/Card';

type PropsType = {
  itemIndex:number;
  distance:number;
  isTouched:boolean;
  onTouchStart(
    event:React.TouchEvent,
  ) : void;
  onTouchEnd:()=> void;
};

export default function SwiperItem(props: PropsType) {
  const {
    itemIndex, distance, isTouched = false, onTouchStart, onTouchEnd,
  } = props;
  // const [itemOffsetLeft, setItemOffsetLeft] = useState<number>(0);
  const itemRef = useRef<HTMLDivElement>(null);

  // function getItemOffsetLeft() {
  //   if (itemRef.current !== null) {
  //     setItemOffsetLeft(itemRef.current.offsetLeft);
  //     console.log(itemIndex, '-', itemOffsetLeft);
  //   }
  // }

  // function onTouchStartLocal() {
  //   getItemOffsetLeft();
  // }

  function moveItem() {
    if (itemRef.current !== null) {
      // itemRef.current.style.left = `${itemRef.current.offsetLeft + distance}px`;
    }
  }

  useEffect(() => {
    if (distance !== 0) {
      moveItem();
    }
  }, [distance]);

  useEffect(() => {
    // onTouchStartLocal();
    // console.log(isTouched);
  }, [isTouched]);

  return (
    <div
      className="swiper__item"
      onTouchStart={(event) => onTouchStart(event)}
      onTouchEnd={() => onTouchEnd()}
      role="button"
      tabIndex={0}
      ref={itemRef}
    >
      {itemIndex}
      <Card />
    </div>
  );
}
