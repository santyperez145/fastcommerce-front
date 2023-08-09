import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as Anchor, useNavigate } from 'react-router-dom';
import { setUser, setPhoto } from '../redux/actions/auth.js';
import { api, apiUrl, endpoints } from '../utils/api';
import Swal from 'sweetalert2';
import { LS } from '../utils/localStorageUtils.js';

const NavBar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const photo = useSelector((state) => state.auth.photo);
  const token = LS.get('token');
  const navigate = useNavigate();

  const isLoggedIn = () => {
    return token && user;
  };

  const handleUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const signout = async () => {
    try {
      await api.post(apiUrl + endpoints.logout, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Logout successful!',
        showConfirmButton: false,
        timer: 1500,
      });

      LS.remove('token');
      dispatch(setUser(null));
      dispatch(setPhoto(null));

      setUserMenuOpen(false);
      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to sign out!',
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    if (!user) fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await api.get(apiUrl + endpoints.login, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { user, photo } = response.data.response;

      dispatch(setUser(user));
      dispatch(setPhoto(photo));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="flex bg-[rgb(92,110,141)] items-center justify-center h-[13vh] ">
      {/* Logo */}
      <Anchor to="/" href="#" className="flex items-center">
        <img src="/src/assets/images/logo.png" alt="Ecommerce Logo" className="h-[10vh] pe-20" />
      </Anchor>

      {/* Search Bar */}
      <div className="flex w-[30vw] ">
        <input type="text" placeholder="Search your product" className="w-[28vw] py-2 rounded-lg border border-orange-600 focus:outline-none focus:border-black" />
      </div>

      {/* Links */}
      <div className="flex items-center pe-8">
        <a href="#" className="text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border">
          Electronics
        </a>
        <a href="#" className="text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border">
          Home & Healt
        </a>
        <a href="#" className="text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border">
          Babys
        </a>
        <a href="#" className="text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border">
          Cars
        </a>
        <a href="#" className="text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border">
          Mats
        </a>
        {isLoggedIn() ? null :<a href="/login" className="text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border">
          Login
        </a>}
        {isLoggedIn() ? null :<a href="/register" className="text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border">
          Register
        </a>}
      </div>

      {/* User Avatar and Menu */}
      {isLoggedIn() && (
        <div className="relative">
          <img src={photo} alt="User Avatar" className=" w-[35px] sm:w-[50px] rounded-full cursor-pointer" onClick={handleUserMenuToggle} />
          {userMenuOpen && (
            <div className="absolute w-[15vw] z-20 content-start top-10 right-0 bg-white border border-gray-200 rounded-lg shadow-md p-2">
              <p className="block py-2 text-gray-800">{user.email}</p>
              <Anchor to="/cart-page" className="text-start block px-9 py-2 text-gray-800 hover:bg-orange-300">
                Cart
              </Anchor>
              <Anchor to="/dashboard/admin" className="text-start block px-9 py-2 text-gray-800 hover:bg-orange-300">
                Admin Panel
              </Anchor>
              <Anchor to="/dashboard/user" className="text-start block px-9 py-2 text-gray-800 hover:bg-orange-300">
                User Panel
              </Anchor>
              <Anchor onClick={signout} className="text-start block px-9 py-2 text-gray-800 hover:bg-orange-300">
                Log Out
              </Anchor>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;

