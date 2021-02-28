<template>
    <vue-circle
            :progress="4.666"
            :size="100"
            :reverse="false"
            line-cap="square"
            :fill="fill"
            empty-fill="rgba(0, 0, 0, .1)"
            :animation-start-value="0.0"
            :start-angle="-Math.PI"
            insert-mode="append"
            :thickness="5"
            :show-percent="true"
            @vue-circle-progress="progress"
            @vue-circle-end="progress_end">
    </vue-circle>
</template>

<script>
    import VueCircle from 'vue2-circle-progress/src/index.vue'

    export default {
        name: "PetitionItem",
        components: {
            VueCircle
        },
        data(){
            return{
                fill : { color: "#2bbcfa" }
            }
        },
        methods:{
            progress(event,progress,stepValue){
                console.log(stepValue);
            },
            progress_end(event){
                console.log("Circle progress end");
            }
        }
    }
</script>

<style scoped>

</style>