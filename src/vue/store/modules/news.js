import Vue from "vue";
import apiMethods from '/src/api/api-methods';

const state = () => ({all: [], selectedNews: null, currentItem: -1, takeValue: 10, totalItem: 0});
const getters={};
const actions={
        async addNewNews({commit, state}, {news}){
            let token = localStorage.getItem('token');
            let result = apiMethods.createNewsItem(token, news);
            if(result===null)
                return false;
            commit('addNewsItemMutation', result);
        }
};
const mutations={
    addNewsItemMutation(state, data){
        state.all.unshift(data);
    }
};

export default {
    namespaced: 'news',
    state,
    getters,
    actions: actions,
    mutations: mutations,
};