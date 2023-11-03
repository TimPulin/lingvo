/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentLangPack, useUserToken } from '../../store/selectors';

import { useCardModeNewCard, useCurrentCollectionId } from '../collection-page-context-provider/card-context-hooks';
import { useStaticMessage } from '../global-context-provider/message-context';
import { useDataLoading } from '../global-context-provider/loading-context-hook';
import { useNeedCurrentCollectionUpdate } from '../global-context-provider/update-collection';

import CardBase from './CardBase';
import { IPairWords } from '../../utils/dictionary/dictionary-types';
import { addCard, deleteCard, editCard } from '../../connect/server-connections';

const defaultPairWords: IPairWords = {
  cardId: 0,
  nativeWord: '',
  foreignWord: '',
  transcription: '',
};

type CardUniversalPropsType = {
  swiperUpdate?: () => void;
  pairWords?: IPairWords;
};

const initialSwiperUpdate = () => {};

export default function CardUniversal(props: CardUniversalPropsType) {
  const { pairWords = defaultPairWords, swiperUpdate = initialSwiperUpdate } = props;

  const navigate = useNavigate();

  const langPack = useCurrentLangPack();
  const userToken = useUserToken();
  const { currentCollectionId } = useCurrentCollectionId();

  const { isCardModeNewCard } = useCardModeNewCard();

  const { setText, setIsShow: setIsMessageShow } = useStaticMessage();
  const { setIsNeedCurrentCollectionUpdate } = useNeedCurrentCollectionUpdate();
  const { setIsDataLoading } = useDataLoading();

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
    const newWord = {
      phrase: localPairWords.nativeWord,
      translationPhrase: localPairWords.foreignWord,
      pronunciation: localPairWords.transcription,
    };
    event.preventDefault();

    if (isCardModeNewCard) {
      if (userToken && currentCollectionId) {
        try {
          setIsDataLoading(true);
          await addCard(userToken, currentCollectionId, newWord);//
          isTurnCardToNativeRef.current = true;
          setText(langPack.CARD_SAVED);
          setIsMessageShow(true);
          setTimeout(() => {
            isTurnCardToNativeRef.current = false;
          }, 100);
        } catch (error) {
          console.log(error);
          // TODO перевести
          setText('Не смогли сохранить новую карточку. Видимо, что-то пошло не так');
          setIsMessageShow(true);
        } finally {
          setIsDataLoading(false);
        }
      } else {
        // TODO перевести
        const tokenWarning = 'Для сохранения карточки необходимо авторизоваться';
        const idWarning = 'Коллекция карточек не найдена';
        let warning = '';

        if (userToken == null) warning += tokenWarning;
        if (currentCollectionId == null) warning += idWarning;

        setText(warning);
        console.log(`проблема с userToken: ${userToken} или collectionId: ${currentCollectionId}`);
      }
    } else if (userToken && cardId && currentCollectionId) {
      try {
        setIsDataLoading(true);
        await editCard(userToken, currentCollectionId, cardId, newWord); // userToken
        setText(langPack.CARD_CHANGES_MADE);
        setIsMessageShow(true);
        // setIsNeedCurrentCollectionUpdate(true);
      } catch (error) {
        // TODO перевести
        setText('Не смогли сохранить изменения. Видимо, что-то пошло не так');
        setIsMessageShow(true);
      } finally {
        setIsDataLoading(false);
      }
    }
    _setNativeWord('');
    _setForeignWord('');
    _setTranscription('');
  };

  const onCancel = () => {
    navigate(`/collections/${currentCollectionId}`);
  };

  const onCardDelete = async () => {
    if (userToken && cardId && currentCollectionId) {
      try {
        setIsDataLoading(true);
        await deleteCard(userToken, cardId);
        // TODO перевести
        setText('Карточка тактично удалена');
        setIsMessageShow(true);
        setIsNeedCurrentCollectionUpdate(true);
        swiperUpdate();
      } catch (error) {
        console.log(error);
        // TODO перевести
        setText('Не смогли удалить карточку. Видимо, что-то пошло не так');
        setIsMessageShow(true);
      } finally {
        setIsDataLoading(false);
      }
    } else {
      const tokenWarning = 'Для удаления карточки необходимо авторизоваться';
      const collectionIdWarning = 'Коллекция карточек не найдена';
      const cardIdWarning = 'Карточка не найдена';
      let warning = '';

      if (userToken == null) warning += tokenWarning;
      if (currentCollectionId == null) warning += collectionIdWarning;
      if (cardId == null) warning += cardIdWarning;

      setText(warning);
      setIsMessageShow(true);
      console.log(`проблема с userToken: ${userToken} или collectionId: ${currentCollectionId} или cardId ${cardId}`);
    }
  };

  return (
    <CardBase
      isModeNewCard={isCardModeNewCard}
      onCardDelete={onCardDelete}
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
  swiperUpdate: () => {},
  pairWords: {
    id: 3,
    nativeWord: '',
    foreignWord: '',
    transcription: '',
  },
};
