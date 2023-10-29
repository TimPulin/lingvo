import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { router } from './router';
import { getLanguagesList } from './connect/server-connections';
import { useUserToken } from './store/selectors';
import { setLanguagesList } from './store/slicers/languages-list-slicer';

function App() {
  const userToken = useUserToken();
  const dispatch = useDispatch();

  /* TODO типизировать CollectionLanguageListType */

  useEffect(() => {
    if (userToken) {
      getLanguagesList(userToken)
        .then((response:any) => {
          const list = response.data.data;
          const languagesList = list.map((item:any) => ({
            label: item.english,
            value: item.id,
          }));

          dispatch(setLanguagesList(languagesList));
        });
    }
  }, [userToken]);

  return (
    <div data-lingvo-cards-theme="light" className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
