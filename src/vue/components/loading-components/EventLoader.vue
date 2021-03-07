<template>
    <div class="w-100 mt-3">
        <div v-if="showEnd" class="text-secondary smallerText text-center">Ви переглянули всі події</div>
    </div>
</template>

<script>
    import Vuex from "vuex";

    export default {
        name: "EventLoader",
        computed:Vuex.mapState({
          //  selected: state=> state.events,
            selOrg: state=> state.events.selectedOrg,
            selTime:state=> state.events.selectedTime,
            total: state=>state.events.totalItem,
            skip: state=>state.events.skip,
            showEnd(){return this.total <= this.skip;}
        }),
        methods:{
            ...Vuex.mapActions(['getListOfEvents']),

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
                    await this.$store.dispatch("events/getListOfEvents", {'time': this.selTime, 'orgId': this.selOrg});
                    this.canLoad = true;
                }
            }
        },
        created() {
            this.$store.dispatch("events/getListOfEvents", {'time': this.selTime,'orgId':this.selOrg});
        },
        beforeDestroy() {
            window.onscroll = null
        }
    }
</script>

<style scoped>

</style>