import React, {useState,useEffect}from "react";
import { Link as Anchor, useNavigate } from 'react-router-dom';
const AdminMenu = () => {
    return (
        <div className="lg:text-lg bg-white text-black flex justify-between p-6 w-[80vw] rounded-md shadow-lg">
                <Anchor to={'/dashboard/admin/categories'} className="p-3 text-lg text-center text-black hover:bg-white hover:text-orange-600 rounded-md w-[300px]">Categories</Anchor>
                <Anchor to={'/dashboard/admin/create-product'} className="p-3 text-lg text-center text-black hover:bg-white hover:text-orange-600 rounded-md w-[300px]">Create Product</Anchor>
                <Anchor to={'/dashboard/admin/users'} className="p-3 text-lg text-black text-center hover:bg-white hover:text-orange-600 rounded-md w-[300px]">Users</Anchor>
            </div>
    )
}

export default AdminMenu