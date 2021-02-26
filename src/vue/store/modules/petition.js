import Vue from "vue";

const state = () => ({all: [],  currentItem: -1, takeValue: 10, totalItem: 0});
const getters={};
const actions={};
const mutations={};

export default {
    namespaced: 'petition',
    state,
    getters,
    actions: actions,
    mutations: mutations,
};