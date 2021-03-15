import apiMethods from '/src/api/api-methods';

const state = () => ({all: [], selectedPetition: null, status: null, minVotes: 100, skip:0, takeValue: 4, totalItem: 0});
const getters={};
const actions={
    resetFilter({commit}){
      commit('resetFilterMutation');
    },
    async getPetitionList({commit, state}, {mine, status}){
        let token = localStorage.getItem('token');
        let result;
        let userId;
        if(mine)
            userId = (JSON.parse(localStorage.getItem('user'))).id;

        console.log("IN PETITION: "+mine);
        if(mine&&status)
            result = await apiMethods.getListOfPetitionByStatusAndAuthor(token, userId, status, state.takeValue, state.skip);
        else if (status)
            result = await apiMethods.getListOfPetitionByStatus(token, status, state.takeValue, state.skip);
        else if (mine)
            result = await apiMethods.getListOfPetitionByAuthor(token, userId, state.takeValue, state.skip);
        else
            result = await apiMethods.getListOfPetition(token, state.takeValue, state.skip);

        state.status = status;

        if(result == null) return;
        for (const r of result.result) {
            let count = await apiMethods.getVotesCount(token, r.id);
            r.votesNumber = count.count;
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
    async vote({commit, state}, {id}){
        let token = localStorage.getItem('token');
        let user = JSON.parse(localStorage.getItem('user'));
        let voteResult =  await apiMethods.votePetition(token, id, user.id);
        if(voteResult==null)
            return false;
        commit('votePetitionMutation', voteResult);
        return true;
    },
    async deleteVote({commit, state}){
        let token = localStorage.getItem('token');
        let userId= (JSON.parse(localStorage.getItem('user'))).id;
        let vote = state.selectedPetition.userVotes.find(vote=> vote.userId===userId);
        let result = await apiMethods.deleteVote(token, vote.id);
        if(!result) return false;
        commit('deleteVoteMutation', vote.id);
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
        let target = state.all.concat(data.result);
        state.all = [];
        let pushed = {};
        for(let r of target) {
            if (!(r.id in pushed)){
                state.all.push(r);
                pushed[r.id] = 1
            }
        }
        state.totalItem = data.total;
        if(state.skip>=state.totalItem) {
            state.skip = state.totalItem - state.takeValue;
        }
        state.skip+=state.takeValue;
    },
    resetFilterMutation(state){
        state.all=[];
        state.skip= 0;
        state.total= 0;
    },
    votePetitionMutation(state, data){
        state.selectedPetition.userVotes.unshift(data);
        state.selectedPetition.votesNumber+=1;
    },
    deleteVoteMutation(state, data){
        let id = parseInt(data);
        let i = state.selectedPetition.userVotes.findIndex(v => v.id===id);
        state.selectedPetition.userVotes.splice(i, 1);
        state.selectedPetition.votesNumber-=1;
    }
};

export default {
    namespaced: 'petition',
    state,
    getters,
    actions: actions,
    mutations: mutations,
};