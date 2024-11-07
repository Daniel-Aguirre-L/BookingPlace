
import { Link, useNavigate } from 'react-router-dom';

import { useUser } from '../hooks/useUser';

const Navbar = ()=> {
  const navigate = useNavigate();


  const { isLoggedIn, logout } = useUser();

  const onLogin = () => {
    navigate('Login');
  };

  const onSignIn = () => {
    alert("Aqui va el sign in");
  };

  return (
    <nav className="flex justify-between items-center px-5 md:px-20 py-2.5">
      <Link to="/"><img src="/Icons/logoSvg.svg" alt="icono" /></Link>

      <Link className='md:hidden' to="/"><img src="/Icons/hamburger.svg" alt="icono" /></Link>

      {
        !isLoggedIn && (
          <div className="gap-5 hidden md:flex  ">
            <button className="bg-[#088395] rounded-xl py-2 px-9 text-[#EEEEEEEE]" type="button" onClick={onLogin}>Login</button>
            <button className="bg-[#FBFFBD] rounded-xl py-2 px-9 text-[#112211]" type="button" onClick={onSignIn}>Sign in</button>
          </div>
        )}

        {isLoggedIn && (
          <div className="gap-5 hidden md:flex  ">
            <button className="bg-[#088395] rounded-xl py-2 px-9 text-[#EEEEEEEE]" type="button" onClick={logout}>Logout</button>
          </div>
        )}



    </nav>
  );
};


export default Navbar;
