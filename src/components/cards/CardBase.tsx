import { useState, useEffect, useRef } from 'react';
import { IPairWords } from '../../utils/dictionary/dictionary-types';
import { CardFormPropsType } from './CardForm';
import { usePairWordSaved } from './card-context-hooks/card-context-hooks';
import { useSwiperSlide } from '../swiper-react/swiper-react-context-hooks';
import { HIDE } from '../../utils/constants';
import CardEditorBlock from './CardEditorBlock';
import CardControlBlock from './card-control-block/CardControlBlock';
import CardTranscription from './CardTranscription';

const CARD_EDIT = 'card--edit';
const CARD_BODY_NATIVE = 'card__body--native';
const CARD_BODY_FOREIGN = 'card__body--foreign';
const CARD_BODY_ROTATE = 'card__body--rotate';
const ROTATE_NATIVE = 'rotate-native';
const ROTATE_FOREIGN = 'rotate-foreign';

const FADE_IN_OUT_CLASS = 'card__body-fade-in-out';

type CardBasePropsType = {
  isRefresh: boolean;
  setIsRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  isModeNewCard?: boolean;
  onCardDelete: () => void;
  pairWords: IPairWords;
  formNative: CardFormPropsType;
  formForeign: CardFormPropsType;
};

export default function CardBase(props: CardBasePropsType) {
  const {
    isRefresh, setIsRefresh, isModeNewCard = false, pairWords, formNative, formForeign, onCardDelete,
  } = props;

  const cardBodyRef = useRef<HTMLDivElement>(null);

  const { isPairWordSaved: isNewPairWordSaved } = usePairWordSaved();
  const isSwiperSlideInProgress = useSwiperSlide();

  const [isCardNative, setIsCardNative] = useState(true);
  const [isContentNative, setIsContentNative] = useState(true);

  const [isEdit, setIsEdit] = useState(false);
  const [isFadeInOutRunning, setIsFadeInOutRunning] = useState(false);

  const [isCardBodyRotate, setIsCardBodyRotate] = useState(false);
  const rotateClassRef = useRef(`${CARD_BODY_ROTATE} ${ROTATE_FOREIGN}`);

  const cardBodyRotateClass = () => (isCardBodyRotate ? rotateClassRef.current : '');

  useEffect(() => {
    setIsEdit(isModeNewCard);
  }, [isModeNewCard]);

  useEffect(() => {
    if (isNewPairWordSaved && !isModeNewCard) setIsEdit(false);
  }, [isNewPairWordSaved]);

  const cardEditMode = () => (isEdit ? CARD_EDIT : '');
  const cardBodyClass = () => (isCardNative ? CARD_BODY_NATIVE : CARD_BODY_FOREIGN);

  const nativeContentHide = () => (isContentNative ? '' : HIDE);
  const foreignContentHide = () => (isContentNative ? HIDE : '');

  const fadeInOutClass = () => (isFadeInOutRunning ? FADE_IN_OUT_CLASS : '');

  function turnCard() {
    if (!isSwiperSlideInProgress) {
      if (isCardNative) {
        rotateClassRef.current = `${CARD_BODY_ROTATE} ${ROTATE_FOREIGN}`;
      } else {
        rotateClassRef.current = `${CARD_BODY_ROTATE} ${ROTATE_NATIVE}`;
      }
      setIsCardBodyRotate(true);

      setTimeout(() => {
        setIsCardBodyRotate(false);
      }, 500);

      setTimeout(() => {
        setIsCardNative(!isCardNative);
        setIsContentNative(!isCardNative);
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
    if (isModeNewCard) {
      onCancelNative(event);
    } else {
      localOnCancel();
    }
  };
  formNative.onCancel = localOnCancelNative;

  const onCancelForeign = Object.assign(formForeign.onCancel, {});
  const localOnCancelForeign = (event:React.FormEvent) => {
    event.stopPropagation();
    if (isModeNewCard) {
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
          onEdit={setIsEdit}
          onDelete={onCardDelete}
        />

        <div className={`card__content card__content--native ${nativeContentHide()}`}>
          <div className="card__text">
            {pairWords.nativeWord}
          </div>
          <CardEditorBlock
            form={formNative}
          />
        </div>
        <div className={`card__content card__content--foreign ${foreignContentHide()}`}>
          <div className="card__text">
            <div>{pairWords.foreignWord}</div>
            <CardTranscription transcription={pairWords.transcription} />
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
  isModeNewCard: false,
};

// TODO вычислить максимальное количество знаков для карточки
