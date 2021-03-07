<template>
    <div class="w-100 mt-3">
        <div v-if="showEnd" class="text-secondary smallerText text-center">Ви переглянули всі новини</div>
    </div>
</template>

<script>
    import Vuex from 'vuex'
    export default {
        name: "NewsLoader",
        computed:Vuex.mapState({
            selected: state=> state.news.selOrgId,
            total: state=>state.news.total,
            skip: state=>state.news.skip,
            showEnd(){return this.total <= this.skip;},
        }),
        methods:{
            ...Vuex.mapActions(['getListOfNews']),

        },
        data(){
            return{
                canLoad: true,
            }
        },
        created() {
            this.$store.dispatch("news/getListOfNews",{"organization": this.selected});
        },
        mounted() {
            window.onscroll = async ()  => {
                const el = document.documentElement;
                const isBottomOfScreen = el.scrollTop + window.innerHeight > el.offsetHeight - 10;
                if (isBottomOfScreen && this.canLoad&&this.total>this.skip) {
                    this.canLoad = false;
                    await this.$store.dispatch("news/getListOfNews",{"organization": this.selected});
                    this.canLoad = true;
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