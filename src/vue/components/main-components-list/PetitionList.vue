<template>
    <div class="w-100 min-vh-100 mt-1">

        <b-button class="mt-3 btn-block"  v-b-toggle.create-petition-collapse variant="outline-info" v-if="haveRights">Створити нову петицію</b-button>
        <b-collapse id="create-petition-collapse" class="mt-2" v-if="haveRights">
            <form-petition-created/>
        </b-collapse>

        <form-petition-filter/>

        <b-row v-for="item in petition" :key="item.id">
            <b-card class="mt-2 w-100  bg-light">
               <b-row>
                   <b-col sm="12" md="8" order="2" order-sm="2" order-md="1"  order-lg="1" order-xl="1">
                       <router-link  v-bind:to="`/petition/${item.id}`"><h5>{{item.header}}</h5></router-link>

                   </b-col>
                   <b-col sm="12"  md="4"  order="1" order-sm="1" order-md="2" order-lg="2" order-xl="2">
                        <span>{{item.votesNumber}}  {{votesString(item.votesNumber)}}</span>
                        <b-progress :value="item.votesNumber" height="5px" :max="minVotes" class="mb-3"/>
                        <p v-if="calculateDate(item.finishDate)">{{lastDate(item.finishDate)}}</p>
                        <span><b-icon :icon="statusIcon(item.votesNumber, minVotes, item.finishDate, item.answer)"/> {{status(item.votesNumber, minVotes, item.finishDate, item.answer)}}</span>
                 </b-col>
               </b-row>
            </b-card>
        </b-row>
        <petition-loader/>
        <div class="min-vh-5"/>
    </div>
</template>

<script>
    import {
        endPetitionDate,
        lastPetitionDate,
        statusPetitionIcon,
        statusPetitionLine, votesPetitionString
    } from "../../../js/utility";
    import FormPetitionCreated from "../inner-components/created-forms/FormPetitionCreated.vue";
    import FormPetitionFilter from "../inner-components/filtered-form/FormPetitionFilter.vue";
    import Vuex from 'vuex';
    import PetitionLoader from "../loading-components/PetitionLoader.vue";
    export default {
        name: "PetitionList",
        components: {PetitionLoader, FormPetitionFilter, FormPetitionCreated},
        computed: Vuex.mapState({
            petition: state=>state.petition.all,
            minVotes: state=>state.petition.minVotes,
        }),
        created() {
            let u = localStorage.user;
            if(u === undefined) {
                this.haveRights = false;
                return;
            }
            let user = JSON.parse(u);
            if(user == null) {
                this.haveRights = false;
                return;
            }
            let roles = user.role.split(', ');
            this.haveRights = !!roles.includes('SuperUser');
        },
        data(){
            return {
                dateNow: new Date(),
                haveRights: true,
            }
        },
        methods: {
            ...Vuex.mapActions(['getPetitionList', 'resetFilter']),
            calculateDate: (finishDate) => {
                return endPetitionDate(new Date(finishDate).toLocaleString())
            },
            lastDate: (finishDate) => {
                return lastPetitionDate(new Date(finishDate).toLocaleString())
            },
            statusIcon: (currentVotes, minVotes, finishDate, result) => {
                return statusPetitionIcon(currentVotes, minVotes, new Date(finishDate).toLocaleString(), result)
            },
            status: (currentVotes, minVotes, finishDate, result) => {
                return statusPetitionLine(currentVotes, minVotes, new Date(finishDate).toLocaleString(), result)
            },
            votesString: (numVote) => {
                return votesPetitionString(numVote)
            },
        }
    }
</script>

<style scoped>

</style>