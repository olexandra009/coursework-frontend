<template>
    <div class="mt-2 min-vh-100">
        <b-row class="mt-4">
            <h3 class="m-auto">Інформація про користувача</h3>
        </b-row>
        <b-row class="mt-3 ml-1">
            <b-col sm="3">Прізвище:</b-col>
            <b-col sm="9" v-if="!editSurname">
                <b-row>
                    <b-col sm="10">{{user.lastName}}</b-col>
                    <b-col sm="2">
                        <b-button variant="outline-info" @click="editSurname=edit(editSurname)">
                            <b-icon icon="pencil"/>
                        </b-button>
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="9" v-else>
                <b-input-group >
                    <b-form-input v-model="modelSurname" :disabled="!editSurname" :value="user.lastName"/>
                    <b-input-group-append>
                        <b-button variant="outline-success"> <b-icon icon="check2"/> </b-button>
                        <b-button variant="outline-info" @click="editSurname=edit(editSurname)"> <b-icon icon="x"/> </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>

        <b-row class="mt-3 ml-1">
            <b-col sm="3">Ім'я:</b-col>
            <b-col sm="9" v-if="!editName">
                <b-row>
                    <b-col sm="10">{{user.firstName}}</b-col>
                    <b-col sm="2">
                        <b-button variant="outline-info" @click="editName=edit(editName)">
                            <b-icon icon="pencil"/>
                        </b-button>
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="9" v-else>
                <b-input-group >
                    <b-form-input v-model="modelName" :disabled="!editName" :value="user.firstName"/>
                    <b-input-group-append>
                        <b-button variant="outline-success"> <b-icon icon="check2"/> </b-button>
                        <b-button variant="outline-info" @click="editName=edit(editName)"> <b-icon icon="x"/> </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>


        <b-row class="mt-3 ml-1">
            <b-col sm="3">По-батькові:</b-col>
            <b-col sm="9" v-if="!editSecond">
                <b-row>
                    <b-col sm="10">{{user.secondName}}</b-col>
                    <b-col sm="2">
                        <b-button variant="outline-info" @click="editSecond=edit(editSecond)">
                            <b-icon icon="pencil"/>
                        </b-button>
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="9" v-else>
                <b-input-group >
                    <b-form-input v-model="modelSecond" :disabled="!editSecond" :value="user.secondName"/>
                    <b-input-group-append>
                        <b-button variant="outline-success"> <b-icon icon="check2"/> </b-button>
                        <b-button variant="outline-info" @click="editSecond=edit(editSecond)"> <b-icon icon="x"/> </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>


        <b-row class="mt-3 ml-1">
            <b-col sm="3">Email:</b-col>
            <b-col sm="9" v-if="!editEmail">
                <b-row>
                    <b-col sm="10">{{user.email}}</b-col>
                    <b-col sm="2">
                        <b-button variant="outline-info" @click="editEmail=edit(editEmail)">
                            <b-icon icon="pencil"/>
                        </b-button>
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="9" v-else>
                <b-input-group >
                    <b-form-input v-model="modelEmail" :disabled="!editEmail" :value="user.email"/>
                    <b-input-group-append>
                        <b-button variant="outline-success"> <b-icon icon="check2"/> </b-button>
                        <b-button variant="outline-info" @click="editEmail=edit(editEmail)"> <b-icon icon="x"/> </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>

        <b-row class="mt-3 ml-1">
            <b-col sm="3">Телефон:</b-col>
            <b-col sm="9" v-if="!editPhone">
                <b-row>
                    <b-col sm="10">{{user.phoneNumber}}</b-col>
                    <b-col sm="2">
                        <b-button variant="outline-info" @click="editPhone=edit(editPhone)">
                            <b-icon icon="pencil"/>
                        </b-button>
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="9" v-else>
                <b-input-group >
                    <b-form-input v-model="modelPhone" :disabled="!editPhone" :value="user.phoneNumber"/>
                    <b-input-group-append>
                        <b-button variant="outline-success"> <b-icon icon="check2"/> </b-button>
                        <b-button variant="outline-info" @click="editPhone=edit(editPhone)"> <b-icon icon="x"/> </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
            <b-button class="mt-3 ml-1 btn-block"  v-b-toggle.change-login-collapse variant="outline-info">Змінити логін</b-button>
            <b-collapse id="change-login-collapse" class="mt-2">
                <div>
                    <b-form-input
                            class="ml-1"
                            v-model="modelLogin"
                            :state="loginState"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Введіть новий логін:"
                            trim/>
                     <b-form-invalid-feedback class="text-center" id="input-live-feedback">Такий логін вже зайнято</b-form-invalid-feedback>
                     <div class="mt-1 d-flex justify-content-center">
                         <b-button class="mr-1 w-25" variant="info">Зберегти</b-button>
                         <b-button class="w-25"  v-b-toggle.change-login-collapse variant="info">Скасувати</b-button>
                     </div>
                </div>
            </b-collapse>

            <b-button class="mt-3 ml-1 btn-block"  v-b-toggle.change-password-collapse  variant="outline-info">Змінити пароль</b-button>
            <b-collapse id="change-password-collapse" class="mt-2">
                <div>
                    <b-form-input
                            type="password"
                            class="ml-1"
                            v-model="modelPassword"
                            :state="passwordState"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Введіть новий логін:"
                            trim/>
                    <b-form-invalid-feedback class="text-center" id="input-live-feedback">
                        Пароль повинен складатись з щонайменше 8 символів та містити в собі хоча б 1 велику літеру, 1 маленьку та 1 цифру
                    </b-form-invalid-feedback>
                    <div class="mt-1 d-flex justify-content-center">
                        <b-button class="mr-1 w-25" variant="info">Зберегти</b-button>
                        <b-button class="w-25"  v-b-toggle.chanhe-password-collapse variant="info">Скасувати</b-button>
                    </div>
                </div>
            </b-collapse>


            <b-button class="mt-3 ml-1 btn-block"  v-b-modal.delete variant="outline-danger">Видалити акаунт</b-button>


        <b-modal id="delete" hide-footer>
            <template #modal-title>
                Підтвердіть дію
            </template>
            <p>Ви дійсно бажаєте видалити аккаунт?</p>
            <div class="d-flex justify-content-end">
                <b-button variant="outline-danger" class="mr-1" @click="$bvModal.hide('delete')">Підтвердити</b-button>
                <b-button variant="outline-info" @click="$bvModal.hide('delete')">Скасувати</b-button>
            </div>
        </b-modal>


    </div>
