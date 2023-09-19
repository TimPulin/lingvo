import { useMemo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateCurrentPageName } from '../store/current-page-slice';
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

  useEffect(() => {
    dispatch(updateCurrentPageName(CARDS_PAGE));
  }, [CARDS_PAGE]);

  const pairWordSaved = useMemo(() => ({
    isPairWordSaved, setIsPairWordSaved,
  }), [isPairWordSaved]);

  return (
    <isCardModeEditContext.Provider value={isCardModeEdit}>
      <isPairWordSavedContext.Provider value={pairWordSaved}>
        <div className="content__list content__list--cards-list-page">
          <CardContentItem ElementJSX={<SwiperReact cardsList={cardsCollection} />} />
        </div>
      </isPairWordSavedContext.Provider>
    </isCardModeEditContext.Provider>
  );
}
