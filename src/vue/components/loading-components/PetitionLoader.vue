<template>
    <div class="w-100 mt-3">
        <div v-if="showEnd" class="text-secondary smallerText text-center">Ви переглянули всі події</div>
    </div>
</template>

<script>
    import Vuex from "vuex";

    export default {
        name: "PetitionLoader",
        computed:Vuex.mapState({
            status: state=> state.petition.status,
            total: state=>state.petition.totalItem,
            skip: state=>state.petition.skip,
            showEnd(){return this.total <= this.skip;}
        }),
        methods:{
            ...Vuex.mapActions(['getPetitionList']),
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
                    let mine = false;
                    if(this.$route.path === '/petition/my') mine = true;
                    await this.$store.dispatch("petition/getPetitionList", {'status': this.status, 'mine': mine});
                    this.canLoad = true;
                }
            }
        },
        created() {
            let mine = false;
            if(this.$router.fullPath === '/petition/my') mine = true;
            this.$store.dispatch("petition/getPetitionList", {'status': this.status, 'mine': mine});
        },
        beforeDestroy() {
            window.onscroll = null
        }
    }
</script>

<style scoped>

</style>