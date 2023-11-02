/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentLangPack, useUserToken } from '../../store/selectors';

import { useCardModeNewCard, useIsCardModeEditClose, useCurrentCollectionId } from './card-context-hooks/card-context-hooks';
import { useStaticMessage } from '../global-context-provider/context-hooks';
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
  const collectionId = useCurrentCollectionId();

  const { isCardModeNewCard } = useCardModeNewCard();
  const { setIsCardModeEditClose } = useIsCardModeEditClose();
  const { setText, setIsShow: setIsMessageShow } = useStaticMessage();
  const { setIsNeedCurrentCollectionUpdate } = useNeedCurrentCollectionUpdate();
  const { setIsDataLoading } = useDataLoading();

  const [isRefresh, setIsRefresh] = useState(false);

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
      if (userToken && collectionId) {
        try {
          setIsDataLoading(true);
          await addCard(userToken, collectionId, newWord);//
          setText(langPack.CARD_SAVED);
          setIsNeedCurrentCollectionUpdate(true);
        } catch (error) {
          console.log(error);
          // TODO перевести
          setText('Не смогли сохранить новую карточку. Видимо, что-то пошло не так');
        } finally {
          setIsDataLoading(false);
          setIsMessageShow(true);
        }
      } else {
        // TODO перевести
        const tokenWarning = 'Для сохранения карточки необходимо авторизоваться';
        const idWarning = 'Коллекция карточек не найдена';
        let warning = '';

        if (userToken == null) warning += tokenWarning;
        if (collectionId == null) warning += idWarning;

        setText(warning);
        console.log(`проблема с userToken: ${userToken} или collectionId: ${collectionId}`);
      }
    } else if (userToken && cardId && collectionId) {
      try {
        setIsDataLoading(true);
        await editCard(userToken, collectionId, cardId, newWord); // userToken
        setText(langPack.CARD_CHANGES_MADE);
        // setIsNeedCurrentCollectionUpdate(true);
      } catch (error) {
        // TODO перевести
        setText('Не смогли сохранить изменения. Видимо, что-то пошло не так');
      } finally {
        setIsDataLoading(false);
        setIsMessageShow(true);
      }
    }
    setIsCardModeEditClose(true);
    setIsRefresh(true);
    _setNativeWord('');
    _setForeignWord('');
    _setTranscription('');
  };

  const onCancel = () => {
    navigate(`/collections/${collectionId}`);
  };

  const onCardDelete = async () => {
    if (userToken && cardId && collectionId) {
      try {
        setIsDataLoading(true);
        await deleteCard(userToken, cardId);
        // TODO перевести
        setText('Карточка тактично удалена');

        setIsNeedCurrentCollectionUpdate(true);
        swiperUpdate();
      } catch (error) {
        console.log(error);
        // TODO перевести
        setText('Не смогли удалить карточку. Видимо, что-то пошло не так');
      } finally {
        setIsDataLoading(false);
        setIsMessageShow(true);
      }
    } else {
      const tokenWarning = 'Для удаления карточки необходимо авторизоваться';
      const collectionIdWarning = 'Коллекция карточек не найдена';
      const cardIdWarning = 'Карточка не найдена';
      let warning = '';

      if (userToken == null) warning += tokenWarning;
      if (collectionId == null) warning += collectionIdWarning;
      if (cardId == null) warning += cardIdWarning;

      setText(warning);
      setIsMessageShow(true);
      console.log(`проблема с userToken: ${userToken} или collectionId: ${collectionId} или cardId ${cardId}`);
    }
  };

  return (
    <CardBase
      isRefresh={isRefresh}
      setIsRefresh={setIsRefresh}
      isModeNewCard={isCardModeNewCard}
      onCardDelete={onCardDelete}
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
