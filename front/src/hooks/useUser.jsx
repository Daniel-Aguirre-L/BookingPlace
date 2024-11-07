import { useCallback } from "react";
import { useUserStore } from "../store/useUserStore";
import { rustikApi } from "../services/rustikApi";


const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
};

const setToken = (token) => {
    localStorage.setItem("token", token);
};


export const useUser = () => {

    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    const isAdmin = useUserStore((state) => state.isAdmin);
    const userName = useUserStore((state) => state.userName);
    const email = useUserStore((state) => state.userEmail);

    const login = useCallback(async (email, password) => {
        const user = { email, password };
        const { data } = await rustikApi.post("/auth/login", user);
        setToken(data.token);
        useUserStore.setState({ isLoggedIn: true, isAdmin: data.isAdmin, userName: data.userName, email: data.email });
        return data;
    }, []);


    const logout = useCallback(() => {
        setToken(null);
        useUserStore.setState({ isLoggedIn: false, isAdmin: false, userName: '', email: '' });
    }, []);


    const refreshToken = useCallback(async () => {
        const token = getToken();
        const { data } = await rustikApi.post("/auth/refresh", token);
        setToken(data.token);
    }, []);


    return {
        isLoggedIn,
        isAdmin,
        userName,
        email,

        login,
        logout,

    }
}
