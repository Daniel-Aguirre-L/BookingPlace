import { useEffect, useState } from "react";
import  country from "../helpers/country";
import { rustikApi } from "../services/rustikApi";
import { rustikEndpoints } from "../services/rustkEndPoints";
import { useNavigate } from "react-router-dom";
import { routeList } from "../helpers/routeList";
import useLoaderModalStore from "../store/useLoaderModalStore";
import useNotificationStore from "../store/useNotificationStore";
import { useUser } from "../hooks/useUser";

const MyProfile = () => {

  const { setNotification } = useNotificationStore();
  const { showLoaderModal, hideLoaderModal } = useLoaderModalStore();
  const { logout, onRefreshLoggedUser, refreshLoggedUser } = useUser();  
  const navigate = useNavigate();

  const defaultValue = { id: 0, email: '', password: '', repeatPassword: '', name: '', surname: '', phone: '', country: '' };
  //const defaultValue = { email: 'admin@admin.com', password: '', repeatPassword: '', name: 'admin', surname: 'admin', phone: '1234567890', country: 'CO' };
  const [form, setForm] = useState(defaultValue);
  const [errors, setErrors] = useState(defaultValue);

  useEffect(() => {
    const apicall = async () => {
      showLoaderModal();
      try {
        const { data } = await rustikApi.get(`${rustikEndpoints.myUser}`);
        setForm({
          id: data.id, email: data.email, password: '', repeatPassword: '', name: data.name, surname: data.surname, phone: data.phone, country: data.country
        });
      } catch (error) {
        if (error.status >= 400 && error.status < 500 ) {
          setNotification({
            visibility: true,
            type: "error",
            text: `Error al cargar datos de usuario inicie sesión nuevamente`,
          });
          logout();
        }
        else{
          console.error("Error al llamar a la api", error);
          setNotification({
            visibility: true,
            type: "error",
            text: `Error al cargar datos de usuario intente más tarde`,
          });
          navigate(`${routeList.HOME}`);
        }
      }finally{
        hideLoaderModal();
      }
    };
    apicall();
  
  }, [])
  

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

    const phoneRegex = /^[0-9]{7,12}$/;
    if (!form.phone) {
      newErrors.phone = 'El numero de telefono es obligatorio'
      valid = false;

    } else if (!phoneRegex.test(form.phone)) {
      newErrors.phone = 'el numero de telefono debe tener al menos 7 digitos'
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
      } else if (!/[!_@#$%^&*(),.?":{}|<>]/.test(form.password)) {
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
      showLoaderModal();
      try {
        const {id, password, repeatPassword, ...otherData } = form; 
        const updateUser = password ? {...otherData, password, repeatPassword} : otherData;
        const { data } = await rustikApi.put(`${rustikEndpoints.users}/${id}`, updateUser);
        setNotification({
          visibility: true,
          type: "success",
          text: `Datos guardados correctamente!`,
        });
        onRefreshLoggedUser();

      } catch (error) {
        if (error.status >= 400 && error.status < 500 ) {
          setNotification({
            visibility: true,
            type: "error",
            text: `Error al cargar datos de usuario inicie sesión nuevamente`,
          });
          logout();
        }
        else{
          console.error("Error al llamar a la api", error);
          setNotification({
            visibility: true,
            type: "error",
            text: `Error al cargar datos de usuario intente más tarde`,
          });
          navigate(`${routeList.HOME}`);
        }
      }finally{
        hideLoaderModal();
      }
    }else{
      setNotification({
        visibility: true,
        type: "warning",
        text: `Verifique los campos e intente nuevamente`,
      });
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
            <label htmlFor="email" className="montserrat text-background-dark font-normal cursor-pointer"  >Email</label>
            <input
              className="border-0 bg-transparent cursor-pointer focus:outline-none focus:border-b focus:border-b-primary-color montserrat text-background-dark text-xl font-semibold"
              name="email"
              id="email"
              placeholder="email@ejemplo.com"
              type="email"
              value={form.email}
              readOnly
              // onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                    className="text-white bg-dark-text"
                    key={country[0]} 
                    value={country[0]}
                  >
                    {country[1]}
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