import Vue from "vue";
import  apiMethod from '../../../api/api-methods';

const state = () => ({organizationList: [], selectedOrganization: null, current:0, total:0});
const getters={};
const actions={
    async updateOrganizationItem({commit, state}, {organization}){
        let token = localStorage.getItem('token');
        let response = await apiMethod.editOrganizationItem(token, organization);
        if(response==null)
            return false;
        commit('updateOrganizationItemMutation', response);
        return true;
    },
    async addOrganizationItem({commit, state}, {name, phone, address}){
        let token = localStorage.getItem('token');
        let response = await apiMethod.addOrganizationItem(token, name, phone, address);
        if(response===null)
            return false;
        commit('addOrganizationMutation', response);
        return true;
        
    },
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
    updateOrganizationItemMutation(state, data){
      state.selectedOrganization = data;
    },
    addOrganizationMutation(state, date){
      state.organizationList.unshift(date);
      state.total+=1
    },
    deleteOrganizationMutation(state, data){
        let id = parseInt(data);
        let i = state.organizationList.findIndex(org => org.id===id);
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