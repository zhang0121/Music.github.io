import Vue from 'vue';
import VueRouter from 'vue-router';

//重写push|replace 解决多次点击出现NavigationDuplicated问题
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//第一个参数 往哪儿跳转  
//第二个参数 成功的回调
//第三个参数 失败的回调
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}

VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}
Vue.use(VueRouter);

let router = new VueRouter({
    routes: [{
            name: 'search',
            path: '/search',
            component: () =>
                import ('@/pages/Search/Search.vue'),
            children: [{
                    name: 'songs',
                    path: 'songs',
                    component: () =>
                        import ('@/pages/ListDetail/Song/Song.vue')
                },
                {
                    name: 'lists',
                    path: 'lists',
                    component: () =>
                        import ('@/components/QualitySongList.vue')
                },
                {
                    name: 'mvs',
                    path: 'mvs',
                    component: () =>
                        import ('@/pages/Video/ShortVideo/VideoList.vue')
                },
                {
                    name: 'videos',
                    path: 'videos',
                    component: () =>
                        import ('@//pages/Video/ShortVideo/VideoList.vue')
                },
                {
                    name: 'albums',
                    path: 'albums',
                    component: () =>
                        import ('@/pages/ListDetail/Song/Song.vue')
                },
                {
                    name: 'singers',
                    path: 'singers',
                    component: () =>
                        import ('@/pages/ListDetail/Song/Song.vue')
                },
                {
                    name: 'lyrics',
                    path: 'lyrics',
                    component: () =>
                        import ('@/pages/ListDetail/Song/Song.vue')
                }
            ]
        },

        {
            name: 'shortvideo',
            path: '/shortvideo',
            component: () =>
                import ('@/pages/Video/ShortVideo/ShortVideo.vue'),
        }, {
            name: 'mvlist',
            path: '/mvlist',
            component: () =>
                import ('@/pages/Video/Mv/MvList.vue'),
        },
        {
            name: 'video',
            path: '/video',
            component: () =>
                import ('@/pages/Video/Video.vue'),
            meta: { isShow: 'no' },

        },
        {
            name: 'listdetail',
            path: '/listdetail',
            component: () =>
                import ('@/pages/ListDetail/ListDetail.vue'),
        },
        {
            name: 'songlist',
            path: '/songlist',
            component: () =>
                import ('@/pages/SongList/SongList.vue')
        },
        {
            name: 'hotsinger',
            path: '/hotsinger',
            component: () =>
                import ('@/pages/HotSinger/HotSinger.vue'),
            children: [{
                name: 'hotmusic',
                path: 'hotmusic',
                component: () =>
                    import ('@/pages/HotSinger/HotMusic/HotMusic.vue'),
            }],
            redirect: '/hotsinger/hotmusic'
        },
        {
            path: '/home',
            component: () =>
                import ("@/pages/Home/Home"),

        },
        {
            path: '/',
            redirect: '/home',

        }
    ],
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return {
            y: 0
        }
    },
});

export default router;