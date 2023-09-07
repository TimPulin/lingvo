/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewWord } from '../../store/add-new-word-slice';

import CardBase from './CardBase';
import { IPairWords } from '../../utils/dictionary/dictionary-types';

const defaultPairWords: IPairWords = {
  nativeWord: '',
  foreignWord: '',
  transcription: '',
};

type CardUniversalPropsType = {
  pairWords?: IPairWords;
  isModeEdit?: boolean;
};

export default function CardUniversal(props: CardUniversalPropsType) {
  const {
    pairWords = defaultPairWords, isModeEdit = false,
  } = props;

  const dispatch = useDispatch();

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
    console.log('univers');

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
  };

  const onCancelNative = () => {
    setNativeWord('');
  };

  const onCancelForeign = () => {
    _setForeignWord('');
    _setTranscription('');
  };

  return (
    <CardBase
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
  isModeEdit: false,
};
