import Layout from './components/Layout'
import { createBrowserRouter } from 'react-router-dom'
import LoginForm from './pages/LoginForm'
import CreateAccountForm from './pages/CreateAccountForm'
import ForgotPasswordForm from './pages/ForgotPasswordForm'
import ChangePasswordForm from './pages/ChangePassword'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/login',
        element: <LoginForm />,
      },
      {
        path: '/create-account',
        element: <CreateAccountForm />,
      },
      {
        path: '/change-password',
        element: <ChangePasswordForm />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordForm />,
      },
    ],
  },
])

export default Router
