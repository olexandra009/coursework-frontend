<template>
    <div>
        <b-form v-on:submit.prevent="SubmitApplication" v-on:reset.prevent="ResetApplication" class="w-75 m-auto">
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
                    <b-form-file multiple v-model="files"  @change="previewImages" accept="image/*"/>
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
    export default {
        name: "FormApplicationCreated",
        methods: {
            deleteImage(id){
                console.log("Here");
                let x = parseInt(id);
                console.log(x);
                let deleted =this.imageDataArray.find(f=> f.id===x);
                console.log(deleted);
                const index = this.imageDataArray.indexOf(deleted);
                console.log(index);
                if (index > -1) {
                    this.imageDataArray.splice(index, 1);
                }

            },
            previewImages: function (event) {
                if(this.imageDataArray.length >= 5)
                {
                    return;
                }
                let fileList = event.target.files;

                if (fileList) {
                    let count = fileList.length;
                    if(this.imageDataArray.length + count>= 5){
                        count = 5-this.imageDataArray.length;
                    }
                    for(let i = 0; i<count; i++ ) {
                        if (fileList[i]) {
                            console.log(fileList[i]);
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
            }
        }
    }
</script>

<style scoped>

</style>