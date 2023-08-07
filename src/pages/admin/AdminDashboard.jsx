import React from "react";
import Main from "../../layouts/Main";
import AdminMenu from "../../layouts/AdminMenu";
const AdminDashboard = () => {
    return (
        <Main>
            <h1>Admin Dasboard</h1>
            <div>
                <h3>Admin Name : {auth?.user?.name} </h3>
                <h3>Admin Email : {auth?.user?.email} </h3>
                <h3>Admin Contact : {auth?.user?.email} </h3>
            </div>
            <AdminMenu/>
        </Main>
    )
}
export default AdminDashboard;