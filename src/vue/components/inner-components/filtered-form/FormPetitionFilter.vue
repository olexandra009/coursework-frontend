<template>
    <div>
        <b-row class="text-center mt-3 ">
            <b-input-group class="w-100 m-auto">
                <b-form-select  v-model="selectedType" :options="type"/>
                <b-form-select  v-model="modelStatus" :options="status"/>
                <b-input-group-append class="pl-2">
                    <b-button  variant="outline-light btn-info" @click="applyFilter">Пошук</b-button>
                </b-input-group-append>
            </b-input-group>
        </b-row>
    </div>
</template>

<script>
    import Vuex from "vuex";

    export default {
        name: "FormPetitionFilter",
        computed: Vuex.mapState({
            ...Vuex.mapActions['getPetitionList','resetFilter'],
            selectedStatus: state=>state.petition.status,
        }),
        methods:{
            applyFilter(){
                let mine = false;
                if(this.selectedType!=null) mine = true;
                this.$store.dispatch('petition/resetFilter');
                this.$store.dispatch('petition/getPetitionList', {'status': this.modelStatus, 'mine': mine});
            }
        },
        created() {
            try{
                let user = JSON.parse(localStorage.getItem('user'));
                if(!user)
                    this.type = [this.type[0]];
            } catch (e)
            {
                this.type = [this.type[0]];
            }

        },
        data(){
            return {
                selectedType: null,
                modelStatus: (this.selectedStatus==null)?null:this.selectedStatus,
                status: [{value: null, text: 'Оберіть статус'},
                    {value: {timeStatus: 'act'}, text: 'Збір голосів'},
                    {value: {timeStatus: 'cls', votesStatus: 'unsuccessful'}, text: 'Не підтримано'},
                    {value: {votesStatus: 'successful'}, text: 'Розглядаються/З відповіддю'},
                ],
                type: [{value: null, text: 'Всі петиції'},
                       {value: 1, text: 'Мої петиції'}]

            }
        }
    }
</script>

<style scoped>

</style>