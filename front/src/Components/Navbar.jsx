
import { Link } from 'react-router-dom';

const Navbar = ()=> {

  const onLogin = () => {
    alert("Aqui va el login");
  };

  const onSignIn = () => {
    alert("Aqui va el sign in");
  };
  
  return (
    <nav className="flex justify-between px-20 py-2.5">
      <Link to="/"><img src="/Icons/logoSvg.svg" alt="icono"/></Link>
      <div className="flex gap-5  ">
        <button className="bg-[#088395] rounded-xl py-2 px-9 text-[#EEEEEEEE]" type="button"  onClick={onLogin}>Login</button>
        <button className="bg-[#FBFFBD] rounded-xl py-2 px-9 text-[#112211]" type="button" onClick={onSignIn}>Sign in</button>
      </div>
    </nav>
  );
};


export default Navbar;
