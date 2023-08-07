import axios from 'axios';
import { adminApi } from './Api';
import { partnerApi } from './Api';
import { baseApi } from './Api';
import { messageApi } from './Api';
import { getTokenFromCookie } from '../utils/CookieUtility'; // Adjust the import path

const TIMEOUT_DURATION = 10000; // Set timeout to 10 seconds (5000 milliseconds)

const createAxiosInstanceWithInterceptor = (baseURL, cookieName) => {
    console.log(baseURL);
    const instance = axios.create({
        baseURL: baseURL,
        // withCredentials: true,
        timeout: TIMEOUT_DURATION,
    });

    instance.interceptors.request.use(config => {
        const token = getTokenFromCookie(cookieName);
        console.log(token, "-------", cookieName); // Retrieve the token from the cookie
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Set "Authorization" header with "Bearer" prefix
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    return instance;
};

const userAxiosInstance = createAxiosInstanceWithInterceptor(baseApi, 'userCookie');
const adminAxiosInstance = createAxiosInstanceWithInterceptor(adminApi, 'adminCookie');
const partnerAxiosInstance = createAxiosInstanceWithInterceptor(partnerApi, 'partnerCookie');
const messageAxiosInstance = createAxiosInstanceWithInterceptor(messageApi);
// const chatAxiosInstance = createAxiosInstanceWithInterceptor(chatApi);

export {
    adminAxiosInstance,
    userAxiosInstance,
    partnerAxiosInstance,
    messageAxiosInstance,
    // chatAxiosInstance,
};
