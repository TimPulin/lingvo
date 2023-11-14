import { useState, useEffect, useRef } from 'react';
import { useSwiperSlide } from '../swiper-react/swiper-react-context-hooks';

import { HIDE } from '../../utils/constants';
import CardEditorBlock from './CardEditorBlock';
import CardControlBlock from './card-control-block/CardControlBlock';
import CardTranscription from './CardTranscription';
import { IPairWords } from '../../utils/dictionary/dictionary-types';
import { CardFormPropsType } from './CardForm';

const CARD_EDIT = 'card--edit';
const CARD_BODY_NATIVE = 'card__body--native';
const CARD_BODY_FOREIGN = 'card__body--foreign';
const CARD_BODY_ROTATE = 'card__body--rotate';
const ROTATE_NATIVE = 'rotate-native';
const ROTATE_FOREIGN = 'rotate-foreign';
const TEXT_MAX = 'card__text--max';
const MAX_LETTERS_AMOUNT = 32;

const FADE_IN_OUT_CLASS = 'card__body-fade-in-out';

type CardBasePropsType = {
  isModeNewCard?: boolean;
  onDeleteCard: () => void;
  isTurnCardToNative: boolean;
  pairWords: IPairWords;
  formNative: CardFormPropsType;
  formForeign: CardFormPropsType;
};

export default function CardBase(props: CardBasePropsType) {
  const {
    isModeNewCard = false, pairWords, formNative, formForeign, onDeleteCard: onCardDelete, isTurnCardToNative: turnCardToNative,
  } = props;

  const cardBodyRef = useRef<HTMLDivElement>(null);

  const isSwiperSlideInProgress = useSwiperSlide();

  const [isCardNative, setIsCardNative] = useState(true);
  const [isContentNative, setIsContentNative] = useState(true);

  const [isModeEditCard, setIsModeEditCard] = useState(false);
  const [isFadeInOutRunning, setIsFadeInOutRunning] = useState(false);

  const [isCardBodyRotate, setIsCardBodyRotate] = useState(false);
  const rotateClassRef = useRef(`${CARD_BODY_ROTATE} ${ROTATE_FOREIGN}`);

  const cardBodyRotateClass = () => (isCardBodyRotate ? rotateClassRef.current : '');

  useEffect(() => {
    setIsModeEditCard(isModeNewCard);
  }, [isModeNewCard]);

  const cardEditMode = () => (isModeEditCard ? CARD_EDIT : '');
  const cardBodyClass = () => (isCardNative ? CARD_BODY_NATIVE : CARD_BODY_FOREIGN);

  const nativeContentHide = () => (isContentNative ? '' : HIDE);
  const foreignContentHide = () => (isContentNative ? HIDE : '');

  const fadeInOutClass = () => (isFadeInOutRunning ? FADE_IN_OUT_CLASS : '');

  const classTextMax = () => {
    const currentLettersAmount = pairWords.foreignWord.length + pairWords.transcription.length;
    if (currentLettersAmount <= MAX_LETTERS_AMOUNT) {
      return TEXT_MAX;
    }
    return '';
  };

  function turnCard(isCurrentSideNative:boolean) {
    if (!isSwiperSlideInProgress) {
      if (isCurrentSideNative) {
        rotateClassRef.current = `${CARD_BODY_ROTATE} ${ROTATE_FOREIGN}`;
      } else {
        rotateClassRef.current = `${CARD_BODY_ROTATE} ${ROTATE_NATIVE}`;
      }
      setIsCardBodyRotate(true);

      setTimeout(() => {
        setIsCardBodyRotate(false);
      }, 500);

      setTimeout(() => {
        setIsCardNative(!isCurrentSideNative);
        setIsContentNative(!isCurrentSideNative);
      }, 250);
    }
  }

  useEffect(() => {
    if (turnCardToNative) turnCard(false);
  }, [turnCardToNative]);

  function closeModeEdit() {
    if (cardBodyRef.current) {
      const fadeDurationProp = getComputedStyle(cardBodyRef.current).getPropertyValue('--fade-duration');
      const animationDuration = Number(fadeDurationProp.slice(0, -1)) * 1000;

      setIsFadeInOutRunning(true);
      setTimeout(() => {
        setIsModeEditCard(false);
      }, animationDuration / 2);

      setTimeout(() => {
        setIsFadeInOutRunning(false);
        if (!isCardNative) turnCard(false);
      }, animationDuration);
    }
  }

  // чтобы при сохранении карточка не переворачивалась
  const onSubmitForeign = Object.assign(formForeign.onSubmit, {});
  const localOnSubmitForeign = (event: React.FormEvent) => {
    event.stopPropagation();
    if (isModeNewCard) {
      onSubmitForeign(event);
    } else {
      closeModeEdit();
      onSubmitForeign(event);
    }
  };
  formForeign.onSubmit = localOnSubmitForeign;

  const onCancelNative = Object.assign(formNative.onCancel, {});
  const localOnCancelNative = (event:React.FormEvent) => {
    event.stopPropagation();
    if (isModeNewCard) {
      onCancelNative(event);
    } else {
      closeModeEdit();
    }
  };
  formNative.onCancel = localOnCancelNative;

  const onCancelForeign = Object.assign(formForeign.onCancel, {});
  const localOnCancelForeign = (event:React.FormEvent) => {
    event.stopPropagation();
    if (isModeNewCard) {
      onCancelForeign(event);
    } else {
      closeModeEdit();
    }
  };
  formForeign.onCancel = localOnCancelForeign;

  return (
    /* eslint-disable-next-line */
    <article
      className={`card ${cardEditMode()} ${cardBodyRotateClass()}`}
      onClick={() => turnCard(isCardNative)}
      tabIndex={0}
    >

      <div ref={cardBodyRef} className={`card__body ${cardBodyClass()} ${fadeInOutClass()}`}>

        <CardControlBlock
          onEdit={setIsModeEditCard}
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
          <div className={`card__text ${classTextMax()}`}>
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
