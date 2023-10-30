import { createContext, useContext } from 'react';

type IsDataLoadingType = {
  isDataLoading: boolean;
  setIsDataLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialState = {
  isDataLoading: false,
  setIsDataLoading: () => {},
};

export const IsDataLoading = createContext<IsDataLoadingType>(initialState);
export function useDataLoading() {
  return useContext(IsDataLoading);
}
