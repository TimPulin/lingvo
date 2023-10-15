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
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const swiperSlide = useMemo(() => isSwiperSlideInProgress, [isSwiperSlideInProgress])

  const [slideWidth, setSlideWidth] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const getSlideWidth = () => slideWidth * 0.56;

  function swiperInit() {
    let breakpointsParams:{[key:string]:string | number | boolean} = {slidesPerView: 2};
    if (cardsList.length < 2) {
      breakpointsParams.centeredSlides = true
    }
    if (swiperParams.breakpoints) swiperParams.breakpoints[991] = breakpointsParams
    /* eslint-disable-next-line */
    setSwiper(new Swipe('.swiper', swiperParams))
    if (slideRef.current != null) {
      setSlideWidth(slideRef.current.clientWidth);
    }

    if (swiper) {
      swiper.on('slideChangeTransitionStart', () => {
        setIsSwiperSlideInProgress(true)
      })
      swiper.on('slideChangeTransitionEnd', () => {
        setIsSwiperSlideInProgress(false)
      })
    }
  }

  const swiperUpdate = () => {
    if (swiper) {
      swiper.destroy(true, false);
       swiperInit();
    };
  }

  useEffect(() => {
    swiperInit()
  }, []);

  const classSwiperActive = () => (isSwiperSlideInProgress ? SWIPER_ACTIVE : '')

  return (
    <SwiperSlideInProgressContext.Provider value={swiperSlide}>
      <div className={`${classSwiperActive()}`}>
        <div className="swiper">
          <div className="swiper-wrapper">
            {
              cardsList.map((item) => (
                <div
                  className="swiper-slide"
                  style={{ height: getSlideWidth() }}
                  key={item.id} ref={slideRef}
                >
                  <CardUniversal
                  swiperUpdate= {swiperUpdate}
                    pairWords={{
                      // cardId: item.phraseId,
                      cardId: item.id,
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
