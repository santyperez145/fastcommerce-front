import { useRef, useEffect } from "react"
import { api, apiUrl, endpoints } from "../utils/api.js"
import { Link as Anchor , useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import GoogleLogin from "react-google-login";
import { gapi } from 'gapi-script'
import axios from "axios";

export default function Register() {

  let navigate = useNavigate()

  let name = useRef("")
  let email = useRef("")
  let photo = useRef("")
  let password = useRef("")

  function alertSoon(){
    Swal.fire({
      text: 'We are having problems, this option is available soon!',
      width: 600,
      padding: '3em'
    })
  }

  async function handleFormSubmit(event){
    
    event.preventDefault()

    let data = {
      name: name.current.value,
      email: email.current.value,
      photo: photo.current.value,
      password: password.current.value
    }
    console.log(data)
    
      await api.post(apiUrl + endpoints.register, data)
      .then(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'New user creation successful',
          showConfirmButton: false,
          timer: 1500
      })
      navigate('/login')
      })
      .catch(error => {
      const err = error.response.data.messages
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err
      })
    })
  }

  //GOOGLE AUTH
  //GOOGLE AUTH
  //GOOGLE AUTH

  let clientID = '379114387233-5q8uml6qbhosqgjg95n958ip163d09if.apps.googleusercontent.com'

  useEffect(() => {
    let start = () => {
      gapi.auth2.init({
        clientId: clientID
      })
    }

    gapi.load("client:auth2", start)
  }, [])

  let onSuccess = (response) => {
    console.log(response)
    let { name, email, imageUrl, googleId } = response.profileObj;
    let data = {
      name: name,
      email: email,
      photo: imageUrl,
      password: googleId,
    }
    axios.post("http://localhost:8080/api/auth/register", data)
      .then(res => {
        Swal.fire({
          icon: "success",
          title: "User registered successfully!",
        });
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: err.response.data.message,
        })
      })

  }

  let onFailure = () => {
    console.log("Something went wrong");
  }

    return (
      <>
        <div className="flex w- h-screen items-center justify-center bg-gray-200">
          <div className="w-full h-full shrink-0 flex flex-col justify-center items-center bg-gray-200">
          <p className="text-[#1F1F1F] text-center text-[32px] not-italic font-bold leading-[normal] tracking-[1.6px]">Welcome to <span className="flex text-[#ff5757]">FastCommerce!</span> </p>
            {/*<p className="w-[80%] md:w-[50%] text-black text-center text-2xl not-italic font-semibold leading-[normal] tracking-[0.6px] mt-3">Your Future Best Store!.</p>*/}
            <form onSubmit={handleFormSubmit} method="POST" className="w-full">
              <div className="w-full mt-8 mr-0 mb-0 ml-0 space-y-8 flex flex-col items-center">
              <div>
                <p className=" pt-0 pr-2 pb-0 pl-2 mr-0 mb-0 ml-2 not-italic text-[21px] font-normal leading-[normal] tracking-[0.6px] text-[#ff5757]">Name</p>
                  <input ref={name} placeholder="Put Your Name Here" id="name" name="name" type="text" required className="border placeholder-gray-300 pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                      rounded-[10px] border-solid border-[rgba(31,31,31,0.50)] w-[70vw] md:w-[30vw] h-12 shrink-0"/>
                </div>
                <div>
                <p className=" pt-0 pr-2 pb-0 pl-2 mr-0 mb-0 ml-2 not-italic text-[21px] font-normal leading-[normal] tracking-[0.6px] text-[#ff5757]">Email</p>
                  <input ref={email} placeholder="Put Your Email Here" id="email" name="email" type="email" required className="border placeholder-gray-300 pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                      rounded-[10px] border-solid border-[rgba(31,31,31,0.50)] w-[70vw] md:w-[30vw] h-12 shrink-0"/>
                </div>
                <div>
                  <p className=" pt-0 pr-2 pb-0 pl-2 mr-0 mb-0 ml-2 not-italic text-[21px] font-normal leading-[normal] tracking-[0.6px] text-[#ff5757]">Photo</p>
                  <input ref={photo} placeholder="Photo Url" id="photo" name="photo" type="text" required className="border placeholder-gray-300 pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                      rounded-[10px] border-solid border-[rgba(31,31,31,0.50)] w-[70vw] md:w-[30vw] h-12 shrink-0"/>
                </div>
                <div>
                  <p className=" pt-0 pr-2 pb-0 pl-2 mr-0 mb-0 ml-2 not-italic text-[21px] leading-[normal] tracking-[0.6px] text-[#ff5757]">Password</p>
                  <input ref={password} placeholder="Put Your Password Here" id="password" name="password" type="password" required className="border placeholder-gray-300 pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                      rounded-[10px] border-solid border-[rgba(31,31,31,0.50)] w-[70vw] md:w-[30vw] h-12 shrink-0"/>
                </div>

                <div className="flex w-[70vw] md:w-[30vw] h-12 flex-col justify-center shrink-0 bg-[#ff5757] rounded-[10px]">
                  <Anchor onClick={handleFormSubmit} className="text-[#FAFCFC] text-center text-[21px] not-italic font-bold leading-[normal] tracking-[0.7px]">Sign Up</Anchor>
                </div>
                <GoogleLogin
                    className="w-[70vw] md:w-[30vw] h-12 shrink-0 border rounded-[10px] bg-blue-500 border-solid border-[#ff5757] flex justify-center items-center"
                    clientId={clientID}
                    buttonText="Sign up with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={"single_host_policy"}
                />
                <p className="text-[#1F1F1F] text-[21px] not-italic font-medium leading-[normal] tracking-[0.7px]">Already have an account? <Anchor to={'/login'} className="text-[#ff5757]">Log in</Anchor></p>
                <p className="text-[#1F1F1F] text-[21px] not-italic font-medium leading-[normal] tracking-[0.7px]">Go back to <Anchor to={'/'} className="text-[#ff5757]">home page</Anchor></p>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }