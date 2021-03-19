<template>
    <b-col class="d-xs-none d-sm-none pl-0 d-md-none d-lg-block">
        <b-nav class="d-xs-none d-sm-none m-p d-md-none d-lg-block smallText">
            <b-nav-item to="/cabinet" class="left-menu" exact exact-active-class="active" v-if="login">Кабінет</b-nav-item>
            <b-nav-item to="/news"  class="left-menu"  exact exact-active-class="active">Новини</b-nav-item>
            <b-nav-item to="/events"  class="left-menu"  exact exact-active-class="active">Події</b-nav-item>
            <b-nav-item to="/petition"  class="left-menu"  exact exact-active-class="active">Петиції </b-nav-item>
            <b-nav-item to="/application"  class="left-menu"  exact exact-active-class="active" v-if="login">Звернення</b-nav-item>
            <b-nav-item to="/organization"  class="left-menu"  exact exact-active-class="active">Організації</b-nav-item>
            <b-nav-item to="/users" class="left-menu"  exact exact-active-class="active" v-if="admin">Користувачі</b-nav-item>
        </b-nav>
    </b-col>
</template>

<script>
    import Vuex from "vuex";

    export default {
        name: "NavigationTab",
        computed: Vuex.mapState({
            login: state => (state.user.currentUser !== null),
            user: state=>(state.user.currentUser),
            admin: state=>{
                if(state.user.currentUser === null)
                    return false;
                let user = state.user.currentUser;
                let rules = user.role.split(', ');
                return rules.includes('UserManager');
            }
        }),
        methods:{

        },
        data(){
            return{

            }
        }
    }
</script>

<style scoped>

</style>