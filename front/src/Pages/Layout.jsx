import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

// className="grid min-h-screen grid-rows-[auto 1fr auto]"
// style={{ display: "grid", gridTemplateRows: "auto 1fr auto", minHeight: "100vh" }}
const Layout = () => {
    return (
        <div className='grid grid-rows-[auto_1fr_auto] min-h-screen max-w-[1440px] mx-auto'>
          <header className="w-full" >
            <Navbar />
          </header>
          <main className="w-full" >
            <Outlet />
          </main>
          <footer className="w-full" >
            <Footer />
          </footer>
        </div>
    )
}

export default Layout;