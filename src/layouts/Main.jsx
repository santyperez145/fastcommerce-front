//Acá se deben importar los componentes que se repiten en todas las vistas
import Footer from "../components/Footer"
import NavBarNew from "../components/NavBarNew"

import { Outlet } from "react-router-dom"

export default function Main(){
    return (
      <>
          <div className="flex-col min-h-screen w-full justify-between items-center">
              <NavBarNew />
              <Outlet />
          </div>
          <Footer />
      </>
    )
}