<template>
    <b-container>
        <nav-bar-page/>
        <page-display/>
        <b-row>
            <b-col lg="2"/>
            <b-col lg="8">
                <news-rows/>
            </b-col>
            <b-col lg="2"/>
        </b-row>
    </b-container>
</template>

<script>



    import NewsRows from "../items/NewsRows.vue";
    export default {
        name: "MainDisplay",
        components: {NewsRows},
    }
</script>

<style scoped>

</style>