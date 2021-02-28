<template>
    <div>
        <h4 class="">{{petition_header}}</h4>
        <div class="">
            <div>Автор: {{petition_authorName}}</div>
            <div>Оприлюднено: {{petition_startDate}}</div>
        </div>
        <div class="mt-4">
            <b-row v-for="vote in votes" :key="vote.id">
                <b-card class="w-100 mt-1">
                    <b-row class="mt-0 mb-0">
                        <b-col sm="6">{{vote.name}}</b-col>
                        <b-col class="d-none" sm="1"/>
                        <b-col sm="5">{{vote.voteDate}}</b-col>
                    </b-row>
                </b-card>
            </b-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PetitionItemVotes",
        props: ['petition_header','petition_authorName','petition_startDate'],
        data(){
            return {votes: [{id: 123, name: "Last First Second", voteDate: "27.02.2021, 18:04:47"},
                    {id: 124, name: "Last First Second", voteDate: "27.02.2021, 18:04:47"},
                    {id: 125, name: "Last First Second", voteDate: "27.02.2021, 18:04:47"},
                    {id: 126, name: "Last First Second", voteDate: "27.02.2021, 18:04:47"},
                    {id: 127, name: "Last First Second", voteDate: "27.02.2021, 18:04:47"},
                    {id: 128, name: "Last First Second", voteDate: "27.02.2021, 18:04:47"},
                    {id: 129, name: "Last First Second", voteDate: "27.02.2021, 18:04:47"},
                ]}
        }
    }
</script>

<style scoped>

</style>