import axios from 'axios';
import { adminApi } from './Api';
import { partnerApi } from './Api';
import { baseApi } from './Api';
import { messageApi } from './Api';
import { getTokenFromCookie } from '../utils/CookieUtility'; 

const TIMEOUT_DURATION = 110000; 

const createAxiosInstanceWithInterceptor = (baseURL, cookieName) => {

    const instance = axios.create({
        baseURL: baseURL,
        timeout: TIMEOUT_DURATION,
    });

    instance.interceptors.request.use(config => {
        const token = getTokenFromCookie(cookieName);
        // console.log(token, "-------", cookieName); // Retrieve the token from the cookie
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Set "Authorization" header with "Bearer" prefix
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    instance.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 500) {
                // Navigate to the 500 error page
                window.location.href = '/500'; 
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

const userAxiosInstance = createAxiosInstanceWithInterceptor(baseApi, 'userCookie');
const adminAxiosInstance = createAxiosInstanceWithInterceptor(adminApi, 'adminCookie');
const partnerAxiosInstance = createAxiosInstanceWithInterceptor(partnerApi, 'partnerCookie');
const messageAxiosInstance = createAxiosInstanceWithInterceptor(messageApi);

export {
    adminAxiosInstance,
    userAxiosInstance,
    partnerAxiosInstance,
    messageAxiosInstance,
};
