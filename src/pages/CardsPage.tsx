import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardContentItem from '../components/cards/CardContentItem';
import SwiperReact from '../components/swiper-react/SwiperReact';
import { isCardModeEditContext, isPairWordSavedContext } from '../components/cards/card-context-hooks/card-context-hooks';
import { useCardsCollection } from '../store/selectors';

export default function CardsPage() {
  const isCardModeEdit = false;
  const [isPairWordSaved, setIsPairWordSaved] = useState(false);
  const cardsCollection = useCardsCollection();

  const navigate = useNavigate();

  const pairWordSaved = useMemo(() => ({
    isPairWordSaved, setIsPairWordSaved,
  }), [isPairWordSaved]);

  const gotoCreateNewCardPage = () => {
    navigate('/collections/:id/create-new-card');
  };

  if (cardsCollection === null) {
    return (
      <div className="content__list content__list--cards-list-page">
        <p>
          У вас еще нет карточек в коллекции. Давайте создадим новую карточку
        </p>
      </div>
    );
  }

  return (
    <isCardModeEditContext.Provider value={isCardModeEdit}>
      <isPairWordSavedContext.Provider value={pairWordSaved}>
        <div className="content__list content__list--cards-list-page">
          <button className="button collections__button-new " type="button" onClick={gotoCreateNewCardPage}>Создать новую карточку</button>
          <CardContentItem ElementJSX={<SwiperReact cardsList={cardsCollection.binds} />} />
        </div>
      </isPairWordSavedContext.Provider>
    </isCardModeEditContext.Provider>
  );
}
