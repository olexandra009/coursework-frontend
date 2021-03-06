<template>
    <div class="min-vh-100 mt-1">
        <b-button class="mt-3 btn-block"  v-if="adminEdit" v-b-toggle.create-news-collapse variant="outline-info">Додати організацію</b-button>
        <b-collapse id="create-news-collapse" class="mt-2">
            <form-organization-created/>
        </b-collapse>

        <div class="mt-2">
            <b-row>
                <b-card class="w-100 bg-light">
                    <b-row>
                        <b-col class="col-6 ">Назва організації</b-col>
                        <b-col class="col-5 ">Контактний телефон</b-col>
                        <b-col class="col-1 "/>
                    </b-row>
                </b-card>
            </b-row>
            <b-row v-for="org in organizationList" :key="org.id" class="mt-1">
                <b-card class="w-100">
                    <b-row>
                        <b-col class="col-6">{{org.name}}</b-col>
                        <b-col class="col-5">{{org.phoneNumber}}</b-col>
                        <b-col class="col-1" @click="$router.push({path: `/organization/${org.id}`})"><b-icon icon="box-arrow-right"/></b-col>
                    </b-row>
                </b-card>
            </b-row>
        </div>
    </div>
</template>

<script>
    import Vuex from 'vuex';
    import FormOrganizationCreated from "../inner-components/created-forms/FormOrganizationCreated.vue";
    export default {
        name: "OrganizationList",
        components: {FormOrganizationCreated},
        computed: Vuex.mapState({
                organizationList: state=>state.organization.organizationList,
        }),
        methods: {
          ...Vuex.mapActions(['getListOfOrganization', 'getOrganizationItem']),
            async getOrganization(id){
              await this.$store.dispatch('organization/getOrganizationItem',{'orgId': id} );
              this.$router.push({path: `/organization/${id}`});
            }

        },
        mounted() {
          this.$store.dispatch('organization/getListOfOrganization');
        },
        data(){
            return{
                adminEdit: true,
            }
        }

    }
</script>

<style scoped>

</style>