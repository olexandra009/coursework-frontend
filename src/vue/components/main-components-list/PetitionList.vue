<template>
    <div class="w-100 pt-3">
        <form-petition-created/>
        <b-row class="text-center">
            <!--Here will be filtered things-->
        </b-row>
        <b-row v-for="item in petition" :key="item.id">
            <b-card class="mt-2 w-100  bg-light">
               <b-row>
                   <b-col sm="12" md="8" order="2" order-sm="2" order-md="1"  order-lg="1" order-xl="1">
                       <router-link  v-bind:to="`/petition/${item.id}`"><h5>{{item.header}}</h5></router-link>

                   </b-col>
                   <b-col sm="12"  md="4"  order="1" order-sm="1" order-md="2" order-lg="2" order-xl="2">
                       <span>{{item.votesNumber}} {{votesString(item.votesNumber)}}</span>
                       <b-progress :value="item.votesNumber" height="5px" :max="item.minVotes" class="mb-3"/>
                       <p v-if="calculateDate(item.finishDate)">{{lastDate(item.finishDate)}}</p>
                       <span><b-icon :icon="statusIcon(item.votesNumber, item.minVotes, item.finishDate, item.answer)"/> {{status(item.votesNumber, item.minVotes, item.finishDate, item.answer)}}</span>
                   </b-col>
               </b-row>
            </b-card>
        </b-row>
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
    export default {
        name: "PetitionList",
        components: {FormPetitionCreated},
        data(){
            return {
                dateNow: new Date(),
                petition:[
                    {id: 0,
                        header: "Header of Petition can be very very long",
                        /*   text: "HEre is text very-very-very-long-text",*/
                        starDate: "27.02.2021, 18:04:47",
                        finishDate: "27.06.2021, 18:04:47",
                        authorName: "Last First Second",
                        authorId: 1,
                        votesNumber: 100,
                        minVotes: 2500},
                    {id: 2,
                        header: "Header of Petition can be very very long",
                        /*   text: "HEre is text very-very-very-long-text",*/
                        starDate: "27.02.2021, 18:04:47",
                        finishDate: "27.06.2021, 18:04:47",
                        authorName: "Last First Second",
                        authorId: 1,
                        votesNumber: 1000,
                        minVotes: 2500},
                    {id: 3,
                        header: "Header of Petition can be very very long",
                        /*   text: "HEre is text very-very-very-long-text",*/
                        starDate: "27.02.2021, 18:04:47",
                        finishDate: "27.06.2021, 18:04:47",
                        authorName: "Last First Second",
                        authorId: 1,
                        votesNumber: 2503,
                        answer: "HE IS ANSWER",
                        minVotes: 2500},
                    {id: 4,
                        header: "Header of Petition can be very very long",
                        /*   text: "HEre is text very-very-very-long-text",*/
                        starDate: "27.02.2021, 18:04:47",
                        finishDate: "22.02.2021, 18:04:47",
                        authorName: "Last First Second",
                        authorId: 1,
                        votesNumber: 203,
                        minVotes: 2500},

                ],
            }
        },
        methods: {
            calculateDate: (finishDate) => {
                return endPetitionDate(finishDate)
            },
            lastDate: (finishDate) => {
                return lastPetitionDate(finishDate)
            },
            statusIcon: (currentVotes, minVotes, finishDate, result) => {
                return statusPetitionIcon(currentVotes, minVotes, finishDate, result)
            },
            status: (currentVotes, minVotes, finishDate, result) => {
                return statusPetitionLine(currentVotes, minVotes, finishDate, result)
            },
            votesString: (numVote) => {
                return votesPetitionString(numVote)
            },
        }
    }
</script>

<style scoped>

</style>