/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useMemo } from 'react';

import RootPage from '../../pages/RootPage';

import { StaticMessageContext } from './context-hooks';

export default function ContextProvider() {
  const [isStaticMessageShow, setIsStaticMessageShow] = useState(false);
  const [staticMessageText, setStaticMessageText] = useState('');
  const staticMessage = useMemo(() => (
    {
      text: staticMessageText,
      setText: setStaticMessageText,
      isShow: isStaticMessageShow,
      setIsShow: setIsStaticMessageShow,
    }
  ), [isStaticMessageShow, staticMessageText]);

  return (
    <StaticMessageContext.Provider value={staticMessage}>
      <RootPage />
    </StaticMessageContext.Provider>
  );
}
