import { useState, useEffect } from 'react';
import CardEditorBlock from './CardEditorBlock';
import { IPairWords } from '../../utils/dictionary/dictionary-types';
import { CardFormPropsType } from './CardForm';

const CARD_NATIVE = 'card--native';
const CARD_FOREIGN = 'card--foreign';

const CONTENT_NATIVE = 'card__content--native';
const CONTENT_FOREIGN = 'card__content--foreign';

const CONTENT_HIDE = 'hide';

type CardBasePropsType = {
  isModeEdit?: boolean;
  pairWords: IPairWords;
  formNative: CardFormPropsType;
  formForeign: CardFormPropsType;
};

export default function CardBase(props: CardBasePropsType) {
  const {
    isModeEdit = false, pairWords, formNative, formForeign,
  } = props;
  const [isCardNative, setIsCardNative] = useState(true);
  const [isContentNative, setIsContentNative] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setIsEdit(isModeEdit);
  }, [isModeEdit]);

  const cardClass = () => (isCardNative ? CARD_NATIVE : CARD_FOREIGN);

  const nativeContentClass = () => (isCardNative ? '' : CONTENT_NATIVE);
  const foreignContentClass = () => (isCardNative ? CONTENT_FOREIGN : '');

  const nativeContentHide = () => (isContentNative ? '' : CONTENT_HIDE);

  const foreignContentHide = () => (isContentNative ? CONTENT_HIDE : '');

  const textHide = () => (isEdit ? CONTENT_HIDE : '');
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

  const onSubmitNative = Object.assign(formNative.onSubmit, {});

  const localOnSubmitNative = (event: React.FormEvent) => {
    console.log('local');

    turnCard();
    onSubmitNative(event);
  };

  formNative.onSubmit = localOnSubmitNative;

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
          <div className={`card__text ${textHide()}`}>
            {pairWords.nativeWord}
          </div>
          <CardEditorBlock
            form={formNative}
            inputHide={inputHide}
          />
        </div>

        <div className={`card__content ${foreignContentHide()} ${foreignContentClass()}`}>
          <div className={`card__text ${textHide()}`}>
            {pairWords.foreignWord}
            {pairWords.transcription}
          </div>
          <CardEditorBlock
            form={formForeign}
            inputHide={inputHide}
          />
        </div>
      </div>
    </div>
  );
}

CardBase.defaultProps = {
  isModeEdit: false,
};

// TODO вычислить максимальное количество знаков для карточки
