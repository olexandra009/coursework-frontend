<template>
    <div>
        <b-row>
            <b-form v-on:submit.prevent="SubmitReview" v-on:reset.prevent="ResetReview" class="w-75 m-auto">
                <div class="pt-2">
                    <b-form-group  label="Заголовок:" >
                        <b-form-textarea
                                v-model="petitionHeader"
                                required
                                rows="2"
                        />
                    </b-form-group>
                </div>
                <div class="pt-2">
                    <b-form-group  label="Текст:" >
                        <b-form-textarea
                                v-model="petitionText"
                                required
                                rows="4"
                        />
                    </b-form-group>
                </div>
                <div class="d-flex justify-content-around">
                    <b-button type="submit" variant="info">Cтворити</b-button>
                    <b-button type="reset" variant="info">Скасувати</b-button>
                </div>
            </b-form>
        </b-row>

    </div>
</template>

<script>
    export default {
        name: "FormPetitionCreated",
        data(){
            return{
                showCreatedForm: false,
                petitionHeader: "",
                petitionText: ""
            }
        },
        methods:{
            changeFormVisible(){this.showCreatedForm = true},
            SubmitReview(){this.petitionHeader=""; this.petitionText=""; this.showCreatedForm=false},
            ResetReview(){this.petitionHeader=""; this.petitionText=""; this.showCreatedForm=false}
        }
    }
</script>

<style scoped>

</style>