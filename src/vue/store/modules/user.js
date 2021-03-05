import Vue from "vue";
import  apiMethod from '../../../api/api-methods';

const state = () => ({currentUser: null, token: null, roles: [], userList:[], openedUser: null, selectedUser: null, current:0, total:0, filterRole: null});
const getters={};
const actions={

    async getListOfUsers({commit, state}, {role}){
        if(role)
            state.filterRole = role;
        let result = await apiMethod.getUserList(state.token, state.filterRole, null, null);
        if(result){
            commit('userListMutation', result);
        }
    },

    changeSelectedUser({commit, state}, {user}){
        commit('changeSelectedUserMutation', user);
    },

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
    changeSelectedUserMutation(state, data){
         state.selectedUser= data;
    },
    userListMutation(state, data){
      state.total = data.total;
      state.userList = data.result;
      state.current = data.result.length;
    },

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