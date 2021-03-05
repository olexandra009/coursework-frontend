import Vue from "vue";
import  apiMethod from '../../../api/api-methods';

const state = () => ({organizationList: [], selectedOrganization: null, current:0, total:0});
const getters={};
const actions={
    async getListOfOrganization({commit, state}){
         let token = localStorage.getItem('token');
         let response = await apiMethod.getOrganizationList(token, null, null);
         if(response!=null)
             commit('getListOfOrganizationMutation', response);
    }
};
const mutations={
    getListOfOrganizationMutation(state, data){
        state.organizationList= data.result;
        state.total = data.total;
    }
};


export default {
    namespaced: 'organization',
    state,
    getters,
    actions: actions,
    mutations: mutations,
};