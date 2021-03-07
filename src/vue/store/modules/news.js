import Vue from "vue";
import apiMethods from '/src/api/api-methods';

const state = () => ({all: [], selectedNews: null, currentItem: -1, skip: 0, takeValue: 4, total: 0, selOrgId: null});
const getters={};
const actions={
        resetNewsStore({commit}){
            commit('resetNewsStoreMutation');
        },
        async getNewsItem({commit, state},{id}){
            let token = localStorage.getItem('token');
            let result = await apiMethods.getNewsItem(token, id);
            if(result===null)
                return false;
            commit('itemNewsMutation', result);
        },
        async getListOfNews({commit, state},{organization}){
            let token = localStorage.getItem('token');
            let result;
            if(organization)
                result = await apiMethods.getNewsListFiltered(token, state.takeValue, state.skip, organization);
            else
                result = await apiMethods.getNewsList(token, state.takeValue, state.skip);
            state.selOrgId = organization;
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
    resetNewsStoreMutation(state){
        state.all= [];
        state.skip= 0;
        state. takeValue= 4;
        state.total= 0;
    },
    addNewsItemMutation(state, data){
        state.all.unshift(data);
        state.total+=1;
        state.skip+=1;
    },
    listNewsMutation(state, data){
        const  targetNews = state.all.concat(data.result);
        state.all = [];
        let pushed = {};
         for(let r of targetNews) {
            if (!(r.id in pushed)) {
                state.all.push(r);
                pushed[r.id] = 1
             }
         }
        state.total = data.total;
        if(state.skip>state.total)
            state.skip = state.total-state.takeValue;
        state.skip+=state.takeValue;
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