<template>
    <div class="w-100 mt-3">
        <div class="text-secondary text-center"><b-spinner class="ml-auto" v-if="loading"/></div>
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

        }),
        methods:{
            ...Vuex.mapActions(['getListOfNews']),

        },
        data(){
            return{
                canLoad: true,
                loading: true,
                showEnd: false,
            }
        },
        created: async function() {
            await this.$store.dispatch("news/getListOfNews",{"organization": this.selected});
            this.showEnd =  this.total <= this.skip;
            this.loading = false;
        },
        mounted() {
            window.onscroll = async ()  => {
                const el = document.documentElement;
                const isBottomOfScreen = el.scrollTop + window.innerHeight > el.offsetHeight - 10;
                if (isBottomOfScreen && this.canLoad&&this.total>this.skip) {
                    this.canLoad = false;
                    this.loading = true;
                    await this.$store.dispatch("news/getListOfNews",{"organization": this.selected});
                    this.loading = false;
                    this.showEnd =  this.total <= this.skip;
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