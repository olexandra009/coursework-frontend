<template>
    <b-navbar toggleable="lg" type="dark" variant="info" :class="fixed">
        <b-navbar-brand class="d-sm-block" href="#"><span class="nav-letter">C</span>ommunity <span class="nav-letter">P</span>latform</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" v-if="block"/>
        <b-collapse id="nav-collapse" is-nav v-if="block">
            <b-navbar-nav>
                <b-nav-item to="/">Головна</b-nav-item>
                <b-nav-item to="/info">Інформація</b-nav-item>
                <navigation-small-tab/>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto" >
                <b-nav-item-dropdown right v-if="login">
                    <!-- Using 'button-content' slot -->
                    <template #button-content>
                        <em>{{user.login}}</em>
                    </template>
                    <b-dropdown-item to="/cabinet">Кабінет</b-dropdown-item>
                    <b-dropdown-item href="#" @click="logout">Вихід</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item to="/login" v-else> Вхід </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    import Vuex from 'vuex'
    import NavigationSmallTab from "./inner-components/NavigationSmallTab.vue";
    export default {
        components: {NavigationSmallTab},
        props: ['fixed', 'block'],
        name: "NavigationHeader",
        computed: Vuex.mapState({
            login: state => (state.user.currentUser !== null),
            user: state=>state.user.currentUser,
        }),
        methods:{
            ...Vuex.mapActions(['logout']),
            logout(){
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                this.$store.dispatch('user/logout');
                location.reload();
            }
        }
    }
</script>

<style scoped>

</style>