</template>

<script>
    export default {
        name: "CabinetComponent",
        computed:{
            passwordState() {
                let lowerCaseLetters = /[a-z]/g;
                let upperCaseLetters = /[A-Z]/g;
                let numbers = /[0-9]/g;
                if (this.modelPassword === '') return null;
                else if (!this.modelPassword.match(lowerCaseLetters))
                    return false;
                else if (!this.modelPassword.match(upperCaseLetters))
                    return false;
                else if (!this.modelPassword.match(numbers))
                    return false;
                else return this.modelPassword.length >= 8;
            },
            loginState(){
                if(this.modelLogin==='') return false;
                return true;
            }
        },
        data(){
            return{
                modelPassword:'',
                modelLogin: '',
                modelName: '',
                modelSurname: '',
                modelEmail: '',
                modelSecond: '',
                modelPhone: '',
                editName: false,
                editSurname: false,
                editEmail: false,
                editSecond: false,
                editPhone: false,
                user: {
                    id: 1,
                    firstName: 'Firstly',
                    secondName: "Secondly",
                    lastName: "Lastly",
                    phoneNumber: "",
                    email: "a.rfkkkf@flfl.com",
                    login: "floor",
                }
            }
        },
        methods: {
            edit(v){return !v},
        }
    }
</script>

<style scoped>

</style>