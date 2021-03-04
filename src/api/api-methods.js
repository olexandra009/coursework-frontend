import {baseUrl} from './api-links';
import Vue from "vue";
import VueResource from 'vue-resource';
const axios = require('axios');
import apiLinks from "./api-links";
Vue.use(VueResource);

export default {
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



            // .then(response=> {
            //           console.log('succsess');
            //           console.log(response);
            //           return response.body;
            //     }, response=> {
            //            if(response.status===404)
            //            {
            //
            //            }
            //            return {errorType: 'unexpected',
            //                    errorText: response.body.errorText}
            // });
    }
}