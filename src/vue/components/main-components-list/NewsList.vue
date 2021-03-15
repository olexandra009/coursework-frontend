<template>
    <div class="w-100 min-vh-100 mt-1">
        <b-button class="mt-3 btn-block"  v-if="adminEdit" v-b-toggle.create-news-collapse variant="outline-info">Додати новину</b-button>

        <b-collapse id="create-news-collapse" class="mt-2">
            <form-news-created/>
        </b-collapse>

        <form-news-filter/>
        <b-row v-for="item in news" :key="item.id">
            <b-card class="mt-2 w-100 bg-light">
                <router-link  v-bind:to="`/news/${item.id}`"><h5>{{item.header}}</h5></router-link>
                <div class="d-flex justify-content-between">
                    <span><router-link v-bind:to="`/organization/${item.author.userOrganizationId}`">{{item.author.userOrganizationName}}</router-link> <span v-if="item.showAuthor"> - {{getAuthorName(item.author)}}</span></span>
                    <span>{{getDateTime(item.dateTimeCreation)}}</span>
                </div>
                <p class="m-2">
                    <cut-text-component :text="item.text"/>
                </p>
                <photo-tab :multimedia="item.multimedias"/>
                <div class="text-secondary text-right" v-if="item.edited">Редаговано</div>
            </b-card>
        </b-row>
        <news-loader/>
        <div class="min-vh-5"/>
    </div>

</template>

<script>
    import CutTextComponent from "../inner-components/CutTextComponent.vue";
    import PhotoTab from "../inner-components/PhotoTab.vue";
    import FormNewsCreated from "../inner-components/created-forms/FormNewsCreated.vue";
    import FormNewsFilter from "../inner-components/filtered-form/FormNewsFilter.vue";
    import Vuex from "vuex";
    import NewsLoader from "../loading-components/NewsLoader.vue";

    export default {
        name: "NewsList",
        metaInfo: {
            title: 'Новини',
        },
        components: {NewsLoader, FormNewsFilter, FormNewsCreated, PhotoTab, CutTextComponent},
        computed:Vuex.mapState({
            news: state=>state.news.all,
            selected: state=>state.news.selOrgId,
        }),
        methods: {
            ...Vuex.mapActions['getListOfNews'],
            getDateTime(str){
                let date = new Date(str);
                return date.toLocaleString();
            },
            getAuthorName(author){
                return author.firstName+' '+author.lastName;
            },
        },
        created() {
            let u = localStorage.user;
            if(u === undefined) {
                this.adminEdit = false;
                return;
            }
            let user = JSON.parse(u);
            if(user == null) {
                this.adminEdit = false;
                return;
            }
            let roles = user.role.split(', ');
            this.adminEdit = !!roles.includes('NewsAndEvents');
        },

        data(){
            return {
                adminEdit: true,

            }
        }

    }

</script>

<style scoped>

</style>