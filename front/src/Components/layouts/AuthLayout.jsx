import { Navigate, Outlet, useLocation } from "react-router-dom"
import Footer from "../Footer"
import { useUser } from "../../hooks/useUser";
import { routeList } from "../../helpers/routeList";


const AuthLayout = () => {

    const {isLoggedIn, userLoaded} = useUser();
    const location = useLocation();

    return (
        <div className="max-w-[1600px] mx-auto">
            { userLoaded && isLoggedIn && location.pathname !== routeList.RESETPASSWORD && <Navigate to={routeList.HOME} />}
            { userLoaded && isLoggedIn && location.pathname === routeList.RESETPASSWORD && <Navigate to={routeList.USER_PROFILE} />}
            <Outlet />
            <div className="flex w-full">
                <Footer />
            </div>
        </div>
    )
}

export default AuthLayout