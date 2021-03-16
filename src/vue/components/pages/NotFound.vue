<template>
    <b-container>
        <h4 class="text-center">Сторінку не знайдено</h4>
        <b-row>
            <b-col sm="3"/>
            <b-col sm="6">
                <p>Сторінку, на яку Ви хотіли перейти, не знайдено. Можливо, було введено некоректну адресу, або сторінка була видалена</p>
                <p>Ви можете перейти <router-link to="/">на головну</router-link> </p>
            </b-col>
            <b-col sm="3"/>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: "NotFound"
    }
</script>

<style scoped>

</style>