import Vue from "vue";
import  apiMethod from '../../../api/api-methods';

const state = () => ({organizationList: [], selectedOrganization: null, current:0, total:0});
const getters={};
const actions={
    async  deleteOrganizationItem({commit, state}, {orgId}){
        let token = localStorage.getItem('token');
        let response = await apiMethod.deleteOrganizationItem(token, orgId);
        if(response===false)
            return false;
        commit('deleteOrganizationMutation', orgId);
        return true;
    },

    async getOrganizationItem({commit, state}, {orgId}){
        let token = localStorage.getItem('token');
        let response= await apiMethod.getOrganizationItem(token, orgId);
        if(response== null) return ;
        let users = await apiMethod.getOrganizationItemUsers(token, orgId);
        response.users = users;
        commit('getItemOrganizationMutation', response);
    },

    async getListOfOrganization({commit, state}){
         let token = localStorage.getItem('token');
         let response = await apiMethod.getOrganizationList(token, null, null);
         if(response!=null)
             commit('getListOfOrganizationMutation', response);
    }
};
const mutations={
    deleteOrganizationMutation(state, date){
        let i = state.organizationList.findIndex(org => org.id===date.id);
        state.organizationList.splice(i, 1);
        state.selectedOrganization = null;
    },
    getItemOrganizationMutation(state, date){
        state.selectedOrganization = date;
    },
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