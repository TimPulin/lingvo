import { createContext, useContext } from 'react';

// ==============
type IsCardModeNewCardContextType = {
  isCardModeNewCard: boolean;
  setIsCardModeNewCard: React.Dispatch<React.SetStateAction<boolean>>;
};

const isCardModeNewCardState = {
  isCardModeNewCard: false,
  setIsCardModeNewCard: () => {},
};

export const isCardModeNewCardContext = createContext<IsCardModeNewCardContextType>(isCardModeNewCardState);

export function useCardModeNewCard() {
  return useContext(isCardModeNewCardContext);
}

// ==============

export type CurrentCollectionIdType = {
  currentCollectionId: null | number;
  setCurrentCollectionId: React.Dispatch<React.SetStateAction<null | number>>
};

const currentCollectionIdState = {
  currentCollectionId: null,
  setCurrentCollectionId: () => {},
};

export const currentCollectionIdContext = createContext<CurrentCollectionIdType>(currentCollectionIdState);

export function useCurrentCollectionId() {
  return useContext(currentCollectionIdContext);
}
