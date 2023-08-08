import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Register from '../pages/Register';
/*import MangaDetails from '../pages/MangaDetail';*/
import SignIn from '../pages/Signin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import { LS } from '../utils/localStorageUtils';
import { setUser } from '../redux/actions/auth.js';


const ProtectedRoute = () => {
    const token = LS.get('token');
  
    const isLoggedIn = () => {
      return token
    };
  
    if (isLoggedIn()) {
      return <Navigate to={'/'} />;
    }
  
    return <Register />;
  };

  const ProtectedSignIn = () => {
    const token = LS.get('token');
  
    const isLoggedIn = () => {
      return token
    };
  
    if (isLoggedIn()) {
      return <Navigate to={'/NotAllow'} />;
    }
  
    return <SignIn />;
  };

 /* const ProtectedRouteProductDetail = () => {
    const token = LS.get('token');
  
    const isLoggedIn = () => {
      return token
    };
  
    if (!isLoggedIn()) {
      return <Navigate to={'/login'} />;
    }
  
    return <ProductDetails />;
  };*/

  const ProtectedAdminPanel = () => {
    const token = useSelector((state) => state.auth.token); // Obtener el token desde el estado
    const userRole = useSelector((state) => state.auth.user?.role);
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (token && userRole === 1) {
        // Solo si el token existe y el rol es 1 (admin)
        // Puedes omitir esta parte si el rol ya se estableció en otro lugar de tu código
        dispatch(setUser({ role: userRole }));
      }
    }, [dispatch, token, userRole]);
  
    if (!token || userRole !== 1) {
      return <Navigate to={'/'} />;
    }
  
    return <AdminDashboard />;
  };

  export { ProtectedRoute, ProtectedSignIn, ProtectedAdminPanel };

