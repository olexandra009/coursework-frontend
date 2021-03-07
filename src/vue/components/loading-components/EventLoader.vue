<template>
    
</template>

<script>
    import Vuex from "vuex";

    export default {
        name: "EventLoader",
        computed:Vuex.mapState({
          //  selected: state=> state.events,
        }),
        methods:{
            ...Vuex.mapActions(['getListOfEvents'])
        },
        mounted() {
            window.onscroll = () => {
                const el = document.documentElement
                const isBottomOfScreen = el.scrollTop + window.innerHeight  >  el.offsetHeight - 10;
                if (isBottomOfScreen) {
                    this.$store.dispatch("events/getListOfEvents");
                }
            }
        },
        beforeDestroy() {
            window.onscroll = null
        }
    }
</script>

<style scoped>

</style>