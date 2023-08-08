import axios from "axios";
export const apiUrl = "http://localhost:8080/api/";
export const api = axios.create({baseURL: apiUrl});
export const endpoints = {
    login: "auth/login",
    logintoken: "auth/logintoken",
    register: "auth/register",
    logout: "auth/logout",
    forgotPassword: "auth/forgot-password",
    payment: "payment",
    getCart: "cart/:user_id",
    addToCart: "cart/add-to-cart",
    updateCart: "cart/update-cart-item",
    removeCart: "cart/remove-cart-item",

};


