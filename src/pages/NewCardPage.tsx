import { useMemo, useState } from 'react';
import CardContentItem from '../components/cards/CardContentItem';
import CardUniversal from '../components/cards/CardUniversal';
import { isCardModeEditContext, isNewPairWordSavedContext } from '../components/cards/card-context-hooks/card-context-hooks';

export default function TestPage() {
  const isCardModeEdit = true;
  const [isNewPairWordSaved, setIsNewPairWordSaved] = useState(false);

  const newPairWordSaved = useMemo(() => ({
    isNewPairWordSaved, setIsNewPairWordSaved,
  }), [isNewPairWordSaved]);

  return (
    <isCardModeEditContext.Provider value={isCardModeEdit}>
      <isNewPairWordSavedContext.Provider value={newPairWordSaved}>
        <div className="content__list content__list--new-card-page">
          <CardContentItem ElementJSX={<CardUniversal />} />
        </div>
      </isNewPairWordSavedContext.Provider>
    </isCardModeEditContext.Provider>
  );
}
