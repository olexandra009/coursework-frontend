<template>
    <b-row class="text-center mt-3 ">
        <b-input-group class="w-100 m-auto">
            <b-form-select  v-model="selectedOrganization" :options="organization"/>
            <b-input-group-append class="pl-2">
                <b-button variant="outline-light btn-info" @click="applyFilter">Пошук</b-button>
            </b-input-group-append>
        </b-input-group>
    </b-row>
</template>

<script>
    import Vuex from "vuex";
    export default {
        name: "FormNewsFilter",
        computed: Vuex.mapState({
            ...Vuex.mapActions['getListOfOrganization','resetNewsStore'],
            organization: state=> {
                let ops = state.organization.organizationList;
                return ops.reduce((tail, x) => [...tail,{text: x.name, value: x.id}], [{text: 'Оберіть організацію', value:null}]);
            },
        }),
        methods:{
            applyFilter(){
                this.$store.dispatch('news/resetNewsStore');
                this.$store.dispatch('news/getListOfNews', {'organization': this.selectedOrganization});
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