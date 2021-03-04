<template>
    <div class="min-vh-100">
        <h4 class="text-center mt-2">Інформація про заявку {{ $route.params.id }}</h4>
        <div>
            <b-row>
                <b-col sm="3">Статус:</b-col>
                <b-col sm="9"><b-icon :icon="getIconStatus(application.status)"/> {{getStatusLine(application.status)}}</b-col>
            </b-row>
            <b-row>
                <b-col sm="3">Автор:</b-col>
                <b-col sm="9"><router-link :to="`/users/${application.authorId}`">{{application.authorName}}</router-link></b-col>
            </b-row>
            <b-row>
                <b-col sm="3">Час створення:</b-col>
                <b-col sm="9">{{application.openDate}}</b-col>
            </b-row>
            <b-row>
                <b-col sm="3">Тема:</b-col>
                <b-col sm="9">{{application.subject}}</b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col sm="12" v-html="formatText(application.text)"/>
            </b-row>
            <!--TODO: MULTIMEDIA-->
        </div>
        <div class="mt-4" v-if="application.status==3">
            <b-row>
                <b-col sm="3">Автор відповіді:</b-col>
                <b-col sm="9">{{application.answererName}}</b-col>
            </b-row>
            <b-row class="smallerText">
                <b-col sm="3">Дата відповіді:</b-col>
                <b-col sm="9">{{application.closeDate}}</b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col sm="12" v-html="formatText(application.result)"/>
            </b-row>
        </div>
        <div class="mt-3 mb-3">
            <b-row>
                <b-col>
                     <b-button class="btn-block" variant="info">Взяти в розробку</b-button>
                </b-col>
            </b-row>
        </div>
        <form-application-answer-created :answer="application.result" :appid="application.id"/>
    </div>
</template>

<script>
    import {editHtmText, getIconApplicationStatus, getStatusApplicationLine} from "../../../js/utility";
    import FormApplicationAnswerCreated from "../inner-components/created-forms/FormApplicationAnswerCreated.vue";
    export default {
        name: "ApplicationItem",
        components: {FormApplicationAnswerCreated},
        methods:{
            formatText(text){return editHtmText(text)},
            getStatusLine(t){return getStatusApplicationLine(t)},
            getIconStatus(t){return getIconApplicationStatus(t)},
        },
        data(){
            return{
                application: {id: 3, authorId: 1, answerId: 2,authorName: "First Second Lastlast",
                    subject: 'Тема заявки 1 Ла-ла-ла-ла-ла-ла- але не має бути занадто довгою',
                    text: "Текст що описує дуууууууууууууууууууууже велииику пробему "+"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n" +
                        "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n" +
                        "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n" +
                        "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n" +
                        "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n" +
                        "proident, sunt in culpa qui officia deserunt mollit anim id est laborum."+
                        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n" +
                        "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n" +
                        "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n" +
                        "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n" +
                        "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n" +
                        "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    status: 3,//close
                    result: 'Result a lot oadldldl go away',answererName: "First Second Lastlast",
                    openDate: "27.02.2021, 18:04:47",
                    closeDate: "27.02.2021, 18:04:47"}
            }
        }

    }
</script>

<style scoped>

</style>