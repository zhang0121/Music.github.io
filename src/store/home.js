import { reqGetBanner, reqGetNewMusic, reqGetVideoTagsList, reqGetHotSearchList } from '@/api/index';

const state = {
    // 轮播图
    banner: [],
    // 新歌
    newMusic: [],
    // tags
    videoTags: [],
    hotSearchList: [],
    // 报告
    baogao: {},

}


const actions = {
    // 获取轮播图
    async getBanner(store) {
        let a = await reqGetBanner();
        // console.log(a.banners)
        if (a.code == 200) {
            store.commit('GETBANNER', a.banners)

        }
    },
    // 获取新歌
    async getNewMusic(store, type) {
        let a = await reqGetNewMusic(type);
        if (a.code == 200) {
            store.commit('GETNEWMUSIC', a.data)
        }
    },
    // video tags
    async getVideoTagsList(store) {
        let a = await reqGetVideoTagsList();
        if (a.code == 200) {
            // console.log(a);
            store.commit("GETVIDEOTAGSLIST", a.data)
        }
    },
    // 
    async getHotSearchList(store) {
        let a = await reqGetHotSearchList();
        if (a.code == 200) {
            // console.log(a.data);
            store.commit("GETHOTSEARCHLIST", a.data)
        }
    },
    // 

}

const mutations = {
    // 获取轮播图
    GETBANNER(state, banner) {
        state.banner = banner;
    },
    // 新歌
    GETNEWMUSIC(state, data) {
        state.newMusic = data;
    },
    GETVIDEOTAGSLIST(state, data) {
        state.videoTags = data;
    },
    // 
    GETHOTSEARCHLIST(state, data) {
        state.hotSearchList = data;
    }
}


const getters = {

}

export default {
    state,
    actions,
    mutations,
    getters
}