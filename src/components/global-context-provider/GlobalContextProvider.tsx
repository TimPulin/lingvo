/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useMemo } from 'react';
import RootPage from '../../pages/RootPage';
import { StaticMessageContext } from './context-hooks';
import { isCollectionSavedContext } from './collection-form-context-hook';

export default function GlobalContextProvider() {
  const [isCollectionSaved, setIsCollectionSaved] = useState(false);
  const [isStaticMessageShow, setIsStaticMessageShow] = useState(false);
  const [staticMessageText, setStaticMessageText] = useState('');

  const collectionSaved = useMemo(() => (
    {
      isCollectionSaved,
      setIsCollectionSaved,
    }
  ), [isCollectionSaved, setIsCollectionSaved]);

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
      <isCollectionSavedContext.Provider value={collectionSaved}>
        <RootPage />
      </isCollectionSavedContext.Provider>
    </StaticMessageContext.Provider>
  );
}
