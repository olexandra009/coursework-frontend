<template>
    <div class="min-vh-100">
        <h4 class="text-center mt-2">Інформація про заявку {{ $route.params.id }}</h4>
        <div class="min-vh-60">
            <div>
                <b-row>
                    <b-col sm="3">Статус:</b-col>
                    <b-col sm="9"><b-icon :icon="getIconStatus(application.status)"/> {{getStatusLine(application.status)}}</b-col>
                </b-row>
                <b-row>
                    <b-col sm="3">Автор:</b-col>
                    <b-col sm="9"><router-link :to="`/users/${application.authorId}`">{{getName(application.author)}}</router-link></b-col>
                </b-row>
                <b-row>
                    <b-col sm="3">Час створення:</b-col>
                    <b-col sm="9">{{getDate(application.openDate)}}</b-col>
                </b-row>
                <b-row>
                    <b-col sm="3">Тема:</b-col>
                    <b-col sm="9">{{application.subject}}</b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col sm="12" v-html="formatText(application.text)"/>
                </b-row>
                <photo-tab :multimedia="application.multimedias" :id_tab="application.id"/>
            </div>
            <div class="mt-4" v-if="application.status==3">
                <b-row>
                    <b-col sm="3">Автор відповіді:</b-col>
                    <b-col sm="9">{{getName(application.answerer)}}</b-col>
                </b-row>
                <b-row class="smallerText">
                    <b-col sm="3">Дата відповіді:</b-col>
                    <b-col sm="9">{{getDate(application.closeDate)}}</b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col sm="12" v-html="formatText(application.result)"/>
                </b-row>
            </div>
        </div>
        <div class="mt-3 mb-3" v-if="application.status===1 && adminRight">
            <b-row>
                <b-col>
                     <b-button class="btn-block" variant="info" @click="addAnswerer">Взяти в розробку</b-button>
                </b-col>
            </b-row>
        </div>
        <form-application-answer-created :answer="application.result" :appid="application.id" v-if="application.status==2"/>
    </div>
</template>

<script>
    import {editHtmText, getIconApplicationStatus, getStatusApplicationLine} from "../../../js/utility";
    import FormApplicationAnswerCreated from "../inner-components/created-forms/FormApplicationAnswerCreated.vue";
    import Vuex from "vuex";
    import PhotoTab from "../inner-components/PhotoTab.vue";
    export default {
        name: "ApplicationItem",
        metaInfo: {
            title: 'Зверенення',
        },
        components: {PhotoTab, FormApplicationAnswerCreated},
        computed: Vuex.mapState({
            application: state=>state.application.selectedApplication,
        }),
        async created() {
            let u = localStorage.user;
            if(u===undefined)
                this.router.push('/');
            let user = JSON.parse(u);
            if(user===undefined||user===null)
                this.router.push('/');
            let roles = user.role.split(', ');
            if(!roles.includes("ApplicationAdmin"))
                this.adminRight = false;

            let id = this.$route.params.id;
            await this.$store.dispatch('application/getApplicationItem', {'id':id});
        },

        mounted: async function(){
            let id = this.$route.params.id;
            await this.$store.dispatch('application/getApplicationItem', {'id':id});
        },
        methods:{
            ...Vuex.mapActions(['getApplicationItem', 'updateAnswererApplicationItem']),
            formatText(text){return editHtmText(text)},
            getDate(time){return new Date(time).toLocaleString()},
            getName(user){return user.lastName+' '+user.firstName+' '+user.secondName},
            getStatusLine(t){return getStatusApplicationLine(t)},
            getIconStatus(t){return getIconApplicationStatus(t)},
            async addAnswerer(){
                let id = this.$route.params.id;
                await this.$store.dispatch('application/updateAnswererApplicationItem', {'id':id});
                //location.reload();
            },
        },
        data(){
            return{
                adminRight: true,
            }
        }
    }
</script>

<style scoped>

</style>