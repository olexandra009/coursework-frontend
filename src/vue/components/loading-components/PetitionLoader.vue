<template>
    <div class="w-100 mt-3">
        <div class="text-secondary text-center"><b-spinner class="ml-auto" v-if="loading"/></div>
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
        }),
        methods:{
            ...Vuex.mapActions(['getPetitionList']),
        },
        data(){
            return{
                canLoad: true,
                showEnd: false,
                loading: true,
            }
        },
        mounted: function(){
            window.onscroll = async () => {
                const el = document.documentElement;
                const isBottomOfScreen = el.scrollTop + window.innerHeight > el.offsetHeight - 10;
                if (isBottomOfScreen && this.canLoad&&this.total>this.skip) {
                    this.canLoad = false;
                    let mine = false;
                    this.loading = true;
                    if(this.$route.path === '/petition/my') mine = true;
                    await this.$store.dispatch("petition/getPetitionList", {'status': this.status, 'mine': mine});
                    this.loading = false;
                    this.showEnd =  this.total <= this.skip;
                    this.canLoad = true;
                }
            }
        },
        created: async function() {
            let mine = false;
            console.log(this.$router.fullPath);
            if(this.$route.fullPath === '/petition/my') mine = true;
            await this.$store.dispatch("petition/getPetitionList", {'status': this.status, 'mine': mine});
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