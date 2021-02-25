<template>
<div>
    <navigation-header/>
    <main-display/>
</div>
</template>

<script>
    import NavigationHeader from "./navigation/NavigationHeader.vue";
    import MainDisplay from "./layouts/MainDisplay.vue";
    export default {
        name: "App",
        components: {NavigationHeader, MainDisplay},
    }
</script>

<style scoped>

</style>