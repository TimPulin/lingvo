/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCurrentLangPack } from '../../store/selectors';
import { addNewWord, editWord } from '../../store/dictionary-slice';
import CardBase from './CardBase';
import { IPairWords } from '../../utils/dictionary/dictionary-types';
import { useCardModeEdit, usePairWordSaved } from './card-context-hooks/card-context-hooks';
import { useStaticMessage } from '../global-context-provider/context-hooks';

const defaultPairWords: IPairWords = {
  id: 0,
  nativeWord: '',
  foreignWord: '',
  transcription: '',
};

type CardUniversalPropsType = {
  pairWords?: IPairWords;
};

export default function CardUniversal(props: CardUniversalPropsType) {
  const { pairWords = defaultPairWords } = props;
  const langPack = useCurrentLangPack();

  const dispatch = useDispatch();
  const isModeEdit = useCardModeEdit();
  const { setIsPairWordSaved: setIsNewPairWordSaved } = usePairWordSaved();
  const { setText } = useStaticMessage();

  const [isRefresh, setIsRefresh] = useState(false);

  const [nativeWord, _setNativeWord] = useState<string>('');
  const [foreignWord, _setForeignWord] = useState<string>('');
  const [transcription, _setTranscription] = useState<string>('');
  const [id, setId] = useState<number | null>(null);
  const localPairWords = {
    id,
    nativeWord,
    foreignWord,
    transcription,
  };

  const setNativeWord = (value:string) => {
    _setNativeWord(value);
  };

  const setForeignWord = (value:string) => {
    _setForeignWord(value);
  };

  const setTranscription = (value:string) => {
    _setTranscription(value);
  };

  useEffect(() => {
    if (pairWords) {
      setNativeWord(pairWords.nativeWord);
      setForeignWord(pairWords.foreignWord);
      setTranscription(pairWords.transcription);
      if (pairWords.id) setId(pairWords.id);
    }
  }, [pairWords]);

  const onSubmitNative = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const onSubmitForeign = (event: React.FormEvent) => {
    event.preventDefault();
    if (isModeEdit) {
      dispatch(addNewWord(
        {
          word: localPairWords,
          key: 'defaultCollection',
        },
      ));
      setText(langPack.CARD_CHANGES_MADE);
    } else {
      dispatch(editWord(
        {
          word: localPairWords,
          key: 'defaultCollection',
        },
      ));
      setText(langPack.CARD_SAVED);
    }
    setIsNewPairWordSaved(true);
    setIsRefresh(true);
    _setNativeWord('');
    _setForeignWord('');
    _setTranscription('');
  };

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
              newWord: nativeWord, updateFunction: setNativeWord, placeholderText: langPack.NATIVE,
            },
          ],
          primaryButtonName: langPack.FORWARD,
          onSubmit: onSubmitNative,
          onCancel: onCancelNative,
        }
      }
      formForeign={
        {
          newWordsList: [
            {
              newWord: foreignWord, updateFunction: setForeignWord, placeholderText: langPack.FOREIGN,
            },
            {
              newWord: transcription, updateFunction: setTranscription, placeholderText: langPack.TRANSCRIPTION,
            },
          ],
          primaryButtonName: langPack.SAVE,
          onSubmit: onSubmitForeign,
          onCancel: onCancelForeign,
        }
      }
    />

  );
}

CardUniversal.defaultProps = {
  pairWords: {
    id: 3,
    nativeWord: '',
    foreignWord: '',
    transcription: '',
  },
};
