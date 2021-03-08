<template>
    <b-row class="pt-3 w-100">
        <b-card class="m-auto col-md-4">
            <div class="text-center">
                 <h4>Реєстрація</h4>
            </div>
                <b-form class="mt-2" v-on:submit.prevent="registerUser" v-on:reset.prevent="resetRegister">
                    <div class="pt-2">
                        <label>Ім'я:</label>
                        <b-form-input
                                v-model="firstName"
                                :state="null"
                                aria-describedby="input-live-help input-live-feedback"
                                placeholder="Enter your name"
                                trim
                        />
                    </div>
                    <div class="pt-2">
                        <label>По-батькові:</label>
                        <b-form-input
                                v-model="secondName"
                                aria-describedby="input-live-help input-live-feedback"
                                placeholder="Enter your name"
                                trim
                        />
                    </div>
                    <div class="pt-2">
                        <label>Прізвище:</label>
                        <b-form-input
                                v-model="lastName"
                                :state="null"
                                aria-describedby="input-live-help input-live-feedback"
                                placeholder="Enter your name"
                                trim
                        />
                    </div>
                    <div class="pt-2">
                        <label>E-mail:</label>
                        <b-form-input
                                type="email"
                                v-model="email"
                                :state="null"
                                aria-describedby="input-live-help input-live-feedback"
                                placeholder="Enter your name"
                                trim
                        />
                    </div>
                    <div class="pt-2">
                        <label>Логін:</label>
                        <b-form-input
                                v-model="login"
                                :state="loginCheck"
                                aria-describedby="input-live-help input-live-feedback-3"
                                placeholder="Введіть логін"
                                trim
                        />
                        <b-form-invalid-feedback id="input-live-feedback-3">
                            Такий логін вже існує
                        </b-form-invalid-feedback>
                    </div>
                    <div class="pt-2">
                        <label>Пароль:</label>
                        <b-form-input
                                v-model="password"
                                type="password"
                                :state="passwordState"
                                aria-describedby="input-live-help input-live-feedback"
                                placeholder="Введіть пароль:"
                                trim
                        />
                        <b-form-invalid-feedback id="input-live-feedback">
                           Пароль повинен складатись з щонайменше 8 символів та містити в собі хоча б 1 велику літеру, 1 маленьку та 1 цифру
                        </b-form-invalid-feedback>
                    </div>
                    <div class="pt-3">
                        <div class="d-flex justify-content-around">
                            <b-button type="submit" class="btn-info">Зареєструватись</b-button>
                            <b-button type="reset">Відхилити</b-button>
                        </div>
                    </div>
                </b-form>
        </b-card>
    </b-row>
</template>

<script>
    import apiMethods from "/src/api/api-methods";
    import "bootstrap-vue";

    export default {
        name: "SingUpDisplay",
        computed: {
            passwordState(){
                let lowerCaseLetters = /[a-z]/g;
                let upperCaseLetters = /[A-Z]/g;
                let numbers = /[0-9]/g;
                if(this.password==='') return null;
                else if (!this.password.match(lowerCaseLetters))
                    return false;
                else if (!this.password.match(upperCaseLetters))
                    return false;
                else if (!this.password.match(numbers))
                    return false;
                else return this.password.length >= 8;
            },
        },
        methods: {
            resetRegister(){
                this.loginCheck= null;
                this.login= '';
                this.firstName= '';
                this.lastName= '';
                this.secondName=  '';
                this.email=  '';
                this.password= '';
            },
            sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
            },
            async registerUser(){
                //todo show loader
                let exist = await apiMethods.isLoginExists(this.login);
                if(!exist) {
                    this.loginCheck = false;
                    return;
                }
                this.loginCheck = true;
                let user= {
                    "firstName": this.firstName,
                    "lastName": this.lastName,
                    "email": this.email,
                    "login": this.login,
                    "password": this.password,
                };
                if(this.secondName) user.secondName = this.secondName;
                if(this.phoneNumber) user.phoneNumber = this.phoneNumber;

                let result = await apiMethods.registration(user);
                if(result==null)
                {
                    this.$bvToast.toast("Під час реєстрації сталась помилка", {
                        title: `Помилка`,
                        variant: 'danger',
                        solid: true
                    });
                } else {
                    this.resetRegister();
                    this.$bvToast.toast("Ви успішно зареєструвались, перевірте пошту (лист може потрапити у спам) для підтвердження", {
                        title: `Успіх`,
                        variant: 'success',
                        solid: true
                    });
                    await this.sleep(3000);
                    this.$router.push('/');
                }

            },
        },
        data() {
            return {
                loginCheck: null,
                login: '',
                firstName: '',
                lastName: '',
                secondName: '',
                email: '',
                password: '',
            }
        }
    }
</script>

<style scoped>

</style>