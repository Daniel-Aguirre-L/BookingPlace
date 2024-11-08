import { useCallback } from "react";
import { useUserStore } from "../store/useUserStore";
import { rustikApi } from "../services/rustikApi";
import { useNavigate } from "react-router-dom";
import { routeList } from "../helpers/routeList";
import useNotificationStore from "../store/useNotificationStore";


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
    const { setNotification } = useNotificationStore();

    // const navigate = useNavigate();

    const login = useCallback(async (email, password) => {
        
        try {
            const user = { email, password };
            const { data } = await rustikApi.post("/auth/login", user);
            setToken(data.token);
            useUserStore.setState({ isLoggedIn: true, isAdmin: data.isAdmin, userName: data.name, userEmail: email });
            setNotification({
                visibility: true,
                type: "success",
                text: `¡Bienvenid@, ${data.userName}!`,
              });
            // navigate(routeList.HOME);
    
        } catch (error) {
            if (error.status === 403){
                setNotification({
                    visibility: true,
                    type: "error",
                    text: `Credenciales Incorrectas, intente denuevo.`,
                  });
            }
            console.error(error.message);
        }

    }, []);



    const logout = useCallback(() => {
        setToken(null);
        useUserStore.setState({ isLoggedIn: false, isAdmin: false, userName: '', userEmail: '' });
        navigate(routeList.HOME);
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

    }
}
