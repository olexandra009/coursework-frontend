<template>
    <div>
        <b-form v-on:submit.prevent="submitApplication" v-on:reset.prevent="resetApplication" class="w-75 m-auto">
            <b-row class="pt-2">
                <b-col sm="3" class="vertical">
                    <label>Тема: </label>
                </b-col>
                <b-col sm="9">
                    <b-form-input
                            id="subject"
                            placeholder="Лаконічно сформулюйте тему звернення"
                            v-model="applicationSubject"
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
                            v-model="applicationText"
                            row="2"
                            required
                    />
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
                <b-button type="submit" :disabled="creating" variant="info">Cтворити<b-spinner small v-if="creating"/></b-button>
                <b-button type="reset" variant="info">Скасувати</b-button>
            </div>
            <div class="text-secondary smallerText">Увага! Після створення ви не зможете внести зміни до звернення</div>
        </b-form>
    </div>
</template>

<script>

    import Vuex from "vuex";
    import {editHtmText} from "../../../../js/utility";
    export default {
        name: "FormApplicationCreated",
        methods: {
            ...Vuex.mapActions(['createApplicationItem']),
            submitApplication(){
                let author = JSON.parse(localStorage.getItem('user'));
                let subject = editHtmText(this.applicationSubject);
                let text = editHtmText(this.applicationText);
                let multimedias = [];
                this.imageDataArray.forEach(image => {
                    let arrayImage = image.image.split(',');
                    multimedias.unshift({'url': arrayImage[1], "isImage": true})
                });
                let application= {
                    'authorId': author.id,
                    'subject': subject,
                    'text': text,
                    'status': 1,
                    'openDate': new Date().toISOString(),
                    'multimedias':multimedias,
                };
                this.creating = true;
                let result = this.$store.dispatch('application/createApplicationItem', {'application':application});
                this.creating = false;
                if (result)
                    this.$bvToast.toast('Звернення успішно додане', {
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
                location.reload();
                this.resetApplication();

            },
            resetApplication(){
                this.imageDataId= 0;
                this.imageDataArray= [];
                this.applicationSubject= "";
                this.applicationText="";
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
                    this.$bvToast.toast('Дозволяється завантажувати не більше 5 зображень', {
                        title: `Увага`,
                        variant: 'warning',
                        solid: true
                    });
                    return;
                }
                let fileList = event.target.files;

                if (fileList) {
                    let count = fileList.length;
                    if(this.imageDataArray.length + count>= 5){
                        count = 5-this.imageDataArray.length;
                        this.$bvToast.toast('Дозволяється завантажувати не більше 5 зображень', {
                            title: `Увага`,
                            variant: 'warning',
                            solid: true
                        });
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
                imageDataId: 0,
                imageDataArray: [],
                files: [],
                applicationSubject: "",
                applicationText: "",
                creating: false,
            }
        }
    }
</script>

<style scoped>

</style>