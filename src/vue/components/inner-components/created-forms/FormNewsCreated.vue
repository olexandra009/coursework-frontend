<template>
    <div>
        <b-form v-on:submit.prevent="submitNews" v-on:reset.prevent="resetNews" class="w-75 m-auto">
            <b-row class="pt-2">
                <b-col sm="3" class="vertical">
                    <label>Заголовок: </label>
                </b-col>
                <b-col sm="9">
                    <b-form-input
                            id="subject"
                            v-model="newsHeader"
                            required
                    />
                </b-col>
            </b-row>
            <b-row class="pt-2">
                <b-col sm="3" class="mt-1">
                    <label>Текст: </label>
                </b-col>
                <b-col sm="9">
                    <b-form-textarea
                            id="subject-text"
                            v-model="newsText"
                            row="2"
                            required
                    />
                </b-col>
            </b-row>
            <b-row class="pt-2">
                <b-col class="col-12 switch-col">
                    <div class="ml-auto">
                            <b-form-checkbox v-model="showAuthor" name="check-button" switch>
                                <span v-if="showAuthor">Відображати автора</span>
                                <span v-else>Приховати автора</span>
                            </b-form-checkbox>
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
    import {editHtmText} from "../../../../js/utility";
    import Vuex from "vuex";

    export default {
        name: "FormNewsCreated",
        methods: {
            ...Vuex.mapActions(['addNewNews']),
            async submitNews() {
                let dateCreation = new Date().toISOString();
                let author = JSON.parse(localStorage.getItem('user'));
                let authorId = author.id;
                let multimedias = [];
                this.imageDataArray.forEach(image => {
                    multimedias.unshift({'url': image.image, "isImage": true})
                });
                let header = this.newsHeader;
                let text = editHtmText(this.newsText);
                let newNews = {
                    "header": header,
                    "text": text,
                    "dateTimeCreation": dateCreation,
                    "edited": false,
                    "showAuthor": this.showAuthor,
                    "authorId": authorId,
                    "multimedias": multimedias
                };
                let result = await this.$store.dispatch('news/addNewNews', {'news': newNews})
                if (result)
                    this.$bvToast.toast('Новина успішно додана', {
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

                this.resetNews();
            },

            resetNews() {
                this.newsText = "";
                this.newsHeader = "";
                this.showAuthor = true;
                this.imageDataId = 0;
                this.imageDataArray = [];
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
                if(this.imageDataArray.length >= 5)
                {
                    //todo alert or toast
                    return;
                }
                let fileList = event.target.files;

                if (fileList) {
                    let count = fileList.length;
                    if(this.imageDataArray.length + count>= 5){
                        count = 5-this.imageDataArray.length;
                        //todo alert or toast
                    }
                    for(let i = 0; i<count; i++ ) {
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
                showAuthor: true,
                imageDataId: 0,
                imageDataArray: [],
                newsText: "",
                newsHeader: "",
            }
        }
    }
</script>

<style scoped>

</style>