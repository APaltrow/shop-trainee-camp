import { createBrowserRouter } from 'react-router-dom';

import { RoutesPaths } from '@constants';

import { App } from '../App';

export const AppRouter = createBrowserRouter(
  [
    {
      path: RoutesPaths.MAIN,
      element: <App />,
    },
  ],
  { basename: RoutesPaths.BASE },
);
