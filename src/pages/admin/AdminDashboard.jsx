import React from "react";
import AdminMenu from "../../layouts/AdminMenu";
import { LS } from '../../utils/localStorageUtils.js';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
    const user = useSelector((state) => state.auth.user);

    let token = LS.get('token')

    return (
        <>
        <div className="flex justify-center items-center w-full min-h-screen flex-col bg-gray-300">
        <h1>Admin Dasboard</h1>
            <div>
                <h3>Admin Name : {user?.name} </h3>
                <h3>Admin Email : {user?.email} </h3>
                <h3>Admin Contact : {user?.email} </h3>
            </div>
        <AdminMenu/>
        </div>
        </>
    )
}
export default AdminDashboard;