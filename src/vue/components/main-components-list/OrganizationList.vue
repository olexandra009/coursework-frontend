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
            <b-row v-for="org in organization" :key="org.id" class="mt-1">
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
    import FormOrganizationCreated from "../inner-components/created-forms/FormOrganizationCreated.vue";
    export default {
        name: "OrganizationList",
        components: {FormOrganizationCreated},
        data(){
            return{
                adminEdit: true,
                organization: [
                    {id: 1,
                        name: 'First Organization',
                        address: 'Address of organization',
                        phoneNumber: '092-12-12'},
                    {id: 2,
                        name: 'First Organization',
                        address: 'Address of organization',
                        phoneNumber: '092-12-12'},
                    {id: 3,
                        name: 'First Organization',
                        address: 'Address of organization',
                        phoneNumber: '092-12-12'}
                ]
            }
        }

    }
</script>

<style scoped>

</style>