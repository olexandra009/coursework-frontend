<template>
    <b-row>
        <b-card v-for="photo in multimedia" :key="photo.id">
            <img :src="photo.url"/>
        </b-card>
    </b-row>
</template>

<script>
    export default {
        name: "PhotoTab",
        props: ['multimedia']
    }
</script>

<style scoped>

</style>