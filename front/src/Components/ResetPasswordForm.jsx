import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import InputField from "./InputField"
import { useState } from "react";
import { routeList } from "../helpers/routeList";

const defaultValue = { email: '' }
const ResetPasswordForm = () => {

  const { resetPassword } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState(defaultValue)
  const [errors, setErrors] = useState(defaultValue);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const validate = () => {
    let valid = true;
    const newErrors = { email: '' };

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!form.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
      valid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'El correo electrónico no es válido';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await resetPassword(form.email);
      setSuccess(true);

    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit} className="md:mx-0 mx-auto md:my-0 flex flex-col bg-white rounded-2xl p-6 gap-2.5 text-center max-w-md">
          <InputField
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
          />
          {errors.email && <p className="text-red-500 text-xs text-start">{errors.email}</p>}
          <button type="submit" className="bg-secondary-color text-dark-text rounded-lg py-2.5 px-5">Restaurar contraseña</button>
          <hr className="md:w-96 w-10/12 my-5 mx-auto" />
          <button type="button"
            className="bg-[#088395] text-[#EEEEEE] rounded-lg py-2.5 px-5"
            onClick={() => navigate(routeList.LOGIN)}
          >
            Iniciar sesión
          </button>
          <button type="button"
            className="bg-[#088395] text-[#EEEEEE] rounded-lg py-2.5 px-5"
            onClick={() => navigate(routeList.REGISTER)}
          >
            Registrarse
          </button>
        </form>
      ) : (
        <div className="md:mx-0 mx-auto md:my-0 flex flex-col bg-white text-dark-text rounded-2xl p-6 gap-2.5 text-center max-w-md">
          <h2 className="text-2xl montserrat" >Correo de verificación enviado</h2>
          <p className="text-lg" >Por favor revisa en tu correo electrónico la bandeja de entrada o la carpeta de correo no deseado. Te hemos enviado los pasos a seguir para restablecer tu contraseña.</p>
        </div>
      )
      }
    </>
  )
}

export default ResetPasswordForm