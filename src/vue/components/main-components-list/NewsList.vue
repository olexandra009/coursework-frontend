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
                    <span><router-link v-bind:to="`/organization/${item.organizationId}`">{{item.organizationName}}</router-link> <span v-if="item.showAuthor"> - {{item.authorName}}</span></span>
                    <span>{{item.dateTimeCreation}}</span>
                </div>
                <p class="m-2">
                    <cut-text-component :text="item.text"/>
                </p>
                <photo-tab/>
                <div class="text-secondary text-right" v-if="item.edited">Редаговано</div>
            </b-card>
        </b-row>
    </div>

</template>

<script>
    import CutTextComponent from "../inner-components/CutTextComponent.vue";
    import PhotoTab from "../inner-components/PhotoTab.vue";
    import FormNewsCreated from "../inner-components/created-forms/FormNewsCreated.vue";
    import FormNewsFilter from "../inner-components/filtered-form/FormNewsFilter.vue";

    export default {
        name: "NewsList",
        components: {FormNewsFilter, FormNewsCreated, PhotoTab, CutTextComponent},
        data(){
            return {
                adminEdit: true,
                news: [{id:1, header: 'First News Header', text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n" +
                        "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n" +
                        "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n" +
                        "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n" +
                        "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n" +
                        "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    dateTimeCreation: "27.02.2021, 18:04:47", edited: true, showAuthor: false, authorId: 12, authorName: "Last First Second",
                    multimedias: [], organizationId: 1, organizationName: 'First organization'},
                    {id:2, header: 'First News Header', text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n" +
                            "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n" +
                            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n" +
                            "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n" +
                            "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n" +
                            "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                        dateTimeCreation: "27.02.2021, 18:04:47", edited: false, showAuthor: true, authorId: 12, authorName: "Last First Second",
                        multimedias: [], organizationId: 1, organizationName: 'First organization'},
                    {id:3, header: 'First News Header', text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n" +
                            "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n" +
                            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n" +
                            "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n" +
                            "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n" +
                            "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                        dateTimeCreation: "27.02.2021, 18:04:47", edited: false, showAuthor: false, authorId: 12, authorName: "Last First Second",
                        multimedias: [], organizationId: 1, organizationName: 'First organization'},
                    {id:4, header: 'First News Header', text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n" +
                            "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n" +
                            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n" +
                            "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n" +
                            "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n" +
                            "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                        dateTimeCreation: "27.02.2021, 18:04:47", edited: false, showAuthor: false, authorId: 12, authorName: "Last First Second",
                        multimedias: [], organizationId: 1, organizationName: 'First organization'},
                    {id:5, header: 'First News Header', text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n" +
                            "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n" +
                            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n" +
                            "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n" +
                            "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n" +
                            "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                        dateTimeCreation: "27.02.2021, 18:04:47", edited: false, showAuthor: false, authorId: 12, authorName: "Last First Second",
                        multimedias: [], organizationId: 1, organizationName: 'First organization'},
                    ],

        }}
    }

</script>

<style scoped>

</style>