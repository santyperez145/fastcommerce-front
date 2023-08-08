import React, {useState,useEffect}from "react";
import { Link as Anchor, useNavigate } from 'react-router-dom';
const UserMenu = () => {
    return (
        <div className="lg:text-lg flex flex-col">
                <Anchor to={'/dashboard/user/profile'} className="p-3 text-lg hover:bg-white hover:text-orange-600 rounded-md w-[300px]">Profile</Anchor>
                <Anchor to={'/dashboard/user/orders'} className="p-3 text-lg hover:bg-white hover:text-orange-600 rounded-md w-[300px]">Create Product</Anchor>
            </div>
    )
}

export default UserMenu