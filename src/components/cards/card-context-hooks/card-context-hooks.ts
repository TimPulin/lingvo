import { createContext, useContext } from 'react';

type IsCardModeEditContextType = boolean;

const isCardModeEditState = false;

export const isCardModeEditContext = createContext<IsCardModeEditContextType>(isCardModeEditState);

export function useCardModeEdit() {
  return useContext(isCardModeEditContext);
}

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
