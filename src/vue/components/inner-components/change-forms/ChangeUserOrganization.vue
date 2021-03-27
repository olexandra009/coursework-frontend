<template>
    <b-row class="text-center mt-3">
        <b-input-group class="w-100 m-auto">
            <b-form-select  v-model="selectedOrganization" :options="organization"/>
            <b-input-group-append class="pl-2">
                <b-button variant="outline-light btn-info" @click="changeUserOrganization">Змінити</b-button>
            </b-input-group-append>
            <b-button class="btn-block" @click="deleteUserFromOrganization" type="info">Видалити користувача з організації</b-button>
        </b-input-group>
    </b-row>
</template>

<script>
    import Vuex from "vuex";

    export default {
        name: "ChangeUserOrganization",
        props: ['user_id'],
        computed: Vuex.mapState({
            ...Vuex.mapActions['getListOfOrganization', 'changeOrganization'],
            organization: state=> {
                let ops = state.organization.organizationList;
                return ops.reduce((tail, x) => [...tail,{text: x.name, value: x.id}], [{text: 'Оберіть організацію', value:null}]);
            },
        }),
        methods:{
            async deleteUserFromOrganization(){
                let i = await this.$store.dispatch('user/changeOrganization', {'userId': this.user_id,
                    'orgId': 0, 'orgName': ''});
                if(i===null) return;
                if(i===true) {
                    this.$bvToast.toast('Зміни збережено', {
                        variant: 'success',
                        solid: true
                    });
                } else {
                    this.$bvToast.toast('Сталась помилка', {
                        title: "Помилка",
                        variant: 'danger',
                        solid: true
                    });
                }
            },
            async changeUserOrganization(){
                let ind = this.organization.findIndex(x=>x.value===this.selectedOrganization);
                let orgName = this.organization[ind];
                let i = await this.$store.dispatch('user/changeOrganization', {'userId': this.user_id,
                    'orgId': this.selectedOrganization, 'orgName': orgName.text});
                if(i===null) return;
                if(i===true) {
                    this.$bvToast.toast('Зміни збережено', {
                        variant: 'success',
                        solid: true
                    });
                } else {
                    this.$bvToast.toast('Сталась помилка', {
                        title: "Помилка",
                        variant: 'danger',
                        solid: true
                    });
                }

            }
        },
        data(){
            return{
                selectedOrganization: null,
            }
        },
        created() {
            this.$store.dispatch("organization/getListOfOrganization");
        }
    }
</script>

<style scoped>

</style>