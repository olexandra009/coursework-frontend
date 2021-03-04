import Vue from "vue";
import  apiMethod from '../../../api/api-methods';

const state = () => ({currentUser: null, token: null, roles: []});
const getters={};
const actions={
    async login({commit, state}, {login, password}){
        console.log(login);
        console.log(password);
        let result = await apiMethod.login(login, password);
        console.log(result);

    }
};
const mutations={};

export default {
    namespaced: 'user',
    state,
    getters,
    actions: actions,
    mutations: mutations,
};