import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


import home from '@/store/home.js';
import hotsinger from '@/store/hotsinger.js'
import hotsonglist from '@/store/hotsonglist.js';
import listdetail from '@/store/listdetail.js';
import play from './play.js';
import mv from './mv.js';
import search from './search.js';
export default new Vuex.Store({
    modules: {
        home,
        hotsinger,
        hotsonglist,
        listdetail,
        play,
        mv,
        search,

    }
})