import axios from "axios";

export const API_URL = 'http://parcus.shop/admin'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) =>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('adminToken')}`
    return config
})

export default $api;