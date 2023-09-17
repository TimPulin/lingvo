/* eslint-disable*/
import { useState, useEffect } from 'react';
import CardEditorBlock from './CardEditorBlock';
import { IPairWords } from '../../utils/dictionary/dictionary-types';
import { CardFormPropsType } from './CardForm';
import { usePairWordSaved } from './card-context-hooks/card-context-hooks';
import { useSwiperSlide } from '../swiper-react/swiper-react-context-hooks';
import { HIDE } from '../../utils/constants';
import CardControlBlock from './CardControlBlock';

const CARD_EDIT = 'card--edit';
const CARD_BODY_NATIVE = 'card__body--native';
const CARD_BODY_FOREIGN = 'card__body--foreign';

const CARD_CONTENT_NATIVE = 'card__content--native';
const CARD_CONTENT_FOREIGN = 'card__content--foreign';
const THREE_DOTS_HIDE = 'three-dots--hide';

type CardBasePropsType = {
  isRefresh: boolean;
  setIsRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  isModeEdit?: boolean;
  pairWords: IPairWords;
  formNative: CardFormPropsType;
  formForeign: CardFormPropsType;
};

export default function CardBase(props: CardBasePropsType) {
  const {
    isRefresh, setIsRefresh, isModeEdit = false, pairWords, formNative, formForeign,
  } = props;

  const { isPairWordSaved: isNewPairWordSaved } = usePairWordSaved();
  const isSwiperSlideInProgress = useSwiperSlide();
  const [isCardNative, setIsCardNative] = useState(true);
  const [isContentNative, setIsContentNative] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isControlBlockShow, setIsControlBlockShow] = useState(false);

    useEffect(() => {
    setIsEdit(isModeEdit);
  }, [isModeEdit]);

  useEffect(() => {
    if (isNewPairWordSaved && !isModeEdit) setIsEdit(false);
  }, [isNewPairWordSaved]);

  const cardEditMode = () => (isEdit ? CARD_EDIT : '');
  const cardBodyClass = () => (isCardNative ? CARD_BODY_NATIVE : CARD_BODY_FOREIGN);

  const nativeContentClass = () => (isCardNative ? '' : CARD_CONTENT_NATIVE);
  const foreignContentClass = () => (isCardNative ? CARD_CONTENT_FOREIGN : '');

  const nativeContentHide = () => (isContentNative ? '' : HIDE);
  const foreignContentHide = () => (isContentNative ? HIDE : '');

  const threeDotsHide = () => (isControlBlockShow ? THREE_DOTS_HIDE : '' );

  function turnCard() {
    if (!isSwiperSlideInProgress) {
      setIsCardNative(!isCardNative);

      setTimeout(() => {
        setIsContentNative(!isContentNative);
      }, 250);
    }
  }

  function onCallControlBlock(event: React.MouseEvent) {
    event.stopPropagation();
    setIsControlBlockShow(true)
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
        refreshCard()
      }, 500)
    };
  }, [isRefresh]);

  // чтобы при сохранении карточка не переворачивалась
  const onSubmitForeign = Object.assign(formForeign.onSubmit, {});
  const localOnSubmitForeign = (event: React.FormEvent) => {
    event.stopPropagation();
    onSubmitForeign(event);
  };
  formForeign.onSubmit = localOnSubmitForeign;

const onCancelNative = Object.assign(formNative.onCancel, {});
const localOnCancelNative = (event:React.FormEvent) => {
  event.stopPropagation();
  if (isModeEdit) {
    onCancelNative(event);
  } else {
    setIsEdit(false);
  }
}
formNative.onCancel = localOnCancelNative;

const onCancelForeign = Object.assign(formForeign.onCancel, {});
const localOnCancelForeign = (event:React.FormEvent) => {
  event.stopPropagation();
  if (isModeEdit) {
    onCancelForeign(event);
  } else {
    setIsEdit(false);
  }
}
formForeign.onCancel = localOnCancelForeign;

  return (
    <div
      className={`card ${cardEditMode()}`}
      onClick={turnCard}
      role="button"
      tabIndex={0}
    >
      {/* TODO переделать threedots, чтобы крутился вместе с карточкой (перенести для начала в card__body) */}
      <div className={`three-dots ${threeDotsHide()}`}>
        <button
          type="button"
          className="three-dots__btn"
          onClick={onCallControlBlock}
        >
          <span className="three-dots__line" />
          <span className="three-dots__line" />
          <span className="three-dots__line" />
        </button>
      </div>

      <div className={`card__body ${cardBodyClass()}`}>

        <CardControlBlock
          isShow={isControlBlockShow}
          setIsShow={setIsControlBlockShow}
          onEdit={setIsEdit}
        />

        <div className={`card__content ${nativeContentHide()} ${nativeContentClass()}`}>
          <div className="card__text">
            {pairWords.nativeWord}
          </div>
          <CardEditorBlock
            form={formNative}
          />
        </div>
        <div className={`card__content ${foreignContentHide()} ${foreignContentClass()}`}>
          <div className="card__text">
            <div>{pairWords.foreignWord}</div>
            <div className='card__transcription'>[{pairWords.transcription}]</div>
          </div>
          <CardEditorBlock
            form={formForeign}
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
