<template>
    <b-row class="min-vh-100 pt-2">
        <b-col order="2" order-md="1" order-sm="2"  md="9">
            <router-view :petition_header="petition.header"
                         :petition_text="petition.text"
                         :petition_authorName="petition.authorName"
                         :petition_startDate="petition.starDate"
                         :petition_answer="petition.answer"/>
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
                        :progress="calculateVotesPercent(petition.votesNumber, petition.minVotes)"
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
                    <div class="text-center">{{votesString(petition.votesNumber)}} з {{petition.minVotes}}</div>
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
                <div class="mt-1 text-center"> <span><b-icon :icon="statusIcon(petition.votesNumber, petition.minVotes, petition.finishDate, petition.answer)"/> {{status(petition.votesNumber, petition.minVotes, petition.finishDate, petition.answer)}}</span>
                </div>
            </div>
        </b-col>

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
    export default {
        name: "PetitionItem",
        components: {
            VueCircle, PetitionItemText, PetitionItemVotes,
        },
        data(){
            return{
                fill : { color: "#2bbcfa" },
                petition:  {id: 3,
                            header: "Header of Petition can be very very long",
                            text: "HEre is text very-very-very-long-text"+
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod" +
                                "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
                                "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo" +
                                "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse" +
                                "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non" +
                                "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n" +
                                "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod" +
                                "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
                                "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo" +
                                "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse" +
                                "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non" +
                                "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n" +
                                "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod" +
                                "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
                                "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n" +
                                "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n" +
                                "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n" +
                                "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n" +
                                "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n" +
                                "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n" +
                                "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n" +
                                "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n" +
                                "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n" +
                                "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                            answer: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod" +
                                "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
                                "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo" +
                                "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse" +
                                "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non" +
                                "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n" +
                                "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod" +
                                "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
                                "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo" +
                                "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse" +
                                "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non" +
                                "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                            starDate: "27.02.2021, 18:04:47",
                            finishDate: "27.06.2021, 18:04:47",
                            authorName: "Last First Second",
                            authorId: 1,
                            votesNumber: 2503,
                            minVotes: 2500},
            }
        },
        methods: {
            endDate: (finish) => {
                return endPetitionDate(finish)
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
                return statusPetitionIcon(currentVotes, minVotes, finishDate, result)
            },
            status: (currentVotes, minVotes, finishDate, result) => {
                return statusPetitionLine(currentVotes, minVotes, finishDate, result)
            },
            lastDate: (finishDate) => {
                return lastPetitionDate(finishDate)
            },
        },
    }
</script>

<style scoped>

</style>