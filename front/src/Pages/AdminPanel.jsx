import { Link } from "react-router-dom";
import { routeList } from "../helpers/routeList";
import FormFeature from "../Components/FormFeature";

const AdminPanel = () => {
    
    return (
        <>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <div className="flex flex-col gap-5 text-xl my-10">
                <Link className="rounded-xl bg-primary-color px-5 py-2 text-center" to={routeList.ADMIN_USERS}>Usuarios</Link>
                <Link className="rounded-xl bg-primary-color px-5 py-2 text-center" to={routeList.ADMIN_FEATURES}>Características</Link>
                <Link className="rounded-xl bg-primary-color px-5 py-2 text-center" to={routeList.ADMIN_CATALOGS}>Cabañas</Link>
                <Link className="rounded-xl bg-primary-color px-5 py-2 text-center" to={routeList.ADMIN_BOOKINGS}>Reservas</Link>
            </div>

        </>

    )
}

export default AdminPanel;