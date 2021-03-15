import {baseUrl} from './api-links';
import Vue from "vue";
import VueResource from 'vue-resource';
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

    async deleteUserAccount(userId, token){
        let link = baseUrl+"/api/User/"+userId;
        try {
            let options = {headers: headers(token) };
            let response = await Vue.http.delete(link, options);
            console.log(response);
            return true;
        }catch(error){
            console.log(error);
            return false;
        }
    },

    async changePassword(userId, password, token){
        let link = baseUrl +"/change_password?userId="+userId;
        try {
            let message = {'id': userId, 'password': password};
            let options = { headers: headers(token) };
            let response = await Vue.http.put(link, message, options);
            console.log(response);
            return true;
        }catch(error){
            console.log(error);
            return false;
        }
    },

    async changeToSuperUser(userId, token, line, isIpn){
        let link = baseUrl +"/extendRole?userId="+userId;
        try {
            let message = {'inpOrPass': line, 'isIpn': isIpn};
            let options = {  emulateJSON: true, headers: headers(token) };
            let response = await Vue.http.post(link, message, options);
            console.log(response);
            return response;
        }catch(error){
            console.log(error);
            return null;
        }
    },

    async changeLogin(userId, login, token){
        let link = baseUrl+"/change_login?userId="+userId;
        try {
            let message = {'login': login, 'id': userId};
            let options = { headers: headers(token) };
            let response = await Vue.http.put(link, message, options);
            console.log(response);
            return true;
        }catch(error){
            console.log(error);
            return false;
        }
    },

    async changeEmail(userId, email, token){
        let link = baseUrl+"/update_email?userId="+userId;
        try {
            let message = {'email': email, 'id': userId};
            let options = { headers: headers(token) };
            let response = await Vue.http.put(link, message, options);
            console.log(response);
            return response.body;
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
    async isEmailExists(email){
        let link = baseUrl+"/emailExists?email="+email;
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
//--------------------------Registration---------------------------------//
    async registration(user){
        let link = baseUrl+"/registration";
        try {
            let result = await Vue.http.post(link, user);
            return result;
        }catch(error){

            return null;
        }
    },
//-----------------------------------------------------------------------//
//----------------------------Forgot password----------------------------//

    async forgotPassword(email){
        let link = baseUrl+"/forgot_password?email="+email;
        try {
            await Vue.http.post(link);
            return true;
        }catch(error){
            return null;
        }
    },

//-----------------------------------------------------------------------//
//----------------------Email Confirm User Api---------------------------/
    async confirmEmail(code, id){
        let link = baseUrl+"/confirm_email?code="+code+"&id="+id;
        try {
            await Vue.http.get(link);
            return true;
        }catch(error){
            return false;
        }
    },

    async resendConfirmEmail(email){
        let link = baseUrl+"/emailConfirmResend?email="+email;
        try {
            await Vue.http.get(link);
            return true;
        }catch(error){
            return false;
        }
    },
//-----------------------------------------------------------------------//
//--------------------------Log in user Api-------------------------------//
    async check(token){
        let link = baseUrl+"/user/check";
        try {
            await Vue.http.put(link, {}, {headers: headers(token)});
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

    async changeUserRight(token, role,  userId){
        let link = baseUrl +'/change_role?userId='+userId;
        let user = {'role':role, 'id': userId};
        let options = {headers: headers(token) };

        try {
            let response = await Vue.http.put(link, user, options);
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
    async changeUserOrganizationItem(token, userId, orgId){
        let link = baseUrl+`/updateOrganization?userId=${userId}&organization=${orgId}`;

        let options = { headers: headers(token)};

        try{
            let response = await Vue.http.put(link, options);
            console.log(response);
            return response.body;
        } catch(error){
            console.log(error);
            return null;
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

    async getNewsListFiltered(token, take, skip, orgId){
        let link = baseUrl+'/news_by_organization?SortProp=dateTimeCreation&SortOrder=desc&organizationId='+orgId;
        if(skip) link+="&Skip="+skip;
        if(take) link+="&Take="+take;
        let options = {headers: headers(token)};
        try{
            let response = await Vue.http.get(link, options);
            return response.body;
        } catch(error){
            console.log(error);
            return null;
        }
    },

   async getNewsList(token, take, skip){
        let link = baseUrl+'/api/News?SortProp=dateTimeCreation&SortOrder=desc';
        if(take) link+="&Take="+take;
        if(skip) link+="&Skip="+skip;

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
//--------------------- Event api -----------------------------//
    async createEventItem(token, events){
        let link = baseUrl+'/api/Event';
        let options = {headers: headers(token)};
        try{
            let response = await Vue.http.post(link, events, options);
            console.log(response);
            console.log(response.body);
            return response.body;
        } catch(error){
            console.log(error);
            return null;
        }
    },

    async getEventsList(token, take, skip){
        let link = baseUrl+'/api/Event?SortProp=id&SortOrder=desc&Take='+take+"&Skip="+skip;
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

    async getEventsListByTime(token, take, skip,time){
        let link = baseUrl+'/filter_by_time?SortProp=id&SortOrder=desc&Take='+take+"&Skip="+skip+"&filter="+time;
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

    async getEventsListByOrgId(token, take, skip, orgId){
        let link = baseUrl+'/filter_by_organization?SortProp=id&SortOrder=desc&Take='+take+"&Skip="+skip+"&organizationId="+orgId;
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

    async getEventsListByOrgIdAndTime(token, take, skip, orgId, time){
        let link = baseUrl+'/filterOrganizationTime?SortProp=id&SortOrder=desc&Take='+take+"&Skip="+skip
            +"&organizationId="+orgId+"&filter="+time;
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
    async getEventsItem(token, id){
        let link = baseUrl+'/api/Event/'+id;
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
    async deleteEventsItem(token, id){
        let link = baseUrl+'/api/Event/'+id;
        let options = {headers: headers(token)};
        try{
            await Vue.http.delete(link, options);
            return true;
        } catch(error){
            return false;
        }
    },

    async updateEventsItem(token, id, even){
        let link = baseUrl+'/api/Event/'+id;
        let options = {headers: headers(token)};
        try{
            let response = await Vue.http.put(link, even, options);
            console.log(response);
            console.log(response.body);
            return response.body;
        } catch(error){
            console.log(error);
            return null;
        }
    },

//-------------------------------------------------------------//
//--------------------- Petition api -----------------------------//
    async getListOfPetition(token, take,skip){
        let link = baseUrl+`/api/Petition?SortProp=id&SortOrder=desc&Take=${take}&Skip=${skip}`;
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

    async getListOfPetitionByStatus(token, status, take, skip){
        let link = baseUrl+`/filter_by_status?sortProp=id&sortOrder=desc&Take=${take}&Skip=${skip}`;
        if(status.timeStatus) link+="&timeStatus="+status.timeStatus;
        if(status.votesStatus) link+="&votesStatus="+status.votesStatus;
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

    async getListOfPetitionByStatusAndAuthor(token, userId, status, take, skip){
        let link = baseUrl+`/filter_author_status?sortProp=id&sortOrder=desc&Take=${take}&Skip=${skip}&userId=${userId}`;
        if(status.timeStatus) link+="&timeStatus="+status.timeStatus;
        if(status.votesStatus) link+="&votesStatus="+status.votesStatus;
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

    async getListOfPetitionByAuthor(token, userId, take, skip){
        let link = baseUrl+`/filter_by_author?sortProp=id&sortOrder=desc&Take=${take}&Skip=${skip}&userId=${userId}`;
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

    async getPetitionItem(token, id){
        let link = baseUrl+'/api/Petition/'+id;
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

    async addPetitionItem(token, petition){
        let link = baseUrl+'/api/Petition';
        let options = {headers: headers(token)};
        try{
            let response = await Vue.http.post(link, petition, options);
            console.log(response);
            console.log(response.body);
            return response.body;
        } catch(error){
            console.log(error);
            return null;
        }
    },

    async addAnswerToPetition(token, petitionId, petition){
        let link = baseUrl+'/api/Petition/addAnswer?id='+petitionId;
        let options = {headers: headers(token)};
        try{
            let response = await Vue.http.put(link, petition, options);
            console.log(response);
            console.log(response.body);
            return response.body;
        } catch(error){
            console.log(error);
            return null;
        }
    },







//-------------------------------------------------------------//
//--------------------- Votes api -----------------------------//
    async getVotesCount(token, petitionId){
        let link = baseUrl+'/votes_number?petitionId='+petitionId;
        let options = {headers: headers(token)};
        try{
            let response = await Vue.http.get(link, options);
            return response.body;
        } catch(error){
            console.log(error);
            return 0;
        }
    },

    async votePetition(token, petitionId, userId){
        let link = baseUrl+'/api/Votes?userId='+userId+'&petitionId='+petitionId;
        let options = {headers: headers(token)};
        try{
            let response = await Vue.http.post(link, {}, options);
            return response.body;
        } catch(error){
            console.log(error);
            return null;
        }
    },

    async deleteVote(token, voteId){
        let link = baseUrl+'/api/Votes/'+voteId;
        let options = {headers: headers(token)};
        try{
            let response = await Vue.http.delete(link, options);
            return true;
        } catch(error){
            console.log(error);
            return false;
        }
    },

//-------------------------------------------------------------//
//----------------------Application API------------------------//
    async createApplication(token, application){
        let link = baseUrl+'/api/Application';
        let options = {headers: headers(token)};
        try{
            let response = await Vue.http.post(link, application, options);
            return response.body;
        } catch(error){
            console.log(error);
            return null;
        }
    },
    async updateStatusApplication(token, id, status){
        let link = baseUrl+`/changeStatus/${id}?statusDto=${status}`;
        let options = {headers: headers(token)};
        try{
            let response = await Vue.http.put(link, options);
            return response.body;
        } catch(error){
            console.log(error);
            return null;
        }
    },
    async updateAnswerApplication(token, id, userId){
        let link = baseUrl+`/changeAnswerer?applicationId=${id}&answererId=${userId}`;
        let options = {headers: headers(token)};
        try{
            let response = await Vue.http.put(link, options);
            console.log(response);
            console.log(response.body);
            return response.body;
        } catch(error){
            console.log(error);
            return null;
        }
    },
    async updateResultApplication(token, id, result){
        console.log("In appi");
        let link = baseUrl+`/addResult/${id}`
        let message = {'result': result};
        let options = { emulateJSON: true, headers: headers(token) };
        try{
            console.log("SEND");
            let response = await Vue.http.put(link, message, options);
            console.log("GET");
            console.log();
            return response.body;
        } catch(error){
            console.log(error);
            return null;
        }
    },
    async deleteApplication(token, id){
        let link = baseUrl+'/api/Application/'+id;
        let options = {headers: headers(token)};
        try{
            let response = await Vue.http.delete(link, options);
            return true;
        } catch(error){
            console.log(error);
            return false;
        }
    },
    async getListOfApplication(token, skip, take){
        let link = baseUrl+`/api/Application?SortProp=id&SortOrder=desc&Skip=${skip}&Take=${take}`;
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
    async getListOfApplicationByStatus(token, skip, take, status){
        if(!status||status>3) status=0;
        let link = baseUrl+`/getListFilteredByStatus?SortProp=id&SortOrder=desc&Skip=${skip}&Take=${take}&status=${status}`;
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

    async getListOfApplicationByAuthor(token, skip, take, status, author){
        let link = baseUrl+`/getListFilteredByAuthor?SortProp=id&SortOrder=desc&Skip=${skip}&Take=${take}`;
        if(!status||status>3) status=0;
        link+=`&status=${status}&authorId=${author}`;
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

    async getListOfApplicationByAnswerer(token, skip, take, status, answerer){
        let link = baseUrl+`/getListFilteredByAnswerer?SortProp=id&SortOrder=desc&Skip=${skip}&Take=${take}`;
        if(!status||status>3) status=0;
        link+=`&status=${status}&answererId=${answerer}`;
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

    async getApplicationItem(token, id){
        let link = baseUrl+'/api/Application/'+id;
        let options = {headers: headers(token)};
        try{
            let response = await Vue.http.get(link, options);
            return response.body;
        } catch(error){
            console.log(error);
            return null;
        }
    },

//-------------------------------------------------------------//
}


