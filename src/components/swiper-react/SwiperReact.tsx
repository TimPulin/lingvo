import Swipe from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';
import SwiperType from 'swiper/types/swiper-class';
import {
  useEffect, useRef, useState, useMemo,
} from 'react';
import CardUniversal from '../cards/CardUniversal';
import { SwiperSlideInProgressContext } from './swiper-react-context-hooks';
import { CardsListType, OnSaveCardArgumentsType } from '../../utils/types';
import ButtonBase from '../base/ButtonBase';
import ArrowCarrotLeftIcon from '../icons/ArrowCarrotLeftIcon';
import ArrowCarrotRightIcon from '../icons/ArrowCarrotRightIcon';

type SwiperReactPropsType = {
  cardsList:CardsListType;
  onSaveCard?: (args: OnSaveCardArgumentsType) => void;
  onDeleteCard?:(cardId:number) => void;
};

const swiperParams:SwiperOptions = {
  spaceBetween: 30,
  loop: true,
  observer: true,
  breakpoints: {
    991: {
      slidesPerView: 1,
    },
  },
};
const initialEmptyFunction = () => {};

const SWIPER_ACTIVE = 'swiper--active';

export default function SwiperReact(props:SwiperReactPropsType) {
  const { cardsList, onSaveCard = initialEmptyFunction, onDeleteCard = initialEmptyFunction } = props;

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

  const slideNext = () => {
    if (swiperRef.current !== null) swiperRef.current.slideNext();
  };

  const slidePrev = () => {
    if (swiperRef.current !== null) swiperRef.current.slidePrev();
  };

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
                    onSaveCard={onSaveCard}
                    onDeleteCard={onDeleteCard}
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

          <ButtonBase classAdditional="swiper__button" onClickFunction={slideNext} ElementJSX={<ArrowCarrotLeftIcon />} />
          <ButtonBase classAdditional="swiper__button swiper__button--prev" onClickFunction={slidePrev} ElementJSX={<ArrowCarrotRightIcon />} />

        </div>
      </div>
    </SwiperSlideInProgressContext.Provider>
  );
}

SwiperReact.defaultProps = {
  onSaveCard: () => {},
  onDeleteCard: () => {},
};
