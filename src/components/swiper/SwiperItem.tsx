// import { useRef, useEffect, useState } from 'react';
import { useRef } from 'react';

import Card from '../cards/Card';

type PropsType = {
  itemIndex:number;
  onTouchStart(
    event:React.TouchEvent,
  ) : void;
  onTouchEnd:()=> void;
};

export default function SwiperItem(props: PropsType) {
  const {
    itemIndex, onTouchStart, onTouchEnd,
  } = props;

  const itemRef = useRef<HTMLDivElement>(null);

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
