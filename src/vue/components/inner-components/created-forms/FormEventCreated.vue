<template>
    <div>
        <b-form v-on:submit.prevent="submitEvent" v-on:reset.prevent="resetEvent" class="w-75 m-auto">
            <b-row class="pt-2">
                <b-col sm="3" class="vertical">
                    <label>Заголовок: </label>
                </b-col>
                <b-col sm="9">
                    <b-form-input
                            id="subject"
                            v-model="eventHeader"
                            required
                    />
                </b-col>
            </b-row>
            <b-row class="pt-2">
                <b-col sm="3" class="mt-1">
                    <label>Опис: </label>
                </b-col>
                <b-col sm="9">
                    <b-form-textarea
                            id="subject-text"
                            v-model="eventDescription"
                            row="2"
                            required
                    />
                </b-col>
            </b-row>
            <b-row class="pt-2">
                <b-col sm="3" class="mt-1">
                    <label>Початок:</label>
                </b-col>
                <b-col sm="9">
                    <b-row>
                          <b-col sm="8"> <b-form-datepicker  class="smallerText" v-model="dateModel" locale="en"/></b-col>
                          <b-col sm="4"><b-form-timepicker   class="smallerText" v-model="timeModel" locale="ua"/></b-col>
                    </b-row>
                </b-col>

            </b-row>
            <b-row class="pt-2">
                <b-col sm="3" class="mt-1">
                    <label>Кінець:</label>
                </b-col>
                <b-col sm="9">
                    <b-row>
                        <b-col sm="8"> <b-form-datepicker  class="smallerText" v-model="dateEndModel" locale="en"/></b-col>
                        <b-col sm="4"><b-form-timepicker   class="smallerText" v-model="timeEndModel" locale="ua"/></b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row class="pt-2">
                <b-col class="col-12">
                    <div class="ml-auto w-50">
                        <b-row>
                            <b-col class="col-3">
                                <b-form-checkbox v-model="showAuthor" name="check-button" switch>
                                </b-form-checkbox>
                            </b-col>
                            <b-col class="col-9">
                                <span v-if="showAuthor">Відображати автора</span>
                                <span v-else>Приховати автора</span>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
            </b-row>
            <b-row class="pt-2">
                <b-col class="col-12">
                    <div class="ml-auto w-50">
                        <b-row>
                            <b-col class="col-3">
                                <b-form-checkbox v-model="sendEmail" name="check-button" switch>
                                </b-form-checkbox>
                            </b-col>
                            <b-col class="col-9">
                                <span>Надіслати оповіщення</span>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
            </b-row>
            <b-row class="pt-2">
                <b-col sm="3">
                    <label>Оберіть зображення: </label>
                </b-col>
                <b-col sm="9" class="file-upload-form">
                    <b-form-file multiple  @change="previewImages" accept="image/*"/>
                    <div class="w-100 smallerText text-secondary">Ви можете прикріпити 5 зображень</div>
                </b-col>
                <b-row class="ml-1">
                    <b-card class="image-preview-card" v-for="image in imageDataArray" :key="image.id">
                        <b-row> <div class="ml-auto" @click="deleteImage(image.id)"><b-icon scale="1" icon="x-circle-fill"/></div></b-row>
                        <b-row>
                            <div class="image-preview-div">
                                <img class="image-preview-image" :src="image.image" >
                            </div>
                        </b-row>
                    </b-card>
                </b-row>
            </b-row>
            <div class="d-flex justify-content-around mt-4">
                <b-button type="submit" variant="info">Cтворити</b-button>
                <b-button type="reset" variant="info">Скасувати</b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
    import Vuex from "vuex";
    import {editHtmText} from "../../../../js/utility";

    export default {
        name: "FormEventCreated",
        methods: {
            ...Vuex.mapActions(['addNewEvent']),
           async submitEvent() {
               let dateTimeStart = new Date(this.dateModel + ', ' + this.timeModel).toISOString();
               let dateTimeEnd = new Date(this.dateEndModel + ', ' + this.timeEndModel).toISOString();
               let author = JSON.parse(localStorage.getItem('user'));
               let authorId = author.id;
               let multimedias = [];
               this.imageDataArray.forEach(image => {
                   let arrayImage = image.image.split(',');
                   multimedias.unshift({'url': arrayImage[1], "isImage": true})
               });
               let header = this.eventHeader;
               let description = editHtmText(this.eventDescription);

               let createEvent = {
                   'name': header,
                   "description": description,
                   "startDate": dateTimeStart,
                   "endDate": dateTimeEnd,
                   "edited": false,
                   "showAuthor": this.showAuthor,
                   "emailNotification": this.emailNotification,
                   "authorId": authorId,
                   "multimedias": multimedias
               };
               let result = await this.$store.dispatch('events/addNewEvent', {'events': createEvent});
               if (result)
                   this.$bvToast.toast('Подію успішно додано', {
                       title: `Успіх`,
                       variant: 'success',
                       solid: true
                   });
               else
                   this.$bvToast.toast('Сталася помилка, спробуйте пізніше', {
                       title: `Помилка`,
                       variant: 'danger',
                       solid: true
                   });
               this.resetEvent();
           },

           resetEvent() {
                this.sendEmail = false;
                this.showAuthor = true;
                this.dateModel = '';
                this.timeModel = '12:00:00';
                this.dateEndModel = '';
                this.timeEndModel = '12:00:00';
                this.imageDataId = 0;
                this.imageDataArray = [];
                this.eventDescription = "";
                this.eventHeader = "";
           },

            deleteImage(id){
                let x = parseInt(id);
                let deleted =this.imageDataArray.find(f=> f.id===x);
                const index = this.imageDataArray.indexOf(deleted);
                if (index > -1) {
                    this.imageDataArray.splice(index, 1);
                }

            },
            previewImages: function (event) {
                if (this.imageDataArray.length >= 5) {
                    //todo alert or toast
                    return;
                }
                let fileList = event.target.files;

                if (fileList) {
                    let count = fileList.length;
                    if (this.imageDataArray.length + count >= 5) {
                        count = 5 - this.imageDataArray.length;
                        //todo alert or toast
                    }
                    for (let i = 0; i < count; i++) {
                        if (fileList[i]) {
                            let reader = new FileReader();
                            reader.onload = (e) => {
                                this.imageDataArray.push({id: this.imageDataId, image: e.target.result});
                                this.imageDataId++;
                            };
                            reader.readAsDataURL(fileList[i]);
                        }
                    }
                }
            },
        },
        data(){
            return{
                sendEmail: false,
                showAuthor: true,
                dateModel: '',
                timeModel: '12:00:00',
                dateEndModel: '',
                timeEndModel: '12:00:00',
                imageDataId: 0,
                imageDataArray: [],
                eventDescription: "",
                eventHeader: "",
            }
        }
    }
</script>

<style scoped>

</style>