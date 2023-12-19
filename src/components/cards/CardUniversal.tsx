/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useCurrentLangPack } from '../../store/selectors';

import { useCurrentCollectionId } from '../collection-page-context-provider/card-context-hooks';

import { OnSaveCardArgumentsType } from '../../utils/types';

import CardBase from './CardBase';
import { IPairWords } from '../../utils/dictionary/dictionary-types';

const defaultPairWords: IPairWords = {
  cardId: 0,
  phrase: '',
  translationPhrase: '',
  pronunciation: '',
};

type CardUniversalPropsType = {
  pairWords?: IPairWords;
  onEditCard: (args: OnSaveCardArgumentsType) => void;
  onDeleteCard?: (cardId:number) => void;
};

const initialEmptyFunction = () => {};

export default function CardUniversal(props: CardUniversalPropsType) {
  const {
    pairWords = defaultPairWords,
    onEditCard,
    onDeleteCard = initialEmptyFunction,
  } = props;

  const navigate = useNavigate();

  const langPack = useCurrentLangPack();
  const { currentCollectionId } = useCurrentCollectionId();

  const formik = useFormik({
    initialValues: defaultPairWords,
    onSubmit: (formValue: IPairWords) => {
      if (pairWords.cardId) {
        onEditCard({ newWord: formValue, cardId: pairWords.cardId });
      }
    },
  });

  useEffect(() => {
    if (pairWords) {
      formik.setValues(pairWords);
    }
  }, [pairWords]);

  const onCancel = () => {
    navigate(`/collection/${currentCollectionId}`);
  };

  const onCardDeleteLocal = async () => {
    if (pairWords.cardId) onDeleteCard(pairWords.cardId);
  };

  return (
    <CardBase
      onDeleteCard={onCardDeleteLocal}
      pairWords={pairWords}
      formNative={
        {
          newWordsList: [
            {
              newWord: formik.values.phrase,
              updateFunction: formik.handleChange,
              placeholderText: langPack.NATIVE,
              inputName: 'phrase',
            },
          ],
          primaryButtonName: langPack.FORWARD,
          onSubmit: (event) => { event.preventDefault(); },
          onCancel,
          onClickNext: () => {},
        }
      }
      formForeign={
        {
          newWordsList: [
            {
              newWord: formik.values.translationPhrase,
              updateFunction: formik.handleChange,
              placeholderText: langPack.FOREIGN,
              inputName: 'translationPhrase',
            },
            {
              newWord: formik.values.pronunciation,
              updateFunction: formik.handleChange,
              placeholderText: langPack.TRANSCRIPTION,
              inputName: 'pronunciation',
            },
          ],
          primaryButtonName: langPack.SAVE,
          onSubmit: formik.handleSubmit,
          onCancel,
        }
      }
    />

  );
}

CardUniversal.defaultProps = {
  onDeleteCard: () => {},
  pairWords: defaultPairWords,
};
