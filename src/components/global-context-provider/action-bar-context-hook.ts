import { createContext, useContext } from 'react';

type ActionBarType = {
  id: number | null;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  isActionBarOpen: boolean;
  setIsActionBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialState = {
  id: null,
  setId: () => {},
  isActionBarOpen: false,
  setIsActionBarOpen: () => {},
};

export const ActionBar = createContext<ActionBarType>(initialState);

export function useActionBar() {
  return useContext(ActionBar);
}
