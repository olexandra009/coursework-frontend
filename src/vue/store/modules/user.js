import Vue from "vue";
import  apiMethod from '../../../api/api-methods';

const state = () => ({currentUser: null, token: null, roles: []});
const getters={};
const actions={
    changeUser({commit, state}, {user}){
        console.log(user);
        commit('changeUserMutation', user);
    },
    logout({commit, state}){
      commit('logoutUser');
    },
    inputFromLocale({commit, state}, {user, token}){
        commit('fromLocale', {u: user, t: token});
    },
    async login({commit, state}, {login, password}){
        let result = await apiMethod.login(login, password);
        if(result.errorType === undefined)
        {
            commit('loginUser', result);
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
    changeUserMutation(state, data){
        //console.log(data);
        state.currentUser = data;
        localStorage.setItem('user', JSON.stringify(state.currentUser));
    },
    logoutUser(state){
      state.currentUser = null;
      state.token = null;
      state.rules = []
    },
    loginUser(state, data){
        state.token = data.access_token;
        state.currentUser = data.user;
        state.roles = state.currentUser.role.split(', ');
        localStorage.setItem('token', state.token);
        localStorage.setItem('user', JSON.stringify(state.currentUser));
    },
    fromLocale(state, data){
        state.token = data.t;
        state.currentUser = data.u;
        state.roles = state.currentUser.role.split(', ');
    }
};

export default {
    namespaced: 'user',
    state,
    getters,
    actions: actions,
    mutations: mutations,
};