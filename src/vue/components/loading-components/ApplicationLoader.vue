<template>
    <div class="w-100 mt-3">
        <div v-if="showEnd" class="text-secondary smallerText text-center">Ви переглянули всі звернення</div>
    </div>
</template>

<script>
    import Vuex from "vuex";
    export default {
        name: "ApplicationLoader",
        computed:Vuex.mapState({
            author: state=> state.application.author,
            answerer:state=> state.application.answerer,
            status: state=>state.application.status,
            total: state=>state.application.totalItem,
            skip: state=>state.application.skip,
            showEnd(){return this.total <= this.skip;}
        }),
        methods:{
            ...Vuex.mapActions(['getListOFApplication']),
        },
        data(){
            return{
                canLoad: true,
            }
        },
        mounted: function(){
            window.onscroll = async () => {
                const el = document.documentElement;
                const isBottomOfScreen = el.scrollTop + window.innerHeight > el.offsetHeight - 10;
                if (isBottomOfScreen && this.canLoad&&this.total>this.skip) {
                    this.canLoad = false;
                    await this.$store.dispatch("application/getListOFApplication",
                            {'status': this.status, 'answerer': this.answerer, 'author':this.author});
                    this.canLoad = true;
                }
            }
        },
        created() {
            this.$store.dispatch("application/getListOFApplication",
                    {'status': this.status, 'answerer': this.answerer, 'author':this.author});
        },
        beforeDestroy() {
            window.onscroll = null
        }
    }
</script>

<style scoped>

</style>