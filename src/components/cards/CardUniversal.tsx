/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentLangPack } from '../../store/selectors';

import { useCardModeNewCard, useCurrentCollectionId } from '../collection-page-context-provider/card-context-hooks';

import { OnSaveCardArgumentsType } from '../../utils/types';

import CardBase from './CardBase';
import { IPairWords } from '../../utils/dictionary/dictionary-types';

const defaultPairWords: IPairWords = {
  cardId: 0,
  nativeWord: '',
  foreignWord: '',
  transcription: '',
};

type CardUniversalPropsType = {
  pairWords?: IPairWords;
  onSaveCard?: (args: OnSaveCardArgumentsType) => void;
  onDeleteCard?: (cardId:number) => void;
};

const initialEmptyFunction = () => {};

export default function CardUniversal(props: CardUniversalPropsType) {
  const {
    pairWords = defaultPairWords,
    onSaveCard = initialEmptyFunction,
    onDeleteCard = initialEmptyFunction,
  } = props;

  const navigate = useNavigate();

  const langPack = useCurrentLangPack();
  const { currentCollectionId } = useCurrentCollectionId();

  const { isCardModeNewCard } = useCardModeNewCard();

  const isTurnCardToNativeRef = useRef(false);

  const [nativeWord, _setNativeWord] = useState<string>('');
  const [foreignWord, _setForeignWord] = useState<string>('');
  const [transcription, _setTranscription] = useState<string>('');
  const [cardId, setCardId] = useState<number | null>(null);
  const localPairWords = {
    cardId,
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
  }, [isCardModeNewCard]);

  useEffect(() => {
    if (pairWords) {
      setNativeWord(pairWords.nativeWord);
      setForeignWord(pairWords.foreignWord);
      setTranscription(pairWords.transcription);
      if (pairWords.cardId) setCardId(pairWords.cardId);
    }
  }, [pairWords]);

  const onSubmitNative = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const onSubmitForeign = async (event: React.FormEvent) => {
    event.preventDefault();
    const newWord = {
      phrase: localPairWords.nativeWord,
      translationPhrase: localPairWords.foreignWord,
      pronunciation: localPairWords.transcription,
    };

    if (cardId) {
      onSaveCard({ newWord, cardId });
    } else {
      // FIXME сделать так, чтобы onSaveCard возвращала промис и включать isTurnCardToNativeRef только на response
      onSaveCard({ newWord });
      isTurnCardToNativeRef.current = true;
      setTimeout(() => {
        isTurnCardToNativeRef.current = false;
        _setNativeWord('');
        _setForeignWord('');
        _setTranscription('');
      }, 100);
    }
  };

  const onCancel = () => {
    navigate(`/collection/${currentCollectionId}`);
  };

  const onCardDeleteLocal = async () => {
    if (cardId) onDeleteCard(cardId);
  };

  return (
    <CardBase
      isModeNewCard={isCardModeNewCard}
      onDeleteCard={onCardDeleteLocal}
      isTurnCardToNative={isTurnCardToNativeRef.current}
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
          onCancel,
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
          onCancel,
        }
      }
    />

  );
}

CardUniversal.defaultProps = {
  onSaveCard: () => {},
  onDeleteCard: () => {},
  pairWords: {
    id: 3,
    nativeWord: '',
    foreignWord: '',
    transcription: '',
  },
};
