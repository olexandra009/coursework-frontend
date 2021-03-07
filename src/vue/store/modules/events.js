import Vue from "vue";
import Vuex from "vuex";
import apiMethods from "../../../api/api-methods";

const state = () => ({all: [], selectedEvent: null, currentItem: -1, skip:0, takeValue: 4, totalItem: 0});
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
        let result = await apiMethods.getEventsList(token, state.takeValue, state.skip);
        if(result===null)
            return false;
        commit('getListEventsMutation', result);
    },
    async getEventItem({commit, state}, {id}) {
        let token = localStorage.getItem('token');
        let result = await apiMethods.getEventsItem(token, id);
        if(result==null)
            return;
        commit('itemEventMutation', result);
    },
    async updateEventItem({commit, state},{id, events}) {
        let token = localStorage.getItem('token');
        let result = await apiMethods.updateEventsItem(token, id, events);
        if(result==null)
            return false;
        commit('updateEventItemMutation', result);
        return true;
    },
    async deleteEventItem({commit, state}, {id}) {
        let token = localStorage.getItem('token');
        let result = await apiMethods.deleteEventsItem(token, id);
        if(!result)
            return false;
        commit('deleteEventItemMutation', id);
        return true;
    },
};
const mutations={
    createEventMutation(state, data){
        state.all.unshift(data);
    },
    itemEventMutation(state, data){
      state.selectedEvent = data;
    },
    getListEventsMutation(state, data){
        const  targetNews = state.all.concat(data.result);
        state.all = [];
        let pushed = {};
        for(let r of targetNews) {
            if (!(r.id in pushed)) {
                state.all.push(r);
                pushed[r.id] = 1
            }
        }
        state.totalItem = data.total;
        if(state.skip>state.total)
            state.skip = state.total-state.takeValue;
        state.skip+=state.takeValue;
    },
    updateEventItemMutation(state,data){
        state.selectedEvent = data;
    },
    deleteEventItemMutation(state, data){
        let id = parseInt(data);
        let i = state.all.findIndex(news => news.id===id);
        state.all.splice(i, 1);
        state.selectedEvent = null;
    }
};

export default {
    namespaced: 'events',
    state,
    getters,
    actions: actions,
    mutations: mutations,
};