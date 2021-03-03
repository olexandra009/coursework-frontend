<template>
    <div class="w-100 pt-3">
        <b-button class="mt-3 btn-block"  v-if="adminEdit" v-b-toggle.create-news-collapse variant="outline-info">Додати подію</b-button>
        <b-collapse id="create-news-collapse" class="mt-2">
            <form-event-created/>
        </b-collapse>

        <b-row class="text-center mt-3">

            <b-input-group class="w-100 m-auto">
                <b-form-select  v-model="selectedOrganization" :options="organization"/>
                <b-input-group-append class="pl-2">
                    <b-button variant="outline-light btn-info">Пошук</b-button>
                </b-input-group-append>
            </b-input-group>
        </b-row>
        <b-row v-for="item in events" :key="item.id">
            <b-card class="mt-2 bg-light w-100">
                <router-link  v-bind:to="`/events/${item.id}`"><h5>{{item.name}}</h5></router-link>
                <div class="">
                    <div class="mb-0">{{item.startDate}} - {{item.endDate}}</div>
                    <div class="mt-0"><router-link v-bind:to="`/organization/${item.organizationId}`">{{item.organizationName}}</router-link> <span v-if="item.showAuthor"> - {{item.authorName}}</span></div>
                </div>
                <p class="m-2">
                    <cut-text-component :text="item.description"/>
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
    import FormEventCreated from "../inner-components/created-forms/FormEventCreated.vue";
    export default {
        name: "EventsList",
        components: {FormEventCreated, CutTextComponent, PhotoTab},
        data() {
            return {
                adminEdit: true,
                events:[{
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
                },
                ],
                selectedOrganization: null,
                organization: [{text: 'Оберіть організацію', value: null},
                    {value: 1, text: 'Organization1'},
                    {value:2, text: 'Organization2'}],
            }
        }
    }
</script>

<style scoped>

</style>