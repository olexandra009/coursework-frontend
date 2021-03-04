<template>
    <b-card class="min-vh-100 pt-2 bg-light">
        <h4 class="text-center">{{name}}</h4>
        <div class="">
            <div class="mb-0">{{startDate}} - {{endDate}}</div>
            <div class="mt-0">{{organizationName}}<span v-if="showAuthor"> - {{authorName}}</span></div>
        </div>
        <div class="mt-4">
            <p v-html="`${newLinedText(description)}`"/>
        </div>
        <photo-tab/>
        <div class="text-secondary text-right" v-if="edited">Редаговано</div>
    </b-card>
</template>

<script>
    import PhotoTab from "../inner-components/PhotoTab.vue";
    import {editHtmText} from "../../../js/utility";

    export default {
        name: "EventsItem",
        components: {PhotoTab},
        methods:{
            newLinedText: (t)=> editHtmText(t),
        },
        data() {
            return {
                    id: 0,
                    name: "Header name",
                    description: "Event Event Event Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n" +
                        "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n" +
                        "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n" +
                        "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n" +
                        "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n" +
                        "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    startDate: "2021-02-27, 17:50",
                    endDate: "2021-02-27, 17:50",
                    edited: true,
                    showAuthor: true,
                    authorId: 12,
                    organizationId: 1,
                    organizationName: 'Organization',
                    authorName: 'Last First Last',
                    multimedias: []
                }
        }
    }
</script>

<style scoped>

</style>