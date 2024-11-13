import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import styles from "./carousel-styles.module.css";

const EmblaCategoryCarousel = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: true }),
  ]);

  return (
    <div className={styles["embla"]}>
      <div className={styles["embla__viewport"]} ref={emblaRef}>
        <div className={styles["embla__container"]}>
          {slides.map((slide, index) => (
            <div
              className={`${styles["embla__slide"]} flex-[0_0_90%] md:flex-[0_0_550px]`}
              key={index}
            >
              <span className="relative flex items-end justify-center">
                <div className="absolute w-3/4 mb-10 flex flex-col items-center text-center">
                  <h2 className="text-[2.8rem] font-semibold montserrat text-nowrap pb-3 leading-10 z-10">
                    {slide.title}
                  </h2>
                  <p className="text-[1.05rem] z-10">
                    {slide.description}
                  </p>
                  <button
                    className="text-[1.2rem] bg-secondary-color text-background-dark h-12 w-fit px-5 rounded-[0.6rem] font-medium z-10 mt-5"
                    onClick={() =>
                    console.log({slide}) //ACA DEBERÍA CAMBIARSE EL FILTRO DEL ENDPOINT
                    }
                  >
                    Ver Todas
                  </button>
                </div>
                <img
                  className={styles["embla__slide__img_home"]}
                  src={slide.src}
                  alt={slide.title}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCategoryCarousel;