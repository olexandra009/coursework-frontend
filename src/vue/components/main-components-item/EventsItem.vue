<template>
    <b-card class="min-vh-100 pt-2 bg-light">
        <div class="d-flex justify-content-end mb-1" v-if="adminEdit">
            <b-button class="mr-1" @click="editEvents=!editEvents" variant="info" v-if="!editEvents">Редагувати</b-button>
            <b-button @click="deleteItem" variant="info" v-if="!editEvents">Видалити</b-button>
        </div>

        <b-form-input v-model="nameModel" v-if="editEvents"/>
        <h4 class="text-center" v-else>{{events.name}}</h4>

        <div class="" v-if="!editEvents">
            <div class="mb-0">{{getDateTime(events.startDate)}} - {{getDateTime(events.endDate)}}</div>
            <div class="mt-0"><router-link v-bind:to="`/organization/${events.author.userOrganizationId}`">{{events.author.userOrganizationName}}</router-link><span v-if="events.showAuthor"> - {{getAuthorName(events.author)}}</span></div>
        </div>

        <div v-else>
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
        </div>
        <div class="mt-4">
            <p v-html="`${newLinedText(events.description)}`" v-if="!editEvents"/>
            <b-form-textarea class="min-vh-60" v-model="descriptionModel"  v-else/>
        </div>
        <div class="d-flex justify-content-around mt-4" v-if="editEvents">
            <b-button type="submit" @click="saveEdition" :disabled="editing" variant="info">Зберегти <b-spinner class="smallText" v-if="editing"/> </b-button>
            <b-button type="reset"  @click="cancelEdition" variant="info">Скасувати</b-button>
        </div>
        <photo-tab :multimedia="events.multimedias"/>
        <div class="text-secondary text-right" v-if="events.edited">Редаговано</div>
    </b-card>
</template>

<script>
    import PhotoTab from "../inner-components/PhotoTab.vue";
    import {editHtmText} from "../../../js/utility";
    import Vuex from "vuex";

    export default {
        name: "EventsItem",
        components: {PhotoTab},
        computed: Vuex.mapState({
            events: state=>state.events.selectedEvent,
        }),

        mounted: async function () {
            let id = this.$route.params.id;
            await this.$store.dispatch('events/getEventItem', {'id': id});
            this.dateModel = this.convertDateToForm(this.getDateFromISOString(this.events.startDate));
            this.timeModel = this.getTimeFromISOString(this.events.startDate);
            this.dateEndModel = this.convertDateToForm(this.getDateFromISOString(this.events.endDate));
            this.timeEndModel = this.getTimeFromISOString(this.events.endDate);
            this.nameModel = this.events.name;
            this.descriptionModel = this.events.description;
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
            ...Vuex.mapActions(['getEventItem', 'updateEventItem', 'deleteEventItem']),
            newLinedText: (t)=> editHtmText(t),
            getAuthorName(author){
                return author.firstName+' '+author.lastName;
            },
            getDateFromISOString: (str) => {
                let l = new Date(str);
                return l.toLocaleDateString();
            },
            getTimeFromISOString: (str) => {
                let l = new Date(str);
                return l.toLocaleTimeString();
            },
            convertDateToForm(str){
              let string = str.split('.');
              return string[2]+'-'+string[1]+'-'+string[0];
            },
            getDateTime(str){
                let date = new Date(str);
                return date.toLocaleString();
            },
            async deleteItem(){
                let id = this.$route.params.id;
                let i = await this.$store.dispatch('events/deleteEventItem', {'id': id,});
                if(i)
                    this.$bvToast.toast('Подію успішно видалено', {
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
            },
            async saveEdition(){
                if(this.nameModel.trim().length === 0||this.descriptionModel.trim().length === 0
                   ||this.dateEndModel.trim().length === 0||this.timeEndModel.trim().length === 0
                   ||this.dateModel.trim().length === 0||this.timeModel.trim().length === 0) {
                    this.editEvents=!this.editEvents;
                    return;
                }
                let id = this.$route.params.id;
                let dateTimeStart = new Date(this.dateModel + ', ' + this.timeModel).toISOString();
                let dateTimeEnd = new Date(this.dateEndModel + ', ' + this.timeEndModel).toISOString();

                let header = this.nameModel;
                let description = editHtmText(this.descriptionModel);

                let updatedEvents={
                    'name':header,
                    "description": description,
                    "startDate": dateTimeStart,
                    "endDate": dateTimeEnd,
                    "edited": true,
                    "showAuthor": this.events.showAuthor,
                    "emailNotification": this.events.emailNotification,
                    "authorId": this.events.authorId,
                    "multimedias": this.events.multimedias,
                };
                this.editing= true;
                let i = await this.$store.dispatch('events/updateEventItem', {'id': id, 'events': updatedEvents});
                this.editing = false;
                if(i)
                    this.$bvToast.toast('Подію успішно змінено', {
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
                this.dateModel = this.convertDateToForm(this.getDateFromISOString(this.events.startDate));
                this.timeModel = this.getTimeFromISOString(this.events.startDate);
                this.dateEndModel = this.convertDateToForm(this.getDateFromISOString(this.events.endDate));
                this.timeEndModel = this.getTimeFromISOString(this.events.endDate);
                this.nameModel = this.events.name;
                this.descriptionModel = this.events.description;
                this.editEvents = false;
            },
        },
        data() {
            return {
                editing: false,
                adminEdit: true,
                editEvents: false,
                dateModel: '',
                timeModel: '',
                dateEndModel: '',
                timeEndModel: '',
                nameModel: '',
                descriptionModel: '',
            }
        }
    }
</script>

<style scoped>

</style>