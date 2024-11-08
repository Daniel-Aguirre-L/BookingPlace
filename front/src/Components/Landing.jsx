import React from "react";

const styles = {
  background: 'linear-gradient(0deg, rgba(12, 17, 35, 1) 0%, rgba(0, 0, 0, 0) 30%), url("./img/landing.png")',
  backgroundSize: 'cover'
};

function Landing() {
  return (
    <section className="bg-background-dark w-full  h-[100vh] max-h-[60rem] flex flex-col justify-center montserrat " style={styles} >
      <h1 className="pageMargin text-primary-color font-bold text-[3.3rem] w-fit leading-[4rem] max-sm:text-[2.5rem]">
        Escapa a la Naturaleza y <br />
        Reserva tu Cabaña ideal
      </h1>
      <p className="pageMargin mt-4 text-light-text text-[1.5rem] w-fit">
        Tu refugio natural, a un clic de distancia.
      </p>
    </section>
  );
}

export default Landing;
