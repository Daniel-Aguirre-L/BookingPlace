
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
      <div className="max-w-[1600px] flex w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;