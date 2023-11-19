import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AxiosResponse } from 'axios';
import { router } from './router';

import { getLanguagesList, getUserData } from './connect/server-connections';

import { useUserToken } from './store/selectors';
import { setLanguagesList } from './store/slicers/languages-list-slicer';
import { updateUserData } from './store/slicers/user-data-slice';

import { useDataLoading } from './components/global-context-provider/loading-context-hook';

import { registerServiceWorker } from './register-service-worker';

import {
  CollectionLanguagePromiseType, UserPromiseType, CollectionLanguageType, UserType,
} from './utils/types';
import { updateCurrentLang } from './store/slicers/current-lang-slice';
import { Languages } from './utils/lang-pack/lang-pack-types';

function App() {
  const userToken = useUserToken();
  const dispatch = useDispatch();
  const { setIsDataLoading } = useDataLoading();

  function makePromise(
    localPromise: Promise<AxiosResponse<any, CollectionLanguagePromiseType | UserPromiseType>>,
  ) {
    return localPromise
      .then((response:CollectionLanguagePromiseType | UserPromiseType) => ({
        response,
      }))
      .catch((error:any) => (
        {
          response: error,
        }
      ));
  }

  useEffect(() => {
    if (userToken) {
      const getLanguagesListPromise = makePromise(getLanguagesList(userToken));
      const getUserDataPromise = makePromise(getUserData(userToken));

      setIsDataLoading(true);

      Promise.all([getLanguagesListPromise, getUserDataPromise])
        .then(([languagesListResponse, userDataResponse]) => {
          if (languagesListResponse.response.status === 200) {
            const list:CollectionLanguageType[] = languagesListResponse.response.data.data;
            const languagesList = list.map((item:CollectionLanguageType) => ({
              label: item.english,
              value: item.id,
            }));
            dispatch(setLanguagesList(languagesList));
          } else {
            console.log(languagesListResponse.response.status);
          }

          if (userDataResponse.response.status === 200) {
            console.log(userDataResponse);

            const userData: UserType = userDataResponse.response.data;
            dispatch(updateUserData({
              userName: userData.username,
              userAvatar: userData.avatar,
              languageId: userData.language.id,
            }));
            const userLangId = userData.language.id;
            // TODO использовать langIdToLangAdaptor из src/utils/lang-pack/lang-pack-types.ts
            switch (userLangId) {
            /* eslint-disable-next-line */
              case 82: dispatch(updateCurrentLang(Languages.RU));
              /* eslint-disable-next-line */
                break;
              /* eslint-disable-next-line */
              case 28: dispatch(updateCurrentLang(Languages.EN));
              /* eslint-disable-next-line */
                break;
              /* eslint-disable-next-line */
              case 115: dispatch(updateCurrentLang(Languages.ESL));
              /* eslint-disable-next-line */
                break;
              /* eslint-disable-next-line */
              case 38: dispatch(updateCurrentLang(Languages.HBW));
              /* eslint-disable-next-line */
                break;
              /* eslint-disable-next-line */
              default: dispatch(updateCurrentLang(Languages.EN));
            }
          } else {
            console.log(userDataResponse.response.status);
          }
        })
        .finally(() => setIsDataLoading(false));
    }
  }, [userToken]);

  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <div data-lingvo-cards-theme="light" className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
