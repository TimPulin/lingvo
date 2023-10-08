import { useMemo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateCurrentPageName } from '../store/slicers/current-page-slice';
import CardContentItem from '../components/cards/CardContentItem';
import SwiperReact from '../components/swiper-react/SwiperReact';
import { isCardModeEditContext, isPairWordSavedContext } from '../components/cards/card-context-hooks/card-context-hooks';
import { useCollection, useCurrentLangPack } from '../store/selectors';

export default function CardsPage() {
  const isCardModeEdit = false;
  const [isPairWordSaved, setIsPairWordSaved] = useState(false);
  const cardsCollection = useCollection('defaultCollection');
  const { CARDS_PAGE } = useCurrentLangPack();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(updateCurrentPageName(CARDS_PAGE));
  }, [CARDS_PAGE]);

  const pairWordSaved = useMemo(() => ({
    isPairWordSaved, setIsPairWordSaved,
  }), [isPairWordSaved]);

  const gotoCreateNewCardPage = () => {
    navigate('/collections/:id/create-new-card');
  };

  return (
    <isCardModeEditContext.Provider value={isCardModeEdit}>
      <isPairWordSavedContext.Provider value={pairWordSaved}>
        <div className="content__list content__list--cards-list-page">
          <button className="button collections__button-new " type="button" onClick={gotoCreateNewCardPage}>Создать новую карточку</button>
          <CardContentItem ElementJSX={<SwiperReact cardsList={cardsCollection} />} />
        </div>
      </isPairWordSavedContext.Provider>
    </isCardModeEditContext.Provider>
  );
}
