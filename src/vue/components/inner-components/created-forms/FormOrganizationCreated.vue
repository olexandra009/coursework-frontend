<template>
    <div>
        <b-form v-on:submit.prevent="addOrganization" v-on:reset.prevent="cancelOrganization" class="w-75 m-auto">
            <b-row class="pt-2">
                <b-col sm="3" class="vertical">
                    <label>Назва організації: </label>
                </b-col>
                <b-col sm="9">
                    <b-form-input
                            id="subject"
                            :state="nameOrganizationState"
                            v-model="orgName"
                            required
                    />
                </b-col>
            </b-row>
            <b-row class="pt-2">
                <b-col sm="3" class="mt-1">
                    <label>Адреса: </label>
                </b-col>
                <b-col sm="9">
                    <b-form-textarea
                            id="subject-text"
                            v-model="orgAddress"
                            row="2"

                    />
                </b-col>
            </b-row>

            <b-row class="pt-2">
                <b-col sm="3" class="mt-1">
                    <label>Tелефон: </label>
                </b-col>
                <b-col sm="9">
                    <b-form-textarea
                            id="subject-text"
                            type="tel"
                            v-model="orgPhone"
                            row="2"

                    />
                </b-col>
            </b-row>


            <div class="d-flex justify-content-around mt-4">
                <b-button type="submit" variant="info">Cтворити</b-button>
                <b-button type="reset"  variant="info">Скасувати</b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
    import Vuex from 'vuex';
    export default {
        name: "FormOrganizationCreated",
        methods: {
            ...Vuex.mapActions(['addOrganizationItem']),
           async addOrganization(){
                if(this.orgName === ''){
                    this.nameOrganizationState = false;
                    return;
                }else{
                    this.nameOrganizationState = true;
                }
              let response = await
                this.$store.dispatch('organization/addOrganizationItem',
                    {name: this.orgName, phone: this.orgPhone, address: this.orgAddress});
              if(response)
                  this.$bvToast.toast('Успіх', {
                      title: `Ви додали нову організацію`,
                      variant: 'success',
                      solid: true
                  });
              else
                  this.$bvToast.toast('Помилка', {
                      title: `Підчас додавання організації сталась помилка`,
                      variant: 'danger',
                      solid: true
                  });
                this.nameOrganizationState = null;
                this.orgName= '';
                this.orgPhone =  '';
                this.orgAddress = '';
            },
            cancelOrganization(){
                this.orgName= '';
                this.orgPhone =  '';
                this.orgAddress = '';
                this.nameOrganizationState = null;
            }
        },
        data(){
            return{
                nameOrganizationState: null,
                orgName:'',
                orgPhone: '',
                orgAddress: '',
            }
        }
    }
</script>

<style scoped>

</style>