<template>
    <b-row class="min-vh-100 pt-2">
        <b-col order="2" order-md="1" order-sm="2"  md="9">
            <router-view/>
        </b-col>
        <b-col order="1"  order-md="2" order-sm="1" md="3">
            <div class="d-block d-sm-block d-md-none">
                <b-progress :value="petition.votesNumber" :max="petition.minVotes"/>
                <div class="text-center">{{petition.votesNumber}} {{votesString(petition.votesNumber)}} з {{petition.minVotes}} необхідних</div>
                <div class="m-auto" style="width: 160px;">
                   {{lastDate(petition.finishDate)}}
                </div>
                <div class="mt-1  d-flex justify-content-between">
                    <div v-if="$route.path===`/petition/${petition.id}/votes/${petition.id}`">
                        <router-link  :to="`/petition/${petition.id}`">Назад до тексту</router-link>
                    </div>
                    <div v-else>
                        <router-link  :to="`${petition.id}/votes/${petition.id}`">Зібрані підписи</router-link>
                    </div>
                    <b-button style="width: 165px" variant="info" v-if="endDate(petition.finishDate)">Підписати петицію</b-button>
                    <b-button style="width: 165px" variant="info" disabled v-else>Збір завершено</b-button>
                </div>
            </div>
            <div class="d-none d-sm-none d-md-block" style="position: fixed; width: 160px;">
                <vue-circle
                        :progress="calculateVotesPercent(petition.votesNumber, minVotes)"
                        :size="120"
                        :reverse="false"
                        line-cap="square"
                        :fill="fill"
                        empty-fill="rgba(0, 0, 0, .1)"
                        :animation-start-value="0.0"
                        :start-angle="-Math.PI"
                        insert-mode="append"
                        :thickness="5"
                        :show-percent="false"
                        @vue-circle-progress="progress"
                        @vue-circle-end="progress_end"
                        style="position: fixed; margin-left: 20px"/>
                <div class="mt-3" style="z-index: 10001; width: 160px; position: absolute" >
                    <div class="text-center">{{petition.votesNumber}}</div>
                    <div class="text-center">{{votesString(petition.votesNumber)}} з {{minVotes}}</div>
                    <div class="text-center">необхідних</div>
                </div>

                <div class="mt-3" style="height: 120px; width: 160px;"/>
                <div class="text-center" style="width: 160px;">
                    <span>{{lastDate(petition.finishDate)}}</span>
                </div>
                <div class="mt-1 text-center">
                    <b-button style="width: 165px" variant="info" v-if="endDate(petition.finishDate)">Підписати петицію</b-button>
                    <b-button style="width: 165px" variant="info" disabled v-else>Збір завершено</b-button>
                    <div v-if="$route.path===`/petition/${petition.id}/votes/${petition.id}`">
                        <router-link  :to="`/petition/${petition.id}`">Назад до тексту</router-link>
                    </div>
                    <div v-else>
                        <router-link  :to="`${petition.id}/votes/${petition.id}`">Зібрані підписи</router-link>
                    </div>
                </div>
                <div class="mt-1 text-center">
                    <span>
                        <b-icon :icon="statusIcon(petition.votesNumber, minVotes, petition.finishDate, petition.answer)"/> {{status(petition.votesNumber, minVotes, petition.finishDate, petition.answer)}}
                    </span>
                </div>
                <div class="mt-1 text-center">
                   <b-button style="width: 165px" v-b-modal.answer-add variant="info">Додати відповідь</b-button>
                </div>

            </div>
        </b-col>

        <b-modal id="answer-add" hide-footer>
            <template #modal-title>
               Відповідь на петицію
            </template>
            <b-form-textarea
                row="3"
                required/>
            <div class="d-flex justify-content-end">
                <b-button variant="outline-danger" class="mr-1" @click="$bvModal.hide('answer-add')">Підтвердити</b-button>
                <b-button variant="outline-info" @click="$bvModal.hide('answer-add')">Скасувати</b-button>
            </div>
        </b-modal>

    </b-row>

</template>

<script>
    import VueCircle from 'vue2-circle-progress/src/index.vue'
    import {
        endPetitionDate, lastPetitionDate,
        statusPetitionIcon,
        statusPetitionLine,
        votesPetitionString
    } from "../../../js/utility";
    import PetitionItemText from "../inner-components/PetitionItemText.vue";
    import PetitionItemVotes from "../inner-components/PetitionItemVotes.vue";
    import Vuex from "vuex";
    export default {
        name: "PetitionItem",
        components: {
            VueCircle, PetitionItemText, PetitionItemVotes,
        },
        computed: Vuex.mapState({
            petition: state=> state.petition.selectedPetition,
            minVotes: state=>state.petition.minVotes,
        }),
        mounted(){
             let id =this.$route.params.id;
             this.$store.dispatch('petition/getPetitionItem', {'petitionId':id});
        },
        data(){
            return{
                fill : { color: "#2bbcfa" },
            }
        },
        methods: {
            ...Vuex.mapActions(['getPetitionItem', 'addAnswerToPetition']),

            endDate: (finish) => {
                return endPetitionDate(new Date(finish).toLocaleString())
            },
            calculateVotesPercent: (current, min) => current * 100 / min,

            progress(event, progress, stepValue) {
                console.log(stepValue);
            },
            progress_end(event) {
                console.log("Circle progress end");
            },

            votesString: (numVote) => {
                return votesPetitionString(numVote)
            },
            statusIcon: (currentVotes, minVotes, finishDate, result) => {
                return statusPetitionIcon(currentVotes, minVotes, new Date(finishDate).toLocaleString(), result)
            },
            status: (currentVotes, minVotes, finishDate, result) => {
                return statusPetitionLine(currentVotes, minVotes, new Date(finishDate).toLocaleString(), result)
            },
            lastDate: (finishDate) => {
                return lastPetitionDate(new Date(finishDate).toLocaleString())
            },
        },
    }
</script>

<style scoped>

</style>