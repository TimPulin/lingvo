/* eslint-disable*/
import Swipe from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';
import SwiperType from 'swiper/types/swiper-class';
import { useEffect, useRef, useState, useMemo } from 'react';
import CardUniversal from '../cards/CardUniversal';
import {SwiperSlideInProgressContext} from './swiper-react-context-hooks';

const cardList = [
  {
    number: 1,
    nativeWord: 'тест1',
    foreignWord: 'test1',
    transcription: 'тест',
  },
  {
    number: 2,
    nativeWord: 'тест2',
    foreignWord: 'test2',
    transcription: 'тест',
  },
  {
    number: 3,
    nativeWord: 'тест3',
    foreignWord: 'test3',
    transcription: 'тест',
  },
  {
    number: 4,
    nativeWord: 'тест4',
    foreignWord: 'test4',
    transcription: 'тест',
  },
  {
    number: 5,
    nativeWord: 'тест5',
    foreignWord: 'test5',
    transcription: 'тест',
  },
  {
    number: 6,
    nativeWord: 'тест6',
    foreignWord: 'test6',
    transcription: 'тест',
  },
];

const swiperParams:SwiperOptions = {
  spaceBetween: 20,
  loop: true,
  nested: true,
  breakpoints: {
    991: {
      slidesPerView: 2,
    }
  }
};

const SWIPER_ACTIVE = 'swiper--active';

export default function SwiperReact() {
  const [isSwiperSlideInProgress, setIsSwiperSlideInProgress] = useState(false)
  const swiperSlide = useMemo(() => isSwiperSlideInProgress, [isSwiperSlideInProgress])

  const swiper = useRef<SwiperType>()

  const [slideWidth, setSlideWidth] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const getSlideWidth = () => slideWidth * 0.56;

  useEffect(() => {
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
              cardList.map((item) => (
                <div className="swiper-slide" style={{ height: getSlideWidth() }} key={item.number} ref={slideRef}>
                  <CardUniversal
                    pairWords={{
                      nativeWord: item.nativeWord,
                      foreignWord: item.foreignWord,
                      transcription: item.transcription,
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
