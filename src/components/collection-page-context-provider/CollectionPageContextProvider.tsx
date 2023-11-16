import { useMemo, useState } from 'react';
import CollectionPage from '../../pages/CollectionPage';

import {
  currentCollectionIdContext,
  isCardModeNewCardContext,
} from './card-context-hooks';

export default function CollectionPageContextProvider() {
  const [currentCollectionId, setCurrentCollectionId] = useState<null | number>(null);

  const [isCardModeNewCard, setIsCardModeNewCard] = useState(false);

  const currentCollectionIdInitialState = useMemo(() => ({
    currentCollectionId, setCurrentCollectionId,
  }), [currentCollectionId, setCurrentCollectionId]);

  const isCardModeNewCardState = useMemo(() => ({
    isCardModeNewCard, setIsCardModeNewCard,
  }), [isCardModeNewCard, setIsCardModeNewCard]);

  return (
    <currentCollectionIdContext.Provider value={currentCollectionIdInitialState}>
      <isCardModeNewCardContext.Provider value={isCardModeNewCardState}>
        <CollectionPage />
      </isCardModeNewCardContext.Provider>
    </currentCollectionIdContext.Provider>
  );
}
