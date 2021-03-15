<template>
    <div>
            <b-container class="mt-5">
                <b-row>
                    <div class="w-100"><h3 class="text-center">Підтвердження акаунта</h3></div>
                </b-row>
            </b-container>
           <div v-if="success&&loadFinish">
               <b-container class="mt-2">
                   <b-row>
                       <b-col sm="1" md="2" lg="3"/>
                       <b-col sm="10" md="8" lg="6">
                           <p>Акаунт :login: успішно підтверджено.</p>
                           <p>Тепер вам доступне створення зверенень. Для дозволу на створення петицій та голосування увійдіть в систему та розширте ваші права у кабінеті.</p>
                           <p>Ви можете перейти <router-link to="/">на головну</router-link>, або <router-link to="/login">увійти в систему</router-link></p>
                           <p>Дякуємо, що ви з нами!</p>
                       </b-col>
                       <b-col sm="1" md="2" lg="3"/>
                   </b-row>
               </b-container>
           </div>
            <div v-if="!loadFinish">
                <b-container class="mt-2">
                    <b-row>
                        <b-col sm="1" md="2" lg="3"/>
                        <b-col sm="10" md="8" lg="6">
                            <p>Ми підтверджуємо ваш акаунт...</p>
                            <b-spinner class="m-auto"/>
                        </b-col>
                        <b-col sm="1" md="2" lg="3"/>
                    </b-row>
                </b-container>
            </div>
            <div v-if="loadFinish&&!success">
                <b-container class="mt-2">
                    <b-row>
                        <b-col sm="1" md="2" lg="3"/>
                        <b-col sm="10" md="8" lg="6">
                            <p>Під час підтвердження сталася помилка.</p>
                            <p>Перевірте правильність посилання</p>
                            <p>Або натисніть <a class="link-enable" @click="$bvModal.show('inputEmail')">тут</a>, щоб отримати код ще раз</p>
                        </b-col>
                        <b-col sm="1" md="2" lg="3"/>
                    </b-row>
                </b-container>
            </div>
            <b-modal id="inputEmail" hide-footer>
                <template #modal-title>
                    Введіть емейл
                </template>
                <b-form v-on:submit.prevent="resendEmail" v-if="showModule">
                <b-input v-model="email" :state="emailStateMethod()" required/>
                <div class="d-flex justify-content-end">
                    <b-button variant="outline-info" type="submit" class="mr-1">Підтвердити</b-button>
                    <b-button variant="outline-info" @click="$bvModal.hide('inputEmail')">Скасувати</b-button>
                </div>
                </b-form>
                <div v-else-if="successResend">
                    <p>На вашу адресу {{email}} було надіслено підтвердження.</p>
                </div>
                <div v-else>
                    <p>Сталась помилка. Можливо на дану адресу не було зареєстровано жоден акаунт</p>
                </div>
            </b-modal>

    </div>
</template>

<script>
    import apiMethods from "/src/api/api-methods";
    export default {
        name: "ConfirmEmailDisplay",
        created: async function() {
            let id = this.$route.params.id;
            let code = this.$route.params.token;
            this.loadFinish=false;
            let result = await apiMethods.confirmEmail(code, id);
            this.sleep(3000);
            this.loadFinish=true;
            this.success=result;
        },
        methods:{
            sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            },
            emailStateMethod() {
                let reg=  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
                if (!this.email) return null;
                return (this.email === "") ? null : (reg.test(this.email))
            },
            async resendEmail(){
                if(this.email.length ===0 )return;
                let result = await apiMethods.resendConfirmEmail(this.email);
                this.successResend = result;
                this.showModule = false;
              }
        },
        metaInfo: {
            title: 'Підтвердження акаунта',

        },
        data(){
            return{
                email: '',
                showModule: true,
                success: false,
                loadFinish: false,
                successResend: true,

            }
        }
    }
</script>

<style scoped>

</style>