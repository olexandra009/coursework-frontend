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
                 <b-button class="mt-2" variant="info" type="submit" @click="saveRoles">Зберегти</b-button>
            </div>
        </b-row>
    </div>
</template>

<script>
    import Vuex from "vuex";
    import apiMethods from "../../../../api/api-methods";
    import user from "../../../store/modules/user";

    export default {
        name: "ChangeUserRole",
        computed: Vuex.mapState({
            currentUser: state=>state.user.currentUser,
            currentUserRoles: state=>state.user.roles,
            token: state=>state.user.token,
            selectedUser: state=>state.user.selectedUser,
            loginCheck: function(){
                if(this.currentUser == null)
                    this.$router.push('/login');
            }
        }),
        created: async function() {
            if(!this.isUserHasRight())
                this.$router.push('/news');
            console.log(this.selected);
            this.selected = this.selectedUser.role.split(', ');
            console.log(this.selected);
        },
        methods: {
            ...Vuex.mapState(['changeSelectedUser']),
            isUserHasRight(){
                return this.currentUserRoles.includes('UserManager');
            },
            async saveRoles(){
                let role = this.selected.join().replaceAll(',',', ');
                let userId = this.$route.params.id;
                let _user = await apiMethods.changeUserRight(this.token, role, userId);
                if(_user!=null) {
                    await this.$store.dispatch('user/changeSelectedUser', {'user':_user});
                    this.$bvToast.toast('Права змінено', {
                        title: "Ви змінили права користувачу",
                        variant: 'success',
                        solid: true
                    });
                }
                else
                    this.$bvToast.toast('Сталася помилка', {
                        title:"Помилка",
                        variant: 'danger',
                        solid: true
                    });
            }
        },
        data(){
            return {
                selected: [],
                options: [
                    {text:'Створювати та голосувати за петиції', value: 'SuperUser'},
                    {text:'Модератор новин та подій', value: 'Moderator'},
                    {text:'Створювати новини та події', value: 'NewsAndEvents'},
                    {text:'Обробка заяв та петицій', value: 'ApplicationAdmin'},
                    {text:'Адміністрування користувачів', value: 'UserManager'},
                ]
            }
        }
    }
</script>

<style scoped>

</style>