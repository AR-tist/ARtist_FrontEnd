import axios from "axios";

const baseURL = "http://13.124.50.132:8000";

const wsbaseURL = "ws://13.124.50.132:8000/ws/";

const axiosInstance = axios.create({
    baseURL: baseURL,
});

export default axiosInstance;

export { wsbaseURL };
