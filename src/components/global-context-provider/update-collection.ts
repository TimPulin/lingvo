import { createContext, useContext } from 'react';

type IsNeedCurrentCollectionUpdateType = {
  isNeedCurrentCollectionUpdate: boolean;
  setIsNeedCurrentCollectionUpdate: React.Dispatch<React.SetStateAction<boolean>>
};

const initialState = {
  isNeedCurrentCollectionUpdate: false,
  setIsNeedCurrentCollectionUpdate: () => {},
};

export const IsNeedCurrentCollectionUpdateContext = createContext<IsNeedCurrentCollectionUpdateType>(initialState);
export function useNeedCurrentCollectionUpdate() {
  return useContext(IsNeedCurrentCollectionUpdateContext);
}
