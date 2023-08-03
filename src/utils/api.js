import axios from "axios";
import { LS } from './localStorageUtils.js'
export const apiUrl = "http://localhost:8080/api/";
export const api = axios.create({baseURL: apiUrl});
export const endpoints = {
    login: "auth/login",
    signintoken: "auth/signintoken",
    register: "auth/register",
    signout: "auth/signout",
};


