<template>
<div>
    <navigation-header fixed="z-index-fixed" block="n"/>
    <navigation-header fixed="" />
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
    import SingResultDisplay from "./pages/SingResultDisplay.vue";
    import  apiMethod from '/src/api/api-methods';
    import Vuex from "vuex";

    export default {
        name: "App",
        components: {NavigationHeader, MainDisplay, SingUpDisplay,SingResultDisplay,
                    InfoDisplay, LoginDisplay, ConfirmEmailDisplay},
        methods: {
            ...Vuex.mapActions(['inputFromLocale']),
        },
        created: async function () {
           let token =  localStorage.getItem('token');
           let user = localStorage.getItem('user');
           let path = this.$route.fullPath;
           let start = path.split('/')[1];
           if(user == null || token == null)
           {
               if(start==='application'||start==='cabinet'||start==='users')
                   this.$router.push('/news');
               await this.$store.dispatch('organization/getListOfOrganization');
               return;
           }
           let u = await apiMethod.check(token);
           if(u) {
               user = JSON.parse(user);
               await this.$store.dispatch("user/inputFromLocale", {'user': user, 'token': token});
           } else {
               localStorage.removeItem('token');
               localStorage.removeItem('user');
           }
            await this.$store.dispatch('organization/getListOfOrganization');
            await this.$store.dispatch('petition/getPetitionMinVoteCount');
        },
    }
</script>

<style scoped>

</style>