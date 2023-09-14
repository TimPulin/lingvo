import { createContext, useContext } from 'react';

type SwiperSlideInProgressContextType = boolean;
const transitionInProgressContextState = false;

export const SwiperSlideInProgressContext = createContext<SwiperSlideInProgressContextType>(transitionInProgressContextState);

export function useSwiperSlide() {
  return useContext(SwiperSlideInProgressContext);
}
