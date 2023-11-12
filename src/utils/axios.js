import axios from "axios";

const baseURL = "http://13.124.50.132/:8000";

const axiosInstance = axios.create({
    baseURL: baseURL,
});

export default axiosInstance;
