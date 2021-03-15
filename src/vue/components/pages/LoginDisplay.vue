<template>
    <b-row class="pt-3 w-100">
        <b-card  class="m-auto col-md-4" >
            <div class="text-center">
             <h4>Вхід</h4>
            </div>
            <b-form class="mt-2">
              <div class="pt-2">
                    <label>Логін:</label>
                    <b-form-input
                            v-model="loginModel"
                            :state="null"
                            required
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
                            required
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Введіть пароль:"
                            trim
                    />
                </div>
                <div class="pt-3">
                    <div class="d-flex justify-content-around">
                        <b-button class="w-25 btn-info" @click="loginInto">Вхід</b-button>
                        <b-button @click="show">Відхилити</b-button>
                    </div>
                    <div class="pt-3 text-center text-dark">
                        <router-link to="/singup">Немає аккаунту? Створити новий</router-link>
                    </div>
                    <div class="text-center text-dark">
                        <router-link to="/forgot_password">Забули пароль?</router-link>
                    </div>
                </div>
            </b-form>
        </b-card>
    </b-row>
</template>

<script>
    import "bootstrap-vue";
    import Vuex from "vuex";

    export default {
        name: "LoginDisplay",
        metaInfo: {
            title: 'Вхід',
        },
        computed: Vuex.mapState({
            users: state => state.user.currentUser,

        }),
        methods:{
            ...Vuex.mapActions(['login']),
            show(){
                console.log(this.loginModel);
                console.log(this.password);
            },
            async loginInto(){
                let result = await this.$store.dispatch("user/login", {'login': this.loginModel, 'password': this.password});
                if(result.error===true){
                    this.$bvToast.toast(result.errorText, {
                        title: `Помилка`,
                        variant: 'danger',
                        solid: true
                    });
                } else {
                    this.$router.push('/');
                }
            }

        },
        data() {
            return {
                loginModel: '',
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