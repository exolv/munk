import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import { store } from './redux/store';
import { Provider } from 'react-redux';

import '../styles.css';

import Error from './pages/error/Error';
import Jobs from './pages/jobs/Jobs';
import Contacts from './pages/contacts/Contacts';

const router = createBrowserRouter([
  {
    path: '/app.html',
    element: <Jobs />,
    errorElement: <Error />
  },
  {
    path: '/app.html/contacts',
    element: <Contacts />,
    errorElement: <Error />
  }
]);

const App: FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

const appRoot = document.getElementById('app-root');
const appElement = createRoot(appRoot);
appElement.render(<App />);