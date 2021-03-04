<template>
    <div class="w-100">
        <b-row class="mt-3">
            <b-col sm="12" class="col-12">
                <b-input-group class="w-100">
                    <b-form-select  v-model="selectedType" :options="type"/>
                    <b-form-select  v-model="selectedStatus" :options="status"/>
                    <b-input-group-append>
                        <b-button variant="outline-light btn-info">Застосувати</b-button>
                        <b-button variant="outline-light btn-info">Скинути</b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        name: "FormApplicationFilter",
        data(){
            return {
                selectedType: null,
                type: [{value: null, text:'Всі звернення'},
                       {value: 1, text:'Обрані звернення'}],
                selectedStatus: 0,
                status: [{value: 0, text:'Оберіть статус'},
                         {value: 1, text:'Очікується'},
                         {value: 2, text:'В процесі'},
                         {value: 3, text:'Закрита'}]
            }
        }
    }
</script>

<style scoped>

</style>