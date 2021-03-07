<template>
    <span/>
</template>

<script>
    import Vuex from 'vuex'
    export default {
        name: "NewsLoader",
        computed:Vuex.mapState({
            selected: state=> state.news.selOrgId,
        }),
        methods:{
            ...Vuex.mapActions(['getListOfNews'])
        },
        mounted() {
            window.onscroll = () => {
                const el = document.documentElement
                const isBottomOfScreen = el.scrollTop + window.innerHeight  >  el.offsetHeight - 10;
                if (isBottomOfScreen) {
                    this.$store.dispatch("news/getListOfNews",{"organization": this.selected});
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