<template>
<div>
    <navigation-header/>
    <main-display/>
</div>
</template>

<script>
    import NavigationHeader from "./NavigationHeader.vue";
    import MainDisplay from "./pages/MainDisplay.vue";
    export default {
        name: "App",
        components: {NavigationHeader, MainDisplay},
    }
</script>

<style scoped>

</style>