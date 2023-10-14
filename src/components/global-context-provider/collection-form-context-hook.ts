import { createContext, useContext } from 'react';

type IsCollectionSavedContextType = {
  isCollectionSaved: boolean;
  setIsCollectionSaved:React.Dispatch<React.SetStateAction<boolean>>;
};

const state = {
  isCollectionSaved: false,
  setIsCollectionSaved: () => {},
};

export const isCollectionSavedContext = createContext<IsCollectionSavedContextType>(state);

export function useCollectionSaved() {
  return useContext(isCollectionSavedContext);
}
