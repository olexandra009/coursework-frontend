<template>
    <b-row class="text-center mt-3 ">
        <b-input-group class="w-100 m-auto">
            <b-form-select  v-model="selected" :options="options"/>
            <b-input-group-append class="pl-2">
                <b-button variant="outline-light btn-info" @click="updateUsers">Пошук</b-button>
            </b-input-group-append>
        </b-input-group>
    </b-row>
</template>

<script>
    import Vuex from "vuex";

    export default {
        name: "FormUserFilter",
        methods:{
            ...Vuex.mapActions(['getListOfUsers','resetUserList']),
            updateUsers(){

                this.$store.dispatch("user/resetUserList");
                this.$store.dispatch("user/getListOfUsers", {'role': this.selected});
            }
        },
        data(){
            return {
                selected: null,
                options: [
                    {text:'Оберіть рівень доступу', value: null},
                    {text:'Перегляд інформації та створення звернень', value: 'User'},
                    {text:'Створення петицій', value: 'SuperUser'},
                    {text:'Модерація новин та подій', value: 'Moderator'},
                    {text:'Створення новини та події', value: 'NewsAndEvents'},
                    {text:'Обробка звернень та петицій', value: 'ApplicationAdmin'},
                    {text:'Управління користувачами', value: 'UserManger'},
                ]
            }
        }
    }
</script>

<style scoped>

</style>