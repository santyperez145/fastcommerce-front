import React, {useState,useEffect}from "react";
import { Link as Anchor, useNavigate } from 'react-router-dom';
const UserMenu = () => {
    return (
        <div className="lg:text-lg bg-gray-800 flex justify-center text-white p-6 w-[40%] rounded-md shadow-lg">
            <h1 className="text-center p-3 text-lg rounded-md w-[300px]">User Orders </h1>
        </div>
    )
}

export default UserMenu