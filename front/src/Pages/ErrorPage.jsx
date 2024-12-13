import { routeList } from "../helpers/routeList";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
      <div
        id="main-container"
        className="mx-auto bg-teal-600 max-w-4xl w-full rounded-2xl text-center transform scale-90 shadow-lg"
      >
        <div
          id="header"
          className="bg-cover bg-center w-full h-40 rounded-t-2xl"
          style={{
            backgroundImage: "url(https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968034/fondo_email_kdwqsa.png)",
          }}
        >
          <img
            id="logo-top"
            className="pt-10 mx-auto "
            src="https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968360/rustikwhite_eytcbr.png"
            alt="Rustik"
          />
        </div>
  
        <div
          id="content"
          className="relative -top-8 mx-auto bg-gray-100 text-teal-900 w-full max-w-3xl pt-5 pb-10 rounded-2xl shadow-md font-sans"
        >
          <h2 id="greeting" className="text-center text-xl text-teal-600 m-0 px-5">
            Oops! Parece ser que te has perdido!
          </h2>
          <p id="message" className="text-lg text-center mt-2">
            Página no encontrada
          </p>
          <img
            src="/img/404error.png"
            alt="404error"
            className="w-full"
          />
          <br />
          <Link to={routeList.HOME}
            id="reservation-button"
            className="bg-secondary-color text-teal-900 border-none px-8 py-3 rounded-lg text-lg cursor-pointer shadow-md transition-all hover:bg-yellow-300"
          >
            Volver al inicio
          </Link>

        </div>
  
        <div id="footer" className="pb-8">
          <img
            id="logo-bottom"
            src="https://res.cloudinary.com/dmu6eqzqy/image/upload/v1733968007/RKshort_tb6jga.png"
            alt="Rustik"
            className="h-8 mx-auto"
          />
        
        </div>
      </div>
    );
  };
  
  export default ErrorPage;
  