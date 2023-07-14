import axios from "axios";

const baseURL = "http://13.125.173.158:8000";

const axiosInstance = axios.create({
    baseURL: baseURL,
});

export default axiosInstance;
