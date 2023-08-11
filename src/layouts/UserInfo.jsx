import React from "react";
import { LS } from '../utils/localStorageUtils.js';
import { useSelector } from 'react-redux';

export default function UserInfo() {

  let user = JSON.parse(localStorage.getItem("user"));

    let token = LS.get('token')


  return (
    <div className="bg-gray-800 text-white p-6 w-[40%] rounded-md shadow-lg">
        <h1 className="text-xl text-center font-semibold">Admin Panel</h1>
        <div className="mt-4 text-center">
            <div className="flex items-center justify-center">
                {user?.photo && (
                <img src={user.photo} alt="Admin Photo" className="w-40 h-40 rounded-full" />
                )}
            </div>
                <h2 className="text-2xl font-semibold mt-2">{user?.name}</h2>
                <p className="text-gray-400">{user?.email}</p>
        </div>
    </div>
  )
}
