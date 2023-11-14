import { useState } from 'react';
// import Input from '../form/Input';

const CARD_NATIVE = 'card--native';
const CARD_FOREIGN = 'card--foreign';

const CONTENT_NATIVE = 'card__content--native';
const CONTENT_FOREIGN = 'card__content--foreign';

const CONTENT_HIDE = 'card__content--hide';

export default function Card() {
  const [isCardNative, setIsCardNative] = useState(true);
  const [isContentNative, setIsContentNative] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const cardClass = () => (isCardNative ? CARD_NATIVE : CARD_FOREIGN);

  const nativeContentClass = () => (isCardNative ? '' : CONTENT_NATIVE);
  const foreignContentClass = () => (isCardNative ? CONTENT_FOREIGN : '');

  const nativeContentHide = () => (isContentNative ? '' : CONTENT_HIDE);

  const foreignContentHide = () => (isContentNative ? CONTENT_HIDE : '');

  const contentHide = () => (isEdit ? CONTENT_HIDE : '');
  const inputHide = () => (isEdit ? '' : CONTENT_HIDE);

  function turnCard() {
    setIsCardNative(!isCardNative);

    setTimeout(() => {
      setIsContentNative(!isContentNative);
    }, 250);
  }

  function onClickEdit(event: React.MouseEvent) {
    event.stopPropagation();
    setIsEdit(true);
  }

  return (
    <div
      className="card"
      onMouseUp={turnCard}
      role="button"
      tabIndex={0}
    >

      <div className="three-dots">
        <button
          type="button"
          className="three-dots__btn"
          onMouseUp={onClickEdit}
        >
          <span className="three-dots__line" />
          <span className="three-dots__line" />
          <span className="three-dots__line" />
        </button>
      </div>

      <div className={`card__body ${cardClass()}`}>

        <div className={`card__content ${nativeContentHide()} ${nativeContentClass()}`}>
          <div className={`card__text ${contentHide()}`}>
            РоднойРодной Родной РоднойРоднойРодной
          </div>
          <div
            className={`card__input ${inputHide()}`}
            onMouseUp={(event) => event.stopPropagation()}
            role="button"
            tabIndex={0}
          >
            <button type="button" className="button">Save</button>
          </div>
        </div>

        <div className={`card__content ${foreignContentHide()} ${foreignContentClass()}`}>
          <div className={`card__text ${contentHide()}`}>
            Foreign
          </div>
          <div
            className={`card__input ${inputHide()}`}
            onMouseUp={(event) => event.stopPropagation()}
            role="button"
            tabIndex={0}
          >
            <button type="button" className="button">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
