import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CollectionsListPage from '../pages/CollectionsListPage';
import NewCollectionPage from '../pages/NewCollectionPage';
import NewCardPage from '../pages/NewCardPage';
import CardsPage from '../pages/CardsPage';
import SettingsPage from '../pages/SettingsPage';
import GlobalContextProvider from '../components/global-context-provider/GlobalContextProvider';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <GlobalContextProvider />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/collections',
        element: <CollectionsListPage />,
      },
      {
        path: '/create-new-collection',
        element: <NewCollectionPage />,
      },

      {
        path: '/create-new-card',
        element: <NewCardPage />,
      },

      {
        path: '/cards',
        element: <CardsPage />,
      },

      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
]);
