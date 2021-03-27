<template>
    <div class="min-vh-20 mt-2">
        <b-row class="mt-3">
            <b-col>
                <b-button class="btn-block" v-b-toggle.answerer-form variant="info">Надати відповідь</b-button>
            </b-col>
        </b-row>
        <b-collapse id="answerer-form" class="mt-3">
            <b-form v-on:submit.prevent="addAnswer" >
               <b-row>
                    <b-col>
                        <b-form-textarea
                                v-model="answerModel"
                                required
                                row="3"
                        />
                    </b-col>
               </b-row>
                <b-row class="mt-2">
                    <b-col>
                       <b-button type="submit" variant="info">Відправити</b-button>
                    </b-col>
                </b-row>
            </b-form>
        </b-collapse>
    </div>
</template>

<script>
    import Vuex from "vuex";
    export default {
        name: "FormApplicationAnswerCreated",
        props: ['answer', 'appid'],
        methods:{
            ...Vuex.mapActions(['updateResultApplicationItem']),
            async addAnswer(){
                console.log("I am here: "+ this.answer + " "+ this.appid);
              await this.$store.dispatch('application/updateResultApplicationItem', {'id': this.appid,'result': this.answerModel});
                console.log("After await");
              // location.reload();
            },
        },
        data(){
            return {answerModel:''}
        }
    }
</script>

<style scoped>

</style>