import { useState } from "react";
import  country from "../helpers/country";

const MyProfile = () => {

  // const defaultValue = { email: '', password: '', repeatPassword: '', name: '', surname: '', phone: '', country: '' };
  const defaultValue = { email: 'admin@admin.com', password: '', repeatPassword: '', name: 'admin', surname: 'admin', phone: '1234567890', country: 'Colombia' };
  const [form, setForm] = useState(defaultValue);
  const [errors, setErrors] = useState(defaultValue);

  // console.log(countryList);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = defaultValue;

    if (form.name.trim().length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }

    if (form.surname.trim().length < 3) {
      newErrors.surname = 'El apellido debe tener al menos 3 caracteres';
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!form.phone) {
      newErrors.phone = 'El numero de telefono es obligatorio'
      valid = false;

    } else if (!phoneRegex.test(form.phone)) {
      newErrors.phone = 'el numero de telefono debe tener 10 digitos'
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

    if (!form.country) {
      newErrors.country = 'El país es obligatorio'
      valid = false;
    }

    if (form.password) {
      if (form.password !== form.repeatPassword) {
        newErrors.repeatPassword = 'Las contraseñas no coinciden';
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
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) {
        newErrors.password = 'La contraseña debe tener al menos un símbolo';
        valid = false;
      }
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // await register(form.firstName, form.lastName, form.email, form.phone, form.password, form.passwordRepeat, form.country);
      console.log("envia formulario");
    }else{
      console.error("Verificar datos");
    }
  };


  return (
    <section className="w-full animate-fadeIn " >
      <h2 className="montserrat text-primary-color text-3xl md:text-[33px] font-bold mb-4" >Perfil</h2>
      <form className="w-full" onSubmit={handleSubmit} >
        <div className="w-full bg-light-text rounded-2xl px-6 py-8 mb-6" >
          <fieldset className="w-full flex flex-col mb-8" >
            <label htmlFor="name" className="montserrat text-background-dark font-normal cursor-pointer"  >Nombre</label>
            <input
              className="border-0 bg-transparent cursor-pointer focus:outline-none focus:border-b focus:border-b-primary-color montserrat text-background-dark text-xl font-semibold capitalize"
              name="name"
              id="name"
              placeholder="Nombre"
              type="text"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </fieldset>
          <fieldset className="w-full flex flex-col mb-8" >
            <label htmlFor="surname" className="montserrat text-background-dark font-normal cursor-pointer"  >Apellido</label>
            <input
              className="border-0 bg-transparent cursor-pointer focus:outline-none focus:border-b focus:border-b-primary-color montserrat text-background-dark text-xl font-semibold capitalize"
              name="surname"
              id="surname"
              placeholder="Apellido"
              type="text"
              value={form.surname}
              onChange={handleChange}
            />
            {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname}</p>}
          </fieldset>
          <fieldset className="w-full flex flex-col mb-8" >
            <label htmlFor="phone" className="montserrat text-background-dark font-normal cursor-pointer"  >Teléfono</label>
            <input  
              className="border-0 bg-transparent cursor-pointer focus:outline-none focus:border-b focus:border-b-primary-color montserrat text-background-dark text-xl font-semibold"
              name="phone"
              id="phone"
              placeholder="6012345678"
              type="text"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </fieldset>
          <fieldset className="w-full flex flex-col mb-8" >
            <label htmlFor="country" className="montserrat text-background-dark font-normal cursor-pointer"  >País</label>
            <select 
              className="relative -left-[5px] bg-transparent cursor-pointer focus:outline-none focus:border-b focus:border-b-primary-color montserrat text-background-dark text-xl font-semibold"
              name="country" 
              id="country" 
              value={form.country}
              onChange={handleChange}
            >
              {
                country.map((country) => (
                  <option 
                    className="text-white bg-primary-color"
                    key={country} 
                    value={country}
                  >
                    {country}
                  </option>
                ))
              }
            </select>
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </fieldset>
          <fieldset className="w-full flex flex-col mb-8" >
            <label htmlFor="password" className="montserrat text-background-dark font-normal cursor-pointer"  >Contraseña</label>
            <input
              className="border-0 bg-transparent cursor-pointer focus:outline-none focus:border-b focus:border-b-primary-color montserrat text-background-dark text-xl font-semibold"
              name="password"
              id="password"
              placeholder="****************"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </fieldset>
          <fieldset className="w-full flex flex-col" >
            <label htmlFor="repeatPassword" className="montserrat text-background-dark font-normal cursor-pointer"  >Confirmar contraseña</label>
            <input
              className="border-0 bg-transparent cursor-pointer focus:outline-none focus:border-b focus:border-b-primary-color montserrat text-background-dark text-xl font-semibold"
              name="repeatPassword"
              id="repeatPassword"
              placeholder="****************"
              type="password"
              value={form.repeatPassword}
              onChange={handleChange}
            />
            {errors.repeatPassword && <p className="text-red-500 text-sm mt-1">{errors.repeatPassword}</p>}
          </fieldset>
        </div>
        <div className="w-full flex justify-end mb-16" >
          <button
            type="submit"
            className="py-2 px-6 rounded-lg font-medium bg-primary-color  "
          >
            Guardar
          </button>
        </div>
      </form>
    </section>
  )
}

export default MyProfile