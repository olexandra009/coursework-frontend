<template>
    <div class="min-vh-100 mt-1">
        <form-user-filter/>

        <b-row class="mt-1">
            <b-card class="mt-1 w-100 bg-light">
                <b-row class="smallerText">
                    <b-col sm="3">Ім'я та прізвище</b-col>
                    <b-col sm="2" >Логін</b-col>
                    <b-col sm="3">Еmail</b-col>
                    <b-col sm="1"/>
                    <b-col sm="2">Роль</b-col>
                </b-row>
            </b-card>
        </b-row>
        <b-row class="mt-1" v-for="item in users" :key="item.id">
                <b-card class="w-100" >
                    <b-row class="smallerText">
                        <b-col sm="3">{{item.firstName}} {{item.lastName}}</b-col>
                        <b-col sm="2" >{{item.login}}</b-col>
                        <b-col sm="2">{{item.email}}</b-col>
                        <b-col sm="1"> <b-form-checkbox disabled="disabled" :checked="item.emailConfirm"/></b-col>
                        <b-col sm="3">{{isAdmin(item.id, item.role)}}</b-col>
                        <b-col sm="1" @click="$router.push({path: `/users/${item.id}`})"><b-icon icon="box-arrow-right"/></b-col>
                    </b-row>
                </b-card>
        </b-row>
        <user-loader/>
    </div>
</template>

<script>
    import FormUserFilter from "../inner-components/filtered-form/FormUserFilter.vue";
    import Vuex from "vuex";
    import UserLoader from "../loading-components/UserLoader.vue";
    export default {
        name: "UserList",
        metaInfo: {
            title: 'Користувачі',
        },
        computed: Vuex.mapState({
            users: (state)=>state.user.userList,
            selectedRole: (state)=>state.user.filterRole,
        }),
        components: {UserLoader, FormUserFilter},
        methods: {
            ...Vuex.mapActions(['getListOfUsers']),
              isAdmin(id, rights){
                  let simpleUser = "User";
                  let superUser = "SuperUser";
                  let applicationAdmin = "ApplicationAdmin";
                  let moderatorAdmin = "Moderator";
                  let newsAndEventsAdmin = "NewsAndEvents";
                  let userManagerAdmin = "UserManager";

                  let rightsArray = rights.split(', ');
                    console.log(id);
                    console.log(rightsArray);
                  if(rightsArray.includes(applicationAdmin)||rightsArray.includes(moderatorAdmin)
                      ||rightsArray.includes(newsAndEventsAdmin)||rightsArray.includes(userManagerAdmin))
                      return "Адміністратор";

                  if(rightsArray.includes(superUser))
                      return "Підтверджений користувач";

                  if(rightsArray.includes(simpleUser))
                      return "Не підтверджений користувач";
              }
        },
        data(){
            return {



            }
        }
    }
</script>

<style scoped>

</style>