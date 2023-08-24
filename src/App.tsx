/* eslint-disable-next-line */
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function App() {
  return (
    <div data-lingvo-cards-theme="light" className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
