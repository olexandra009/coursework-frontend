<template>
    <div class="mt-2 min-vh-100">
        <b-row class="mt-4">
            <h3 class="m-auto">Інформація про користувача</h3>
        </b-row>
        <b-row class="mt-3 ml-1">
            <b-col sm="3" class="vertical">Прізвище:</b-col>
            <b-col sm="9" v-if="!editSurname">
                <b-row>
                    <b-col sm="10" class="vertical">{{user.lastName}}</b-col>
                    <b-col sm="2">
                        <b-button variant="outline-info" @click="editSurname=edit(editSurname)">
                            <b-icon icon="pencil"/>
                        </b-button>
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="9" v-else>
                <b-input-group >
                    <b-form-input v-model="modelSurname" :disabled="!editSurname"/>
                    <b-input-group-append>
                        <b-button variant="outline-success" @click="updateUser(1)" v-if="!showSurnameSpinner"> <b-icon icon="check2"/> </b-button>
                        <b-spinner v-else/>
                        <b-button variant="outline-info" @click="editSurname=edit(editSurname)"> <b-icon icon="x"/> </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>

        <b-row class="mt-3 ml-1">
            <b-col sm="3" class="vertical">Ім'я:</b-col>
            <b-col sm="9" v-if="!editName">
                <b-row>
                    <b-col sm="10" class="vertical">{{user.firstName}}</b-col>
                    <b-col sm="2">
                        <b-button variant="outline-info" @click="editName=edit(editName)">
                            <b-icon icon="pencil"/>
                        </b-button>
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="9" v-else>
                <b-input-group >
                    <b-form-input v-model="modelName" :disabled="!editName" />
                    <b-input-group-append>
                        <b-button variant="outline-success"  @click="updateUser(2)" v-if="!showNameSpinner"> <b-icon icon="check2"/> </b-button>
                        <b-spinner v-else/>
                        <b-button variant="outline-info" @click="editName=edit(editName)"> <b-icon icon="x"/> </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>


        <b-row class="mt-3 ml-1">
            <b-col sm="3" class="vertical">По-батькові:</b-col>
            <b-col sm="9" v-if="!editSecond">
                <b-row>
                    <b-col sm="10" class="vertical">{{user.secondName}}</b-col>
                    <b-col sm="2">
                        <b-button variant="outline-info" @click="editSecond=edit(editSecond)">
                            <b-icon icon="pencil"/>
                        </b-button>
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="9" v-else>
                <b-input-group >
                    <b-form-input v-model="modelSecond" :disabled="!editSecond"/>
                    <b-input-group-append>
                        <b-button variant="outline-success"  @click="updateUser(3)" v-if="!showSecondSpinner"> <b-icon icon="check2"/> </b-button>
                        <b-spinner v-else/>
                        <b-button variant="outline-info" @click="editSecond=edit(editSecond)"> <b-icon icon="x"/> </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>


        <b-row class="mt-3 ml-1">
            <b-col sm="3" class="vertical">Email:</b-col>
            <b-col sm="9" v-if="!editEmail">
                <b-row>
                    <b-col sm="10" class="vertical">{{user.email}}</b-col>
                    <b-col sm="2">
                        <b-button variant="outline-info" @click="editEmail=edit(editEmail)">
                            <b-icon icon="pencil"/>
                        </b-button>
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="9" v-else>
                <b-input-group >
                    <b-form-input v-model="modelEmail"  :state="emailStateMethod()" :disabled="!editEmail"/>
                    <b-input-group-append>
                        <b-button variant="outline-success" @click="changeEmail" v-if="!showEmailSpinner"> <b-icon icon="check2"/> </b-button>
                        <b-spinner v-else/>
                        <b-button variant="outline-info" @click="editEmail=edit(editEmail)"> <b-icon icon="x"/> </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>

        <b-row class="mt-3 ml-1">
            <b-col sm="3" class="vertical">Телефон:</b-col>
            <b-col sm="9" v-if="!editPhone">
                <b-row>
                    <b-col sm="10" class="vertical">{{user.phoneNumber}}</b-col>
                    <b-col sm="2">
                        <b-button variant="outline-info" @click="editPhone=edit(editPhone)">
                            <b-icon icon="pencil"/>
                        </b-button>
                    </b-col>
                </b-row>
            </b-col>
            <b-col sm="9" v-else>
                <b-input-group >
                    <b-form-input v-model="modelPhone" :disabled="!editPhone"/>
                    <b-input-group-append>
                        <b-button variant="outline-success" @click="updateUser(4)" v-if="!showPhoneSpinner"> <b-icon icon="check2"/> </b-button>
                        <b-spinner v-else/>
                        <b-button variant="outline-info" @click="editPhone=edit(editPhone)"> <b-icon icon="x"/> </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
        <b-button class="mt-3 ml-1 btn-block"  v-b-toggle.change-right-collapse variant="outline-info" v-if="notSuper">Розширити права</b-button>
        <b-collapse id="change-right-collapse" class="mt-2" v-if="notSuper">
            <div>
                <label>Підтвердіть свою особистість:</label>
                <b-form-input
                        class="ml-1"
                        v-model="modelRightInp"
                        placeholder="Введіть ІНП:"
                        trim/>
                <div class="text-secondary text-center smallText">або</div>
                <b-form-input
                        class="ml-1"
                        v-model="modelRight"
                        placeholder="Введіть номер паспорта:"
                        trim/>
                <div class="mt-1 d-flex justify-content-center">
                    <b-button class="mr-1 w-25" variant="info" :disabled="showRightsSpinner" @click="changeRights">Зберегти <b-spinner v-if="showRightsSpinner"/></b-button>
                    <b-button class="w-25"  v-b-toggle.change-right-collapse variant="info">Скасувати</b-button>
                </div>
            </div>
        </b-collapse>

            <b-button class="mt-3 ml-1 btn-block"  v-b-toggle.change-login-collapse variant="outline-info">Змінити логін</b-button>
            <b-collapse id="change-login-collapse" class="mt-2">
                <div>
                   <b-input-group>
                        <b-form-input
                                class="ml-1"
                                v-model="modelLogin"
                                :state="loginState"
                                aria-describedby="input-live-help input-live-feedback"
                                placeholder="Введіть новий логін:"
                                trim/>
                         <b-input-group-append v-if="showSpinner"><b-spinner/></b-input-group-append>
                         <b-form-invalid-feedback class="text-center" id="input-live-feedback">Такий логін вже зайнято</b-form-invalid-feedback>
                   </b-input-group>
                    <div class="mt-1 d-flex justify-content-center">
                         <b-button class="mr-1 w-25"  variant="info" :disabled="showSpinner" @click="changeLogin">Зберегти</b-button>
                         <b-button class="w-25"  v-b-toggle.change-login-collapse variant="info">Скасувати</b-button>
                     </div>
                </div>
            </b-collapse>

            <b-button class="mt-3 ml-1 btn-block"  v-b-toggle.change-password-collapse  variant="outline-info">Змінити пароль</b-button>
            <b-collapse id="change-password-collapse" class="mt-2">
                <div>
                    <b-input-group>
                        <b-form-input
                                type="password"
                                class="ml-1"
                                v-model="modelPassword"
                                :state="passwordState()"
                                aria-describedby="input-live-help input-live-feedback"
                                placeholder="Введіть новий пароль:"
                                trim/>
                        <b-input-group-append v-if="showPasswordSpinner"><b-spinner/></b-input-group-append>
                        <b-form-invalid-feedback class="text-center" id="input-live-feedback">
                            Пароль повинен складатись з щонайменше 8 символів та містити в собі хоча б 1 велику літеру, 1 маленьку та 1 цифру
                        </b-form-invalid-feedback>
                    </b-input-group>

                    <div class="mt-1 d-flex justify-content-center">
                        <b-button class="mr-1 w-25" @click="savePassword" :disabled="showPasswordSpinner" variant="info">Зберегти</b-button>
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
                <b-button variant="outline-danger" class="mr-1" @click="deleteThisAccount">Підтвердити</b-button>
                <b-button variant="outline-info" @click="$bvModal.hide('delete')">Скасувати</b-button>
            </div>
        </b-modal>


    </div>
