import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCurrentPageName } from '../store/slicers/current-page-slice';
import { useCurrentLangPack } from '../store/selectors';
import { useCurrentCollectionId, isCardModeEditContext, isPairWordSavedContext } from '../components/cards/card-context-hooks/card-context-hooks';
import CardContentItem from '../components/cards/CardContentItem';
import CardUniversal from '../components/cards/CardUniversal';

export default function NewCardPage() {
  const isCardModeEdit = true;
  const [isPairWordSaved, setIsPairWordSaved] = useState(false);
  const dispatch = useDispatch();
  const { NEW_CARD_PAGE } = useCurrentLangPack();
  const collectionId = useCurrentCollectionId();

  const pairWordSaved = useMemo(() => ({
    isPairWordSaved, setIsPairWordSaved,
  }), [isPairWordSaved]);

  useEffect(() => {
    dispatch(updateCurrentPageName(NEW_CARD_PAGE));
  }, [NEW_CARD_PAGE]);

  return (
    <isCardModeEditContext.Provider value={isCardModeEdit}>
      <isPairWordSavedContext.Provider value={pairWordSaved}>
        <div className="content__list content__list--new-card-page">
          <CardContentItem ElementJSX={<CardUniversal />} />
          <div className="content__item">
            <div className="button-wrap">
              <Link className="button button--trans" to={`/collections/${collectionId}`}>Вернуться к коллекции</Link>
            </div>
          </div>
        </div>
      </isPairWordSavedContext.Provider>
    </isCardModeEditContext.Provider>
  );
}
