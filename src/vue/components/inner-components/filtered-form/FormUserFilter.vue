<template>
    <b-row class="text-center mt-3 ">
        <b-input-group class="w-100 m-auto">
            <b-form-select  v-model="selected" :options="options"/>
            <b-input-group-append class="pl-2">
                <b-button variant="outline-light btn-info">Пошук</b-button>
            </b-input-group-append>
        </b-input-group>
    </b-row>
</template>

<script>
    export default {
        name: "FormUserFilter",
        data(){
            return {
                selected: null,
                options: [
                    {text:'Оберіть роль', value: null},
                    {text:'Не підтверджений користувач', value: 'User'},
                    {text:'Підтверджений', value: 'SuperUser'},
                    {text:'Модератор новин та подій', value: 'Moderator'},
                    {text:'Адміністратор новини та події', value: 'NewsAndEvents'},
                    {text:'Адміністратор заяв та петицій', value: 'ApplicationAdmin'},
                    {text:'Адміністратор користувачів', value: 'UserManger'},
                ]
            }
        }
    }
</script>

<style scoped>

</style>