// axios.js

import axios from "axios";
import Socket from "./socket"; 

const baseURL = "http://13.124.50.132:8000";

const wsbaseURL = "ws://13.124.50.132:8000/ws/";
let phoneWsbaseURL = new Socket(); // Use let instead of const

const axiosInstance = axios.create({
    baseURL: baseURL,
});

const setPhoneWsbaseURL = (Socket) => {
    phoneWsbaseURL = Socket;
};

const getPhoneWsbaseURL = () => {
    return phoneWsbaseURL;
};

export default axiosInstance;

export {wsbaseURL, setPhoneWsbaseURL, getPhoneWsbaseURL };
