<template>
    <b-row class="pt-3 w-100">
        <b-card class="m-auto col-md-4">
            <div class="text-center">
                 <h4>Реєстрація</h4>
            </div>
                <b-form class="mt-2">
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
                                :state="null"
                                aria-describedby="input-live-help input-live-feedback"
                                placeholder="Enter your name"
                                trim
                        />
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
                            <b-button class="btn-info">Зареєструватись</b-button>
                            <b-button>Відхилити</b-button>
                        </div>
                    </div>
                </b-form>
        </b-card>
    </b-row>
</template>

<script>

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
        data() {
            return {
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