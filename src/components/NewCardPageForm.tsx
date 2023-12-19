import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { useDataLoading } from './global-context-provider/loading-context-hook';
import { useCurrentLangPack } from '../store/selectors';
import { useCurrentCollectionId } from './collection-page-context-provider/card-context-hooks';

import { OnSaveCardArgumentsType } from '../utils/types';
import { IPairWords } from '../utils/dictionary/dictionary-types';

import CardBase from './cards/CardBase';
import CardClassicForm from './cards/CardClassicForm';

const defaultPairWords: IPairWords = {
  cardId: 0,
  phrase: '',
  translationPhrase: '',
  pronunciation: '',
};

type NewCardPageFormPropsType = {
  onSaveCard: (newWord: OnSaveCardArgumentsType) => void;
  formStyle: number
};

export default function NewCardPageForm(props: NewCardPageFormPropsType) {
  const { onSaveCard, formStyle } = props;
  const navigate = useNavigate();
  const { isDataLoading } = useDataLoading();
  const langPack = useCurrentLangPack();
  const currentCollectionId = useCurrentCollectionId();

  const [waitingForDataLoading, setWaitingForDataLoading] = useState(false);
  const isTurnCardToNativeRef = useRef(false);

  const onCancel = () => {
    navigate(`/collection/${currentCollectionId}`);
  };

  const formik = useFormik({
    initialValues: defaultPairWords,
    onSubmit: (formValue) => {
      onSaveCard({ newWord: formValue });
      setWaitingForDataLoading(true);
    },
  });

  useEffect(() => {
    if (waitingForDataLoading && !isDataLoading) {
      isTurnCardToNativeRef.current = true;
      setTimeout(() => {
        isTurnCardToNativeRef.current = false;
        formik.setValues(defaultPairWords);
      }, 200);
      setWaitingForDataLoading(false);
    }
  }, [isDataLoading]);

  return (
    <div className="content__item">
      {formStyle === 0 && (
        <CardBase
          isTurnCardToNative={isTurnCardToNativeRef.current}
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
      )}
      {formStyle === 1 && (
        <CardClassicForm
          phrase={formik.values.phrase}
          translationPhrase={formik.values.translationPhrase}
          pronunciation={formik.values.pronunciation}
          onSubmit={formik.handleSubmit}
          onCancel={formik.handleReset}
          updateFunction={formik.handleChange}
        />
      )}

    </div>
  );
}
