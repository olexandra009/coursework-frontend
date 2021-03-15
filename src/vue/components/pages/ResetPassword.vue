<template>
    <div>
        <b-container class="mt-5">
            <b-row>
                <div class="w-100"><h3 class="text-center">Відновлення паролю</h3></div>
            </b-row>
        </b-container>
        <div>
            <b-container class="mt-2">
                <b-row>
                    <b-col sm="1" md="2" lg="3"/>
                    <b-col sm="10" md="8" lg="6">
                        <b-form v-on:submit.prevent="sendPassword">
                            <p>Введіть ваш новий пароль:</p>
                            <b-input-group>
                                <b-form-input
                                        type="password"
                                        class="ml-1"
                                        v-model="modelPassword"
                                        :state="passwordState()"
                                        aria-describedby="input-live-help input-live-feedback"
                                        placeholder="Введіть новий пароль:"
                                        trim/>
                                <b-form-invalid-feedback class="text-center" id="input-live-feedback">
                                    Пароль повинен складатись з щонайменше 8 символів та містити в собі хоча б 1 велику літеру, 1 маленьку та 1 цифру
                                </b-form-invalid-feedback>
                            </b-input-group>
                        </b-form>
                        <p class="mt-2">На вашу пошту прийде лист з посиланням за допомогою якого ви зможете скинути пароль.</p>
                        <p>Також ви можете повернутись <router-link to="/">на головну</router-link>, або на <router-link to="/login">сторінку входу</router-link></p>
                    </b-col>
                    <b-col sm="1" md="2" lg="3"/>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
    import apiMethods from "../../../api/api-methods";

    export default {
        name: "ResetPassword",
        metaInfo: {
            title: 'Відновлення пароля',
        },
        methods:{
            async sendPassword(){
                if(this.passwordState()){
                    let token = this.$route.params.token;
                    let id = this.$route.params.id;
                    let change = await apiMethods.changePassword(id, this.modelPassword, token);
                    if(change)
                        this.$bvToast.toast('Пароль змінено!', {
                            title:"Ваш пароль було змінено!",
                            variant: 'success',
                            solid: true
                        });
                    else
                        this.$bvToast.toast('Сталася помилка', {
                            title:"Помилка",
                            variant: 'danger',
                            solid: true
                        });
                    this.modelPassword = '';
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
        },
        data(){
            return{
                modelPassword:'',
            }
        }
    }
</script>

<style scoped>

</style>