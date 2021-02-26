<template>
<div>
    <navigation-header/>
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

    export default {
        name: "App",
        components: {NavigationHeader, MainDisplay, SingUpDisplay,
                    InfoDisplay, LoginDisplay, ConfirmEmailDisplay},
    }
</script>

<style scoped>

</style>