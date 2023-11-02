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

type IsCardModeEditCloseType = {
  isCardModeEditClose: boolean;
  setIsCardModeEditClose: React.Dispatch<React.SetStateAction<boolean>>;
};

const isCardModeEditCloseState = {
  isCardModeEditClose: false,
  setIsCardModeEditClose: () => {},
};

export const isCardModeEditCloseContext = createContext<IsCardModeEditCloseType>(isCardModeEditCloseState);

export function useIsCardModeEditClose() {
  return useContext(isCardModeEditCloseContext);
}

// ==============

export type CurrentCollectionIdType = number | null;

const currentCollectionIdState = null;

export const currentCollectionIdContext = createContext<CurrentCollectionIdType>(currentCollectionIdState);

export function useCurrentCollectionId() {
  return useContext(currentCollectionIdContext);
}
