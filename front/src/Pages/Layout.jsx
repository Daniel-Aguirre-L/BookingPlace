import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

// className="grid min-h-screen grid-rows-[auto 1fr auto]"
// style={{ display: "grid", gridTemplateRows: "auto 1fr auto", minHeight: "100vh" }}
const Layout = () => {
  return (
    <div className="flex flex-col justify-center">
      <Navbar />
      <main className="self-center max-w-[1600px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
