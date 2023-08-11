//Acá se deben importar los componentes que se repiten en todas las vistas
import Footer from "../components/Footer"
import NavBarNew from "../components/NavBarNew"

import { Outlet } from "react-router-dom"

export default function Main(){
    return (
      <>
          <div className="flex-col min-h-[100vh] w-full justify-between items-center bg-gray-200">
              <NavBarNew />
              <Outlet />
          </div>
          <Footer />
      </>
    )
}