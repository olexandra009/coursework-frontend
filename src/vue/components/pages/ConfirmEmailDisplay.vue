<template>
    <div>
            <b-container class="mt-5">
                <b-row>
                    <div class="w-100"><h3 class="text-center">Підтвердження акаунта</h3></div>
                </b-row>
            </b-container>
           <div>
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
            <div>
                <b-container class="mt-2">
                    <b-row>
                        <b-col sm="1" md="2" lg="3"/>
                        <b-col sm="10" md="8" lg="6">
                            <p>Ми підтверджуємо ваш акаунт...</p>
                            <!--TODO: loader here-->
                        </b-col>
                        <b-col sm="1" md="2" lg="3"/>
                    </b-row>
                </b-container>
            </div>
            <div>
                <b-container class="mt-2">
                    <b-row>
                        <b-col sm="1" md="2" lg="3"/>
                        <b-col sm="10" md="8" lg="6">
                            <p>Під час підтвердження сталася помилка.</p>
                            <p>Перевірте правильність посилання</p>
                            <p>Або натисніть <a @click="$bvModal.show('inputEmail')">тут</a>, щоб отримати код ще раз</p>
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
                <b-input v-model="email" required/>
                <div class="d-flex justify-content-end">
                    <b-button variant="outline-info" type="submit" class="mr-1">Підтвердити</b-button>
                    <b-button variant="outline-info" @click="$bvModal.hide('inputEmail')">Скасувати</b-button>
                </div>
                </b-form>
                <div v-else>
                    <p>На вашу адресу {{email}} було надіслено підтвердження.</p>
                </div>
            </b-modal>

    </div>
</template>

<script>
    export default {
        name: "ConfirmEmailDisplay",

        methods:{
          resendEmail(){
              if(this.email.length ===0 )return;

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
            }
        }
    }
</script>

<style scoped>

</style>