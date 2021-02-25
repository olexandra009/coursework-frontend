import "../scss/main.scss";
import Vue from 'vue';
import App from "../vue/components/App.vue";
import store from "../vue/store/store.js";
import Vuex from "vuex";
import VueRouter from "vue-router";

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(IconsPlugin);

const router = new VueRouter( {
    routes: [
        // { path: '/', component: BodyDisplay },
        // { path: '/teacher/:teacher_id', component: BodyDisplay },
        // { path: '/faculty/:faculty_id', component: BodyDisplay },
        // { path: '/info', component: InformationDisplay}
    ]
});

new Vue({
    store,
    render: h => h(App),
    router: router ,
}).$mount('#app');