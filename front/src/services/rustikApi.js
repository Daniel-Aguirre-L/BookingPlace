import axios from "axios";

const TOKEN = localStorage.getItem("token");

const baseURL = import.meta.env.VITE_RUSTIK_API || "";


const publicHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

const privateHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${TOKEN}`,
};


export const rustikApi = axios.create({
    baseURL,
    headers: TOKEN ? privateHeaders : publicHeaders,
});

export const rustikApiForm = axios.create({
    baseURL,
    headers: {
        ...privateHeaders,
        'Content-Type': 'multipart/form-data',
    }
});


