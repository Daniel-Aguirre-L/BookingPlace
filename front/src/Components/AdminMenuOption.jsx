import { Link } from "react-router-dom"


const AdminMenuOption = ({ url, icon, text, active }) => {

    return (
        <Link 
            to={url} 
            className={`flex items-center gap-3 rounded-lg text-lg px-5 py-3 transition-all
                ${active ? "bg-secondary-color text-background-dark shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]":
                "hover:bg-secondary-color hover:bg-opacity-15"
                }
            `}
        >
            <div className="w-5">
                {icon}
            </div>
            <span className="text-lg overflow-hidden " >
                {text}
            </span>
        </Link>
    )
}

export default AdminMenuOption