import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

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

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

const appRoot = document.getElementById('app-root');
const appElement = createRoot(appRoot);
appElement.render(<App />);