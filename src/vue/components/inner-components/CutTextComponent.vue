<template>
    <div>
        <span v-if="!readMoreActivated && text.length>200">{{text.slice(0, 200)}}</span>
        <a class="card-link" v-if="!readMoreActivated" @click="activateReadMore">
           Показати більше
        </a>
        <span v-if="readMoreActivated || text.length<=200" v-html="text"/>
    </div>
</template>

<script>
    export default {
        props:['text'],
        name: "CutTextComponent",
        data(){
            return{
                readMoreActivated: false,
            }
        },
        methods: {
        activateReadMore(){
            this.readMoreActivated = true;
        }
        }
    }
</script>

<style scoped>

</style>