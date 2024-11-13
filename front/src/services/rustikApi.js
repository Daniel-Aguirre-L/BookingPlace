import axios from "axios";

const TOKEN = localStorage.getItem("token") || "";

const baseURL = import.meta.env.VITE_RUSTIK_API || "";


// const publicHeaders = {
//     "Content-Type": "application/json",
//     "Accept": "application/json",
// };

// const privateHeaders = {
//     "Content-Type": "application/json",
//     "Accept": "application/json",
//     "Authorization": `Bearer ${TOKEN}`,
// };


export const rustikApi = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      withCredentials: true,
});

export const rustikApiForm = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'multipart/form-data',
        "Accept": "application/json",
        "Authorization": `Bearer ${TOKEN}`,
      },
});

rustikApi.interceptors.request.use(
    (config) => {
      const TOKEN1 = localStorage.getItem("token") || "";
      if (TOKEN1) {
        config.headers["Authorization"] = `Bearer ${TOKEN1}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
