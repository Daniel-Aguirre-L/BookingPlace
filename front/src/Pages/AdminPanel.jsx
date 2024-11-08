import { Link } from "react-router-dom";
import { routeList } from "../helpers/routeList";

const AdminPanel = () => {
    
    return (
        <>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <div className="flex flex-col gap-5 text-xl my-10">
                <Link className="rounded-xl bg-primary-color px-5 py-2 text-center" to={routeList.USERS}>Usuarios</Link>
                <Link className="rounded-xl bg-primary-color px-5 py-2 text-center" to={routeList.BOOKINGS}>Reservas</Link>
                <Link className="rounded-xl bg-primary-color px-5 py-2 text-center" to={routeList.CATALOGS}>Cabañas</Link>
            </div>

        </>

    )
}

export default AdminPanel;