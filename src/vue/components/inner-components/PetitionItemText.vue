<template>
    <div>
        <h4 class="">{{petition_header}}</h4>
        <div class="">
            <div>Автор: {{petition_authorName}}</div>
            <div>Оприлюднено: {{petition_startDate}}</div>
        </div>
        <div>
            <div class="mt-4">
                <p v-html="`${newLinedText(petition_text)}`"/>
            </div>
            <div class="text-center">Відповідь:</div>
            <div>
                <p v-html="`${newLinedText(petition_answer)}`"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {editHtmText} from "../../../js/utility.js";

    export default {
        name: "PetitionItemText",
        props: ['petition_text','petition_header','petition_authorName','petition_startDate', 'petition_answer'],
        methods:  {
            newLinedText: (t)=>{
                console.log("HERE");
                return editHtmText(t)
            },
        },
    }
</script>

<style scoped>

</style>