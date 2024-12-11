
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Layout = () => {

  return (
    <div className="flex flex-col items-center w-screen">
      <header className="w-full sticky top-0 bg-opacity-70 bg-background-dark z-50 max-w-[1600px]">
        <Navbar />
      </header>
      <main className="flex w-full max-w-[1600px] min-h-[calc(100vh-315px)]">
        <Outlet />
      </main>
      <a href="https://wa.me/+59899391130" target="_blank"><img src="/Icons/Whatsapp.svg" alt="" className="fixed bottom-5 left-5 size-10 drop-shadow opacity-80 hover:opacity-100"/></a>
      <div className="max-w-[1600px] flex w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;