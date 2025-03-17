import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as routes from './lib/routes';
import { TrpcProvider } from './lib/trpc';
import { AllIdeasPage } from './pages/AllIdeasPage';
import { ViewIdeaPage } from './pages/ViewIdeaPage';
import { NewIdeaPage } from './pages/NewIdeaPage';
import { SignUpPage } from './pages/SignUpPage';
import { Layout } from './components/Layout';

import './styles/global.scss';

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
            <Route
              path={routes.getAllIdeasRoute()}
              element={<AllIdeasPage />}
            />
            <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage />} />
            <Route
              path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)}
              element={<ViewIdeaPage />}
            />
          </Route>{' '}
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};
