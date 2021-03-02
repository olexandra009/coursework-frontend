<template>
    <div class="min-vh-100">
        <!--todo: add filters-->
        <b-row class="mt-1">
            <b-card class="mt-1 w-100 bg-light">
                <b-row class="smallerText">
                    <b-col sm="3">Ім'я та прізвище</b-col>
                    <b-col sm="2" >Логін</b-col>
                    <b-col sm="3">Електронна адреса</b-col>
                    <b-col sm="1"/>
                    <b-col sm="3">Роль</b-col>
                </b-row>
            </b-card>
        </b-row>
        <b-row class="mt-1" v-for="item in users" :key="item.id">
                <b-card class="w-100" @click="$router.push({path: `/users/${item.id}`})">
                    <b-row class="smallerText">
                        <b-col sm="3">{{item.firstName}} {{item.lastName}}</b-col>
                        <b-col sm="2" >{{item.login}}</b-col>
                        <b-col sm="3">{{item.email}}</b-col>
                        <b-col sm="1"> <b-form-checkbox readonly="readonly" :checked="item.emailConfirm"/></b-col>
                        <b-col sm="3">{{isAdmin(item.role)}}</b-col>
                    </b-row>
                </b-card>
        </b-row>
    </div>
</template>

<script>
    export default {
        name: "UserList",
        methods: {
              isAdmin(rights){
                  let simpleUser = "User";
                  let superUser = "SuperUser";
                  let applicationAdmin = "ApplicationAdmin";
                  let moderatorAdmin = "Moderator";
                  let newsAndEventsAdmin = "NewsAndEvents";
                  let userManagerAdmin = "UserManager";

                  let rightsArray = rights.split(', ');

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
                users: [
                {
                    id: 0,
                    firstName: 'Admin',
                    secondName: "Admin",
                    lastName: "Admin",
                    phoneNumber: "",
                    email: "admin.com",
                    emailConfirm: true,
                    role: "User, SuperUser, ApplicationAdmin, Moderator, NewsAndEvents, UserManger",
                    login: "floor",
                },
                {
                    id: 1,
                    firstName: 'Firstly',
                    secondName: "Secondly",
                    lastName: "Lastly",
                    phoneNumber: "",
                    email: "a.rfkkkf@flfl.com",
                    emailConfirm: true,
                    role: "ApplicationAdmin",
                    login: "floor",
                }, {
                    id: 2,
                    firstName: 'Firstly',
                    secondName: "Secondly",
                    lastName: "Lastly",
                    phoneNumber: "+38097404322",
                    email: "a.rfkkkf@flfl.com",
                    emailConfirm: true,
                    role: "SuperUser, User",
                    login: "floor",
                },{
                    id: 3,
                    firstName: 'Firstly',
                    secondName: "Secondly",
                    lastName: "Lastly",
                    phoneNumber: "",
                    email: "a.rfkkkf@flfl.com",
                    emailConfirm: true,
                    role: "UserManger, NewsAndEvents",
                    login: "floor",
                },{
                    id: 4,
                    firstName: 'Firstly',
                    secondName: "Secondly",
                    lastName: "Lastly",
                    phoneNumber: "",
                    email: "a.rfkkkf@flfl.com",
                    emailConfirm: false,
                    role: "User",
                    login: "floor",
                }]
            }
        }
    }
</script>

<style scoped>

</style>