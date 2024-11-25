import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { routeList } from "../../helpers/routeList";
import PageTitleAndBack from "../PageTitleAndBack";


// className="grid min-h-screen grid-rows-[auto 1fr auto]"
// style={{ display: "grid", gridTemplateRows: "auto 1fr auto", minHeight: "100vh" }}
const UserLayout = () => {

  const { isLoggedIn, userLoaded, userName, userEmail } = useUser();
 
  const path = useLocation().pathname;
  const comparePath = (path2) => {
    return path === path2;
  };
  
  return (
    <>
      {userLoaded && !isLoggedIn && <Navigate to={routeList.LOGIN} />}

      {
        isLoggedIn  && (
            <div className="px-5 md:px-16 w-full" >
              
              <section className="w-full animate-fadeIn mb-5 md:mb-9">
                <div className="w-full my-3 md:my-2" >
                  <PageTitleAndBack title={`Editar perfil`} />
                </div>
                <div className="relative mx-auto pt-16 md:pt-[89px] w-full flex" >
                  <div className="bg-primary-color w-full h-[160px] md:h-[227px] rounded-t-lg flex flex-col items-center justify-end pb-[18.5px]">
                    <p className="montserrat font-semibold text-2xl md:text-[29.07px] mb-1 md:mb-4 capitalize" >{userName}.</p>
                    <p className="montserrat font-medium text-md md:text-[19.38px] " >{userEmail}</p>
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-36  md:w-48 md:h-48 border-[5px] border-secondary-color rounded-full bg-black flex justify-center items-center " >
                    <span className="montserrat font-normal text-6xl md:text-8xl uppercase" >{userName.charAt(0)}</span>
                  </div>
                </div>
                <div className="mt-8 w-full bg-light-text rounded-2xl grid grid-cols-3 gap-0 text-background-dark font-semibold" >
                  <Link className={`montserrat text-xs md:text-sm transition-all w-full px-6 py-[14.5px] ${comparePath(routeList.USER_PROFILE) && "bg-primary-color text-light-text"} rounded-l-2xl`} to={routeList.USER_PROFILE}>Perfil</Link>
                  <Link className={`montserrat text-xs md:text-sm transition-all w-full px-6 py-[14.5px] ${comparePath(routeList.USER_FAVORITES) && "bg-primary-color text-light-text"} border-x border-x-dark-text`} to={routeList.USER_FAVORITES}>Favoritos</Link>
                  <Link className={`montserrat text-xs md:text-sm transition-all w-full px-6 py-[14.5px] ${comparePath(routeList.USER_BOOKINGS) && "bg-primary-color text-light-text"} rounded-r-2xl`} to={routeList.USER_BOOKINGS}>Reservas</Link>
                </div>
              </section>
                <Outlet />
            </div>
        )}
    </>

  );
};

export default UserLayout;
