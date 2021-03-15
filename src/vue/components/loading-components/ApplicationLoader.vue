<template>
    <div class="w-100 mt-3">
        <div class="text-secondary text-center"><b-spinner class="ml-auto" v-if="loading"/></div>
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
        }),
        methods:{
            ...Vuex.mapActions(['getListOFApplication']),
        },
        data(){
            return{
                canLoad: true,
                loading: true,
                showEnd: false,
            }
        },
        mounted: function(){
            window.onscroll = async () => {
                const el = document.documentElement;
                const isBottomOfScreen = el.scrollTop + window.innerHeight > el.offsetHeight - 10;
                if (isBottomOfScreen && this.canLoad&&this.total>this.skip) {
                    this.canLoad = false;
                    this.loading = true;
                    await this.$store.dispatch("application/getListOFApplication",
                            {'status': this.status, 'answerer': this.answerer, 'author':this.author});
                    this.loading = false;
                    this.showEnd =  this.total <= this.skip;
                    this.canLoad = true;
                }
            }
        },
        async created() {
            let user = JSON.parse(localStorage.user);
            let roles = user.role.split(', ');
            let author = this.author;
            if(!roles.includes("ApplicationAdmin"))
                author = user.id;
            await this.$store.dispatch("application/getListOFApplication",
                    {'status': this.status, 'answerer': this.answerer, 'author':author});
            this.showEnd =  this.total <= this.skip;
            this.loading = false;
        },
        beforeDestroy() {
            window.onscroll = null
        }
    }
</script>

<style scoped>

</style>