import axios from "axios";

// const TOKEN = localStorage.getItem("token");

const baseURL = import.meta.env.VITE_RUSTIK_API || "";


export const rustikApi = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        // "Authorization": `Bearer ${TOKEN}`,
    }
});

export const rustikApiForm = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'multipart/form-data',
        "Accept": "application/json",
        // "Authorization": `Bearer ${TOKEN}`,
    }
});


