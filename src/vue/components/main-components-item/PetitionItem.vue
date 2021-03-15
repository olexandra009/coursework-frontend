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
                    <div v-if="haveRights">
                        <b-button style="width: 165px" variant="info" v-if="canVotedPetition()">Підписати петицію</b-button>
                        <b-button style="width: 165px" variant="info" disabled v-else-if="votedStopped()">Збір завершено</b-button>
                        <b-button style="width: 165px" variant="info" @click="deleteVotePetition" v-else>Забрати голос</b-button>
                    </div>
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
                    <div v-if="haveRights">
                        <b-button style="width: 165px" variant="info" @click="votePetition" v-if="canVotedPetition()">Підписати петицію</b-button>
                        <b-button style="width: 165px" variant="info" disabled v-else-if="votedStopped()">Збір завершено</b-button>
                        <b-button style="width: 165px" variant="info" @click="deleteVotePetition" v-else>Забрати голос</b-button>
                    </div>
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
                   <b-button style="width: 165px" v-b-modal.answer-add variant="info" v-if="admin">Додати відповідь</b-button>
                </div>

            </div>
        </b-col>

        <b-modal id="answer-add" hide-footer>
            <template #modal-title>
               Відповідь на петицію
            </template>
            <b-form  v-on:submit.prevent="addAnswer" v-on:reset.prevent="resetAnswer">
                <b-form-textarea
                    row="3"
                    v-model="answerModel"
                    required/>
                <div class="d-flex justify-content-end">
                    <b-button variant="outline-info" type="submit" class="mr-1">Підтвердити</b-button>
                    <b-button variant="outline-info" type="reset">Скасувати</b-button>
                </div>
            </b-form>
        </b-modal>

    </b-row>

</template>

<script>
    import VueCircle from 'vue2-circle-progress/src/index.vue'
    import {
        endPetitionDate, lastPetitionDate,
        statusPetitionIcon,
        statusPetitionLine,
        votesPetitionString, editHtmText
    } from "../../../js/utility";
    import PetitionItemText from "../inner-components/PetitionItemText.vue";
    import PetitionItemVotes from "../inner-components/PetitionItemVotes.vue";
    import Vuex from "vuex";
    import petition from "../../store/modules/petition";
    export default {
        name: "PetitionItem",
        components: {
            VueCircle, PetitionItemText, PetitionItemVotes,
        },
        created() {
            let u = localStorage.user;
            if(u === undefined) {
                this.haveRights = false;
                this.admin = false;
                return;
            }
            let user = JSON.parse(u);
            if(user==null) {
                this.haveRights = false;
                this.admin = false;
                return;
            }
            let roles = user.role.split(', ');
            this.haveRights = !!roles.includes('SuperUser');
            this.admin = roles.includes('ApplicationAdmin');
            if(user.id == this.news.authorId){
                this.haveRights = true;
            }
        },
        computed: Vuex.mapState({
            petition: state=> state.petition.selectedPetition,
            minVotes: state=>state.petition.minVotes,
        }),
        mounted: async function(){
             let id =this.$route.params.id;
             await this.$store.dispatch('petition/getPetitionItem', {'petitionId':id});
             console.log(this.petition);
             console.log(this.petition.userVotes);
        },
        data(){
            return{
                fill : { color: "#2bbcfa" },
                answerModel: '',
                haveRights: true,
                admin: false,
            }
        },
        methods: {
            ...Vuex.mapActions(['getPetitionItem', 'addAnswerToPetition', 'vote','deleteVote']),
            votedStopped(){
                return !this.endDate(this.petition.finishDate);
            },
            canVotedPetition(){
              if(this.votedStopped()) return false;
              let u = localStorage.getItem('user');
              if(u===undefined||u===null)return false;
              let user = JSON.parse(u);
              if(user===undefined||user===null)return false;
              let userId = user.id;
              let userVote = this.petition.userVotes.find(vote=>vote.userId===userId);
              console.log(userVote);
              if(userVote) return false;
              return true;
            },

            async votePetition(){
                let id =this.$route.params.id;
                let i = await this.$store.dispatch('petition/vote', {'id':id});

            },
            async deleteVotePetition(){
                let i = await this.$store.dispatch('petition/deleteVote');
            },

            async addAnswer(){
                let id =this.$route.params.id;
                let answer = editHtmText(this.answerModel);
                let petition = {'answer': answer};
                let i = await this.$store.dispatch('petition/addAnswerToPetition', {'id':id, 'petition':petition});
                this.resetAnswer();
                location.reload();
            },
            resetAnswer(){
                this.answerModel = "";
                this.$bvModal.hide('answer-add');
            },
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