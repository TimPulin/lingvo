/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewWord } from '../../store/add-new-word-slice';
import CardBase from './CardBase';
import { IPairWords } from '../../utils/dictionary/dictionary-types';
import { useCardModeEdit, useNewPairWordSaved } from './card-context-hooks/card-context-hooks';

const defaultPairWords: IPairWords = {
  nativeWord: '',
  foreignWord: '',
  transcription: '',
};

type CardUniversalPropsType = {
  pairWords?: IPairWords;
};

export default function CardUniversal(props: CardUniversalPropsType) {
  const { pairWords = defaultPairWords } = props;

  const dispatch = useDispatch();
  const isModeEdit = useCardModeEdit();
  const { setIsNewPairWordSaved } = useNewPairWordSaved();

  const [isRefresh, setIsRefresh] = useState(false);

  const [nativeWord, _setNativeWord] = useState<string>('');
  const [foreignWord, _setForeignWord] = useState<string>('');
  const [transcription, _setTranscription] = useState<string>('');

  const setNativeWord = (value:string) => {
    _setNativeWord(value);
  };

  const setForeignWord = (value:string) => {
    _setForeignWord(value);
  };

  const setTranscription = (value:string) => {
    _setTranscription(value);
  };

  const onSubmitNative = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const onSubmitForeign = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(addNewWord(
      {
        word: {
          nativeWord,
          foreignWord,
          transcription,
        },
        key: 'defaultCollection',
      },
    ));
    setIsNewPairWordSaved(true);
    setIsRefresh(true);
    _setNativeWord('');
    _setForeignWord('');
    _setTranscription('');
  };

  // TODO на странице просмотра карточек на cancel повесить выключение режима редакции

  const onCancelNative = () => {
    _setNativeWord('');
  };

  const onCancelForeign = () => {
    _setForeignWord('');
    _setTranscription('');
  };

  return (
    <CardBase
      isRefresh={isRefresh}
      setIsRefresh={setIsRefresh}
      isModeEdit={isModeEdit}
      pairWords={pairWords}
      formNative={
        {
          newWordsList: [
            {
              newWord: nativeWord, updateFunction: setNativeWord, placeholderText: 'native', key: 1,
            },
          ],
          primaryButtonName: 'Forward',
          onSubmit: onSubmitNative,
          onCancel: onCancelNative,
        }
      }
      formForeign={
        {
          newWordsList: [
            {
              newWord: foreignWord, updateFunction: setForeignWord, placeholderText: 'foreign', key: 2,
            },
            {
              newWord: transcription, updateFunction: setTranscription, placeholderText: 'transcription', key: 3,
            },
          ],
          primaryButtonName: 'Save',
          onSubmit: onSubmitForeign,
          onCancel: onCancelForeign,
        }
      }
    />

  );
}

CardUniversal.defaultProps = {
  pairWords: {
    nativeWord: '',
    foreignWord: '',
    transcription: '',
  },
};
