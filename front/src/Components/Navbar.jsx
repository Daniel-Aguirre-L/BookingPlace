const Navbar = () => {
  const onLogin = () => {
    alert("Aqui va el login");
  };

  const onSignIn = () => {
    alert("Aqui va el sign in");
  };
  return (
    <nav className="w-full flex flex-col items-center">
      <section className="w-full max-w-[1600px] flex justify-between px-20 py-2.5">
        <img src="/Icons/logoSvg.svg" alt="icono" />
        <div className="flex gap-5  ">
          <button
            className="bg-[#088395] rounded-xl py-2 px-9 max-sm:px-4 text-[#EEEEEEEE]"
            type="button"
            onClick={onLogin}
          >
            Login
          </button>
          <button
            className="bg-[#FBFFBD] rounded-xl py-2 px-9 max-sm:px-4 text-[#112211]"
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
