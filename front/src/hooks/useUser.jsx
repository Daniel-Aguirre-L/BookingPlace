import { useCallback, useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import { rustikApi } from "../services/rustikApi";
import { rustikEndpoints } from "../services/rustkEndPoints";

import { routeList } from "../helpers/routeList";
import useNotificationStore from "../store/useNotificationStore";

// import { routeList } from "../helpers/routeList";


export const useUser = () => {

    const userLoaded = useUserStore((state) => state.userLoaded);
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    const isAdmin = useUserStore((state) => state.isAdmin);
    const userName = useUserStore((state) => state.userName);
    const userEmail = useUserStore((state) => state.userEmail);
    const { setNotification } = useNotificationStore();

    // const navigate = useNavigate();


    useEffect(() => {
        const validateToken = async () => {
            try {
                const { data } = await rustikApi.get(rustikEndpoints.validateToken);
                useUserStore.setState((state) => ({ ...state, userLoaded: true, isLoggedIn: true, isAdmin: data.isAdmin, userName: data.name, userEmail: data.name }));
            } catch (error) {
                if (error.status >= 500) {
                    console.error(error.message);
                } else if (error.status >= 400) {
                    logout();
                    useUserStore.setState((state) => ({ ...state, userLoaded: true }));
                }
            }
        };
        !userLoaded && validateToken();
    }, []);

    const setToken = useCallback((token) => {
        return localStorage.setItem("token", token);
    }, []);

    const login = useCallback(async (email, password) => {

        try {
            const user = { email, password };
            const { data } = await rustikApi.post(rustikEndpoints.login, user);
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
        localStorage.removeItem("token");
        useUserStore.setState((state) => ({ ...state, isLoggedIn: false, isAdmin: false, userName: '', userEmail: '' }));
    }, []);

    const register = useCallback(async (name, surname, email, phone, password, repeatPassword, country) => {

        const user = { name, surname, email, phone, password, repeatPassword, country, isAdmin: false };
        try {
            const { data } = await rustikApi.post(rustikEndpoints.register, user);
            setToken(data.token);
            useUserStore.setState((state) => ({ ...state, isLoggedIn: true, isAdmin: data.isAdmin, userName: data.name, userEmail: email }));
            alert(`Bienvenido ${data.name}`);
            // navigate(routeList.HOME);

        } catch (error) {
            if (error.status === 400) {
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
