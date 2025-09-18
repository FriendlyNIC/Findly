import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import FeedPage from './pages/FeedPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import TermsPage from './pages/TermsPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* --- Routes Publiques --- */}
      <Route index={true} path='/' element={<LandingPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/terms' element={<TermsPage />} />

      {/* --- Routes Privées --- */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/feed' element={<FeedPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);