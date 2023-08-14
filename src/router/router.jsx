import { createBrowserRouter, useParams } from "react-router-dom";
import Main from "../layouts/Main";
import Index from "../pages/Index";
import SignIn from "../pages/Signin";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import CartPage from "../pages/CartPage";
import Dashboard from "../pages/user/Dashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateCategory from "../pages/admin/CreateCategory";
import ProductsPage from "../pages/admin/CreateProduct";
import Orders from "../pages/user/Orders";
import { ProtectedRoute, ProtectedSignIn } from "./private";
import { ProductDetail, AllProducts, Carpentry, Construction, Electricity, FlooringProducts, Furniture, Hardware, KitchenAndBath, Painting, Tools, ProductsSearched } from '.'

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
        path:'/products/:id',
        element: <ProductDetail />   
      },
      {
        path: '/dashboard/admin',
        element: <AdminDashboard />,
      },
      {
        path: '/products/all',
        element: <AllProducts />,
      },
      {
        path: '/products/carpentry',
        element: <Carpentry />,
      },
      {
        path: '/products/construction',
        element: <Construction />,
      },
      {
        path: '/products/electricity',
        element: <Electricity />,
      },
      {
        path: '/products/flooring',
        element: <FlooringProducts />,
      },
      {
        path: '/products/furniture',
        element: <Furniture />,
      },
      {
        path: '/products/hardware',
        element: <Hardware />,
      },
      {
        path: '/products/kitchen&bath',
        element: <KitchenAndBath />,
      },
      {
        path: '/products/painting',
        element: <Painting />,
      },
      {
        path: '/products/tools',
        element: <Tools />,
      },
      {
        path: '/products/search-results',
        element: <ProductsSearched/>,
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