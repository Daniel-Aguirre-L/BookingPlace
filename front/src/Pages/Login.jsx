import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import InputField from "../Components/InputField";
import { useUser } from "../hooks/useUser";
import { routeList } from "../helpers/routeList";
import LoaderModal from "../Components/loaders/LoaderModal";

const defaultValue = {email:'', password:''}

const LoginPage = () => {
  
  const { isLoggedIn, login }= useUser();
  const navigate = useNavigate();
  
  const [form, setForm] = useState(defaultValue)
  const [errors, setErrors] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!form.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
      valid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'El correo electrónico no es válido';
      valid = false;
    }

    if (!form.password) {
      newErrors.password = 'La contraseña es obligatoria';
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (validate()) {
      login(form.email, form.password);
    }
    setIsLoading(false);
  };

  if (isLoggedIn) {
    navigate(routeList.HOME);
  }

	return (
		<div className="max-w-[1600px] mx-auto">
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
          <form onSubmit={handleSubmit} className="md:mx-0 mx-auto md:my-0 flex flex-col bg-white rounded-2xl p-6 gap-2.5 text-center max-w-md">
            <InputField
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Correo electrónico o número de teléfono"
            />
             {errors.email && <p className="text-red-500 text-xs text-start">{errors.email}</p>}
            <InputField
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Contraseña"
            />
            {errors.password && <p className="text-red-500 text-xs text-start">{errors.password}</p>}
            <button type="submit" className="bg-[#088395] text-[#EEEEEE] rounded-lg py-2.5 px-5">Iniciar sesión</button>
            <Link to="/" className="text-[#0C1123]" >¿Olvidaste tu contraseña?</Link>
            <hr className="md:w-96 w-10/12 my-5 mx-auto"/>
            <button type="button" className="my-0 mx-auto max-w-64 bg-[#FBFFBD] py-2.5 px-5 md:px-16 text-[#0C1123] rounded-lg">Registrarse</button>
          </form>
        </article>
      </section>
      
      <div className="flex w-full">
        <Footer />
      </div>
      
      { isLoading && <LoaderModal /> }  

		</div>
	)
}

export default LoginPage;