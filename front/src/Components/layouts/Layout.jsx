import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Layout = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-screen">
      <header
        className={`w-full sticky top-0 ${
          isAtTop ? "bg-opacity-0 scale-[1.02]" : "bg-opacity-85"
        } bg-background-dark z-50 max-w-[1600px] transition-all ease-linear duration-300`}
      >
        <Navbar />
      </header>
      <main className="flex w-full max-w-[1600px] min-h-[calc(100vh-315px)]">
        <Outlet />
      </main>
      <a
        href="https://wa.me/+59899391130"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/Icons/Whatsapp.svg"
          alt="WhatsApp Icon"
          className="fixed bottom-5 left-5 size-10 drop-shadow opacity-80 hover:opacity-100"
        />
      </a>
      <div className="flex w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
