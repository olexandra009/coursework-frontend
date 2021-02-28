<template>
    <b-row class="w-100">
        <b-col class="pl-3 h-100 d-none d-sm-none d-md-none d-lg-block z-index-fixed bg-light" md="2" lg="2" xl="2">
            <navigation-large-tab/>
        </b-col>
        <b-col class="pl-3 h-100 d-none d-sm-none d-md-none d-lg-block" md="2" lg="2" xl="2">
            <navigation-large-tab/>
        </b-col>
        <b-col md="9">
            <b-container>
                <b-row>
                    <b-col md="9">
                        <router-view/>
                    </b-col>
                    <b-col md="3"/>
                </b-row>
            </b-container>
        </b-col>
    </b-row>
</template>

<script>
    import ApplicationList from "../main-components-list/ApplicationList.vue";
    import CabinetComponent from "../main-components-list/CabinetComponent.vue";
    import EventsList  from "../main-components-list/EventsList.vue";
    import NewsList from "../main-components-list/NewsList.vue";
    import OrganizationList from "../main-components-list/OrganizationList.vue";
    import PetitionList from "../main-components-list/PetitionList.vue";
    import UserList from "../main-components-list/UserList.vue";
    import NavigationLargeTab from "../inner-components/NavigationLargeTab.vue";

    export default {
        name: "MainDisplay",
        components: {ApplicationList, CabinetComponent, EventsList, NewsList,
            OrganizationList, PetitionList, UserList, NavigationLargeTab},
    }
</script>

<style scoped>

</style>