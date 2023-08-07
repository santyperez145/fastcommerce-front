import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Index from "../pages/Index";
import SignIn from "../pages/Signin";
import Register from "../pages/Register";
import Dashboard from "../pages/user/Dashboard";
import PrivateRoute from "./private";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateCategory from "../pages/admin/CreateCategory";
import CreateProduct from "../pages/admin/CreateProduct";
import Orders from "../pages/user/Orders";




const router = createBrowserRouter([
    {
        path:'/',
        element: <Main/>,
        children: [
            {
                path:'/',
                element: <Index/>
            },  
        ],
        
    },
    {
        path:'/signin',
        element: <SignIn />   
    },
    {
        path:'/dashboard',
        element: <PrivateRoute/>,
        children: [
            {
            path:'user',
            element:<Dashboard/>
            },
            {
                path:'user/orders',
                element:<Orders/>
            },
            {
                path:'user/profile',
                element:<Profile/>
            },
        ],
    },
    {
        path:'/dashboard',
        element: <AdminRoute/>,
        children: [
            {
            path:'admin',
            element:<AdminDashboard/>
            },
            {
                path:'admin/create-category',
                element:<CreateCategory/>
            },
            {
                path:'admin/create-product',
                element:<CreateProduct/>
            },
        ],
    },
    {
        path:'/register',
        element: <Register />   
    },

])

export default router