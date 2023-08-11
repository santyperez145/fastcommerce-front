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
  let navigate = useNavigate()
  let token = JSON.parse(localStorage.getItem("token"));
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user)

  const token = LS.get('token');

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return token && user;
  };

  const handleUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const signout = async () => {
    localStorage.clear()
    navigate("/")
  };
/*
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
  */


  return (
    <>
      <nav className="flex bg-[rgb(42,51,66)] items-center justify-around h-[9vh]">
        {/* Logo */}
        <a href="/" className="flex items-center justify-center">
          <img src="/src/assets/images/logo1.png" alt="Ecommerce Logo" className="h-[7vh]" />
        </a>

        {/* Search Bar */}
        <div className="flex w-[60vw] px-6">
          <input type="text" placeholder="Search your product" className="w-[60vw] px-6 rounded-lg border  focus:outline-none focus:border-black" />
        </div>

        {/* Links */}
        <div className="flex items-center pe-8">
          
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
            <img src={user?.photo} alt="User Avatar" className="w-[10vw] md:w-[4vw] rounded-full cursor-pointer" onClick={handleUserMenuToggle} />
            {userMenuOpen && (
              <div className="absolute w-[25vw] z-20 content-start top-10 right-0 bg-white border border-gray-200 rounded-lg shadow-md p-2">
                <p className="text-start block px-6 py-2 text-gray-800 text-bold">{user?.email}</p>
                <Anchor to="/cart-page" className="text-start block px-6 py-2 text-gray-800 hover:bg-[#ff5757] hover:text-white">
                  Cart
                </Anchor>
                <Anchor to="/dashboard/admin" className="text-start block px-6 py-2 text-gray-800 hover:bg-[#ff5757] hover:text-white">
                  Admin Panel
                </Anchor>
                <Anchor to="/dashboard/user" className="text-start block px-6 py-2 text-gray-800 hover:bg-[#ff5757] hover:text-white">
                  User Panel
                </Anchor>
                <Anchor onClick={signout} className="text-start block px-6 py-2 text-gray-800 hover:bg-[#ff5757] hover:text-white">
                  Log Out
                </Anchor>
              </div>
            )}
          </div>
        )}
      </nav>
      <div className="flex h-[6vh] ps-6 justify-start items-center bg-[#ff5757]">
        <a href="#" className="flex text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          All
        </a>
        <a href="#" className="text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border">
          Carpentry
        </a>
        <a href="#" className="text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border">
          Construction
        </a>
        <a href="#" className="text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border">
          Electricity
        </a>
        <a href="#" className="text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border">
          Flooring
        </a>
        <a href="#" className="text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border">
          Furniture
        </a>
        <a href="#" className="text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border">
          Hardware
        </a>
        <a href="#" className="text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border">
          Kitchen&Bath
        </a>
        <a href="#" className="text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border">
          Painting
        </a>
        <a href="#" className="text-white p-2 rounded hover:border-white hover:text-bold border border-transparent hover:border">
          Tools
        </a>
      </div>
    </>
  );
};

export default NavBar;