</template>

<script>
    import Vuex from "vuex";
    import apiMethods from "/src/api/api-methods";

    export default {
        name: "CabinetComponent",
        metaInfo: {
            title: 'Кабінет',
        },
        computed:Vuex.mapState({
            user: state=> state.user.currentUser,
            token: state=> state.user.token,
            loginCheck: function(){
                 if(this.user == null)
                 this.$router.push('/login');
            },
            notSuper(){
                let rules= this.user.role.split(', ');
                console.log(rules);
                return !rules.includes('SuperUser');
            }
        }),
        data(){
            return{
                //Rights
                modelRight:'',
                modelRightInp:'',
                showRightsSpinner: false,
                //Password
                modelPassword:'',
                showPasswordSpinner: false,
                //Login
                loginState: null,
                modelLogin: '',
                showSpinner: false,
                //Name
                modelName: '',
                showNameSpinner: false,
                editName: false,
                //Surname
                editSurname: false,
                modelSurname: '',
                showSurnameSpinner: false,
                //Email
                emailState: null,
                modelEmail: '',
                showEmailSpinner: false,
                editEmail: false,
                //Second
                modelSecond: '',
                showSecondSpinner: false,
                editSecond: false,
                //Phone
                modelPhone: '',
                showPhoneSpinner: false,
                editPhone: false,
               }
        },

        methods: {
            ...Vuex.mapActions(['changeUser','logout','changeCurrentUserRules']),
            edit(v) {
                return !v
            },
            async changeRights(){
                  if(this.modelRight.trim().length===0&&this.modelRightInp.trim().length===0)
                        return;
                  this.showRightsSpinner = true;
                  let inp = this.modelRightInp.trim();
                  let pass = this.modelRight.trim();
                  let userId = this.user.id;
                  let token = this.token;
                  let response;
                  if(inp)
                     response = await apiMethods.changeToSuperUser(userId, token, inp, true);
                  else
                      response = await apiMethods.changeToSuperUser(userId, token, pass, false);
                  if(response===null)
                  {
                      this.$bvToast.toast('Права не змінено. Сталась помилка, спробуйте пізніше', {
                          title: "Зміна не відбулась",
                          variant: 'danger',
                          solid: true
                      });
                      this.showRightsSpinner = false;
                      return;
                  }
                  let updatedUser = response.body;
                  let oldRules = this.user.role.split(', ');
                  let newRules = updatedUser.role.split(', ');
                  if(oldRules.length===newRules.length)
                      this.$bvToast.toast('Права не змінено. Особа з наданими даними відсутня в системі', {
                          title: "Зміна не відбулась",
                          variant: 'danger',
                          solid: true
                      });
                  else {
                      await this.$store.dispatch('user/changeCurrentUserRules');
                      this.$bvToast.toast('Права успішно змінено', {
                          title: "Зміна прав",
                          variant: 'success',
                          solid: true
                      });
                  }
                  this.showRightsSpinner = false;
            },
            async deleteThisAccount(){
                let token = localStorage.getItem('token');
                let user = (JSON.parse(localStorage.getItem('user'))).id;
                let result = await apiMethods.deleteUserAccount(user, token);
                if(result)
                   await this.$store.dispatch('user/logout');
                else {
                    this.$bvToast.toast('Під час видалення сталась помилка. Можливо ви створювали петиції, звернення, події або новини, в такому випадку видалення заборонене', {
                        title: 'Акаунт не видалено',
                        variant: 'warning',
                        solid: true
                    });
                    this.$bvModal.hide('delete');
                    return;
                }
                this.$router.push('/');
                this.$bvModal.hide('delete');
            },
            async changeEmail(){
                this.showEmailSpinner = true;
                let result = await apiMethods.isEmailExists(this.modelEmail);
                if (result) {
                    let change = await apiMethods.changeEmail(this.user.id, this.modelEmail, this.token);
                    this.showEmailSpinner = false;
                    if (change) {
                        this.$bvToast.toast('Електронну пошту змінено. Лист підтвердження надіслено на вказану адресу', {
                            title: 'Зміни збережено',
                            variant: 'success',
                            solid: true
                        });
                        await this.$store.dispatch("user/changeUser", {'user': change});
                        this.editEmail = false;
                    } else {
                        this.$bvToast.toast('Електронну пошту не змінено', {
                            title: "Зміни не збережено",
                            variant: 'danger',
                            solid: true
                        });
                    }
                } else {
                    this.$bvToast.toast('Вибрана вами електронна пошта вже зареєстрована', {
                        title: "Зміни не збережено",
                        variant: 'danger',
                        solid: true
                    });
                }
                this.showEmailSpinner = false;
            },
            async savePassword() {
                if (this.passwordState()) {
                    this.showPasswordSpinner = true;
                    let change = await apiMethods.changePassword(this.user.id, this.modelPassword, this.token);
                    if (change)
                        this.$bvToast.toast('Пароль змінено!', {
                            title: "Ваш пароль було змінено!",
                            variant: 'success',
                            solid: true
                        });
                    else
                        this.$bvToast.toast('Сталася помилка', {
                            title: "Помилка",
                            variant: 'danger',
                            solid: true
                        });
                    this.modelPassword = '';
                    this.showPasswordSpinner = false;
                }
            },

            async updateUser(click) {
                let userUp = this.user;
                if (click === 1) {
                    userUp.lastName = this.modelSurname;
                    this.showSurnameSpinner = true;
                }
                else if (click === 2)
                {
                    userUp.firstName = this.modelName;
                    this.showNameSpinner = true;
                }
                else if (click === 3) {
                    userUp.secondName = this.modelSecond;
                    this.showSecondSpinner = true;
                }
                else if (click === 4)
                {
                    userUp.phoneNumber = this.modelPhone;
                    this.showPhoneSpinner = true;
                }
                let response = await apiMethods.updateUser(userUp.id, userUp, this.token);
                this.showPhoneSpinner = false;
                this.showSecondSpinner = false;
                this.showNameSpinner = false;
                this.showSurnameSpinner = false;
                if (response == null)
                    this.$bvToast.toast('Сталася помилка', {
                        title: "Помилка",
                        variant: 'danger',
                        solid: true
                    });
                else {
                    await this.$store.dispatch("user/changeUser", {'user': response.body});
                    this.modelName = '';
                    this.modelSecond = '';
                    this.modelSurname = '';
                    this.modelPhone = '';
                    this.editName = false;
                    this.editSecond = false;
                    this.editSurname = false;
                    this.editPhone = false;
                }
            },

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

            emailStateMethod() {
                let reg=  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
                if (!this.modelEmail) return null;
                return (this.modelEmail === "") ? null : (reg.test(this.modelEmail))
            },

            async changeLogin() {
                this.showSpinner = true;
                let result = await apiMethods.isLoginExists(this.modelLogin);
                this.showSpinner = false;
                this.loginState = result;
                if (result) {
                    let change = await apiMethods.changeLogin(this.user.id, this.modelLogin, this.token);
                    if (change) {
                        this.$bvToast.toast('Логін змінено', {
                            variant: 'success',
                            solid: true
                        });
                    } else {
                        this.$bvToast.toast('Логін не змінено', {
                            title: "Помилка",
                            variant: 'danger',
                            solid: true
                        });
                    }
                }
            },
        }
    }
</script>

<style scoped>

</style>