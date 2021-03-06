import Vue from "vue";
import Vuex from "vuex";
import apiMethods from "../../../api/api-methods";

const state = () => ({all: [], selectedEvent: null, currentItem: -1, takeValue: 10, totalItem: 0});
const getters={};
const actions={
    async addNewEvent({commit, state},{events}){
        let token = localStorage.getItem('token');
        let result = await apiMethods.createEventItem(token, events);
        if(result==null)
            return false;
        commit('createEventMutation', result);
        return true;
    },
    async getListOfEvents({commit, state}){
        let token = localStorage.getItem('token');
        let result = await apiMethods.getEventsList(token);
        if(result===null)
            return false;
        commit('getListEventsMutation', result);
    },
};
const mutations={
    createEventMutation(state, data){
        state.all.push(data);
    },

    getListEventsMutation(state, data){
      state.totalItem = data.total;
      state.all = data.result;
    },
};

export default {
    namespaced: 'events',
    state,
    getters,
    actions: actions,
    mutations: mutations,
};