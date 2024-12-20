import { Link } from "react-router-dom";
import { routeList } from "../helpers/routeList";

const Footer = () => {
  return (
    <footer className="bg-slate-50 w-full ">
      <section className="bg-[#088395] text-center flex justify-center flex-col gap-7 px-2.5 py-5 text-[#EEEEEEEE]">
      <div className="max-w-100 mx-auto my-0">
        <Link to={routeList.HOME}>
            <img
              src="/Icons/shortlogo.svg"
              alt="logo footer"
              className="mx-auto my-0"
            />
          </Link>
        </div>
        <div className="flex justify-center gap-5">
            <a target="_blank" href="https://instagram.com"><img src="/Icons/Vector.svg" alt="instagram" /></a>
            <a target="_blank"  href="https://facebook.com"><img src="/Icons/Vector(1).svg" alt="facebook" /></a>
            <a target="_blank" href="https://x.com"><img src="/Icons/Vector(2).svg" alt="x" /></a>
        </div>
        <div className="flex justify-center gap-12">
          <span>Sobre Nosotros</span>
          <span>Contáctanos</span>
        </div>
        <p>Copyright @2024 digitalhouse proyecto integrador</p>
      </section>
    </footer>
  );
};

export default Footer;
