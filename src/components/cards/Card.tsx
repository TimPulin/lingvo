import { useState, useRef, useEffect } from 'react';

const CARD_NATIVE = 'card--native';
const CARD_FOREIGN = 'card--foreign';

const CONTENT_NATIVE = 'card__content--native';
const CONTENT_FOREIGN = 'card__content--foreign';

const CONTENT_HIDE = 'card__content--hide';

export default function Card() {
  const [isCardNative, setIsCardNative] = useState(true);
  const [isContentNative, setIsContentNative] = useState(true);
  const [animationDuration, setAnimationDuration] = useState(0);
  const cardRef = useRef(null);

  const cardClass = () => (isCardNative ? CARD_NATIVE : CARD_FOREIGN);

  const nativeContentClass = () => (isCardNative ? '' : CONTENT_NATIVE);
  const foreignContentClass = () => (isCardNative ? CONTENT_FOREIGN : '');

  const nativeContentHide = () => (isContentNative ? '' : CONTENT_HIDE);
  const foreignContentHide = () => (isContentNative ? CONTENT_HIDE : '');

  function getAnimationDuration() {
    if (cardRef.current !== null) {
      const durationFromCss = getComputedStyle(cardRef.current).getPropertyValue('--turn-duration');
      const duration = Number(durationFromCss.slice(0, durationFromCss.length - 1)) * 1000;
      setAnimationDuration(duration);
    }
  }

  useEffect(() => {
    getAnimationDuration();
  }, []);

  function turnCard():void {
    setIsCardNative(!isCardNative);
    setTimeout(() => {
      setIsContentNative(!isContentNative);
    }, animationDuration / 2);
  }

  return (
    <div
      className={`card ${cardClass()}`}
      onClick={turnCard}
      onKeyUp={turnCard}
      role="button"
      tabIndex={0}
      ref={cardRef}
    >
      <div className={`card__content ${nativeContentHide()} ${nativeContentClass()}`}>
        Тест ТестТестТест Тест ТестТест Тест
      </div>
      <div className={`card__content ${foreignContentHide()} ${foreignContentClass()}`}>
        {/* <div className={`card__content ${foreignContentClass()}`}> */}

        First Test Test Test TestTest Test Test TestTest
      </div>
    </div>
  );
}

// TODO вычислить максимальное количество знаков для карточки
