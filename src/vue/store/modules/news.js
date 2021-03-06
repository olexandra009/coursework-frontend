import Vue from "vue";
import apiMethods from '/src/api/api-methods';

const state = () => ({all: [], selectedNews: null, currentItem: -1, takeValue: 10, totalItem: 0});
const getters={};
const actions={
        async getNewsItem({commit, state},{id}){
            let token = localStorage.getItem('token');
            let result = await apiMethods.getNewsItem(token, id);
            if(result===null)
                return false;

            commit('itemNewsMutation', result);
        },
        async getListOfNews({commit, state}){
            let token = localStorage.getItem('token');
            let result = await apiMethods.getNewsList(token);
            if(result===null)
                return false;
            commit('listNewsMutation', result);
        },
        async addNewNews({commit, state}, {news}){
            let token = localStorage.getItem('token');
            let result = await apiMethods.createNewsItem(token, news);
            if(result===null)
                return false;
            commit('addNewsItemMutation', result);
            return true;
        },
        async updateNewsItem({commit, state}, {id, news}){
            let token = localStorage.getItem('token');
            let result = await apiMethods.updateNewsItem(token, id, news);
            if(result===null)
                return false;
            console.log(result);
            console.log(state.selectedNews);
            commit('updateNewsItemMutation', result);
            return true;
        },

        async deleteNewsItem({commit, state}, {id}){
            let token = localStorage.getItem('token');
            let result = await apiMethods.deleteNewsItem(token, id);
            if(!result)
                return false;
            commit('deleteNewsItemMutation', id);
            return true;
        }
};
const mutations={
    addNewsItemMutation(state, data){
        state.all.unshift(data);
    },
    listNewsMutation(state, data){
        state.all = data.result;
        state.total = data.total;
    },
    itemNewsMutation(state, data){
        state.selectedNews = data;
    },
    updateNewsItemMutation(state, data){
        state.selectedNews = data;
    },
    deleteNewsItemMutation(state, data){
        let id = parseInt(data);
        let i = state.all.findIndex(news => news.id===id);
        state.all.splice(i, 1);
        state.selectedNews = null;
    }
};

export default {
    namespaced: 'news',
    state,
    getters,
    actions: actions,
    mutations: mutations,
};