import './styles/global.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as routes from './lib/routes';
import { TrpcProvider } from './lib/trpc';
import { HelmetProvider } from 'react-helmet-async';
import { AllIdeasPage } from './pages/ideas/AllIdeasPage';
import { ViewIdeaPage } from './pages/ideas/ViewIdeaPage';
import { NewIdeaPage } from './pages/ideas/NewIdeaPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { SignInPage } from './pages/auth/SignInPage';
import { Layout } from './components/Layout';
import { SignOutPage } from './pages/auth/SignOutPage';
import { EditIdeaPage } from './pages/ideas/EditIdeaPage';
import { AppContextProvider } from './lib/ctx';
import { NotFoundPage } from './pages/other/NotFoundPage';
import { EditProfilePage } from './pages/auth/EditProfilePage';

const helmetContext = {};

export const App = () => {
  return (
    <HelmetProvider context={helmetContext}>
      <TrpcProvider>
        <AppContextProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path={routes.getSignOutRoute.definition}
                element={<SignOutPage />}
              />
              <Route element={<Layout />}>
                <Route
                  path={routes.getSignUpRoute.definition}
                  element={<SignUpPage />}
                />
                <Route
                  path={routes.getSignInRoute.definition}
                  element={<SignInPage />}
                />
                <Route
                  path={routes.getEditProfileRoute.definition}
                  element={<EditProfilePage />}
                />
                <Route
                  path={routes.getAllIdeasRoute.definition}
                  element={<AllIdeasPage />}
                />
                <Route
                  path={routes.getViewIdeaRoute.definition}
                  element={<ViewIdeaPage />}
                />
                <Route
                  path={routes.getEditIdeaRoute.definition}
                  element={<EditIdeaPage />}
                />
                <Route
                  path={routes.getNewIdeaRoute.definition}
                  element={<NewIdeaPage />}
                />
                <Route path="*" element={<NotFoundPage />} />
              </Route>{' '}
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </TrpcProvider>
    </HelmetProvider>
  );
};
