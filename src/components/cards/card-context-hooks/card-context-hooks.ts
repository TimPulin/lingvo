import { createContext, useContext } from 'react';

// ==============
type IsCardModeNewCardContextType = boolean;

const isCardModeNewCardState = false;

export const isCardModeNewCardContext = createContext<IsCardModeNewCardContextType>(isCardModeNewCardState);

export function useCardModeNewCard() {
  return useContext(isCardModeNewCardContext);
}

// ==============

type IsPairWordSavedType = {
  isPairWordSaved: boolean;
  setIsPairWordSaved: React.Dispatch<React.SetStateAction<boolean>>;
};

const isPairWordSavedState = {
  isPairWordSaved: false,
  setIsPairWordSaved: () => {},
};

export const isPairWordSavedContext = createContext<IsPairWordSavedType>(isPairWordSavedState);

export function usePairWordSaved() {
  return useContext(isPairWordSavedContext);
}

// ==============

export type CurrentCollectionIdType = number | null;

const currentCollectionIdState = null;

export const currentCollectionIdContext = createContext<CurrentCollectionIdType>(currentCollectionIdState);

export function useCurrentCollectionId() {
  return useContext(currentCollectionIdContext);
}
