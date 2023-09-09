/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useMemo } from 'react';

import RootPage from '../../pages/RootPage';

import { StaticMessageContext } from './context-hooks';

export default function ContextProvider() {
  const [isStaticMessageShow, setIsStaticMessageShow] = useState(false);
  const staticMessage = useMemo(() => (
    { isShow: isStaticMessageShow, setIsShow: setIsStaticMessageShow }
  ), [isStaticMessageShow]);

  return (
    <StaticMessageContext.Provider value={staticMessage}>
      <RootPage />
    </StaticMessageContext.Provider>
  );
}
