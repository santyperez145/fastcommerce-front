import { createBrowserRouter, Outlet, Route, useParams } from "react-router-dom";
import Main from "../layouts/Main";
import Index from "../pages/Index";
import SignIn from "../pages/Signin";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import CartPage from "../pages/CartPage";

// Create a custom Route component to pass the token as a parameter
function ResetPasswordRoute() {
  const { token } = useParams();
  return <ResetPassword token={token} />;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Index />
      },
      {
        path: '/cart-page',
        element: <CartPage />
      },
    ],

  },
  {
    path: '/login',
    element: <SignIn />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/reset-password/:token', // Use a parameter in the path
    element: <ResetPasswordRoute />
  },
]);

export default router;