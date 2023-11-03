import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import {
  useCurrentCollectionId,
  useCardModeNewCard,
} from '../components/collection-page-context-provider/card-context-hooks';

import { useDataLoading } from '../components/global-context-provider/loading-context-hook';
import { useCardsCollection } from '../store/selectors';

import CardContentItem from '../components/cards/CardContentItem';
import SwiperReact from '../components/swiper-react/SwiperReact';
import MessageOnPage from '../components/message/MessageOnPage';
import ButtonPlus from '../components/base/buttons/button-plus/ButtonPlus';

export default function CardsPage() {
  const { setIsCardModeNewCard } = useCardModeNewCard();

  const cardsCollection = useCardsCollection();
  const collectionId = useCurrentCollectionId();
  const { isDataLoading } = useDataLoading();
  const navigate = useNavigate();

  useEffect(() => {
    setIsCardModeNewCard(false);
  }, []);

  const gotoCreateNewCardPage = () => {
    navigate(`/collections/${collectionId}/create-new-card`);
  };

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
        <CardContentItem ElementJSX={<SwiperReact cardsList={cardsCollection.binds} />} />
      </div>
      <div className="wrapper-position-fixed">
        <ButtonPlus classAdditional="button-plus--add-new" onClickFunction={gotoCreateNewCardPage} />
      </div>
    </>
  );
}
