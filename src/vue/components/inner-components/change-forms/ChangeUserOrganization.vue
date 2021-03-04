<template>
    <b-row class="text-center mt-3">
        <b-input-group class="w-100 m-auto">
            <b-form-select  v-model="selectedOrganization" :options="organization"/>
            <b-input-group-append class="pl-2">
                <b-button variant="outline-light btn-info">Змінити</b-button>
            </b-input-group-append>
        </b-input-group>
    </b-row>
</template>

<script>
    export default {
        name: "ChangeUserOrganization",
        props: ['user_id'],
        data(){
            return{
                selectedOrganization: null,
                organization: [{text: 'Оберіть організацію', value: null},
                    {value: 1, text: 'Organization1'},
                    {value:2, text: 'Organization2'}]
            }
        }
    }
</script>

<style scoped>

</style>