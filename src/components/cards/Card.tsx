import { useState } from 'react';

const CARD_NATIVE = 'card--native';
const CARD_FOREIGN = 'card--foreign';

const CONTENT_NATIVE = 'card__content--native';
const CONTENT_FOREIGN = 'card__content--foreign';

const CONTENT_HIDE = 'card__content--hide';

export default function Card() {
  const [isCardNative, setIsCardNative] = useState(true);
  const [isContentNative, setIsContentNative] = useState(true);

  const cardClass = () => (isCardNative ? CARD_NATIVE : CARD_FOREIGN);

  const nativeContentClass = () => (isCardNative ? '' : CONTENT_NATIVE);
  const foreignContentClass = () => (isCardNative ? CONTENT_FOREIGN : '');

  const nativeContentHide = () => (isContentNative ? '' : CONTENT_HIDE);
  const foreignContentHide = () => (isContentNative ? CONTENT_HIDE : '');

  function turnCard():void {
    setIsCardNative(!isCardNative);

    setTimeout(() => {
      setIsContentNative(!isContentNative);
    }, 250);
  }

  return (
    <div
      className="card"
      onMouseUp={turnCard}
      role="button"
      tabIndex={0}
    >
      <div className={`card__body ${cardClass()}`}>
        <div className={`card__content ${nativeContentHide()} ${nativeContentClass()}`}>
          <div className="card__text">
            Тест ТестТестТест Тест ТестТест Тест
          </div>
          <div className="card__input">
            <input type="text" />
          </div>
        </div>

        <div className={`card__content ${foreignContentHide()} ${foreignContentClass()}`}>
          <div className="card__text">
            First Test Test Test TestTest Test Test TestTest
          </div>
          <div className="card__input">
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
  );
}

// TODO вычислить максимальное количество знаков для карточки
