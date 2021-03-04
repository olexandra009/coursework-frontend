<template>
    <div v-if="$route.fullPath==='/petition'">
        <b-row class="text-center mt-3 ">
            <b-input-group class="w-100 m-auto">
                <b-form-select  v-model="modelStatus" :options="status"/>
                <b-input-group-append class="pl-2">
                    <b-button variant="outline-light btn-info">Пошук</b-button>
                </b-input-group-append>
            </b-input-group>
        </b-row>
    </div>
</template>

<script>
    export default {
        name: "FormPetitionFilter",
        data(){
            return {
                modelStatus: null,
                status: [{value: null, text: 'Оберіть статус'},
                    {value: {timeStatus: 'act'}, text: 'Збір голосів'},
                    {value: {timeStatus: 'cls', votesStatus: 'unsuccessful'}, text: 'Не підтримано'},
                    {value: {votesStatus: 'successful'}, text: 'Розглядаються/З відповіддю'},
                ]
            }
        }
    }
</script>

<style scoped>

</style>