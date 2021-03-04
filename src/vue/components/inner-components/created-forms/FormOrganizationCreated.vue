<template>
    <div>
        <b-form v-on:submit.prevent="SubmitApplication" v-on:reset.prevent="ResetApplication" class="w-75 m-auto">
            <b-row class="pt-2">
                <b-col sm="3" class="vertical">
                    <label>Назва організації: </label>
                </b-col>
                <b-col sm="9">
                    <b-form-input
                            id="subject"
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
                            required
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
                            required
                    />
                </b-col>
            </b-row>


            <div class="d-flex justify-content-around mt-4">
                <b-button type="submit" variant="info">Cтворити</b-button>
                <b-button type="reset" variant="info">Скасувати</b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
    export default {
        name: "FormOrganizationCreated",
        data(){
            return{
                orgName:'',
                orgPhone: '',
                orgAddress: '',
            }
        }
    }
</script>

<style scoped>

</style>