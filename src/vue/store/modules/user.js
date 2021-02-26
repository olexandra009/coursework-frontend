import Vue from "vue";

const state = () => ({currentUser: null, token: null, roles: []});
const getters={};
const actions={};
const mutations={};

export default {
    namespaced: 'user',
    state,
    getters,
    actions: actions,
    mutations: mutations,
};