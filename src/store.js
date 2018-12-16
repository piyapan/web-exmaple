import Vue from 'vue';
import Vuex from 'vuex';
import bootstrap from 'bootstrap-vue';
import VueLogger from 'vuejs-logger';
import VueCookie from 'vue-cookie';
Vue.use(VueCookie);
// Tell Vue to use the plugin

const options = {
    isEnabled: true,
    logLevel :  'debug',
    stringifyArguments : false,
    showLogLevel : true,
    showMethodName : true,
    separator: '|',
    showConsoleColors: true
};



Vue.use(VueLogger, options);
Vue.use(Vuex);
Vue.use(bootstrap);

export default new Vuex.Store({
    state: {
        is_authentication: false
    },
    mutations: {
        Authentication(state, result){
            state.is_authentication = result
        }
    },
    actions: {}
})
