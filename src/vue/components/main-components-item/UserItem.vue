<template>
    <div class="min-vh-100">
        <b-row class="mt-4">
            <h3 class="m-auto">Інформація про користувача</h3>
        </b-row>
        <b-row class="mt-3 ml-1">
            <b-col sm="4">ПІБ:</b-col>
            <b-col sm="8">
                <b-row>
                    <b-col sm="12">{{user.lastName}} {{user.firstName}} {{user.secondName}}</b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row class="mt-3 ml-1">
            <b-col sm="4">Логін:</b-col>
            <b-col sm="8">
                <b-row>
                    <b-col sm="12">{{user.login}}</b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row class="mt-3 ml-1">
            <b-col sm="4">Електронна пошта:</b-col>
            <b-col sm="8">
                <b-row>
                    <b-col sm="12">{{user.email}}</b-col>
                </b-row>

            </b-col>
        </b-row>
        <b-row class="mt-3 ml-1">
            <b-col sm="4">Підтвердження:</b-col>
            <b-col sm="8">
                <b-row >
                    <b-col sm="12" v-if="user.emailConfirm">Пошта була підтверджена</b-col>
                    <b-col sm="12" v-else>Пошта не була підтвердження</b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row class="mt-3 ml-1">
            <b-col sm="4">Номер телефону:</b-col>
            <b-col sm="8">
                <b-row>
                    <b-col sm="12">{{user.phoneNumber}}</b-col>
                </b-row>

            </b-col>
        </b-row>

        <b-row class="mt-3 ml-1">
            <b-col sm="4">Організація:</b-col>
            <b-col sm="8">
                <!--todo: add check on undefined-->
                <b-row @click="$router.push(`/organization/${user.userOrganizationId}`)">
                    <b-col sm="12">{{user.userOrganizationName}}</b-col>
                </b-row>
            </b-col>
        </b-row>

        <b-row class="mt-3 ml-1">
            <b-col sm="4">Ролі:</b-col>
            <b-col sm="8">
                <b-row >
                    <b-col sm="12">{{user.role}}</b-col>
                </b-row>
            </b-col>
        </b-row>

        <b-button class="mt-3 ml-1 btn-block"  v-b-toggle.change-right variant="outline-info">Змінити ролі</b-button>
        <b-collapse id="change-right" class="mt-2">
            <change-user-role/>
        </b-collapse>

        <b-button class="mt-3 ml-1 btn-block"  v-b-toggle.change-organization variant="outline-info">Змінити організацію</b-button>
        <b-collapse id="change-organization" class="mt-2">
            <change-user-organization :user_id="user.id"/>
        </b-collapse>
        <div class="min-vh-20"/>

    </div>
</template>

<script>
    import ChangeUserOrganization from "../inner-components/change-forms/ChangeUserOrganization.vue";
    import ChangeUserRole from "../inner-components/change-forms/ChangeUserRole.vue";
    export default {
        name: "UserItem",
        components: {ChangeUserRole, ChangeUserOrganization},
        data(){
            return{
                user: {
                id: 0,
                firstName: 'Admin',
                secondName: "Admin",
                lastName: "Admin",
                phoneNumber: "",
                email: "admin.com",
                emailConfirm: true,
                role: "User, SuperUser, ApplicationAdmin, Moderator, NewsAndEvents, UserManger",
                login: "floor",
                userOrganizationName: "NameOfOrganization",
                userOrganizationId: "1",
            },
            }
        }
    }
</script>

<style scoped>

</style>