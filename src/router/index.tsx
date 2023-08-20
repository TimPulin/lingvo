import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NewCardPage from '../pages/NewCardPage';
import CardsPage from '../pages/CardsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },

  {
    path: '/create-new-card',
    element: <NewCardPage />,
  },
  {
    path: '/cards',
    element: <CardsPage />,
  },

]);
