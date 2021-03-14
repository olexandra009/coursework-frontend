<template>
    <div class="d-xs-block d-sm-block d-md-block d-lg-none">
        <b-nav-item to="/news" exact exact-active-class="active">Новини</b-nav-item>
        <b-nav-item to="/events" exact exact-active-class="active">Події</b-nav-item>
        <b-nav-item to="/petition" exact exact-active-class="active">Петиції</b-nav-item>
        <b-nav-item to="/petition/my" exact exact-active-class="active" v-if="login">Мої петиції</b-nav-item>
        <b-nav-item to="/application" exact exact-active-class="active">Звернення</b-nav-item>
        <b-nav-item to="/organization" exact exact-active-class="active">Організації</b-nav-item>
        <b-nav-item to="/users" exact exact-active-class="active">Користувачі</b-nav-item>
    </div>
</template>

<script>
    import Vuex from "vuex";

    export default {
        name: "NavigationSmallTab",
        computed: Vuex.mapState({
            login: state => (state.user.currentUser !== null),
        })
    }
</script>

<style scoped>

</style>