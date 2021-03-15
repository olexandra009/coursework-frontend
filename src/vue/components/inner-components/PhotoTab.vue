<template>
    <b-row>
        <b-row class="photo-div">
            <b-card v-for="photo in multimedia" :key="photo.id">
                <div class="image-div-tab">
                  <img class="image-image-tab" @click="showImage(photo.id)" :src="photo.url"/>
                </div>
            </b-card>
        </b-row>
        <b-modal id="image_preview" hide-footer>
            <b-carousel
                    id="carousel-1"
                    v-model="slide"
                    :interval="0"
                    controls
                    indicators
                    background="#ababab"
                    img-width="1024"
                    img-height="480"
                    style="text-shadow: 1px 1px 2px #333;"
            >
                <b-carousel-slide v-for="slide in multimedia" :key = "slide.id"
                                  :img-src="slide.url"/>
            </b-carousel>
        </b-modal>
    </b-row>
</template>

<script>
    export default {
        name: "PhotoTab",
        props: ['multimedia'],
        data(){
            return{
                slide: 0,

            };
        },
        methods:{
            showImage(id){
                let inId = parseInt(id);
                let i=0;
                for(i; i< this.multimedia.length; i++)
                    if(this.multimedia[i].id===inId)
                        break;
                this.slide = i;
                this.$bvModal.show('image_preview');
            }
        }
    }
</script>

<style scoped>

</style>