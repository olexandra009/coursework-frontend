<template>
    <div>
        <h4 class="">{{petition.header}}</h4>
        <div class="">
            <div>Автор: {{getAuthorName(petition.author)}}</div>
            <div>Оприлюднено: {{petition.startDate}}</div>
        </div>
        <div>
            <div class="mt-4">
                <p v-html="`${newLinedText(petition.text)}`"/>
            </div>
            <div class="text-center" v-if="petition.answer">Відповідь:</div>
            <div v-if="petition.answer">
                <p v-html="`${newLinedText(petition.answer)}`"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {editHtmText} from "../../../js/utility.js";
    import Vuex from "vuex";

    export default {
        name: "PetitionItemText",
        props: ['petition_text','petition_header','petition_authorName','petition_startDate', 'petition_answer'],
        methods:  {
            newLinedText: (t)=>{
                if(t==null) return ;
                return editHtmText(t)
            },
            getAuthorName: (author)=>{
                return author.lastName+' '+author.firstName+' '+author.secondName;
            },
        },
        computed: Vuex.mapState({
            petition: state=> state.petition.selectedPetition,
            minVotes: state=>state.petition.minVotes,
        }),
    }
</script>

<style scoped>

</style>