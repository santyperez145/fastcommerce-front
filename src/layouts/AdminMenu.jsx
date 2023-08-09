import React, {useState,useEffect}from "react";
import { Link as Anchor, useNavigate } from 'react-router-dom';
const AdminMenu = () => {
    return (
        <div className="lg:text-lg flex flex-col">
                <Anchor to={'/dashboard/admin/create-category'} className="p-3 text-lg hover:bg-white hover:text-orange-600 rounded-md w-[300px]">Create Category</Anchor>
                <Anchor to={'/dashboard/admin/create-product'} className="p-3 text-lg hover:bg-white hover:text-orange-600 rounded-md w-[300px]">Create Product</Anchor>
                <Anchor to={'/dashboard/admin/users'} className="p-3 text-lg hover:bg-white hover:text-orange-600 rounded-md w-[300px]">Users</Anchor>
            </div>
    )
}

export default AdminMenu