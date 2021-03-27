<template>
    <div class="w-100">
        <b-row class="mt-3">
            <b-col sm="12" class="col-12">
                <b-input-group class="w-100">
                    <b-form-select  v-model="selectedType" :options="type"/>
                    <b-form-select  v-model="selectedStatus" :options="statusList"/>
                    <b-input-group-append>
                        <b-button variant="outline-light btn-info" @click="applyFilter">Застосувати</b-button>
                        <b-button variant="outline-light btn-info" @click="resetFilter">Скинути</b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import Vuex from "vuex";

    export default {
        name: "FormApplicationFilter",
        computed: Vuex.mapState({
            ...Vuex.mapActions['getListOFApplication','resetApplicationStore'],
            status: state=>state.application.status,
            author: state=>state.application.author,
            answerer: state=>state.application.answerer,
        }),
        methods:{
            async applyFilter(){
                await this.$store.dispatch('application/resetApplicationStore');
                let author = this.selectedType === 2;
                let answerer = this.selectedType === 1;
                await this.$store.dispatch('application/getListOFApplication', {'status': this.selectedStatus, 'author': author, 'answerer': answerer});

            },
            async resetFilter(){
                await this.$store.dispatch('application/getListOFApplication');
            }
        },
        created() {
            let user = JSON.parse(localStorage.user);
            let roles = user.role.split(', ');
            if(!roles.includes('ApplicationAdmin'))
            {
                console.log("HEre");
                this.type.shift();
                console.log("HEre");
                this.type.shift();
                this.selectedType = 2;
            }
        },
        data(){
            return {
                selectedType: (this.author)?2:((this.answerer)?1:null),
                type: [{value: null, text:'Всі звернення'},
                       {value: 1, text:'Обрані звернення'},
                       {value: 2, text:'Мої звернення'}],
                selectedStatus: (!this.status||this.status>3)?0:this.status,
                statusList: [{value: 0, text:'Оберіть статус'},
                         {value: 1, text:'Очікується'},
                         {value: 2, text:'В процесі'},
                         {value: 3, text:'Закрита'}]
            }
        }
    }
</script>

<style scoped>

</style>