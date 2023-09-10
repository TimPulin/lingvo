import { createContext, useContext } from 'react';

type IsCardModeEditContextType = boolean;

const isCardModeEditState = false;

export const isCardModeEditContext = createContext<IsCardModeEditContextType>(isCardModeEditState);

export function useCardModeEdit() {
  return useContext(isCardModeEditContext);
}

type IsNewPairWordSavedType = {
  isNewPairWordSaved: boolean;
  setIsNewPairWordSaved: React.Dispatch<React.SetStateAction<boolean>>;
};

const isNewPairWordSavedState = {
  isNewPairWordSaved: false,
  setIsNewPairWordSaved: () => {},
};

export const isNewPairWordSavedContext = createContext<IsNewPairWordSavedType>(isNewPairWordSavedState);

export function useNewPairWordSaved() {
  return useContext(isNewPairWordSavedContext);
}
