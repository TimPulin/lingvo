import { createContext, useContext } from 'react';

export type ValueCardDeleteType = {
  cardId: number
};

type CardDeleteContextType = {
  valueCardDelete: null | ValueCardDeleteType;
  setValueCardDelete: React.Dispatch<React.SetStateAction<null | ValueCardDeleteType>>;
};

const initialState = {
  valueCardDelete: null,
  setValueCardDelete: () => {},
};

export const DeleteCardContext = createContext<CardDeleteContextType>(initialState);

export function useDeleteCard() {
  return useContext(DeleteCardContext);
}
