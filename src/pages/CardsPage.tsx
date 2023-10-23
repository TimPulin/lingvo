import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentCollectionId, isCardModeEditContext, isPairWordSavedContext } from '../components/cards/card-context-hooks/card-context-hooks';
import { useCardsCollection } from '../store/selectors';

import CardContentItem from '../components/cards/CardContentItem';
import SwiperReact from '../components/swiper-react/SwiperReact';
import MessageOnPage from '../components/message/MessageOnPage';
import ButtonPlus from '../components/base/buttons/button-plus/ButtonPlus';

export default function CardsPage() {
  const isCardModeEdit = false;
  const [isPairWordSaved, setIsPairWordSaved] = useState(false);
  const cardsCollection = useCardsCollection();
  const collectionId = useCurrentCollectionId();

  const navigate = useNavigate();

  const pairWordSaved = useMemo(() => ({
    isPairWordSaved, setIsPairWordSaved,
  }), [isPairWordSaved]);

  const gotoCreateNewCardPage = () => {
    navigate(`/collections/${collectionId}/create-new-card`);
  };

  if (cardsCollection === null) {
    // TODO перевести
    return (
      <MessageOnPage messageText="Что-то пошло не так. Перезагрузите, пожалуйста, приложение" />
    );
  }

  if (cardsCollection !== null) {
    if (cardsCollection.binds.length === 0) {
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
    <isCardModeEditContext.Provider value={isCardModeEdit}>
      <isPairWordSavedContext.Provider value={pairWordSaved}>
        <div className="wrapper-position-fixed">
          <ButtonPlus classAdditional="button-plus--add-new" onClickFunction={gotoCreateNewCardPage} />
        </div>
        <div className="content__list content__list--cards-list-page">
          <CardContentItem ElementJSX={<SwiperReact cardsList={cardsCollection.binds} />} />
        </div>
      </isPairWordSavedContext.Provider>
    </isCardModeEditContext.Provider>
  );
}
