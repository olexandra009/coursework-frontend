<template>
    <div class="min-vh-100">
        <h4 class="text-center mt-2">Інформація про організацію {{ $route.params.id }}</h4>

        <b-row class="mt-3 ml-1">
            <b-col sm="3" class="vertical">Назва:</b-col>
            <b-col sm="9" v-if="!editName">
                <b-row>
                    <b-col sm="10" class="vertical">{{organization.name}}</b-col>
                    <b-col sm="2" v-if="adminEdit">
                        <b-button variant="outline-info" @click="editName=!editName">
                            <b-icon icon="pencil"/>
                        </b-button>
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="9" v-else>
                <b-input-group >
                    <b-form-input v-model="modelName" :disabled="!editName"/>
                    <b-input-group-append>
                        <b-button variant="outline-success"> <b-icon icon="check2"/> </b-button>
                        <b-button variant="outline-info" @click="editName= !(editName)"> <b-icon icon="x"/> </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>

        <b-row class="mt-3 ml-1">
            <b-col sm="3" class="vertical">Телефон:</b-col>
            <b-col sm="9" v-if="!editPhone">
                <b-row>
                    <b-col sm="10" class="vertical">{{organization.phoneNumber}}</b-col>
                    <b-col sm="2" v-if="adminEdit">
                        <b-button variant="outline-info" @click="editPhone=!editPhone">
                            <b-icon icon="pencil"/>
                        </b-button>
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="9" v-else>
                <b-input-group >
                    <b-form-input v-model="modelPhone" :disabled="!editPhone"/>
                    <b-input-group-append>
                        <b-button variant="outline-success"> <b-icon icon="check2"/> </b-button>
                        <b-button variant="outline-info" @click="editPhone= !(editPhone)"> <b-icon icon="x"/> </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>

        <b-row class="mt-3 ml-1">
            <b-col sm="3" class="vertical">Адреса:</b-col>
            <b-col sm="9" v-if="!editAddress">
                <b-row>
                    <b-col sm="10" class="vertical">{{organization.address}}</b-col>
                    <b-col sm="2" v-if="adminEdit">
                        <b-button variant="outline-info" @click="editAddress=!editAddress">
                            <b-icon icon="pencil"/>
                        </b-button>
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="9" v-else>
                <b-input-group >
                    <b-form-input v-model="modelAddress" :disabled="!editAddress"/>
                    <b-input-group-append>
                        <b-button variant="outline-success"> <b-icon icon="check2"/> </b-button>
                        <b-button variant="outline-info" @click="editAddress= !(editAddress)"> <b-icon icon="x"/> </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>

        <b-button v-if="adminEdit" class="mt-3 ml-1 btn-block"  v-b-toggle.user-list-collapse  variant="outline-info">Переглянути користувачів організації</b-button>
        <b-collapse id="user-list-collapse" class="mt-2">
            <div>
                <b-row v-for="user in organization.users" :key="user.id" class="w-100 mt-1">
                            <b-col sm="10" class="vertical ml-1">{{user.firstName}} {{user.secondName}} {{user.lastName}}</b-col>
                            <b-col sm="1">
                                <b-button variant="outline-danger" v-b-modal.delete-user-from-organization @click="modalUserId = user.id">
                                    <b-icon icon="x"/>
                                </b-button>
                            </b-col>
                </b-row>
            </div>
        </b-collapse>
        <b-button v-if="adminEdit" class="mt-3 ml-1 btn-block"  v-b-modal.delete-organization variant="outline-danger">Видалити організацію</b-button>

        <b-modal id="delete-organization" hide-footer>
            <template #modal-title>
                Підтвердіть дію
            </template>
            <p>Ви дійсно бажаєте видалити організацію?</p>
            <div class="d-flex justify-content-end">
                <b-button variant="outline-danger" class="mr-1" @click="$bvModal.hide('delete-organization')">Підтвердити</b-button>
                <b-button variant="outline-info" @click="$bvModal.hide('delete-organization')">Скасувати</b-button>
            </div>
        </b-modal>


        <b-modal id="delete-user-from-organization" hide-footer>
            <template #modal-title>
                Підтвердіть дію
            </template>
            <p>Ви дійсно бажаєте видалити користувача з організації? {{modalUserId}}</p>
            <div class="d-flex justify-content-end">
                <b-button variant="outline-danger" class="mr-1" @click="$bvModal.hide('delete-user-from-organization')">Підтвердити</b-button>
                <b-button variant="outline-info" @click="$bvModal.hide('delete-user-from-organization')">Скасувати</b-button>
            </div>
        </b-modal>


    </div>
</template>

<script>
    export default {
        name: "OrganizationItem",
        data(){
            return {
                modalUserId: "",
                editName: false,
                editPhone: false,
                editAddress: false,

                modelName: "",
                modelPhone: "",
                modelAddress: "",

                adminEdit: true,
                organization: {
                    id: 0,
                    name: 'First Organization',
                    address: 'Address of organization',
                    phoneNumber: '092-12-12',
                    users: [
                        {
                            id: 0,
                            firstName: 'Admin',
                            secondName: "Admin",
                            lastName: "Admin",
                            phoneNumber: "",
                            email: "admin.com",
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
                        }
                    ]
                }
            };
        }

    }
</script>

<style scoped>

</style>