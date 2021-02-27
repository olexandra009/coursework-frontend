<template>
    <b-navbar toggleable="lg" type="dark" variant="info" :class="fixed">
       <b-container :class="`pl-2 pr-2`">
        <b-navbar-brand href="#">NavBar</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/">Головна</b-nav-item>
                <b-nav-item to="/info">Інформація</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right v-if="login">
                    <!-- Using 'button-content' slot -->
                    <template #button-content>
                        <em>Користувач</em>
                    </template>
                    <b-dropdown-item href="#">Кабінет</b-dropdown-item>
                    <b-dropdown-item href="#">Вихід</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item to="/login" v-else> Вхід </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
       </b-container>
    </b-navbar>
</template>

<script>
    import Vuex from 'vuex'
    export default {
        props: ['fixed'],
        name: "NavigationHeader",
        computed: Vuex.mapState({
            login: state => (state.user.currentUser !== null),
        }),

    }
</script>

<style scoped>

</style>