<template>
   <div class="min-vh-100 mt-1">

       <b-button class="mt-3 btn-block"  v-if="adminEdit" v-b-toggle.create-news-collapse variant="outline-info">Створити звернення</b-button>
       <b-collapse id="create-news-collapse" class="mt-2">
           <form-application-created/>
       </b-collapse>
       <b-row class="mt-2">
           <form-application-filter/>
       </b-row>

       <b-row v-for="item in applications" :key="item.id" class="mt-2">
           <b-card class="mt-2 w-100 pl-1 pr-1" @click="$router.push(`/application/${item.id}`)">
                <b-row class="w-100">
                    <div class="d-flex smallerText justify-content-between w-100">
                       <span>{{getAuthorName(item.author)}}</span>
                       <span>{{getDate(item.openDate)}}</span>
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
                    <span><b>Автор відповіді: </b>{{getAuthorName(item.answerer)}}</span>
                    </div>
                    <div class="text-secondary smallerText w-100">
                       Відповідь надана: {{getDate(item.closeDate)}}
                    </div>
                </b-row>


            </b-card>
        </b-row>

   </div>
</template>

<script>
    import FormApplicationCreated from "../inner-components/created-forms/FormApplicationCreated.vue";
    import {getIconApplicationStatus, getStatusApplicationLine} from "../../../js/utility";
    import FormApplicationFilter from "../inner-components/filtered-form/FormApplicationFilter.vue";
    import Vuex from "vuex";
    export default {
        name: "ApplicationList",
        components: {FormApplicationFilter, FormApplicationCreated},
        computed: Vuex.mapState({
            applications: state=>state.application.all,
        }),
        mounted: async function(){
            console.log("HERE");
            await this.$store.dispatch('application/getListOFApplication');
            console.log(this.applications);
            console.log("HERE");
        },
        methods:{
            ...Vuex.mapActions(['getListOFApplication']),
            getDate(time){return new Date(time).toLocaleString()},
            getAuthorName(user){
                console.log(user);
                return user.lastName+' '+user.firstName+' '+user.secondName},
            getStatusLine(st){return getStatusApplicationLine(st)},
            getIconStatus(st){return getIconApplicationStatus(st)}
        },
        data(){
            return{
                adminEdit: true,
            }
        }
    }
</script>

<style scoped>

</style>