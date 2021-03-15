<template>
    <div>
        <b-row>
            <b-form v-on:submit.prevent="submitPetition" v-on:reset.prevent="resetPetition" class="w-75 m-auto">
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
                    <b-button type="submit"  :disabled="creating" variant="info">Cтворити<b-spinner small v-if="creating"/></b-button>
                    <b-button type="reset" variant="info">Скасувати</b-button>
                </div>
            </b-form>
        </b-row>

    </div>
</template>

<script>
    import Vuex from "vuex";

    import {editHtmText} from "../../../../js/utility";

    export default {
        name: "FormPetitionCreated",
        methods: {
            ...Vuex.mapActions(['addPetitionItem']),
             submitPetition: async function(){
                let author = JSON.parse(localStorage.getItem('user'));
                let startDate = new Date();
                let finishDate = new Date(Date.parse(startDate)+7776000000);
                let petition = {
                    "header": this.petitionHeader,
                    "text": editHtmText(this.petitionText),
                    "authorId": author.id,
                    "starDate": startDate.toISOString(),
                    "finishDate": finishDate.toISOString()
                };
                this.creating=true;
                let y = await this.$store.dispatch('petition/addPetitionItem', {'petition':petition});
                this.creating=false;
                console.log(y);
                this.resetPetition();
             },
            resetPetition(){this.petitionHeader=""; this.petitionText=""; this.showCreatedForm=false},
        },
        data(){
            return{
                creating: false,
                showCreatedForm: false,
                petitionHeader: "",
                petitionText: ""
            }
        },
    }
</script>

<style scoped>

</style>