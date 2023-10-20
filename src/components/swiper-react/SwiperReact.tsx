import Swipe from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';
import SwiperType from 'swiper/types/swiper-class';
import {
  useEffect, useRef, useState, useMemo,
} from 'react';
import CardUniversal from '../cards/CardUniversal';
import { SwiperSlideInProgressContext } from './swiper-react-context-hooks';
import { CardsListType } from '../../utils/types';

type SwiperReactPropsType = {
  cardsList:CardsListType;
};

const swiperParams:SwiperOptions = {
  spaceBetween: 20,
  loop: true,
  // nested: true,
  observer: true,
  breakpoints: {
    991: {
      slidesPerView: 1,
    },
  },
};

const SWIPER_ACTIVE = 'swiper--active';

export default function SwiperReact(props:SwiperReactPropsType) {
  const { cardsList } = props;

  const [isSwiperSlideInProgress, setIsSwiperSlideInProgress] = useState(false);
  const swiperSlide = useMemo(() => isSwiperSlideInProgress, [isSwiperSlideInProgress]);

  const swiperRef = useRef<SwiperType | null>(null);

  function swiperInit() {
    const breakpointsParams:{ [key:string]:string | number | boolean } = { slidesPerView: 1 };
    if (cardsList.length < 2) {
      breakpointsParams.centeredSlides = true;
    }
    if (swiperParams.breakpoints) swiperParams.breakpoints[991] = breakpointsParams;

    swiperRef.current = new Swipe('.swiper', swiperParams);

    if (swiperRef.current) {
      swiperRef.current.on('slideChangeTransitionStart', () => {
        setIsSwiperSlideInProgress(true);
      });
      swiperRef.current.on('slideChangeTransitionEnd', () => {
        setIsSwiperSlideInProgress(false);
      });
    }
  }

  useEffect(() => {
    swiperInit();

    return () => {
      if (swiperRef.current) swiperRef.current.destroy();
    };
  }, [cardsList]);

  const classSwiperActive = () => (isSwiperSlideInProgress ? SWIPER_ACTIVE : '');

  return (
    <SwiperSlideInProgressContext.Provider value={swiperSlide}>
      <div className={`${classSwiperActive()}`}>
        <div className="swiper">
          <div className="swiper-wrapper">
            {
              cardsList.map((item) => (
                <div
                  className="swiper-slide"
                  key={item.id}
                >
                  <CardUniversal
                    pairWords={{
                      // cardId: item.phraseId,
                      cardId: item.id,
                      nativeWord: item.phrase.value,
                      foreignWord: item.translationPhrase.value,
                      transcription: item.pronunciation,
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
