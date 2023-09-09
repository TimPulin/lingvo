import { createContext, useContext } from 'react';

type StaticMessageContextType = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const staticMessageContextState = {
  text: '',
  setText: () => {},
  isShow: false,
  setIsShow: () => {},
};

export const StaticMessageContext = createContext<StaticMessageContextType>(staticMessageContextState);

export function useStaticMessage() {
  return useContext(StaticMessageContext);
}
