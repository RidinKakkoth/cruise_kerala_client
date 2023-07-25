import axios from 'axios';
import { adminApi } from './Api'
import { partnerApi } from './Api'
import { baseApi } from './Api'
import { chatApi } from './Api'
import { messageApi } from './Api'

const userAxiosInstance  =axios.create({
    baseURL:baseApi,
    withCredentials: true,
})

const adminAxiosInstance =axios.create({
    baseURL:adminApi,
    withCredentials: true,
})

const partnerAxiosInstance  =axios.create({
    baseURL:partnerApi,
    withCredentials: true,
})
const chatAxiosInstance  =axios.create({
    baseURL:chatApi,
    withCredentials: true,
})
const messageAxiosInstance  =axios.create({
    baseURL:messageApi,
    withCredentials: true,
})



export { adminAxiosInstance, userAxiosInstance, partnerAxiosInstance,messageAxiosInstance,chatAxiosInstance };
