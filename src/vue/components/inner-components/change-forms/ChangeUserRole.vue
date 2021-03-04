<template>
    <div>
        <b-row class="mt-3">
           <div class="m-auto">
                <b-form-group label="Оберіть дії які дозволені користувачу:">
                    <b-form-checkbox-group
                            v-model="selected"
                            :options="options"
                            stacked
                    />
                </b-form-group>
           </div>
        </b-row>
        <b-row>
            <div class="m-auto">
                 <b-button class="mt-2" variant="info" type="submit">Зберегти</b-button>
            </div>
        </b-row>
    </div>
</template>

<script>
    export default {
        name: "ChangeUserRole",
        data(){
            return {
                selected: [],
                options: [
                    {text:'Створювати та голосувати за петиції', value: 'SuperUser'},
                    {text:'Модератор новин та подій', value: 'Moderator'},
                    {text:'Створювати новини та події', value: 'NewsAndEvents'},
                    {text:'Обробка заяв та петицій', value: 'ApplicationAdmin'},
                    {text:'Адміністрування користувачів', value: 'UserManger'},
                ]
            }
        }
    }
</script>

<style scoped>

</style>