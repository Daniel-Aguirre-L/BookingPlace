import { Navigate, Outlet } from "react-router-dom"
import Footer from "../Footer"
import { useUser } from "../../hooks/useUser";
import { routeList } from "../../helpers/routeList";


const AuthLayout = () => {

    const {isLoggedIn, userLoaded} = useUser();

    return (
        <div className="max-w-[1600px] mx-auto">
            { userLoaded &&isLoggedIn && <Navigate to={routeList.HOME} />}
            <Outlet />
            <div className="flex w-full">
                <Footer />
            </div>
        </div>
    )
}

export default AuthLayout