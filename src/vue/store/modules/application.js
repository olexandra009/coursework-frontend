import Vue from "vue";
import apiMethods from '/src/api/api-methods';

const state = () => ({all: [], selectedApplication: null, currentItem: -1, takeValue: 10, totalItem: 0});
const getters={};
const actions={
    async getListOFApplication({commit, state}){
        let token = localStorage.getItem('token');
        let result = await apiMethods.getListOfApplication(token);
        if(result===null) return false;
        commit('listApplicationMutation', result);
    },
    async getApplicationItem({commit, state},{id}){
        let token = localStorage.getItem('token');
        let result = await apiMethods.getApplicationItem(token, id);
        if(result===null) return false;
        commit('getItemApplicationMutation', result);
    },
    async deleteApplicationItem({commit, state},{id}){
        let token = localStorage.getItem('token');
        let result = await apiMethods.deleteApplication(token, id);
        if(!result) return false;
        commit('deleteApplicationItemMutation', id);
    },
    async updateResultApplicationItem({commit, state},{id, result}){
        console.log("I am here");
        let token = localStorage.getItem('token');
        console.log("Bring to appi");
        let response = await apiMethods.updateResultApplication(token, id, result);
        console.log("After response");
        if(response===null) return false;
        commit('updateApplicationItemMutation');
    },
    async updateStatusApplicationItem({commit, state}, {id, status}){
        let token = localStorage.getItem('token');
        let result = await apiMethods.updateStatusApplication(token, id, status);
        if(result===null) return false;
        commit('updateApplicationItemMutation');
    },
    async updateAnswererApplicationItem({commit, state}, {id}){
        let token = localStorage.getItem('token');
        let userId = JSON.parse(localStorage.getItem('user')).id;
        let result = await apiMethods.updateAnswerApplication(token, id, userId);
        if(result===null) return false;
        commit('updateApplicationItemMutation');
    },
    async createApplicationItem({commit, state},{application}){
        let token = localStorage.getItem('token');
        let result = await apiMethods.createApplication(token, application);
        if(result===null) return false;
        commit('createApplicationItemMutation');

    },
};
const mutations={
    listApplicationMutation(state, data){
       state.all = data.result;
       state.totalItem = data.total;
    },
    getItemApplicationMutation(state, data){
      state.selectedApplication = data;
    },
    deleteApplicationItemMutation(state, data){
        let id = parseInt(data);
        let i = state.all.findIndex(app => app.id===id);
        state.all.splice(i, 1);
        state.selectedApplication = null;
    },
    updateApplicationItemMutation(state, data){
       state.selectedApplication = data;
    },
    createApplicationItemMutation(state, data){
        state.all.unshift(data);
    },
};

export default {
    namespaced: 'application',
    state,
    getters,
    actions: actions,
    mutations: mutations,
};