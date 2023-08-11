import { createBrowserRouter, useParams } from "react-router-dom";
import Main from "../layouts/Main";
import Index from "../pages/Index";
import SignIn from "../pages/Signin";
import Register from "../pages/Register";
import ProductDetails from "../pages/products/ProductDetail";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import CartPage from "../pages/CartPage";
import Dashboard from "../pages/user/Dashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateCategory from "../pages/admin/CreateCategory";
import ProductsPage from "../pages/admin/CreateProduct";
import Orders from "../pages/user/Orders";
import { ProtectedRoute, ProtectedSignIn } from "./private";

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
        path: '/login',
        element: (
          <ProtectedSignIn>
          <SignIn />
          </ProtectedSignIn>
      )
      },
      {
        path:'/register',
        element: (
            <ProtectedRoute>
            <Register />
            </ProtectedRoute>
        )
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />
      },
      {
        path: '/reset-password/:token', // Use a parameter in the path
        element: <ResetPasswordRoute />
      },
      {
        path: '/cart-page',
        element: <CartPage />
      },
      {
        path: '/dashboard/user',
        element: <Dashboard />
      },
      {
        path:'/product/:id',
        element: <ProductDetails />   
      },
      {
        path: '/dashboard/admin',
        element: <AdminDashboard />,
    },
    {
      path: '/dashboard/admin/categories',
      element: <CreateCategory />
    },
    {
      path: '/dashboard/admin/create-product',
      element: <ProductsPage />
    },
    ],

  },
  
]);

export default router;