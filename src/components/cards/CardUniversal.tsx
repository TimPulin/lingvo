/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useEffect } from 'react';
import CardBase from './CardBase';
import { addCard, deleteCard, editCard } from '../../connect/server-connections';
import { useCurrentLangPack, useUserToken } from '../../store/selectors';
import { useCardModeEdit, usePairWordSaved, useCurrentCollectionId } from './card-context-hooks/card-context-hooks';
import { useStaticMessage } from '../global-context-provider/context-hooks';
import { useNeedCurrentCollectionUpdate } from '../global-context-provider/update-collection';
import { IPairWords } from '../../utils/dictionary/dictionary-types';

// TODO удалить  { editWord } from '../../store/slicers/dictionary-slice';

// export interface IPairWords {
//   cardId: number | null,
//   nativeWord: string,
//   foreignWord: string,
//   transcription: string,
// }

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
  const langPack = useCurrentLangPack();
  const userToken = useUserToken();
  const collectionId = useCurrentCollectionId();

  const isModeEdit = useCardModeEdit();
  const { setIsPairWordSaved: setIsNewPairWordSaved } = usePairWordSaved();
  const { setText, setIsShow: setIsMessageShow } = useStaticMessage();
  const { setIsNeedCurrentCollectionUpdate } = useNeedCurrentCollectionUpdate();

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

  const onSubmitForeign = (event: React.FormEvent) => {
    const newWord = {
      phrase: localPairWords.nativeWord,
      translationPhrase: localPairWords.foreignWord,
    };
    event.preventDefault();
    if (isModeEdit) {
      // const newWord = {
      //   phrase: localPairWords.nativeWord,
      //   translationPhrase: localPairWords.foreignWord,
      // };
      if (userToken && collectionId) {
        addCard(userToken, collectionId, newWord)
          .then(() => {
            setText(langPack.CARD_SAVED);
            setIsNeedCurrentCollectionUpdate(true);
          })
          .catch((error) => {
            console.log(error);
            // TODO перевести
            setText('Не смогли сохранить новую карточку. Видимо, что-то пошло не так');
          });
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
      editCard(userToken, collectionId, cardId, newWord)
        .then(() => {
          setText(langPack.CARD_CHANGES_MADE);
          setIsNeedCurrentCollectionUpdate(true);
        })
        .catch(() => {
          // TODO перевести
          setText('Не смогли сохранить изменения. Видимо, что-то пошло не так');
        });
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

  const onCardDelete = () => {
    if (userToken && cardId && collectionId) {
      deleteCard(userToken, cardId)
        .then(() => {
          // TODO перевести
          setText('Карточка тактично удалена');
          // TODO сделать белый фон сообщения прозрачным или еще что-то придумать - некрасивое отображение сообщения о удалении
          setIsMessageShow(true);
          setIsNeedCurrentCollectionUpdate(true);
          swiperUpdate();
        })
        .catch((error) => {
          console.log(error);
          // TODO перевести
          setText('Не смогли удалить карточку. Видимо, что-то пошло не так');
          setIsMessageShow(true);
        });
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
      isModeEdit={isModeEdit}
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
  swiperUpdate: () => {},
  pairWords: {
    id: 3,
    nativeWord: '',
    foreignWord: '',
    transcription: '',
  },
};
