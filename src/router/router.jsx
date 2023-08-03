import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Index from "../pages/Index";
import SignIn from "../pages/Signin";
import Register from "../pages/Register";




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
        path:'/register',
        element: <Register />   
    },

])

export default router