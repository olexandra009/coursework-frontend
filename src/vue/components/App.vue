<template>
<div>
    <navigation-header fixed="z-index-fixed"/>
    <navigation-header fixed=""/>
    <router-view/>
</div>
</template>

<script>
    import NavigationHeader from "./NavigationHeader.vue";
    import MainDisplay from "./pages/MainDisplay.vue";
    import SingUpDisplay from "./pages/SingUpDisplay.vue";
    import InfoDisplay from "./pages/InfoDisplay.vue";
    import LoginDisplay from "./pages/LoginDisplay.vue";
    import ConfirmEmailDisplay from "./pages/ConfirmEmailDisplay.vue"
    import ReSendEmail from "./pages/ReSendEmail.vue"
    import  apiMethod from '/src/api/api-methods';
    import Vuex from "vuex";

    export default {
        name: "App",
        components: {NavigationHeader, MainDisplay, SingUpDisplay,
                    InfoDisplay, LoginDisplay, ConfirmEmailDisplay, ReSendEmail},
        methods: {
            ...Vuex.mapActions(['inputFromLocale']),
        },
        created: async function () {
           let token =  localStorage.getItem('token');
           let user = localStorage.getItem('user');

           let u = await apiMethod.check(token);
           if(u) {
               user = JSON.parse(user);
               await this.$store.dispatch("user/inputFromLocale", {'user': user, 'token': token});
           } else {
               localStorage.removeItem('token');
               localStorage.removeItem('user');
           }
            await this.$store.dispatch('organization/getListOfOrganization');

        },
    }
</script>

<style scoped>

</style>