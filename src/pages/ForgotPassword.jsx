import React, { useRef } from 'react';
import { api, apiUrl, endpoints } from '../utils/api';
import Swal from 'sweetalert2';
import { Link as Anchor, useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const inputEmail = useRef('');
  
    const forgotpassword = async (event) => {
      event.preventDefault();
      const data = {
        email: inputEmail.current.value,
      };
  
      try {
        const response = await api.post(apiUrl + endpoints.forgotPassword, data);
        console.log(response);
  
        if (response.data.success) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Password reset email sent!',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to send password reset email!',
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to send password reset email!',
        });
      }
    };

  return (
    <div className="flex flex-wrap flex-col justify-center items-center w-[100%] h-screen bg-gray-300">
      <p className="text-[#1F1F1F] text-center text-[32px] not-italic font-bold leading-[normal] tracking-[1.6px]">
        Enter Your Email to Reset Password
      </p>
      <form onSubmit={forgotpassword} className="w-full">
        <div className="w-full mt-8 mr-0 mb-0 ml-0 space-y-8 flex flex-col items-center">
          <div>
            <p className=" pt-0 pr-2 pb-0 pl-2 mr-0 mb-0 ml-2 not-italic font-normal text-[20px] leading-[normal] tracking-[0.6px] text-xs text-purple-600">
              Email
            </p>
            <input
              ref={inputEmail}
              placeholder="DragonballZ@Krowl.com"
              id="email"
              name="email"
              type="email"
              required
              className="border-purple-600 placeholder-gray-300 pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                      rounded-[10px] border-solid border-[rgba(31,31,31,0.50)] w-[70vw] md:w-[30vw] h-12 shrink-0"
            />
          </div>
          <button
            type="submit"
            className="flex w-[70vw] md:w-[30vw] h-12 flex-col items-center justify-center shrink-0 bg-purple-600 rounded-[10px]"
          >
            <Anchor className="text-[#FAFCFC] text-center text-sm not-italic font-bold leading-[normal] tracking-[0.7px]">
              Send Email
            </Anchor>
          </button>
          <p className="text-[#1F1F1F] text-[20px] not-italic font-medium leading-[normal] tracking-[0.7px]">
            Send me back to <Anchor to={'/login'} className="text-purple-600">Login</Anchor>
          </p>
        </div>
      </form>
    </div>
  );
}
