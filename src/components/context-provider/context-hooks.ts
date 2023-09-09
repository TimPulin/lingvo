import { createContext, useContext } from 'react';

type StaticMessageContextType = {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const staticMessageContextState = {
  isShow: false,
  setIsShow: () => {},
};

export const StaticMessageContext = createContext<StaticMessageContextType>(staticMessageContextState);

export function useStaticMessage() {
  return useContext(StaticMessageContext);
}
