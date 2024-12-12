import { Link, Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { routeList } from "../helpers/routeList";
import ResetPasswordForm from "../Components/ResetPasswordForm";


const ForgotPasswordPage = () => {
    const { isLoggedIn } = useUser();
	return (
		<>
      <section className="animate-fadeIn flex flex-col md:flex-row md:flex-row min-h-calc-100vh-minus-245 items-center md:gap-14 font-semibold my-6 mx-3" >
        <div className="flex-1 justify-items-end">
          <article className="max-w-400 text-2xl">
            <Link to={routeList.HOME}>
              <img src="/Icons/logoSvg.svg" className="mb-4 w-60 mx-auto md:mx-0" alt="Logo"  />
            </Link>
            <p>Rustik te conecta con la naturaleza y te permite compartir momentos inolvidables en cabañas únicas.</p>
          </article>
        </div>
        <article  className="flex-1 w-full">
        {isLoggedIn && <Navigate to={routeList.HOME} />}
          <ResetPasswordForm />
        </article>
      </section>
		</>
	)
}

export default ForgotPasswordPage