import axios from "axios";

// const TOKEN = localStorage.getItem("token");

export const rustikApi = axios.create({
    baseURL: import.meta.env.VITE_RUSTIK_API || "",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        // "Authorization": `Bearer ${TOKEN}`,
    }
});

