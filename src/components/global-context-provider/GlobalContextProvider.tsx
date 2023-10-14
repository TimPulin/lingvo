/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useMemo } from 'react';
import RootPage from '../../pages/RootPage';
import { StaticMessageContext } from './context-hooks';
import { isCollectionSavedContext } from './collection-form-context-hook';
import { IsNeedCurrentCollectionUpdateContext } from './update-collection';

export default function GlobalContextProvider() {
  const [isCollectionSaved, setIsCollectionSaved] = useState(false);
  const [isStaticMessageShow, setIsStaticMessageShow] = useState(false);
  const [staticMessageText, setStaticMessageText] = useState('');
  const [isNeedCurrentCollectionUpdate, setIsNeedCurrentCollectionUpdate] = useState(false);

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

  const isNeedCurrentCollectionUpdateState = useMemo(() => (
    {
      isNeedCurrentCollectionUpdate,
      setIsNeedCurrentCollectionUpdate,
    }
  ), [isNeedCurrentCollectionUpdate, setIsNeedCurrentCollectionUpdate]);

  return (
    <StaticMessageContext.Provider value={staticMessage}>
      <isCollectionSavedContext.Provider value={collectionSaved}>
        <IsNeedCurrentCollectionUpdateContext.Provider value={isNeedCurrentCollectionUpdateState}>
          <RootPage />
        </IsNeedCurrentCollectionUpdateContext.Provider>
      </isCollectionSavedContext.Provider>
    </StaticMessageContext.Provider>
  );
}
