<template>

    <b-card class="min-vh-100 pt-2 bg-light">
        <h4 class="text-center">{{header}}</h4>
        <div class="d-flex justify-content-between">
            <span><router-link v-bind:to="`/organization/${organizationId}`">{{organizationName}}</router-link> <span v-if="showAuthor"> - {{authorName}}</span></span>
            <span>{{dateTimeCreation}}</span>
        </div>
        <div class="mt-4">
            <p v-html="`${newLinedText(text)}`"/>
        </div>
        <photo-tab/>
    </b-card>

</template>


<script>
    import PhotoTab from "../inner-components/PhotoTab.vue";
    export default {
        name: "NewsItem",
        components: {PhotoTab},
        methods:{
            newLinedText: (t)=> t.replaceAll('\n', '<br />'),
        },
        data(){
            return{
            id:1, header: 'First News Header', text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n" +
            "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n" +
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n" +
            "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n" +
            "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n" +
            "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                dateTimeCreation: "27.02.2021, 18:04:47", edited: false, showAuthor: false, authorId: 12, authorName: "Last First Second",
                multimedias: [], organizationId: 1, organizationName: 'First organization'}

        }
    }
</script>

<style scoped>

</style>