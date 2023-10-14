import { createContext, useContext } from 'react';

type IsCollectionSavedContextType = {
  isCollectionSaved: boolean;
  setIsCollectionSaved:React.Dispatch<React.SetStateAction<boolean>>;
};

const initialState = {
  isCollectionSaved: false,
  setIsCollectionSaved: () => {},
};

export const isCollectionSavedContext = createContext<IsCollectionSavedContextType>(initialState);

export function useCollectionSaved() {
  return useContext(isCollectionSavedContext);
}
