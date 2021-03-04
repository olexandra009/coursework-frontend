<template>
   <div class="min-vh-100 mt-1">
       <!--todo: filter-->
       <b-button class="mt-3 btn-block"  v-if="adminEdit" v-b-toggle.create-news-collapse variant="outline-info">Створити заявку</b-button>
       <b-collapse id="create-news-collapse" class="mt-2">
           <form-application-created/>
       </b-collapse>


       <b-row v-for="item in applications" :key="item.id" class="mt-2">
           <b-card class="mt-2 w-100 pl-1 pr-1" @click="$router.push(`/application/${item.id}`)">
                <b-row class="w-100">
                    <div class="d-flex smallerText justify-content-between w-100">
                       <span>{{item.authorName}}</span>
                       <span>{{item.openDate}}</span>
                    </div>
                </b-row>
                <b-row class="w-100">
                    <div class="smallerText d-flex justify-content-end w-100">
                        <span> <b-icon :icon="getIconStatus(item.status)"/> {{getStatusLine(item.status)}}</span>
                    </div>
                </b-row>
                <b-row>
                    <span><b>Тема: </b>{{item.subject}}</span>
                </b-row>
                <b-row v-if="item.status===3">
                    <div class="w-100">
                    <span><b>Автор відповіді: </b>{{item.answererName}}</span>
                    </div>
                    <div class="text-secondary smallerText w-100">
                       Відповідь надана: {{item.closeDate}}
                    </div>
                </b-row>


            </b-card>
        </b-row>

   </div>
</template>

<script>
    import FormApplicationCreated from "../inner-components/created-forms/FormApplicationCreated.vue";
    import {getIconApplicationStatus, getStatusApplicationLine} from "../../../js/utility";
    export default {
        name: "ApplicationList",
        components: {FormApplicationCreated},
        methods:{
            getStatusLine(st){return getStatusApplicationLine(st)},
            getIconStatus(st){return getIconApplicationStatus(st)}
        },
        data(){
            return{
                adminEdit: true,
                applications: [
                    {id: 1, authorId: 1, answerId: null, authorName: "First Second Lastlast", subject: 'Тема заявки 1 Ла-ла-ла-ла-ла-ла- але не має бути занадто довгою',
                     text: "Текст що описує дуууууууууууууууууууууже велииику пробему ",
                     status: 1,//waiting
                     result: '',answererName: "First Second Lastlast",
                     openDate: "27.02.2021, 18:04:47",
                     closeDate: null
                    },
                    {id: 2, authorId: 1, answerId: 2, authorName: "First Second Lastlast",
                        answererName: "First Second Lastlast",
                        subject: 'Тема заявки 1 Ла-ла-ла-ла-ла-ла- але не має бути занадто довгою',
                        text: "Текст що описує дуууууууууууууууууууууже велииику пробему ",
                        status: 2,//in progress
                        result: '',
                        openDate: "27.02.2021, 18:04:47",
                        closeDate: null
                    },
                    {id: 3, authorId: 1, answerId: 2,authorName: "First Second Lastlast",
                        subject: 'Тема заявки 1 Ла-ла-ла-ла-ла-ла- але не має бути занадто довгою',
                        text: "Текст що описує дуууууууууууууууууууууже велииику пробему ",
                        status: 3,//close
                        result: 'Result a lot oadldldl go away',answererName: "First Second Lastlast",
                        openDate: "27.02.2021, 18:04:47",
                        closeDate: "27.02.2021, 18:04:47"
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>