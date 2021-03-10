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
                    <p>Введіть електронну адресу за допомогою якої ви раєструвались:</p>
                        <b-input-group>
                            <b-form-input
                                type="email"
                                v-model="emailModel"
                                :state="emailState"
                                required
                                aria-describedby="input-live-feedback"
                               />
                            <b-form-invalid-feedback id="input-live-feedback">
                                Введіть коректну адресу електронної пошти
                            </b-form-invalid-feedback>
                        <b-input-group-append>
                            <b-button type="submit" variant="info">Надіслати</b-button>
                        </b-input-group-append>
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
    import apiMethods from  "/src/api/api-methods";
    export default {
        name: "ForgotPassword",
        computed: {
            emailState(){
                console.log("HERE");
                if(!this.emailModel) return null;
                return (this.emailModel === "")? null : (this.reg.test(this.emailModel))},
        },
        metaInfo: {
            title: 'Відновлення паролю',
        },
        methods:{
           async sendPassword(){
               console.log(this.emailModel);

               let t =  await apiMethods.forgotPassword(this.emailModel);

               if(t){
                   this.$bvToast.toast("Лінк для відновлення доступу надішлено", {
                       title: `Успіх`,
                       variant: 'success',
                       solid: true
                   });
               }
               else{
                   this.$bvToast.toast("Під час відновлення паролю сталась помилка. Спробуйте пізніше", {
                       title: `Помилка`,
                       variant: 'danger',
                       solid: true
                   });
               }
           },
        },
        data(){
            return{
                emailModel: '',
                reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,

            }
        }
    }
</script>

<style scoped>

</style>