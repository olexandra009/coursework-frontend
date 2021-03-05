import {baseUrl} from './api-links';
import Vue from "vue";
import VueResource from 'vue-resource';
const axios = require('axios');
import apiLinks from "./api-links";
Vue.use(VueResource);

function headers(token) {
    return {
    "Accept": "application/json",
    "Authorization": "Bearer " + token  // передача токена в заголовке
    }
}


export default {
    async updateUser(userId, user, token){
        let link = baseUrl+"/update?userId="+userId;
        try {
            let options = {headers: headers(token) };
            let response = await Vue.http.put(link, user, options);
            console.log(response);
            return response;
        }catch(error){
            console.log(error);
            return null;
        }
    },

    async changePassword(userId, password, token){
        let link = baseUrl +"/change_password?userId="+userId;
        try {
            let message = {'password': password};
            let options = { emulateJSON: true, headers: headers(token) };
            let response = await Vue.http.put(link, message, options);
            console.log(response);
            return true;
        }catch(error){
            console.log(error);
            return false;
        }
    },

    async changeLogin(userId, login, token){
        let link = baseUrl+"/change_login?userId="+userId;
        try {
            let message = {'login': login};
            let options = { emulateJSON: true, headers: headers(token) };
            let response = await Vue.http.put(link, message, options);
            console.log(response);
            return true;
        }catch(error){
            console.log(error);
            return false;
        }
    },

    async isLoginExists(login){
        let link = baseUrl+"/loginExists?login="+login;
        try {
            let response = await Vue.http.post(link);
            console.log(response);
            return false;
        }catch(error){
            console.log(error);
            return true;
        }
    },

    async check(token){
        let link = baseUrl+"/user/check";
        try {
            let response = await Vue.http.put(link, {}, {headers: headers(token)});
            return true;
        }catch(error){
            return false;
        }
    },

    async login(login, password){
        let message = {'login': login, 'password': password};
        let link = baseUrl+apiLinks.user.login;
        try {
           let response = await Vue.http.post(link, message);
           return response.body;
        }catch(error){
            if (error.status === 404) {
                return {
                    errorType: 'expected',
                    errorText: error.body.errorText
                }
            }
            return {
                errorType: 'unexpected',
                errorText: error.body.errorText
            }
        }
    }
}