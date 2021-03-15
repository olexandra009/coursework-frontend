<template>
    <div class="w-100 mt-3">
        <div class="text-secondary text-center"><b-spinner class="ml-auto" v-if="loading"/></div>
        <div v-if="showEnd" class="text-secondary smallerText text-center">Ви переглянули всіх користувачів</div>
    </div>
</template>

<script>
    import Vuex from "vuex";

    export default {
        name: "UserLoader",
        computed:Vuex.mapState({
            role: state=> state.user.filterRole,
            total: state=>state.user.total,
            skip: state=>state.user.skip,
        }),
        methods:{
            ...Vuex.mapActions(['getListOfUsers']),
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
                    await this.$store.dispatch("user/getListOfUsers", {'role': this.role});
                    this.loading = false;
                    this.showEnd =  this.total <= this.skip;
                    this.canLoad = true;
                }
            }
        },
        async created() {
            await this.$store.dispatch("user/getListOfUsers", {'role': this.role});
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