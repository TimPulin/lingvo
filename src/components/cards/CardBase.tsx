import { useState, useEffect, useRef } from 'react';
import CardEditorBlock from './CardEditorBlock';
import { IPairWords } from '../../utils/dictionary/dictionary-types';
import { CardFormPropsType } from './CardForm';
import { usePairWordSaved } from './card-context-hooks/card-context-hooks';
import { useSwiperSlide } from '../swiper-react/swiper-react-context-hooks';
import { HIDE } from '../../utils/constants';
import CardControlBlock from './card-control-block/CardControlBlock';

const CARD_EDIT = 'card--edit';
const CARD_BODY_NATIVE = 'card__body--native';
const CARD_BODY_FOREIGN = 'card__body--foreign';

// TODO удалить
// const CARD_CONTENT_NATIVE = 'card__content--native';
// const CARD_CONTENT_FOREIGN = 'card__content--foreign';
const FADE_IN_OUT_CLASS = 'card__body-fade-in-out';

type CardBasePropsType = {
  isRefresh: boolean;
  setIsRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  isModeEdit?: boolean;
  onCardDelete: () => void;
  pairWords: IPairWords;
  formNative: CardFormPropsType;
  formForeign: CardFormPropsType;
};

export default function CardBase(props: CardBasePropsType) {
  const {
    isRefresh, setIsRefresh, isModeEdit = false, pairWords, formNative, formForeign, onCardDelete,
  } = props;

  const cardBodyRef = useRef<HTMLDivElement>(null);

  const { isPairWordSaved: isNewPairWordSaved } = usePairWordSaved();
  const isSwiperSlideInProgress = useSwiperSlide();

  const [isCardNative, setIsCardNative] = useState(true);
  const [isContentNative, setIsContentNative] = useState(true);

  const [isEdit, setIsEdit] = useState(false);
  const [isFadeInOutRunning, setIsFadeInOutRunning] = useState(false);
  const [isCardStartTurn, setIsCardStartTurn] = useState(false);

  const [isCardBodyRotate, setIsCardBodyRotate] = useState(false);
  const [isCardNativeContentRotate, setIsCardNativeContentRotate] = useState(false);
  const [isCardForeignContentRotate, setIsCardForeignContentRotate] = useState(false);

  const cardBodyRotateClass = () => (isCardBodyRotate ? 'card__body--rotate' : '');
  const cardNativeContentRotateClass = () => (isCardNativeContentRotate ? 'card__content--rotate' : '');
  const cardForeignContentRotateClass = () => (isCardForeignContentRotate ? 'card__content--rotate' : '');

  useEffect(() => {
    setIsEdit(isModeEdit);
  }, [isModeEdit]);

  useEffect(() => {
    if (isNewPairWordSaved && !isModeEdit) setIsEdit(false);
  }, [isNewPairWordSaved]);

  const cardEditMode = () => (isEdit ? CARD_EDIT : '');
  const cardBodyClass = () => (isCardNative ? CARD_BODY_NATIVE : CARD_BODY_FOREIGN);

  // TODO - проверить на необходимость
  // const nativeContentClass = () => (isCardNative ? CARD_CONTENT_NATIVE : '');
  // const foreignContentClass = () => (isCardNative ? '' : CARD_CONTENT_FOREIGN);

  const nativeContentHide = () => (isContentNative ? '' : HIDE);
  const foreignContentHide = () => (isContentNative ? HIDE : '');

  const fadeInOutClass = () => (isFadeInOutRunning ? FADE_IN_OUT_CLASS : '');

  function turnCard() {
    if (!isSwiperSlideInProgress) {
      setIsCardBodyRotate(true);
      setIsCardStartTurn(true);

      if (isCardNative) {
        setIsCardForeignContentRotate(true);
      } else {
        setIsCardNativeContentRotate(true);
      }

      setTimeout(() => {
        setIsCardBodyRotate(false);
        setIsCardForeignContentRotate(false);
        setIsCardNativeContentRotate(false);
      }, 500);

      setTimeout(() => {
        setIsCardNative(!isCardNative);
        setIsContentNative(!isCardNative);
        setIsCardStartTurn(false);
      }, 250);
    }
  }

  function refreshCard() {
    setIsCardNative(true);

    setTimeout(() => {
      setIsContentNative(true);
      setIsRefresh(false);
    }, 250);
  }

  useEffect(() => {
    if (isRefresh) {
      setTimeout(() => {
        refreshCard();
      }, 500);
    }
  }, [isRefresh]);

  // чтобы при сохранении карточка не переворачивалась
  const onSubmitForeign = Object.assign(formForeign.onSubmit, {});
  const localOnSubmitForeign = (event: React.FormEvent) => {
    event.stopPropagation();
    onSubmitForeign(event);
  };
  formForeign.onSubmit = localOnSubmitForeign;

  function localOnCancel() {
    if (cardBodyRef.current) {
      const fadeDurationProp = getComputedStyle(cardBodyRef.current).getPropertyValue('--fade-duration');
      const animationDuration = Number(fadeDurationProp.slice(0, -1)) * 1000;

      setIsFadeInOutRunning(true);
      setTimeout(() => {
        setIsEdit(false);
      }, animationDuration / 2);

      setTimeout(() => {
        setIsFadeInOutRunning(false);
      }, animationDuration);
    }
  }

  const onCancelNative = Object.assign(formNative.onCancel, {});
  const localOnCancelNative = (event:React.FormEvent) => {
    event.stopPropagation();
    if (isModeEdit) {
      onCancelNative(event);
    } else {
      localOnCancel();
    }
  };
  formNative.onCancel = localOnCancelNative;

  const onCancelForeign = Object.assign(formForeign.onCancel, {});
  const localOnCancelForeign = (event:React.FormEvent) => {
    event.stopPropagation();
    if (isModeEdit) {
      onCancelForeign(event);
    } else {
      localOnCancel();
    }
  };
  formForeign.onCancel = localOnCancelForeign;

  return (
    /* eslint-disable-next-line */
    <article
      className={`card ${cardEditMode()} ${cardBodyRotateClass()}`}
      onClick={turnCard}
      tabIndex={0}
    >

      <div ref={cardBodyRef} className={`card__body ${cardBodyClass()} ${fadeInOutClass()}`}>

        <CardControlBlock
          isCardStartTurn={isCardStartTurn}
          onEdit={setIsEdit}
          onDelete={onCardDelete}
        />

        <div className={`card__content ${nativeContentHide()}  ${cardNativeContentRotateClass()}`}>
          {' '}
          {/* ${nativeContentClass()} // TODO удалить  */}
          <div className="card__text">
            {pairWords.nativeWord}
          </div>
          <CardEditorBlock
            form={formNative}
          />
        </div>
        <div className={`card__content ${foreignContentHide()} ${cardForeignContentRotateClass()}`}>
          {' '}
          {/*  ${foreignContentClass()} // TODO удалить  */}
          <div className="card__text">
            <div>{pairWords.foreignWord}</div>
            <div className="card__transcription">
              [
              {pairWords.transcription}
              ]
            </div>
          </div>
          <CardEditorBlock
            form={formForeign}
          />
        </div>
      </div>
    </article>
  );
}

CardBase.defaultProps = {
  isModeEdit: false,
};

// TODO вычислить максимальное количество знаков для карточки
