<template>
    <div class="w-100 pt-3">
        <b-row class="text-center">
            <!--Here will be filtered things-->
        </b-row>
        <b-row v-for="item in petition" :key="item.id">
            <b-card class="mt-2 bg-light">
               <b-row>
                   <b-col sm="1" md="8" order-sm="2" order-md="1">
                       <router-link  v-bind:to="`/petition/${item.id}`"><h5>{{item.header}}</h5></router-link>
                   </b-col>
                   <b-col sm="1"  md="4" order-sm="1" order-md="2">
                       <span>{{item.finishDate}}</span>
                   </b-col>
               </b-row>
            </b-card>
        </b-row>
    </div>
</template>

<script>
    export default {
        name: "PetitionList",
        data(){
            return {
                petition:[
                    {id: 0,
                        header: "Header of Petition can be very very long",
                     /*   text: "HEre is text very-very-very-long-text",*/
                        starDate: "27.02.2021, 18:04:47",
                        finishDate: "27.06.2021, 18:04:47",
                        authorName: "Last First Second",
                        authorId: 1,
                        votesNumber: 100,
                        minVotes: 2500},
                    {id: 2,
                        header: "Header of Petition can be very very long",
                        /*   text: "HEre is text very-very-very-long-text",*/
                        starDate: "27.02.2021, 18:04:47",
                        finishDate: "27.06.2021, 18:04:47",
                        authorName: "Last First Second",
                        authorId: 1,
                        votesNumber: 100,
                        minVotes: 2500},
                    {id: 3,
                        header: "Header of Petition can be very very long",
                        /*   text: "HEre is text very-very-very-long-text",*/
                        starDate: "27.02.2021, 18:04:47",
                        finishDate: "27.06.2021, 18:04:47",
                        authorName: "Last First Second",
                        authorId: 1,
                        votesNumber: 100,
                        minVotes: 2500},

                ],
            }
        }
    }
</script>

<style scoped>

</style>