import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

// className="grid min-h-screen grid-rows-[auto 1fr auto]"
// style={{ display: "grid", gridTemplateRows: "auto 1fr auto", minHeight: "100vh" }}
const AdminLayout = () => {
  return (
    <>
    <div className="hidden lg:flex w-full" >
      <div className="w-full flex flex-col justify-items-start items-center">
        <Outlet />
      </div>
    </div>
    <div className="lg:hidden w-full h-[80vh] flex justify-center items-center flex-col gap-5 p-3" >
      <h1 className="text-3xl text-center font-montserrat " >No puede acceder al panel de administración desde un dispositivo móvil</h1>
      <h2 className="text-2xl text-center text-secondary-color">Ingrese desde una computadora</h2>
      
    </div>
    </>
    
  );
};

export default AdminLayout;
