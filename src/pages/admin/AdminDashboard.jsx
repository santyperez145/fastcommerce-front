import React from "react";
import AdminMenu from "../../layouts/AdminMenu";
import { LS } from '../../utils/localStorageUtils.js';
import { useSelector } from 'react-redux';
import NavBar from "../../components/NavBar";
import UserInfo from "../../layouts/UserInfo";

const AdminDashboard = () => {
    let user = JSON.parse(localStorage.getItem("user"));

    let token = LS.get('token')

    return (
        <div className="flex flex-col justify-start gap-[20px] items-center h-screen bg-gray-200">
            <UserInfo />
            <AdminMenu />
        </div>
    );
};

export default AdminDashboard;




