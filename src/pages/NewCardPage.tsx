import { useMemo, useState } from 'react';
import CardPageBase from '../components/cards/CardPageBase';
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
        <CardPageBase ElementJSX={<CardUniversal />} />
      </isNewPairWordSavedContext.Provider>
    </isCardModeEditContext.Provider>
  );
}
