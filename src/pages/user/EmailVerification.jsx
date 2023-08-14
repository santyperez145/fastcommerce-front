import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const MailVerification = () => {
    const navigate = useNavigate()
    const [verificationStatus, setVerificationStatus] = useState(false);
    const { verify_code } = useParams();

    const changeVerified = async () => {
        try {
            await axios.get(`http://localhost:8080/api/auth/verify/${verify_code}`);
            setVerificationStatus(true)
            Swal.fire({
                icon: "success",
                title: "Email verified successfully!",
              });
            navigate("/login")
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Email is already verified or doesn't exist",
              });
            console.log(error);
        }
    };

    return (
        <div className="flex min-h-[86vh] w-full bg-cover justify-center items-center flex-col lg:w-full">
            <img className="w-[30vw] py-9" src="/src/assets/images/logo2.png" alt="logo" />
            <h1 className="text-[#ff5757] text-3xl mb-3 text-center md:m-10 md:text-5xl lg:m-0 p-6">Welcome to FastCommerce!</h1>
            {verificationStatus ? (
                <p className="text-bold font-sans ">Your email has been verified</p>
                ) : (
                    <button className="m-4 p-4 rounded-lg bg-[#ff5757] text-white font-bold text-lg" onClick={changeVerified}>Click here to verify your Email</button>
                    )}

        </div>
    );
};

export default MailVerification;