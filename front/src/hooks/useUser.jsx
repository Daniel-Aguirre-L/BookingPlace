import { useCallback } from "react";
import { useUserStore } from "../store/useUserStore";
import { rustikApi } from "../services/rustikApi";
import { routeList } from "../helpers/routeList";


const getToken = () => {
    return localStorage.getItem("token") || "";
     
};

const setToken = (token) => {
    localStorage.setItem("token", token);
};


export const useUser = () => {

    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    const isAdmin = useUserStore((state) => state.isAdmin);
    const userName = useUserStore((state) => state.userName);
    const userEmail = useUserStore((state) => state.userEmail);

    // const navigate = useNavigate();

    const login = useCallback(async (email, password) => {
        
        try {
            const user = { email, password };
            const { data } = await rustikApi.post("/auth/login", user);
            setToken(data.token);
            useUserStore.setState({ isLoggedIn: true, isAdmin: data.isAdmin, userName: data.name, userEmail: email });
            alert(`Bienvenivo ${data.name}`);
            // navigate(routeList.HOME);
    
        } catch (error) {
            if (error.status === 403){
                return alert("Credenciales Incorrectas");
            }
            console.error(error.message);
        }

    }, []);

    const logout = useCallback(() => {
        setToken(null);
        useUserStore.setState({ isLoggedIn: false, isAdmin: false, userName: '', userEmail: '' });
    }, []);

    const register = useCallback(async (name, surname, email, phone, password, repeatPassword, country) => {

        const user = { name, surname, email, phone, password, repeatPassword, country, isAdmin: false };
        try {
            const { data } = await rustikApi.post("/auth/register", user);
            setToken(data.token);
            useUserStore.setState({ isLoggedIn: true, isAdmin: data.isAdmin, userName: data.name, userEmail: email });
            alert(`Bienvenido ${data.name}`);
            // navigate(routeList.HOME);
    
        } catch (error) {
            if (error.status === 400){
                return alert("Credenciales Incorrectas");
            }
            console.error(error.message);
        }
        

    }, []);


    // const refreshToken = useCallback(async () => {
    //     const token = getToken();
    //     const { data } = await rustikApi.post("/auth/refresh", token);
    //     setToken(data.token);
    // }, []);


    return {
        isLoggedIn,
        isAdmin,
        userName,
        userEmail,

        login,
        logout,
        register,

    }
}
