import "../scss/main.scss";
import Vue from 'vue';
import App from "../vue/components/App.vue";
import store from "../vue/store/store.js";
import Vuex from "vuex";
import VueRouter from "vue-router";

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import MainDisplay from "../vue/components/pages/MainDisplay.vue";
import NewsList from "../vue/components/main-components-list/NewsList.vue";
import EventsList from "../vue/components/main-components-list/EventsList.vue";
import CabinetComponent from "../vue/components/main-components-list/CabinetComponent.vue";
import OrganizationList from "../vue/components/main-components-list/OrganizationList.vue";
import PetitionList from "../vue/components/main-components-list/PetitionList.vue";
import UserList from "../vue/components/main-components-list/UserList.vue";
import ApplicationList from "../vue/components/main-components-list/ApplicationList.vue";
import SingUpDisplay from "../vue/components/pages/SingUpDisplay.vue";
import LoginDisplay from "../vue/components/pages/LoginDisplay.vue";
import ConfirmEmailDisplay from "../vue/components/pages/ConfirmEmailDisplay.vue";
import NewsItem from "../vue/components/main-components-item/NewsItem.vue";
import EventsItem from "../vue/components/main-components-item/EventsItem.vue";
import OrganizationItem from "../vue/components/main-components-item/OrganizationItem.vue";
import PetitionItem from "../vue/components/main-components-item/PetitionItem.vue";
import {Application} from "vuetify/lib/services/application";
import InfoDisplay from "../vue/components/pages/InfoDisplay.vue";
import UserItem from "../vue/components/main-components-item/UserItem.vue";
import ApplicationItem from "../vue/components/main-components-item/ApplicationItem.vue";
import PetitionItemText from "../vue/components/inner-components/PetitionItemText.vue";
import PetitionItemVotes from "../vue/components/inner-components/PetitionItemVotes.vue";
import VueMeta from "vue-meta";
import ReSendEmail from "../vue/components/pages/ReSendEmail.vue";

Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(IconsPlugin);
Vue.use(VueMeta);

const router = new VueRouter( {
    routes: [
        {path: '/', component: MainDisplay,
            children: [
                {path: '', component: NewsList},
                {path: 'news', component: NewsList},
                {path: 'news/:id', component: NewsItem},
                {path: 'events', component: EventsList},
                {path: 'events/:id', component: EventsItem},
                {path: 'cabinet', component: CabinetComponent},
                {path: 'organization', component: OrganizationList},
                {path: 'organization/:id', component: OrganizationItem},
                {path: 'petition', component: PetitionList},
                {path: 'petition/my', component: PetitionList},
                {path: 'petition/my', component: PetitionList},
                {path: 'petition/voted', component: PetitionList},
                {path: 'petition/:id', component: PetitionItem,
                children: [{path: '', component: PetitionItemText},
                    {path: 'votes/:petitionId', component: PetitionItemVotes}]},
                {path: 'users', component: UserList},
                {path: 'users/:id', component: UserItem},
                {path: 'application', component: ApplicationList},
                {path: 'application/:id', component: ApplicationItem}
            ]},
        {path: '/singup', component: SingUpDisplay},
        {path: '/login', component: LoginDisplay},
        {path: '/confirm/:id/:token', component: ConfirmEmailDisplay, meta:{title: "Підтвердження акаунта"}},
        {path: '/email', component: ReSendEmail, meta:{title: "Підтвердження акаунта"}},
        {path: '/info', component: InfoDisplay}
    ]
});

new Vue({
    store,
    render: h => h(App),
    router: router ,
}).$mount('#app');