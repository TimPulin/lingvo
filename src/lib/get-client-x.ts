/* eslint-disable-next-line */
import React from 'react';

// interface event.nativeEvent<TouchEvent> ;

interface IProps {
  event: TouchEvent | React.TouchEvent | MouseEvent | React.MouseEvent;
}

export function getClientX(props:IProps):number {
  const { event } = props;
  let clientX = 0;
  // TODO выяснить, как внести nativeEvent в тип IProps
  // if (window.TouchEvent && event.nativeEvent instanceof TouchEvent) {
  //   clientX = event.nativeEvent.changedTouches[0].clientX;
  if (window.TouchEvent && event instanceof TouchEvent) {
    clientX = event.changedTouches[0].clientX;
  } if (event instanceof MouseEvent) {
    clientX = event.clientX;
  }

  return clientX;
}
