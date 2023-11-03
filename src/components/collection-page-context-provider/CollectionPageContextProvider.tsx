import { useMemo, useState } from 'react';
import CollectionPage from '../../pages/CollectionPage';
import { SaveCardContext, ValueCardSaveType } from './save-card-context-hook';
import { DeleteCardContext, ValueCardDeleteType } from './delete-card-context-hook';
import {
  currentCollectionIdContext,
  isCardModeNewCardContext,
} from './card-context-hooks';

export default function CollectionPageContextProvider() {
  const [valueCardSave, setValueCardSave] = useState<null | ValueCardSaveType >(null);
  const valueCardSaveInitialState = useMemo(() => ({
    valueCardSave, setValueCardSave,
  }), [valueCardSave, setValueCardSave]);

  const [valueCardDelete, setValueCardDelete] = useState<null | ValueCardDeleteType>(null);
  const valueCardDeleteInitialState = useMemo(() => (
    {
      valueCardDelete, setValueCardDelete,
    }
  ), [valueCardDelete, setValueCardDelete]);

  const [currentCollectionId, setCurrentCollectionId] = useState<null | number>(null);

  const [isCardModeNewCard, setIsCardModeNewCard] = useState(false);

  const currentCollectionIdInitialState = useMemo(() => (
    {
      currentCollectionId, setCurrentCollectionId,
    }
  ), [currentCollectionId, setCurrentCollectionId]);

  const isCardModeNewCardState = useMemo(() => ({
    isCardModeNewCard, setIsCardModeNewCard,
  }), [isCardModeNewCard, setIsCardModeNewCard]);

  return (
    <currentCollectionIdContext.Provider value={currentCollectionIdInitialState}>
      <isCardModeNewCardContext.Provider value={isCardModeNewCardState}>
        <SaveCardContext.Provider value={valueCardSaveInitialState}>
          <DeleteCardContext.Provider value={valueCardDeleteInitialState}>
            <CollectionPage />
          </DeleteCardContext.Provider>
        </SaveCardContext.Provider>
      </isCardModeNewCardContext.Provider>
    </currentCollectionIdContext.Provider>
  );
}
