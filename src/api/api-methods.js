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

// --------------------Cabinet user Api--------------------------//
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
//-----------------------------------------------------------------------//

//--------------------------Log in user Api-------------------------------//
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
    },
//-------------------------------------------------------------//

//------------------Admin Users Item/List user Api-------------//

    async getUserList(token, role=null, take=null, skip=null){
        let link = baseUrl + '/api/User';
        if(role!=null) link = baseUrl + '/filtered_by_role';
        let options = {headers: headers(token)};
        if(take!=null||skip!=null||role!=null){
            link+='?'
        }
        if(take!=null)
            link+='Take='+take+'&';
        if(skip!=null)
            link+='Skip='+skip+'&';
        if(role!=null)
        {
            link+='role='+role;
        }

        try{
            let response = await Vue.http.get(link, options);
            console.log(response);
            return response.body;
        } catch(error){
            console.log(error);
        }
    },

    async getUserItem(token, userId){
        let link = baseUrl+'/api/User/'+userId;
        let options = {headers: headers(token)};
        try{
            let response = await Vue.http.get(link, options);
            console.log(response);
            return response.body;
        } catch (exception){
            console.log(exception);
            return null;
        }
    },

    async changeUserRight(token, role, userId){
        let link = baseUrl +'/change_role?userId='+userId+'&role='+role;
        let options = {headers: headers(token) };

        try {
            let response = await Vue.http.put(link, options);
            return response.body;
        } catch (e) {
            console.log(e);
            return e;
        }
    },
//-------------------------------------------------------------//

//-------------Organization List/Item/Filter-------------------//

    async getOrganizationList(token, take, skip){
        let link = baseUrl +'/api/Organization?SortProp=id&SorOrder=desc';
        let options = {headers: headers(token)};
        if(take!=null||skip!=null){
            link+='&'
        }
        if(take!=null)
            link+='Take='+take+'&';
        if(skip!=null)
            link+='Skip='+skip;

        try{
            let response = await Vue.http.get(link, options);
            console.log(response);
            return response.body;
        } catch(error){
            console.log(error);
        }
    },

    async getOrganizationItem(token, orgId) {
        let link = baseUrl+'/api/Organization/'+orgId;
        let options = {headers: headers(token)};
        try{
            console.log("HERE GET ORGANIZATION ITEM");
            let response = await Vue.http.get(link, options);
            console.log(response);
            return response.body;
        } catch(error){
            console.log(error);
        }
    },

    async getOrganizationItemUsers(token, orgId) {
        let link = baseUrl+'/api/get_user_by_organization?id='+orgId;
        let options = {headers: headers(token)};
        try{
            console.log("HERE GET ITEM USERS");
            let response = await Vue.http.get(link, options);
            console.log(response);
            return response.body;
        } catch(error){
            console.log(error);
        }
    },

    async deleteOrganizationItem(token, orgId){
        let link = baseUrl+'/api/Organization/'+orgId;
        let options = {headers: headers(token)};
        try{
            let response = await Vue.http.delete(link, options);
            console.log(response);
            return true;
        } catch(error){
            console.log(error);
            return false;
        }
    },

    async addOrganizationItem(token, name, phone, address){
        let link = baseUrl+'/api/Organization';
        let options = {headers: headers(token)};
        let message = {'name': name};
        if(phone!==undefined)
            message.phoneNumber = phone;
        if(address!==undefined)
            message.address = address;
        console.log(message);
        
        try{
            let response = await Vue.http.post(link, message, options);
            console.log(response);
            return response.body;
        } catch(error){
            console.log(error);
            return null;
        }
    },


    async editOrganizationItem(token, organization){
        let link = baseUrl+'/api/Organization/'+organization.id;
        let options = {headers: headers(token)};
        try{
            let response = await Vue.http.put(link, organization, options);
            console.log(response);
            return response.body;
        } catch(error){
            console.log(error);
            return null;
        }
    },
//-------------------------------------------------------------//
//--------------------- News api -----------------------------//
   async createNewsItem(token, news){
        let link = baseUrl+'/api/News';
        let options = {headers: headers(token)};
        try{
            let response = await Vue.http.post(link, news, options);
            console.log(response);
            console.log(response.body);
            return response.body;
        } catch(error){
            console.log(error);
            return null;
        }
    },

   async getNewsList(token){
        let link = baseUrl+'/api/News?SortProp=dateTimeCreation&SortOrder=desc';
        let options = {headers: headers(token)};
       try{
           let response = await Vue.http.get(link, options);
           console.log(response);
           console.log(response.body);
           return response.body;
       } catch(error){
           console.log(error);
           return null;
       }
    },
   async getNewsItem(token, id){
        let link = baseUrl+'/api/News/'+id;
        let options = {headers: headers(token)};
        try{
            let response = await Vue.http.get(link, options);
            console.log(response);
            console.log(response.body);
            return response.body;
        } catch(error){
            console.log(error);
            return null;
        }
   },
   async updateNewsItem(token, id, news){
       let link = baseUrl+'/api/News/'+id;
       let options = {headers: headers(token)};
       try{
           let response = await Vue.http.put(link, news, options);
           console.log(response);
           console.log(response.body);
           return response.body;
       } catch(error){
           console.log(error);
           return null;
       }
   },
   async deleteNewsItem(token, id) {
       let link = baseUrl+'/api/News/'+id;
       let options = {headers: headers(token)};
       try{
           await Vue.http.delete(link, options);
           return true;
       } catch(error){
           console.log(error);
           return false;
       }
   },


//-------------------------------------------------------------//
}


