/* eslint-disable*/
import Swipe from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';
import SwiperType from 'swiper/types/swiper-class';
import { useEffect, useRef, useState, useMemo } from 'react';
import CardUniversal from '../cards/CardUniversal';
import {SwiperSlideInProgressContext} from './swiper-react-context-hooks';
import { CardsListType } from '../../utils/types';

type SwiperReactPropsType = {
  cardsList:CardsListType;
}

const swiperParams:SwiperOptions = {
  spaceBetween: 20,
  loop: true,
  nested: true,
  breakpoints: {
    991: {
      slidesPerView: 2,
      // centeredSlides: true,
    }
  }
};

const SWIPER_ACTIVE = 'swiper--active';

export default function SwiperReact(props:SwiperReactPropsType) {
  const {cardsList} = props;
  const [isSwiperSlideInProgress, setIsSwiperSlideInProgress] = useState(false)
  const swiperSlide = useMemo(() => isSwiperSlideInProgress, [isSwiperSlideInProgress])

  const swiper = useRef<SwiperType>()

  const [slideWidth, setSlideWidth] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const getSlideWidth = () => slideWidth * 0.56;

  useEffect(() => {
    console.log(cardsList);

    let breakpointsParams:{[key:string]:string | number | boolean} = {slidesPerView: 2};
    if (cardsList.length < 2) {
      breakpointsParams.centeredSlides = true
    }
    if (swiperParams.breakpoints) swiperParams.breakpoints[991] = breakpointsParams

    /* eslint-disable-next-line */
     swiper.current = new Swipe('.swiper', swiperParams);

    if (slideRef.current != null) {
      setSlideWidth(slideRef.current.clientWidth);
    }
  }, []);

  if (swiper.current !== undefined) {
    swiper.current.on('slideChangeTransitionStart', () => {
      setIsSwiperSlideInProgress(true)
    })

    swiper.current.on('slideChangeTransitionEnd', () => {
      setIsSwiperSlideInProgress(false)
    })
  }

  const classSwiperActive = () => (isSwiperSlideInProgress ? SWIPER_ACTIVE : '')

  return (
    <SwiperSlideInProgressContext.Provider value={swiperSlide}>
      <div className={`${classSwiperActive()}`}>
        <div className="swiper">
          <div className="swiper-wrapper">
            {
              // cardsListLocal.map((item) => (
              cardsList.map((item) => (
                <div
                  className="swiper-slide"
                  style={{ height: getSlideWidth() }}
                  key={item.id} ref={slideRef}
                >
                  <CardUniversal
                    pairWords={{
                      cardId: item.phraseId,
                      nativeWord: item.phrase.value,
                      foreignWord: item.translationPhrase.value,
                      transcription: '',
                    }}
                  />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </SwiperSlideInProgressContext.Provider>
  );
}
