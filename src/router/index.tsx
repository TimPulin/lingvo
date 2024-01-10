import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CollectionsListPage from '../pages/CollectionsListPage';
import NewCollectionPage from '../pages/NewCollectionPage';
import NewCardPage from '../pages/NewCardPage';
import CardsPage from '../pages/CardsPage';
import SettingsPage from '../pages/SettingsPage';
import GlobalContextProvider from '../components/global-context-provider/GlobalContextProvider';
import CollectionPage from '../pages/CollectionPage';
import LoginPage from '../pages/login-page/LoginPage';
import EditCollectionPage from '../pages/EditCollectionPage';
import CollectionPageContextProvider from '../components/collection-page-context-provider/CollectionPageContextProvider';
import FeedbackPage from '../pages/feedback-page/FeedBackPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <GlobalContextProvider />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },

      {
        path: '/',
        element: <HomePage />,
      },

      {
        path: '/collections',
        element: <CollectionsListPage />,
      },

      {
        path: '/collections/create-new-collection',
        element: <NewCollectionPage />,
      },

      {
        path: '/feedback',
        element: <FeedbackPage />,
      },

      {
        path: 'collection',
        element: <CollectionPageContextProvider />,
        children: [
          {
            path: '/collection/:id',
            element: <CollectionPage />,
            children: [
              {
                path: '/collection/:id',
                element: <CardsPage />,
              },
              {
                path: '/collection/:id/create-new-card',
                element: <NewCardPage />,
              },
              {
                path: '/collection/:id/edit-collection',
                element: <EditCollectionPage />,
              },
            ],
          },
        ],
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
