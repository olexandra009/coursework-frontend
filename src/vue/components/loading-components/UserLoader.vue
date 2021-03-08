<template>
    <div class="w-100 mt-3">
        <div v-if="showEnd" class="text-secondary smallerText text-center">Ви переглянули всі події</div>
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
            showEnd(){return this.total <= this.skip;}
        }),
        methods:{
            ...Vuex.mapActions(['getListOfUsers']),
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
                    await this.$store.dispatch("user/getListOfUsers", {'role': this.role});
                    this.canLoad = true;
                }
            }
        },
        created() {
            this.$store.dispatch("user/getListOfUsers", {'role': this.role});
        },
        beforeDestroy() {
            window.onscroll = null
        }
    }
</script>

<style scoped>

</style>