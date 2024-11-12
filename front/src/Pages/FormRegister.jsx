import { useState } from "react";
import country from "../helpers/country";
import Dropdown from '../Components/Dropdown';
import InputField from "../Components/InputField";
import { Link } from 'react-router-dom';
import { routeList } from "../helpers/routeList";
import { useUser } from "../hooks/useUser";


const FormRegister = () => {

  const { register } = useUser();
  const defaultValue = { email: '', password: '', passwordRepeat: '', firstName: '', lastName: '', phone: '', country: '' };
  const [form, setForm] = useState(defaultValue);
  const [errors, setErrors] = useState(defaultValue);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCountrySelect = (country) => {
    setForm((prev) => ({
      ...prev,
      country: country,
    }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = { firstName: '', lastName: '', email: '', phone: '', password: '', passwordRepeat: '', country: '' };

    if (!form.firstName) {
      newErrors.firstName = 'El nombre es obligatorio';
      valid = false;
    }
    
    if (form.firstName.trim().length < 3) {
      newErrors.firstName = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!form.lastName) {
      newErrors.lastName = 'El apellido es obligatorio';
      valid = false;
    }

    if (form.lastName.trim().length < 3) {
      newErrors.lastName = 'El apellido debe tener al menos 3 caracteres';
    }

    if (!form.country) {
      newErrors.country = 'El pais es obligatorio';
      valid = false;
    }
   
    const phoneRegex = /^[0-9]{7,12}$/;
    if (!form.phone) {
      newErrors.phone = 'El numero de telefono es obligatorio'
      valid = false;

    } else if (!phoneRegex.test(form.phone)) {
      newErrors.phone = 'el numero de telefono debe tener minimo 7 digitos'
      valid = false;

    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
    if (form.password !== form.passwordRepeat) {
      newErrors.passwordRepeat = 'Las contraseñas no coinciden';
      valid = false;
    } else if (form.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
      valid = false;
    } else if (!/[A-Z]/.test(form.password)) {
      newErrors.password = 'La contraseña debe tener al menos una letra mayúscula';
      valid = false;
    } else if (!/[a-z]/.test(form.password)) {
      newErrors.password = 'La contraseña debe tener al menos una letra minúscula';
      valid = false;
    } else if (!/[!_@#$%^&*(),.?":{}|<>]/.test(form.password)) {
      newErrors.password = 'La contraseña debe tener al menos un símbolo';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await register(form.firstName, form.lastName, form.email, form.phone, form.password, form.passwordRepeat, form.country);
    }
  };

  return (
    <div className="animate-fadeIn  w-full mx-auto">
      <div className="flex flex-col items-center justify-center p-6">
        <Link to={routeList.HOME}>
          <div className="w-full max-w-md text-center mb-6">
            <img
              src="/Icons/logoSvg.svg"
              alt="logo"
              className="mx-auto"
              style={{ width: '230px', height: '113.37px' }}
            />
          </div>
        </Link>

        {/* Form */}
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold font-monserrat" style={{ color: 'var(--primary-color)' }}>Crea una Cuenta</h2>
            <p className="text-xl mb-4" style={{ color: "#383737" }}>Es fácil y rápido</p>
            <hr className="w-full border-t-2 border-gray-300 mb-6" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-6 flex flex-col sm:flex-row sm:space-x-6">
              <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                <div className="flex flex-col">
                  <InputField
                    name="firstName"
                    placeholder="Nombre"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
              </div>

              <div className="w-full sm:w-1/2">
                <div className="flex flex-col">
                  <InputField
                    name="lastName"
                    placeholder="Apellido"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <InputField
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-[#A9AEB9] rounded p-2.5 font-normal text-black"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>


            <div className="mb-6 flex flex-col sm:flex-row sm:space-x-6">
              <div className="flex flex-col flex-1 mb-4 sm:mb-0">
                <InputField
                  name="phone"
                  placeholder="Número de teléfono"
                  value={form.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>


              <div className="flex flex-col flex-1 text-black">
                <Dropdown
                  options={country}
                  placeholder="País"
                  onSelect={handleCountrySelect}
                />
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
              </div>
            </div>


            <div className="mb-6">
              <InputField
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-[#A9AEB9] rounded p-2.5 font-normal text-black"

              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="mb-6">
              <InputField
                type="password"
                name="passwordRepeat"
                placeholder="Confirma tu contraseña"
                value={form.passwordRepeat}
                onChange={handleChange}
                className="w-full border border-[#A9AEB9] rounded p-2.5 font-normal text-black"
              />
              {errors.passwordRepeat && <p className="text-red-500 text-sm mt-1">{errors.passwordRepeat}</p>}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="py-2 px-6 rounded-lg font-bold bg-secondary-color text-background-dark  "
              >
                Registrarse
              </button>
            </div>
            <div className="flex justify-center  ">
              <Link to={routeList.LOGIN} className="text-[#0C1123]" style={{ marginBottom: '2rem' }}>
                ¿Ya tienes una Cuenta?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default FormRegister;
