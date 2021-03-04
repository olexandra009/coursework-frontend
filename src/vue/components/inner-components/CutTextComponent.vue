<template>
    <div>
        <span v-if="!readMoreActivated && text.length>200" v-html="newLinedText(text.slice(0, 200))"/>
        <a class="card-link" v-if="!readMoreActivated && text.length>200" @click="activateReadMore">
           Показати більше
        </a>
        <span v-if="readMoreActivated || text.length<=200" v-html="text"/>
    </div>
</template>

<script>
    import {editHtmText} from "../../../js/utility";

    export default {
        props:['text'],
        name: "CutTextComponent",
        data(){
            return{
                readMoreActivated: false,
            }
        },
        methods: {
            newLinedText(t){return editHtmText(t)},
            activateReadMore(){
                this.readMoreActivated = true;
            }
        }
    }
</script>

<style scoped>

</style>