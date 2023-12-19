import { useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';

import { useCardsCollection, useCurrentLangPack, useUserToken } from '../store/selectors';
import { useDataLoading } from '../components/global-context-provider/loading-context-hook';
import { useStaticMessage } from '../components/global-context-provider/message-context';

import {
  useCurrentCollectionId,
  useCardModeNewCard,
} from '../components/collection-page-context-provider/card-context-hooks';

import { editCard, deleteCard } from '../connect/server-connections';

import SwiperReact from '../components/swiper-react/SwiperReact';
import MessageOnPage from '../components/message/MessageOnPage';
import ButtonPlus from '../components/base/buttons/button-plus/ButtonPlus';

import { OnSaveCardArgumentsType } from '../utils/types';
import { GetCardsCollectionLocalType } from './CollectionPage';

export default function CardsPage() {
  const navigate = useNavigate();
  const getCardsCollectionLocal:GetCardsCollectionLocalType = useOutletContext();

  const langPack = useCurrentLangPack();

  const cardsCollection = useCardsCollection();
  const userToken = useUserToken();

  const { setIsCardModeNewCard } = useCardModeNewCard();
  const { setText, setIsShow: setIsMessageShow } = useStaticMessage();

  const { currentCollectionId } = useCurrentCollectionId();
  const { isDataLoading, setIsDataLoading } = useDataLoading();

  const {
    CANT_SAVE_CHANGE, CARD_DELETED, CANT_DELETE_CARD, RELOAD_APP, CREATE_CARD,
  } = useCurrentLangPack();

  const gotoCreateNewCardPage = () => {
    navigate(`/collection/${currentCollectionId}/create-new-card`);
  };

  function showMessage(textMessage:string) {
    setText(textMessage);
    setIsMessageShow(true);
  }

  const onEditCard = ({ newWord, cardId }:OnSaveCardArgumentsType) => {
    if (userToken && cardId && currentCollectionId && newWord) {
      setIsDataLoading(true);
      editCard(userToken, currentCollectionId, cardId, newWord)
        .then(() => {
          getCardsCollectionLocal(userToken, currentCollectionId, langPack.CARD_CHANGES_MADE);
        })
        .catch(() => {
          showMessage(CANT_SAVE_CHANGE);
          setIsDataLoading(false);
        });
    }
  };

  const onDeleteCard = async (cardId:number) => {
    if (userToken && cardId && currentCollectionId) {
      try {
        setIsDataLoading(true);
        await deleteCard(userToken, cardId);
        getCardsCollectionLocal(userToken, currentCollectionId, CARD_DELETED);
      } catch (error) {
        console.log(error);
        setIsDataLoading(false);
        setText(CANT_DELETE_CARD);
        setIsMessageShow(true);
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

  useEffect(() => {
    setIsCardModeNewCard(false);
  }, []);

  if (cardsCollection === null) {
    if (!isDataLoading) {
      return (
        <MessageOnPage messageText={RELOAD_APP} />
      );
    } return null;
  }

  if (cardsCollection !== null) {
    if (cardsCollection.binds.length === 0 && !isDataLoading) {
      return (
        <MessageOnPage
          messageText={CREATE_CARD}
          ElementJSX={<ButtonPlus classAdditional="collections__button-new" onClickFunction={gotoCreateNewCardPage} />}
        />
      );
    }
  }

  return (
    <>
      <div className="content__list content__list--cards-list-page">
        <div className="content__item ">
          <SwiperReact
            onEditCard={onEditCard}
            onDeleteCard={onDeleteCard}
            cardsList={cardsCollection.binds}
          />
        </div>
      </div>
      <div className="wrapper-position-fixed">
        <ButtonPlus classAdditional="button-plus--add-new" onClickFunction={gotoCreateNewCardPage} />
      </div>
    </>
  );
}
