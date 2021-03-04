import Vue from "vue";
import  apiMethod from '../../../api/api-methods';

const state = () => ({currentUser: null, token: null, roles: []});
const getters={};
const actions={
    async login({commit, state}, {login, password}){
        let result = await apiMethod.login(login, password);
        if(result.errorType === undefined)
        {
            commit('loginUser', result);
            localStorage.setItem('token', result.access_token);
            return {error: false};
        }else{
            if(result.errorType==='expected')
                return {error: true, errorText: result.errorText};
            else
                return {error: true, errorText: 'Невідома помиилка'};
        }
    }
};
const mutations={
    loginUser(state, data){
        state.token = data.access_token;
        state.currentUser = data.user;
    }
};

export default {
    namespaced: 'user',
    state,
    getters,
    actions: actions,
    mutations: mutations,
};