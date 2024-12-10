import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import InputField from "./InputField"
import { useState } from "react";
import { routeList } from "../helpers/routeList";

const defaultValue = {email:'', password:''}
const LoginForm = ({onLogin = () => {}}) => {

    const { login }= useUser();
  const navigate = useNavigate();
  
  const [form, setForm] = useState(defaultValue)
  const [errors, setErrors] = useState(defaultValue);
  
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
    } 

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await login(form.email, form.password, onLogin);
    }
  };
  
    return (
        <form onSubmit={handleSubmit} className="md:mx-0 mx-auto md:my-0 flex flex-col bg-white rounded-2xl p-6 gap-2.5 text-center max-w-md">
            <InputField
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
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
            <Link to={routeList.HOME} className="text-[#0C1123]" >¿Olvidaste tu contraseña?</Link>
            <hr className="md:w-96 w-10/12 my-5 mx-auto"/>
            <button type="button" 
              className="my-0 mx-auto max-w-64 bg-[#FBFFBD] py-2.5 px-5 md:px-16 text-[#0C1123] rounded-lg"
              onClick={()=>navigate(routeList.REGISTER)}
            >
              Registrarse
            </button>
          </form>
    
    )

}

export default LoginForm