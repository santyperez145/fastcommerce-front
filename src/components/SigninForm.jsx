import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setPhoto } from '../redux/actions/auth.js';
import { api, apiUrl, endpoints } from '../utils/api';
import Swal from 'sweetalert2';
import { Link as Anchor, useNavigate } from 'react-router-dom';
import { LS } from '../utils/localStorageUtils.js';

function alertSoon() {
  Swal.fire({
    text: 'We are having problems, this option is available soon!',
    width: 600,
    padding: '3em',
  });
}

export default function SigninForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputEmail = useRef('');
  const inputPassword = useRef('');

  const signin = async (event) => {
    event.preventDefault();
    const data = {
      email: inputEmail.current.value,
      password: inputPassword.current.value,
    };

    try {
      const response = await api.post(apiUrl + endpoints.login, data);
      console.log(response);
      if (response.data.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'User signed in!',
          showConfirmButton: false,
          timer: 1500,
        });

        const { user, photo, token } = response.data.response;

        LS.add('token', token)
        dispatch(setUser(user));
        dispatch(setPhoto(photo));

        navigate('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Authentication failed!',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Authentication failed!',
      });
    }
  };

  return (
    <div className="flex flex-wrap flex-col justify-center items-center w-[100%] max-h-screen bg-gray-300">
      <p className="text-[#1F1F1F] text-center text-[32px] not-italic font-bold leading-[normal] tracking-[1.6px]">
        Welcome <span className="text-purple-600">back!</span>
      </p>
      <p className="w-[80%] md:w-[50%] text-black text-center text-2xl not-italic font-semibold leading-[normal] tracking-[0.6px] mt-3">
      To Your Best Store!
      </p>
      <form onSubmit={signin} className="w-full">
        <div className="w-full mt-8 mr-0 mb-0 ml-0 space-y-8 flex flex-col items-center">
          <div>
            <p className=" pt-0 pr-2 pb-0 pl-2 mr-0 mb-0 ml-2 not-italic font-normal text-[21px] leading-[normal] tracking-[0.6px] text-xs text-purple-600">
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
          <div>
            <p className="pt-0 pr-2 pb-0 pl-2 mr-0 mb-0 ml-2 not-italic font-normal text-[21px] leading-[normal] tracking-[0.6px] text-xs text-purple-600">
              Password
            </p>
            <input
              ref={inputPassword}
              placeholder="Password"
              id="password"
              name="password"
              type="password"
              required
              className="border-purple-600 placeholder-gray-300 pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                      rounded-[10px] border-solid border-[rgba(31,31,31,0.50)] w-[70vw] md:w-[30vw] h-12 shrink-0"
            />
          </div>
          <button
            type="submit"
            className="flex w-[70vw] md:w-[30vw] h-12 flex-col items-center justify-center shrink-0 bg-purple-600 rounded-[10px]"
          >
            <a className="text-[#FAFCFC] text-center text-[21px] not-italic font-bold leading-[normal] tracking-[0.7px]">
              Sign In
            </a>
          </button>
          <button className="w-[70vw] md:w-[30vw] h-12 shrink-0 border rounded-[10px] border-solid border-[#1F1F1F] flex justify-center items-center">
            <img src="/google.png" className="w-6 h-6 shrink-0" alt="Google" />
            <Anchor onClick={alertSoon} className="ms-2 text-[#1F1F1F] text-center text-[21px] not-italic font-medium leading-[normal] tracking-[0.7px]">
              Sign in with Google
            </Anchor>
          </button>
          <p className="text-[#1F1F1F] text-[21px] not-italic font-medium leading-[normal] tracking-[0.7px]">
            Forgot your Password? <Anchor to={'/forgot-password'} className="text-purple-600">Click Here</Anchor>
          </p>
          <p className="text-[#1F1F1F] text-[21px] not-italic font-medium leading-[normal] tracking-[0.7px]">
            Already have an account? <Anchor to={'/register'} className="text-purple-600">Sign Up</Anchor>
          </p>
          <p className="text-[#1F1F1F] text-[21px] not-italic font-medium leading-[normal] tracking-[0.7px]">
            Go back to <Anchor to={'/'} className="text-purple-600">home page</Anchor>
          </p>
        </div>
      </form>
    </div>
  );
}
