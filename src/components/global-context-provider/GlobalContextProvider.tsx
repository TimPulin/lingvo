/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useMemo } from 'react';
import RootPage from '../../pages/RootPage';
import { StaticMessageContext } from './message-context';
import { isCollectionSavedContext } from './collection-form-context-hook';
import { IsNeedCurrentCollectionUpdateContext } from './update-collection';
import { IsDataLoading } from './loading-context-hook';
import { ActionBar } from './action-bar-context-hook';

export default function GlobalContextProvider() {
  const [isCollectionSaved, setIsCollectionSaved] = useState(false);

  const [isStaticMessageShow, setIsStaticMessageShow] = useState(false);
  const [staticMessageText, setStaticMessageText] = useState('');

  const [isNeedCurrentCollectionUpdate, setIsNeedCurrentCollectionUpdate] = useState(false);

  const [isActionBarOpen, setIsActionBarOpen] = useState(false);
  const [currentIdForActionBar, setCurrentIdForActionBar] = useState<number | null>(null);

  const [isDataLoading, setIsDataLoading] = useState(false);

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

  const actionBarState = useMemo(() => (
    {
      isActionBarOpen,
      setIsActionBarOpen,
      id: currentIdForActionBar,
      setId: setCurrentIdForActionBar,
    }
  ), [isActionBarOpen, currentIdForActionBar]);

  const dataLoadingState = useMemo(() => (
    {
      isDataLoading,
      setIsDataLoading,
    }
  ), [isDataLoading]);

  return (
    <StaticMessageContext.Provider value={staticMessage}>
      <isCollectionSavedContext.Provider value={collectionSaved}>
        <IsNeedCurrentCollectionUpdateContext.Provider value={isNeedCurrentCollectionUpdateState}>
          <ActionBar.Provider value={actionBarState}>
            <IsDataLoading.Provider value={dataLoadingState}>
              <RootPage />
            </IsDataLoading.Provider>
          </ActionBar.Provider>
        </IsNeedCurrentCollectionUpdateContext.Provider>
      </isCollectionSavedContext.Provider>
    </StaticMessageContext.Provider>
  );
}
