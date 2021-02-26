<template>
    <b-col class="" md="10">
        <b-nav class="d-xs-none d-sm-none d-md-none d-lg-block">
            <b-nav-item to="/cabinet" exact exact-active-class="active">Кабінет</b-nav-item>
            <b-nav-item to="/news" exact exact-active-class="active">Новини</b-nav-item>
            <b-nav-item to="/events" exact exact-active-class="active">Події</b-nav-item>
            <b-nav-item to="/petition" exact exact-active-class="active">Петиції</b-nav-item>
            <b-nav-item to="/application" exact exact-active-class="active">Заявки</b-nav-item>
            <b-nav-item to="/organization" exact exact-active-class="active">Організації</b-nav-item>
            <b-nav-item to="/users" exact exact-active-class="active">Користувачі</b-nav-item>
        </b-nav>
    </b-col>
</template>

<script>
    export default {
        name: "NavigationTab"
    }
</script>

<style scoped>

</style>