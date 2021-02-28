<template>
    <div class="w-100 pt-3">
        <form-petition-created/>
        <b-row class="text-center">
            <!--Here will be filtered things-->
        </b-row>
        <b-row v-for="item in petition" :key="item.id">
            <b-card class="mt-2 w-100  bg-light">
               <b-row>
                   <b-col sm="12" md="8" order="2" order-sm="2" order-md="1"  order-lg="1" order-xl="1">
                       <router-link  v-bind:to="`/petition/${item.id}`"><h5>{{item.header}}</h5></router-link>

                   </b-col>
                   <b-col sm="12"  md="4"  order="1" order-sm="1" order-md="2" order-lg="2" order-xl="2">
                       <span>{{item.votesNumber}} {{votesString(item.votesNumber)}}</span>
                       <b-progress :value="item.votesNumber" height="5px" :max="item.minVotes" class="mb-3"/>
                       <p v-if="calculateDate(item.finishDate)">{{lastDate(item.finishDate)}}</p>
                       <span><b-icon :icon="statusIcon(item.votesNumber, item.minVotes, item.finishDate)"/> {{status(item.votesNumber, item.minVotes, item.finishDate)}}</span>
                   </b-col>
               </b-row>
            </b-card>
        </b-row>
    </div>
</template>

<script>
    import {convertStringToDate} from "../../../js/utility";
    import FormPetitionCreated from "../inner-components/created-forms/FormPetitionCreated.vue";
    export default {
        name: "PetitionList",
        components: {FormPetitionCreated},
        data(){
            return {
                dateNow: new Date(),
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
                        votesNumber: 1000,
                        minVotes: 2500},
                    {id: 3,
                        header: "Header of Petition can be very very long",
                        /*   text: "HEre is text very-very-very-long-text",*/
                        starDate: "27.02.2021, 18:04:47",
                        finishDate: "27.06.2021, 18:04:47",
                        authorName: "Last First Second",
                        authorId: 1,
                        votesNumber: 2503,
                        minVotes: 2500},
                    {id: 4,
                        header: "Header of Petition can be very very long",
                        /*   text: "HEre is text very-very-very-long-text",*/
                        starDate: "27.02.2021, 18:04:47",
                        finishDate: "22.02.2021, 18:04:47",
                        authorName: "Last First Second",
                        authorId: 1,
                        votesNumber: 203,
                        minVotes: 2500},

                ],
            }
        },
        methods:{

            calculateDate: (finishDate)=> {
                let date = convertStringToDate(finishDate);
                let dateNow = new Date();
                return date>dateNow;
            },
            lastDate: (finishDate)=>{
                let date = convertStringToDate(finishDate);
                let dateNow = new Date();
                let diff = Math.abs(date-dateNow);
                let days = parseInt(diff/1000/60/60/24);
                if( days === 0) return "Залишилось менше доби";
                let dS;
                let str = days.toString();
                let last = parseInt(str.substring(str.length-1));
                if (days===11||days===12||days===13||days===14)
                    dS= 'днів';
                else
                    switch(last){
                        case 0: case 5:
                        case 6: case 7:
                        case 8: case 9:
                            dS= 'днів';
                            break;
                        case 1:
                            dS= "день";
                            break;
                        case 2: case 3:
                        case 4:
                            dS= "дні";
                            break;
                    }
                return "Залишилось "+days +" "+dS;
            },
            statusIcon: (currentVotes, minVotes, finishDate)=>{
                let data = convertStringToDate(finishDate);
                let now = new Date();
                if(now>data) {
                    if (minVotes > currentVotes)
                        return 'x';
                    else
                        return 'clock';
                }else {
                    if (minVotes <= currentVotes)
                        return 'clock';
                    else
                        return "hourglass-split";
                }

            },
            status: (currentVotes, minVotes, finishDate)=>{
                let data =convertStringToDate(finishDate);
                let now = new Date();
                console.log("------------");
                console.log(data+" "+now+" ");
                console.log(now>data);
                console.log(now<data);
                console.log("------------");
                if(now>data){
                    if(minVotes>currentVotes)
                        return `Не підтримано`;
                    else
                        return `На розгляді`;
                } else {
                    if(minVotes<=currentVotes)
                        return `На розгляді`;
                    else
                        return `Триває збір підписів`;
                }
            },
          votesString: (numVote)=>{
              let num = parseInt(numVote);
              if (num===11||num===12||num===13||num===14)
                  return 'голосів';
              let numStr= numVote.toString();
              let numLast = parseInt(numStr.substring(numStr.length-1));
              switch(numLast){
                  case 0: case 5:
                  case 6: case 7:
                  case 8: case 9:
                      return 'голосів';
                  case 1:
                      return "голос";
                  case 2: case 3:
                  case 4:
                      return "голоси";
              }
          }
        },

    }
</script>

<style scoped>

</style>