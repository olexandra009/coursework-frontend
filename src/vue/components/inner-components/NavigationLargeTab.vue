<template>
    <b-col class="d-xs-none d-sm-none d-md-none d-lg-block" md="10">
        <b-nav class="d-xs-none d-sm-none d-md-none d-lg-block smallText">
            <b-nav-item to="/cabinet" exact exact-active-class="active" v-if="login">Кабінет</b-nav-item>
            <b-nav-item to="/news" exact exact-active-class="active">Новини</b-nav-item>
            <b-nav-item to="/events" exact exact-active-class="active">Події</b-nav-item>
            <div>
            <b-nav-item  exact exact-active-class="active">
                <span><router-link to="/petition">Петиції </router-link> </span>
                <span v-b-toggle.petition-inner v-if="login">
                    <b-icon icon="chevron-down" class="when-closed"/>
                    <b-icon icon="chevron-up" class="when-open"/>
                </span>
            </b-nav-item>
            </div>
            <b-collapse id="petition-inner">
                <b-nav-item to="/petition/my" exact exact-active-class="active">Мої петиції</b-nav-item>
                <b-nav-item to="/petition/voted" exact exact-active-class="active">Проголосовані</b-nav-item>
            </b-collapse>
            <b-nav-item to="/application" exact exact-active-class="active">Звернення</b-nav-item>
            <b-nav-item to="/organization" exact exact-active-class="active">Організації</b-nav-item>
            <b-nav-item to="/users" exact exact-active-class="active">Користувачі</b-nav-item>
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
        }),
        methods:{

        },
        data(){
            return{
                admin: true,
            }
        }
    }
</script>

<style scoped>

</style>