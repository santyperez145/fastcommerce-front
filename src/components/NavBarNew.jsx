import React, { useState } from 'react';

const NavBar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <nav className="flex bg-[rgb(92,110,141)] items-center justify-center h-[13vh] ">
      {/* Logo */}
      <a  href="#" className="flex items-center">
        <img src="/src/assets/images/logo.png" alt="Ecommerce Logo" className="h-[10vh] pe-20"/>
      </a>

      {/* Search Bar */}
      <div className="flex w-[30vw] ">
        <input type="text" placeholder="Search your product" className="w-[28vw] py-2 rounded-lg border border-orange-600 focus:outline-none focus:border-black"/>
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
      </div>

      {/* User Avatar and Menu */}
      <div className="relative">
        <img src="/src/assets/images/avatar.png" alt="User Avatar" className="pe-10 h-[6vh] rounded-full cursor-pointer" onClick={handleUserMenuToggle}/>
        {userMenuOpen && (
          <div className="absolute w-[15vw] z-20 content-start top-10 right-0 bg-white border border-gray-200 rounded-lg shadow-md p-2">
            <p className="block py-2 text-gray-800">User@email.com</p>
            <a href="#" className="text-start block px-9 py-2 text-gray-800 hover:bg-orange-300">
              Cart
            </a>
            <a href="#" className="text-start block px-9 py-2 text-gray-800 hover:bg-orange-300">
              Settings
            </a>
            <a href="#" className="text-start block px-9 py-2 text-gray-800 hover:bg-orange-300">
              Sign Up
            </a>
            <a href="#" className="text-start block px-9 py-2 text-gray-800 hover:bg-orange-300">
              Sign In
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
