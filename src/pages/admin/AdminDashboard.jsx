import React from "react";
import AdminMenu from "../../layouts/AdminMenu";
import { LS } from '../../utils/localStorageUtils.js';
import { useSelector } from 'react-redux';
import NavBar from "../../components/NavBar";
import UserInfo from "../../layouts/UserInfo";

const AdminDashboard = () => {
    const user = useSelector((state) => state.auth.user);

    let token = LS.get('token')

    return (
        <div className="flex flex-col items-center h-screen bg-[url('/fondo-admin.jpg')] bg-cover">
            <UserInfo />
            <AdminMenu />
        </div>
    );
};

export default AdminDashboard;




