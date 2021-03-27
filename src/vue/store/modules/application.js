import Vue from "vue";
import apiMethods from '/src/api/api-methods';

const state = () => ({all: [], selectedApplication: null, currentItem: -1, status: 0, skip:0, author: false, answerer: false, takeValue: 4, totalItem: 0});
const getters={};
const actions={
    async getListOFApplication({commit, state},{answerer, author, status}){
        let userId = (JSON.parse(localStorage.getItem('user'))).id;
        let token = localStorage.getItem('token');
        let result;
        if(answerer)
            result = await apiMethods.getListOfApplicationByAnswerer(token, state.skip, state.takeValue, status, userId);
        else if (author)
            result = await apiMethods.getListOfApplicationByAuthor(token, state.skip, state.takeValue, status, userId);
        else if (status)
            result = await apiMethods.getListOfApplicationByStatus(token, state.skip, state.takeValue, status);
        else
            result = await apiMethods.getListOfApplication(token,state.skip, state.takeValue);
        state.answerer = answerer;
        state.author = author;
        state.status = status;
        if(result===null) return false;
        commit('listApplicationMutation', result);
    },
    async getApplicationItem({commit, state},{id}){
        let token = localStorage.getItem('token');
        let result = await apiMethods.getApplicationItem(token, id);
        if(result===null) return false;
        commit('getItemApplicationMutation', result);
        return true;
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
        commit('updateApplicationItemMutation', response);
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
        commit('updateApplicationItemMutation', result);
    },
    async createApplicationItem({commit, state},{application}){
        let token = localStorage.getItem('token');
        let result = await apiMethods.createApplication(token, application);
        console.log(result);
        if(result===null) return false;
        commit('createApplicationItemMutation', result);

    },
    resetApplicationStore({commit}){
      commit('resetApplicationStoreMutation');
    },
};
const mutations={
    listApplicationMutation(state, data){
        const targetEvents =  state.all.concat(data.result);
        state.all = [];
        let pushed = {};
        for(let r of targetEvents) {
            if (!(r.id in pushed)) {
                state.all.push(r);
                pushed[r.id] = 1
            }
        }
       state.totalItem = data.total;
        if(state.skip>=state.totalItem) {
            state.skip = state.totalItem - state.takeValue;
        }
        state.skip+=state.takeValue;
    },
    resetApplicationStoreMutation(state){
        state.all=[];
        state.skip= 0;
        state.totalItem= 0;
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
       state.selectedApplication.answerer = data.answerer;
       state.selectedApplication.answererId = data.answererId;
       state.selectedApplication.status = data.status;
       state.selectedApplication.result = data.result;
       state.selectedApplication.closeDate = data.closeDate;
       let i = state.all.findIndex(app => app.id===data.id);
       state.all[i] = state.selectedApplication;
    },
    createApplicationItemMutation(state, data){
        state.all.unshift(data);
        state.skip+=1;
    },
};

export default {
    namespaced: 'application',
    state,
    getters,
    actions: actions,
    mutations: mutations,
};