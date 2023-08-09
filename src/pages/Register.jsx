import { useRef } from "react"
import { api, apiUrl, endpoints } from "../utils/api.js"
import { Link as Anchor , useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

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

    return (
      <>
        <div className="flex w- h-screen items-center justify-center bg-gray-300">
          <div className="w-full h-full shrink-0 flex flex-col justify-center items-center bg-gray-300">
          <p className="text-[#1F1F1F] text-center text-[32px] not-italic font-bold leading-[normal] tracking-[1.6px]">Welcome to <span className="flex text-[rgb(92,110,141)]">FastCommerce!</span> </p>
            <p className="w-[80%] md:w-[50%] text-black text-center text-2xl not-italic font-semibold leading-[normal] tracking-[0.6px] mt-3">Your Future Best Store!.</p>
            <form onSubmit={handleFormSubmit} method="POST" className="w-full">
              <div className="w-full mt-8 mr-0 mb-0 ml-0 space-y-8 flex flex-col items-center">
              <div>
                <p className=" pt-0 pr-2 pb-0 pl-2 mr-0 mb-0 ml-2 not-italic text-[21px] font-normal leading-[normal] tracking-[0.6px] text-xs text-[rgb(92,110,141)]">Name</p>
                  <input ref={name} placeholder="Put Your Name Here" id="name" name="name" type="text" required className="border placeholder-gray-300 pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                      rounded-[10px] border-solid border-[rgba(31,31,31,0.50)] w-[70vw] md:w-[30vw] h-12 shrink-0"/>
                </div>
                <div>
                <p className=" pt-0 pr-2 pb-0 pl-2 mr-0 mb-0 ml-2 not-italic text-[21px] font-normal leading-[normal] tracking-[0.6px] text-xs text-[rgb(92,110,141)]">Email</p>
                  <input ref={email} placeholder="Put Your Email Here" id="email" name="email" type="email" required className="border placeholder-gray-300 pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                      rounded-[10px] border-solid border-[rgba(31,31,31,0.50)] w-[70vw] md:w-[30vw] h-12 shrink-0"/>
                </div>
                <div>
                  <p className=" pt-0 pr-2 pb-0 pl-2 mr-0 mb-0 ml-2 not-italic text-[21px] font-normal leading-[normal] tracking-[0.6px] text-xs text-[rgb(92,110,141)]">Photo</p>
                  <input ref={photo} placeholder="Photo Url" id="photo" name="photo" type="text" required className="border placeholder-gray-300 pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                      rounded-[10px] border-solid border-[rgba(31,31,31,0.50)] w-[70vw] md:w-[30vw] h-12 shrink-0"/>
                </div>
                <div>
                  <p className=" pt-0 pr-2 pb-0 pl-2 mr-0 mb-0 ml-2 not-italic text-[21px] leading-[normal] tracking-[0.6px] text-xs text-[rgb(92,110,141)]">Password</p>
                  <input ref={password} placeholder="Put Your Password Here" id="password" name="password" type="password" required className="border placeholder-gray-300 pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                      rounded-[10px] border-solid border-[rgba(31,31,31,0.50)] w-[70vw] md:w-[30vw] h-12 shrink-0"/>
                </div>

                <div className="flex w-[70vw] md:w-[30vw] h-12 flex-col justify-center shrink-0 bg-[rgb(92,110,141)] rounded-[10px]">
                  <Anchor onClick={handleFormSubmit} className="text-[#FAFCFC] text-center text-[21px] not-italic font-bold leading-[normal] tracking-[0.7px]">Sign Up</Anchor>
                </div>
                <div className="w-[70vw] md:w-[30vw] h-12 shrink-0 border rounded-[10px] border-solid border-[rgb(92,110,141)] flex justify-center items-center">
                  <img src="/google.png" className="w-6 h-6 shrink-0" />
                  <Anchor onClick={alertSoon} className="ms-2 text-[#1F1F1F] text-center text-[21px] not-italic font-medium leading-[normal] tracking-[0.7px]">Sign in with Google</Anchor>
                </div>
                <p className="text-[#1F1F1F] text-[21px] not-italic font-medium leading-[normal] tracking-[0.7px]">Already have an account? <Anchor to={'/login'} className="text-[rgb(92,110,141)]">Log in</Anchor></p>
                <p className="text-[#1F1F1F] text-[21px] not-italic font-medium leading-[normal] tracking-[0.7px]">Go back to <Anchor to={'/'} className="text-[rgb(92,110,141)]">home page</Anchor></p>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }