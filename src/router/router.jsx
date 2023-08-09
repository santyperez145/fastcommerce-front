import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Index from "../pages/Index";
import SignIn from "../pages/Signin";
import Register from "../pages/Register";
import ProductDetails from "../pages/ProductsDetails";




const router = createBrowserRouter([
    {
        path:'/',
        element: <Main/>,
        children: [
            {
                path:'/',
                element: <Index/>
            },
            {
                path:'/products/:id',
                element: <ProductDetails />   
            },
        ],
        
    },
    {
        path:'/signin',
        element: <SignIn />   
    },
    {
        path:'/register',
        element: <Register />   
    },

])

export default router