import Vue from "vue";
import apiMethods from '/src/api/api-methods';

const state = () => ({all: [], selectedPetition: null, minVotes: 100, currentItem: -1, takeValue: 10, totalItem: 0});
const getters={};
const actions={
    async getPetitionList({commit, state}){
        let token = localStorage.getItem('token');
        let result = await apiMethods.getListOfPetition(token);
        if(result == null) return;
        for (const r of result.result) {
            let count = await apiMethods.getVotesCount(token, r.id);
            r.votesNumber = count;
        }
        commit('listPetitionMutation', result);
    },
    async getPetitionItem({commit, state},{petitionId}){
        let token = localStorage.getItem('token');
        let result = await apiMethods.getPetitionItem(token, petitionId);
        if(result == null) return;
        commit('itemPetitionMutation', result);
    },

    async addPetitionItem({commit, state},{petition}){
        let token = localStorage.getItem('token');
        let result = await apiMethods.addPetitionItem(token, petition);
        if(result == null) return false;
        commit('addItemPetitionMutation', result);
        return true;
    },
    async addAnswerToPetition({commit, state}, {id, petition}){
        let token = localStorage.getItem('token');
        let result = await apiMethods.addAnswerToPetition(token, id, petition);
        if(result == null) return false;
        commit('addItemPetitionAddAnswerMutation', result);
        return true;
    },
};
const mutations={
    addItemPetitionMutation(state, data){
        console.log(state.all);
        state.all.unshift(data);
    },
    itemPetitionMutation(state, data){
        state.selectedPetition = data;
    },
    addItemPetitionAddAnswerMutation(state, data){
        state.selectedPetition = data;
    },
    listPetitionMutation(state, data){
        state.all = data.result;
        state.total = data.total;
    }
};

export default {
    namespaced: 'petition',
    state,
    getters,
    actions: actions,
    mutations: mutations,
};