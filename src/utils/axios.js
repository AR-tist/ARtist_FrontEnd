import axios from "axios";

const baseURL = "http://13.124.50.132:8000";

const wsbaseURL = "ws://13.124.50.132:8000/ws/";
const phoneWsbaseURL = null;

const axiosInstance = axios.create({
    baseURL: baseURL,
});

const setPhoneWsbaseURL = (url) => {
    phoneWsbaseURL = url;
};

const getPhoneWsbaseURL = () => {
    return phoneWsbaseURL;
};

export default axiosInstance;

export {wsbaseURL, setPhoneWsbaseURL, getPhoneWsbaseURL };

