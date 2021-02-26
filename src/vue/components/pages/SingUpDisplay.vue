<template>
    <b-card class="m-auto col-md-4">
        <b-card-header>Реєстрація:</b-card-header>
            <b-form >
                <div>
                    <label for="input-live">Ім'я:</label>
                    <b-form-input
                            id="input-live"
                            v-model="firstName"
                            :state="nameState"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Enter your name"
                            trim
                    />
                </div>
                <div>
                    <label for="input-live">По-батькові:</label>
                    <b-form-input
                            id="input-live"
                            v-model="secondName"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Enter your name"
                            trim
                    />
                </div>
                <div>
                    <label for="input-live">Прізвище:</label>
                    <b-form-input
                            id="input-live"
                            v-model="lastName"
                            :state="nameState"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Enter your name"
                            trim
                    />
                </div>
                <div>
                    <label for="input-live">E-mail:</label>
                    <b-form-input
                            id="input-live"
                            type="email"
                            v-model="email"
                            :state="nameState"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Enter your name"
                            trim
                    />
                </div>
                <div>
                    <label for="input-live">Логін:</label>
                    <b-form-input
                            id="input-live"
                            v-model="login"
                            :state="nameState"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Enter your name"
                            trim
                    />
                </div>
                <div>
                    <label for="input-live">Пароль:</label>
                    <b-form-input
                            id="input-live"
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

            </b-form>
    </b-card>
</template>

<script>

    import "bootstrap-vue";
    import {lowerCase} from "bootstrap-vue";

    export default {
        name: "SingUpDisplay",
        computed: {
            firstNameState() {
                if (this.firstName==='') return null;
                else return this.firstName.length > 2;
            },
            secondNameState() {
                if (this.secondName==='') return null;
                else return this.secondName.length > 2;
            },
            passwordState(){
                var lowerCaseLetters = /[a-z]/g;
                var upperCaseLetters = /[A-Z]/g;
                var numbers = /[0-9]/g;
                if(this.password=='') return null;
                else if (!this.password.match(lowerCaseLetters))
                    return false;
                else if (!this.password.match(upperCaseLetters))
                    return false;
                else if (!this.password.match(numbers))
                    return false;
                else if(this.password.length<8)
                    return false;
                else return true;



            },
        },
        data() {
            return {
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