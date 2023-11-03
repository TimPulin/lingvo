import { createContext, useContext } from 'react';
import { NewWordType } from '../../utils/types';

export type ValueCardSaveType = {
  collectionId: number;
  newWord: NewWordType;
};

type CardSaveContextType = {
  valueCardSave: null | ValueCardSaveType;
  setValueCardSave: React.Dispatch<React.SetStateAction<null | ValueCardSaveType>>;
};

const initialState = {
  valueCardSave: null,
  setValueCardSave: () => {},
};

export const SaveCardContext = createContext<CardSaveContextType>(initialState);

export function useSaveCard() {
  return useContext(SaveCardContext);
}
