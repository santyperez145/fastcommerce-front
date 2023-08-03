import { useRef } from "react"
import { api, apiUrl, endpoints } from "../utils/api.js"
import { Link as Anchor , useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"

export default function Register() {

  let navigate = useNavigate()

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
      email: email.current.value,
      photo: photo.current.value,
      password: password.current.value
    }
    console.log(data)
    
      api.post(apiUrl + endpoints.register, data)
      .then(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'New user creation successful',
          showConfirmButton: false,
          timer: 1500
      })
      navigate('/signin')
      })
      .catch(error => {
      const err = error.response.data.messages
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err || 'This email is already registered'
      })
    })
  }

    return (
      <>
        <div className="flex w-full h-[100vh] items-center justify-center">
          <div className="w-full md:w-[50%] h-[640px] shrink-0 flex flex-col justify-center items-center bg-white">
          <p className="text-[#1F1F1F] text-center text-[32px] not-italic font-semibold leading-[normal] tracking-[1.6px]">Welcome!</p>
            <p className="w-[80%] md:w-[50%] text-[rgba(31,31,31,0.75)] text-center text-xs not-italic font-semibold leading-[normal] tracking-[0.6px] mt-3">Discover manga, manhua and manhwa, track your progress, have fun, read manga.</p>
            <form onSubmit={handleFormSubmit} method="POST" className="w-full">
              <div className="w-full mt-8 mr-0 mb-0 ml-0 space-y-8 flex flex-col items-center">
                <div>
                <p className="bg-white pt-0 pr-2 pb-0 pl-2 mr-0 mb-0 ml-2 not-italic font-normal leading-[normal] tracking-[0.6px] text-xs text-[color:var(--primary-two-design,#F97316)]">Email</p>
                  <input ref={email} placeholder="DragonballZ@Krowl.com" id="email" name="email" type="email" required className="border placeholder-gray-300 pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                      rounded-[10px] border-solid border-[rgba(31,31,31,0.50)] w-[70vw] md:w-[30vw] h-12 shrink-0"/>
                </div>
                <div>
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 mr-0 mb-0 ml-2 not-italic font-normal leading-[normal] tracking-[0.6px] text-xs text-[color:var(--primary-two-design,#F97316)]">Photo</p>
                  <input ref={photo} placeholder="Url" id="photo" name="photo" type="text" required className="border placeholder-gray-300 pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                      rounded-[10px] border-solid border-[rgba(31,31,31,0.50)] w-[70vw] md:w-[30vw] h-12 shrink-0"/>
                </div>
                <div>
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 mr-0 mb-0 ml-2 not-italic font-normal leading-[normal] tracking-[0.6px] text-xs text-[color:var(--primary-two-design,#F97316)]">Password</p>
                  <input ref={password} placeholder="Password" id="password" name="password" type="password" required className="border placeholder-gray-300 pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                      rounded-[10px] border-solid border-[rgba(31,31,31,0.50)] w-[70vw] md:w-[30vw] h-12 shrink-0"/>
                </div>
                <div className="flex items-center justify-start w-[70vw] md:w-[30vw]">
                  <input type="checkbox" className="border rounded-[10px] border-solid border-[#1F1F1F]" />
                  <label className="text-[#1F1F1F] text-xs ms-2 not-italic font-normal leading-[normal] tracking-[0.6px]">Send notification to my email</label>
                </div>
                <div className="flex w-[70vw] md:w-[30vw] h-12 flex-col justify-center shrink-0 bg-[color:var(--primary-two-design,#F97316)] rounded-[10px]">
                  <Anchor onClick={handleFormSubmit} className="text-[#FAFCFC] text-center text-sm not-italic font-bold leading-[normal] tracking-[0.7px]">Sign Up</Anchor>
                </div>
                <div className="w-[70vw] md:w-[30vw] h-12 shrink-0 border rounded-[10px] border-solid border-[#1F1F1F] flex justify-center items-center">
                  <img src="/google.png" className="w-6 h-6 shrink-0" />
                  <Anchor onClick={alertSoon} className="ms-2 text-[#1F1F1F] text-center text-sm not-italic font-medium leading-[normal] tracking-[0.7px]">Sign in with Google</Anchor>
                </div>
                <p className="text-[#1F1F1F] text-sm not-italic font-medium leading-[normal] tracking-[0.7px]">Already have an account? <Anchor to={'/signin'} className="text-[color:var(--primary-two-design,#F97316)]">Log in</Anchor></p>
                <p className="text-[#1F1F1F] text-sm not-italic font-medium leading-[normal] tracking-[0.7px]">Go back to <Anchor to={'/'} className="text-[color:var(--primary-two-design,#F97316)]">home page</Anchor></p>
              </div>
            </form>
          </div>
          <div className="hidden md:flex md:w-1/2 xl:w-2/3 2xl:w-3/4 h-full bg-cover bg-[url('/fondoForm.png')]"></div>
        </div>
      </>
    );
  }