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

import { CollectionLanguagePromiseType } from './utils/types';

function App() {
  const userToken = useUserToken();
  const dispatch = useDispatch();
  const { setIsDataLoading } = useDataLoading();

  function makePromise(localPromise: Promise<AxiosResponse<any, CollectionLanguagePromiseType>>) {
    return localPromise
      .then((response:CollectionLanguagePromiseType) => ({
        status: response.status,
        response,
      }))
      .catch((error:any) => (
        {
          status: error.response.status,
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
          if (languagesListResponse.status === 200) {
            const list = languagesListResponse.response.data.data;
            const languagesList = list.map((item:any) => ({
              label: item.english,
              value: item.id,
            }));
            dispatch(setLanguagesList(languagesList));
          } else {
            console.log(languagesListResponse.status);
          }

          if (userDataResponse.status === 200) {
            dispatch(updateUserData({
              userName: userDataResponse.response.data.username,
              userAvatar: userDataResponse.response.data.avatar,
              languageId: userDataResponse.response.data.language.id,
            }));
          } else {
            console.log(userDataResponse.status);
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
