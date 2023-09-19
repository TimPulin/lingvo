import { useMemo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateCurrentPageName } from '../store/current-page-slice';
import { useCurrentLangPack } from '../store/selectors';
import CardContentItem from '../components/cards/CardContentItem';
import CardUniversal from '../components/cards/CardUniversal';
import { isCardModeEditContext, isPairWordSavedContext } from '../components/cards/card-context-hooks/card-context-hooks';

export default function NewCardPage() {
  const isCardModeEdit = true;
  const [isPairWordSaved, setIsPairWordSaved] = useState(false);
  const dispatch = useDispatch();
  const { NEW_CARD_PAGE } = useCurrentLangPack();

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
        </div>
      </isPairWordSavedContext.Provider>
    </isCardModeEditContext.Provider>
  );
}
