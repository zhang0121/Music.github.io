import { reqGetHighQualityTags, reqGetHighQuality } from "@/api";
const state = {
    tags: [],
    songList: [],
    total: 0,

};

const actions = {
    // 精品歌单标签列表
    async getHighQualityTags(store) {
        let a = await reqGetHighQualityTags();
        if (a.code == 200) {
            // console.log(a);
            store.commit("GETHIGHQUALITYTAGS", a.tags)
        }
    },
    // 获取精品歌单
    async getTagsMessage(store, { type, limit, offset }) {
        let a = await reqGetHighQuality(limit, type, offset)
        if (a.code == 200) {
            // console.log(a.playlists);
            store.commit('GETTAGSMESSAGE', {
                data: a.playlists,
                total: a.total
            });
            return 'ok'
        } else {
            return Promise.reject(new Error('失败'))
        }
    },
};

const mutations = {
    GETHIGHQUALITYTAGS(state, data) {
        state.tags = data;
    },
    GETTAGSMESSAGE(state, { data, total }) {
        state.songList = data;
        state.total = total;
        // console.log(total);
    }
};
const getters = {};
export default {
    state,
    actions,
    mutations,
    getters
}