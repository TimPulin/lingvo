/* eslint-disable*/
import { useState, useEffect } from 'react';
import CardEditorBlock from './CardEditorBlock';
import { IPairWords } from '../../utils/dictionary/dictionary-types';
import { CardFormPropsType } from './CardForm';
import { useNewPairWordSaved } from './card-context-hooks/card-context-hooks';
import { useSwiperSlide } from '../swiper-react/swiper-react-context-hooks';
import { HIDE } from '../../utils/constants';

const CARD_EDIT = 'card--edit';
const CARD_BODY_NATIVE = 'card__body--native';
const CARD_BODY_FOREIGN = 'card__body--foreign';

const CARD_CONTENT_NATIVE = 'card__content--native';
const CARD_CONTENT_FOREIGN = 'card__content--foreign';

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

  const { isNewPairWordSaved } = useNewPairWordSaved();
  const isSwiperSlideInProgress = useSwiperSlide();
  const [isCardNative, setIsCardNative] = useState(true);
  const [isContentNative, setIsContentNative] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

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

  function turnCard() {
    if (!isSwiperSlideInProgress) {
      setIsCardNative(!isCardNative);

      setTimeout(() => {
        setIsContentNative(!isContentNative);
      }, 250);
    }
  }

  function onClickEdit(event: React.MouseEvent) {
    event.stopPropagation();
    setIsEdit(true);
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

  return (
    <div
      className={`card ${cardEditMode()}`}
      onClick={turnCard}
      role="button"
      tabIndex={0}
    >

      <div className="three-dots">
        <button
          type="button"
          className="three-dots__btn"
          onClick={onClickEdit}
        >
          <span className="three-dots__line" />
          <span className="three-dots__line" />
          <span className="three-dots__line" />
        </button>
      </div>

      <div className={`card__body ${cardBodyClass()}`}>

        <div className={`card__content ${nativeContentHide()} ${nativeContentClass()}`}>
          <div className="card__text">
            {pairWords.nativeWord}
          </div>
          <CardEditorBlock
            form={formNative}
          />
        </div>
        {/* TODO транскриптицю сделать меньше и на следующей строке */}
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
