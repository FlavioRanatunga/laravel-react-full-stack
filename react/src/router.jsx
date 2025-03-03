import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './views/login';
import Signup from './views/signup';
import Users from './views/users';
import NotFound from './views/notFound';
import DefaultLayout from './components/defaultLayout';
import GuestLayout from './components/guestLayout';
import Dashboard from './views/dashboard';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to='users' />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'users',
        element: <Users />,
      },
    ],
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default Router;