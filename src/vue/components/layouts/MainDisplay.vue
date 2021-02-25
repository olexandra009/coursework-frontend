<template>
    <b-container>
        <nav-bar-page/>
        <page-display/>
        <b-row>
            <b-col lg="2" >
             <!--navbar for admin or for profile-->
            </b-col>
            <b-col lg="8">

            </b-col>
            <b-col lg="2">
            Right
            </b-col>
        </b-row>
    </b-container>
</template>

<script>



    import PageDisplay from "./PageDisplay.vue";
    export default {
        name: "MainDisplay",
        components: {PageDisplay},
    }
</script>

<style scoped>

</style>