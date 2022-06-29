import { reqGetListDetail, reqGetRecommendList, reqGetRelatedList } from "@/api";
const state = {
    // 歌单详情
    playlist: {},
    // 右侧推荐歌单
    recommendList: [],
    // 右侧相关歌单
    relatedList: []

};

const actions = {
    // 精品歌单详情
    async getListDetail(store, listId) {
        let a = await reqGetListDetail(listId);
        if (a.code == 200) {
            // console.log(a);
            store.commit("GETLISTDETAIL", a.playlist);
            return 'ok'
        } else {
            return Promise.reject(new Error('失败'));
        }
    },
    // 获取右侧推荐歌单
    async getRecommendList(store, limit) {
        let a = await reqGetRecommendList(limit);
        if (a.code == 200) {
            // console.log(a.result);
            store.commit("GETRECOMMENDLIST", a.result);
            return 'ok'
        } else {
            return Promise.reject(new Error('失败'))
        }
    },
    // 获取右侧相关歌单
    async getRelatedList(store, listId) {
        let a = await reqGetRelatedList(listId);
        if (a.code == 200) {
            // console.log(a.playlists);
            store.commit("GETRELATEDLIST", a.playlists);
            return 'ok'
        } else {
            return Promise.reject(new Error('失败'))
        }
    }

};

const mutations = {
    GETLISTDETAIL(state, data) {
        state.playlist = data;
    },
    GETRECOMMENDLIST(state, data) {
        state.recommendList = data;
    },
    GETRELATEDLIST(state, data) {
        state.relatedList = data;
    }

};
const getters = {};
export default {
    state,
    actions,
    mutations,
    getters
}