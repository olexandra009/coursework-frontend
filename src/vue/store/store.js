import Vue from 'vue';
import Vuex from 'vuex';
import news from "./modules/news";
import petition from "./modules/petition";
import events from "./modules/events";
import application from "./modules/application";
import user from "./modules/user";
import organization from "./modules/organization"

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        news: news,
        petition: petition,
        events: events,
        application: application,
        user: user,
        organization: organization
    }
});