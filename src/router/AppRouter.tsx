import { createHashRouter } from 'react-router-dom';

import { RoutesPaths } from '@constants';

import { App } from '../App';

export const AppRouter = createHashRouter([
  {
    path: RoutesPaths.MAIN,
    element: <App />,
  },
]);
