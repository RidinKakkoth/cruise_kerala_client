import axios from 'axios';
import { adminApi } from './Api';
import { partnerApi } from './Api';
import { baseApi } from './Api';
import { chatApi } from './Api';
import { messageApi } from './Api';

const TIMEOUT_DURATION = 10000; // Set timeout to 10 seconds (5000 milliseconds)

const userAxiosInstance = axios.create({
    baseURL: baseApi,
    withCredentials: true,
    timeout: TIMEOUT_DURATION, 
});

const adminAxiosInstance = axios.create({
    baseURL: adminApi,
    withCredentials: true,
    timeout: TIMEOUT_DURATION, 
});

const partnerAxiosInstance = axios.create({
    baseURL: partnerApi,
    withCredentials: true,
    timeout: TIMEOUT_DURATION, 
});

const chatAxiosInstance = axios.create({
    baseURL: chatApi,
    withCredentials: true,
    timeout: TIMEOUT_DURATION, 
});

const messageAxiosInstance = axios.create({
    baseURL: messageApi,
    withCredentials: true,
    timeout: TIMEOUT_DURATION, 
});

export {
    adminAxiosInstance,
    userAxiosInstance,
    partnerAxiosInstance,
    messageAxiosInstance,
    chatAxiosInstance,
};
