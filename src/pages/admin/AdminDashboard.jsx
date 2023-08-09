import React from "react";
import AdminMenu from "../../layouts/AdminMenu";
import { LS } from '../../utils/localStorageUtils.js';
import { useSelector } from 'react-redux';
import NavBar from "../../components/NavBar";

const AdminDashboard = () => {
    const user = useSelector((state) => state.auth.user);

    let token = LS.get('token')

    return (
        <div className="flex flex-col items-center h-screen bg-[url('/fondo-admin.jpg')] bg-cover">
          
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
            <AdminMenu />
        </div>
    );
};

export default AdminDashboard;




