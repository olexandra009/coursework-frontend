<template>
    <div class="w-100 min-vh-100 mt-1">
        <b-button class="mt-3 btn-block"  v-if="adminEdit" v-b-toggle.create-news-collapse variant="outline-info">Додати подію</b-button>
        <b-collapse id="create-news-collapse" class="mt-2">
            <form-event-created/>
        </b-collapse>

        <b-button class="mt-3 btn-block"  v-if="adminEdit" v-b-toggle.filter-collapse variant="outline-info">Фільтрація подій</b-button>
        <b-collapse id="filter-collapse" class="mt-2">
            <form-event-filter/>
        </b-collapse>


        <b-row v-for="item in events" :key="item.id">
            <b-card class="mt-2 bg-light w-100">
                <router-link  v-bind:to="`/events/${item.id}`"><h5>{{item.name}}</h5></router-link>
                <div class="">
                    <div class="mb-0">{{getDateTime(item.startDate)}} - {{getDateTime(item.endDate)}}</div>
                    <div class="mt-0"><router-link v-bind:to="`/organization/${item.author.userOrganizationId}`">{{item.author.userOrganizationName}}</router-link> <span v-if="item.showAuthor"> - {{getAuthorName(item.author)}}</span></div>
                </div>
                <p class="m-2">
                    <cut-text-component :text="item.description"/>
                </p>
                <photo-tab/>
                <div class="text-secondary text-right" v-if="item.edited">Редаговано</div>
            </b-card>
        </b-row>
        <event-loader/>
        <div class="min-vh-5"/>
    </div>
</template>

<script>
    import CutTextComponent from "../inner-components/CutTextComponent.vue";
    import PhotoTab from "../inner-components/PhotoTab.vue";
    import FormEventCreated from "../inner-components/created-forms/FormEventCreated.vue";
    import FormEventFilter from "../inner-components/filtered-form/FormEventFilter.vue";
    import Vuex from "vuex";
    import EventLoader from "../loading-components/EventLoader.vue";
    export default {
        name: "EventsList",
        components: {EventLoader, FormEventFilter, FormEventCreated, CutTextComponent, PhotoTab},
        computed: Vuex.mapState({
            events: state=>state.events.all,
            selOrg: state=> state.events.selectedOrg,
            selTime:state=> state.events.selectedTime,
        }),
        methods:{
          ...Vuex.mapActions(['getListOfEvents']),
          getDateTime(str){
                let date = new Date(str);
                return date.toLocaleString();
          },
          getAuthorName(author){
                return author.firstName+' '+author.lastName;
          },
        },
        data() {
            return {
                adminEdit: true,
            }
        }
    }
</script>

<style scoped>

</style>