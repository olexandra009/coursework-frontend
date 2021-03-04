import {baseUrl} from './api-links';
import Vue from "vue";
import VueResource from 'vue-resource';
import apiLinks from "./api-links";
Vue.use(VueResource);

export default {
    async login(login, password){
        let message = {'login': login, 'password': password};
        console.log(message);

        console.log(baseUrl+apiLinks.user.login);
        let res = await Vue.http.post(baseUrl+apiLinks.user.login, message);
        console.log(res);
        return res
    }
}