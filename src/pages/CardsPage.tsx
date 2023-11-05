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

  const gotoCreateNewCardPage = () => {
    navigate(`/collection/${currentCollectionId}/create-new-card`);
  };

  function showMessage(textMessage:string) {
    setText(textMessage);
    setIsMessageShow(true);
  }

  const onEditCard = async ({ newWord, cardId }:OnSaveCardArgumentsType) => {
    if (userToken && cardId && currentCollectionId && newWord) {
      try {
        setIsDataLoading(true);
        await editCard(userToken, currentCollectionId, cardId, newWord); // userToken
        getCardsCollectionLocal(userToken, currentCollectionId, langPack.CARD_CHANGES_MADE);
      } catch (error) {
        // TODO перевести
        showMessage('Не смогли сохранить изменения. Видимо, что-то пошло не так');
        setIsDataLoading(false);
      }
    }
  };

  const onDeleteCard = async (cardId:number) => {
    if (userToken && cardId && currentCollectionId) {
      try {
        setIsDataLoading(true);
        await deleteCard(userToken, cardId);
        // TODO перевести
        getCardsCollectionLocal(userToken, currentCollectionId, 'Карточка тактично удалена');
      } catch (error) {
        console.log(error);
        setIsDataLoading(false);
        // TODO перевести
        setText('Не смогли удалить карточку. Видимо, что-то пошло не так');
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
    // TODO перевести
      return (
        <MessageOnPage messageText="Что-то пошло не так. Перезагрузите, пожалуйста, приложение" />
      );
    } return null;
  }

  if (cardsCollection !== null) {
    if (cardsCollection.binds.length === 0 && !isDataLoading) {
      // TODO перевести
      return (
        <MessageOnPage
          messageText="У вас еще нет карточек в коллекции. Давайте создадим новую карточку"
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
            onSaveCard={onEditCard}
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
