import Vue from 'vue'
// import Vue from "vue/dist/vue.common.js";

import App from './App.vue';
// 引入animate
import 'animate.css';
// 引入全部api
import * as API from './api/index.js';
import store from './store/index.js';
import router from '@/router/index.js'
import Head from '@/components/Head.vue';
import MusicList from "@/components/MusicList.vue";
import Footer from '@/components/Footer.vue'
import Pagination from '@/components/Pagination.vue';
// 引入播放组件
import Play from '@/components/Aplayer.vue'
Vue.component('Head', Head);
Vue.component('MusicList', MusicList);
Vue.component('Footer', Footer);
Vue.component('Play', Play);
Vue.component('Pagination', Pagination);

// 引入element
import { Button, Icon, Input, Row, Col, MessageBox, Message } from 'element-ui';
Vue.use(Button);
Vue.use(Icon)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
// 引入懒加载
import VueLazyload from 'vue-lazyload'
import img from '@/assets/lazyLoad.gif'
Vue.use(VueLazyload, {
    loading: img,
});


// 引入播放器插件
import APlayer from '@moefe/vue-aplayer';
Vue.use(APlayer);
import '../public/color-thief.min.js'
Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    store,
    router,
    beforeCreate() {
        Vue.prototype.$API = API;
    }
}).$mount('#app')