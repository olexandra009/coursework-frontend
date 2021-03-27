<template>
    <div>
        <h4 class="">{{petition.header}}</h4>
        <div class="">
            <div>Автор: {{authorName(petition.author)}}</div>
            <div>Оприлюднено: {{voteDate(petition.starDate)}}</div>
        </div>
        <div class="mt-4">
            <b-row v-for="vote in votes" :key="vote.id">
                <b-card class="w-100 mt-1">
                    <b-row class="mt-0 mb-0">
                        <b-col sm="6">{{authorName(vote.user)}}</b-col>
                        <b-col class="d-none" sm="1"/>
                        <b-col sm="5">{{voteDate(vote.dateTimeCreated)}}</b-col>
                    </b-row>
                </b-card>
            </b-row>
        </div>
    </div>
</template>

<script>
    import Vuex from "vuex";

    export default {
        name: "PetitionItemVotes",
        computed: Vuex.mapState({
            petition: state=> state.petition.selectedPetition,
            votes: state=> state.petition.selectedPetition.userVotes,
        }),
        methods:{
          voteDate(date){

             return new Date(date).toLocaleString();
          },
          authorName(user){
            return user.lastName+' '+user.firstName+' '+(user.secondName?user.secondName:'');
          },
        },
    }
</script>

<style scoped>

</style>