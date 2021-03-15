<template>
    <div>
        <b-spinner class="ml-auto" v-if="loaderItem"/>
        <b-card class="min-vh-100 pt-2 bg-light">

            <div class="d-flex justify-content-end mb-1" v-if="adminEdit">
                <b-button type="submit" class="mr-1" @click="editNews=!editNews" variant="info" v-if="!editNews">Редагувати</b-button>
                <b-button type="submit" @click="deleteItem" variant="info" v-if="!editNews">Видалити</b-button>
            </div>
            <b-form-input v-model="newsHeader" v-if="editNews"/>
            <h4 class="text-center" v-else>{{news.header}}</h4>
            <div class="d-flex justify-content-between">
                <span><router-link v-bind:to="`/organization/${news.author.userOrganizationId}`">{{news.author.userOrganizationName}}</router-link> <span v-if="news.showAuthor"> - {{getAuthorName(news.author)}}</span></span>
                <span>{{getDateTime(news.dateTimeCreation)}}</span>
            </div>
            <div class="mt-4">
                <p v-html="`${newLinedText(news.text)}`" v-if="!editNews"/>
                <b-form-textarea class="min-vh-60" v-model="newsText"  v-if="editNews"/>
            </div>
            <div class="d-flex justify-content-around mt-4" v-if="editNews">
                <b-button type="submit" @click="saveEdition" variant="info">Зберегти</b-button>
                <b-button type="reset"  @click="cancelEdition" variant="info">Скасувати</b-button>
            </div>
            <photo-tab :multimedia="news.multimedias"/>
            <div class="text-secondary text-right" v-if="news.edited">Редаговано</div>

        </b-card>
    </div>
</template>


<script>
    import PhotoTab from "../inner-components/PhotoTab.vue";
    import {editHtmText} from "../../../js/utility";
    import Vuex from "vuex";
    import news from "../../store/modules/news";

    export default {
        name: "NewsItem",
        components: {PhotoTab},
        computed: Vuex.mapState({
             news: state=>state.news.selectedNews,
        }),

        created: async function(){
            this.loaderItem= true;
            let id = this.$route.params.id;
            await this.$store.dispatch('news/getNewsItem', {'id': id});
            this.loaderItem=false;
            this.newsHeader= this.news.header;
            this.newsText= this.news.text;
            let u = localStorage.user;
            if(u === undefined) {
                this.adminEdit = false;
                return;
            }
            let user = JSON.parse(u);
            if(user==null) {
                this.adminEdit = false;
                return;
            }
            if(user.id == this.news.authorId){
                this.adminEdit = true;
                return;
            }
            let roles = user.role.split(', ');
            this.adminEdit = !!roles.includes('Moderator');
        },
        methods:{
            ...Vuex.mapActions(['getNewsItem', 'updateNewsItem', 'deleteNewsItem']),
            newLinedText: (t)=> editHtmText(t),
            getDateTime(str){
                console.log('NEWS');
                console.log(str);
                let date = new Date(str);
                console.log(date);
                return date.toLocaleString();
            },
            getAuthorName(author){
                return author.firstName+' '+author.lastName;
            },
            async saveEdition(){
                if(this.newsHeader.trim().length === 0||this.newsText.trim().length === 0) {
                    this.editNews=!this.editNews;
                    return;
                }
                let id = this.$route.params.id;
                let updateNews = {
                authorId: this.news.authorId,
                showAuthor: this.news.showAuthor, //17^25-17:47
                edited: true,
                dateTimeCreation: this.news.dateTimeCreation,
                header: this.newLinedText(this.newsHeader),
                text: this.newLinedText(this.newsText),
                    multimedias: this.news.multimedias,
                 };
                let i = await this.$store.dispatch('news/updateNewsItem', {'id': id, 'news': updateNews});
                if(i)
                    this.$bvToast.toast('Новину успішно змінено', {
                        title: `Успіх`,
                        variant: 'success',
                        solid: true
                    });
                else
                    this.$bvToast.toast('Сталась помилка', {
                        title: `Помилка`,
                        variant: 'danger',
                        solid: true
                    });
                this.cancelEdition();
            },
            cancelEdition(){
                this.editNews=!this.editNews;
                this.newsHeader = this.news.header;
                this.newsText= this.news.text;
            },
            async deleteItem(){
                let id = this.$route.params.id;
                let i = await this.$store.dispatch('news/deleteNewsItem', {'id': id,});
                if(i)
                    this.$bvToast.toast('Новину успішно видалено', {
                        title: `Успіх`,
                        variant: 'success',
                        solid: true
                    });
                else
                    this.$bvToast.toast('Сталась помилка', {
                        title: `Помилка`,
                        variant: 'danger',
                        solid: true
                    });
                history.back();
            }
        },
        data(){
            return{
                loaderItem: true,
                adminEdit: true,
                editNews: false,
                newsHeader: '',
                newsText: '',
            }
        }
    }
</script>

<style scoped>

</style>