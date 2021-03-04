<template>
    <div class="w-75 m-auto">
        <b-row class="text-center mt-3">
            <b-input-group class="w-100 m-auto">
                <b-form-select  v-model="selectedOrganization" :options="organization"/>
                <b-form-select  v-model="selectedTimeType" :options="times"/>
            </b-input-group>
        </b-row>
        <b-row class="text-center mt-3">
            <b-col class="col-12 text-center">
                <b-button variant="outline-light btn-info">Застосувати</b-button>
                <b-button variant="outline-light btn-info">Скинути</b-button>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        name: "FormEventFilter",
        data(){
            return{
                selectedTimeType: null,
                selectedOrganization: null,
                organization: [{text: 'Оберіть організацію', value: null},
                    {value: 1, text: 'Organization1'},
                    {value:2, text: 'Organization2'}],
                times: [{text: 'Оберіть час', value: null},
                    {value:'active', text:'Актуальні' },
                    {value:'pass', text:'Минулі'}]
            }
        }
    }
</script>

<style scoped>

</style>