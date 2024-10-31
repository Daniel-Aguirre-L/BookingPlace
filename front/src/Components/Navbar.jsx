import { useNavigate } from "react-router-dom";

const Navbar = () => {
  
  const navigate = useNavigate();

  const onLogin = () => {
    alert("Aqui va el login");
  };

  const onSignIn = () => {
    alert("Aqui va el sign in");
  };
  
  return (
    <nav className="w-full flex flex-col items-center">
      <section className="w-full max-w-[1600px] flex justify-between px-20 py-2.5">
        <button onClick={() => navigate("/")} className="flex items-center">
          <img src="/Icons/logoSvg.svg" alt="icono" />
        </button>
        
        <div className="flex gap-5  ">
          <button
            className="bg-primary-color rounded-xl py-2 px-9 max-sm:px-4 text-light-text"
            type="button"
            onClick={onLogin}
          >
            Login
          </button>
          <button
            className="bg-secondary-color rounded-xl py-2 px-9 max-sm:px-4 text-background-dark"
            type="button"
            onClick={onSignIn}
          >
            Sign in
          </button>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
