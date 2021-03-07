<template>
    <div class="w-75 m-auto">
        <b-row class="text-center mt-3">
            <b-input-group class="w-100 m-auto">
                <b-form-select  v-model="selectedOrganization" :options="organization"/>
                <b-form-select  v-model="selectedTimeType" :options="times"/>
            </b-input-group>
        </b-row>
        <b-row class="text-center mt-3">
            <b-col class="col-12 text-center">
                <b-button variant="outline-light btn-info" @click="applyFilter">Застосувати</b-button>
                <b-button variant="outline-light btn-info">Скинути</b-button>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import Vuex from "vuex";

    export default {
        name: "FormEventFilter",
        computed: Vuex.mapState({
            ...Vuex.mapActions['getListOfOrganization','resetEventStore','getListOfEvents'],
            organization: state=> {
                let ops = state.organization.organizationList;
                return ops.reduce((tail, x) => [...tail,{text: x.name, value: x.id}], [{text: 'Оберіть організацію', value:null}]);
            },
        }),
        methods:{
            async applyFilter(){
                await this.$store.dispatch('events/resetEventStore');
                await this.$store.dispatch('events/getListOfEvents', {'orgId': this.selectedOrganization, 'time':this.selectedTimeType});
            }
        },
        data(){
            return{
                selectedTimeType: null,
                selectedOrganization: null,
                times: [{text: 'Оберіть час', value: null},
                    {value:'active', text:'Актуальні' },
                    {value:'pass', text:'Минулі'}]
            }
        }
    }
</script>

<style scoped>

</style>