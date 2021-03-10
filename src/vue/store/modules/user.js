import Vue from "vue";
import  apiMethod from '../../../api/api-methods';

const state = () => ({currentUser: null, token: null, roles: [], userList:[], openedUser: null, selectedUser: null, current:0, total:0, skip:0, takeValue: 4, filterRole: null});
const getters={};
const actions={

    async getListOfUsers({commit, state}, {role}){
        if(role)
            state.filterRole = role;
        let result = await apiMethod.getUserList(state.token, state.filterRole, state.takeValue, state.skip);
        if(result){
            commit('userListMutation', result);
        }
    },

    resetUserList({commit}){
        commit('resetUserListMutation');
    },

    changeSelectedUser({commit, state}, {user}){
        commit('changeSelectedUserMutation', user);
    },

    async changeOrganization({commit, state}, {userId, orgId, orgName}){
        let token = localStorage.getItem('token');
        if(orgId===null) return null;
        let user = await apiMethod.changeUserOrganizationItem(token, userId, orgId);
        console.log(user);
        if(user === null) return false;
        user.userOrganizationName = orgName;
        commit('changeSelectedUserMutation', user);
        return true;
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
          let target = state.userList.concat(data.result);
          state.userList = [];
          let pushed = {};
          for(let r of target) {
                if (!(r.id in pushed)){
                    state.userList.push(r);
                    pushed[r.id] = 1
                }
          }
          if(state.skip>=state.total) {
                state.skip = state.total - state.takeValue;
          }
          state.skip+=state.takeValue;
    },
    resetUserListMutation(state){
        state.userList = [];
        state.skip = 0;
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