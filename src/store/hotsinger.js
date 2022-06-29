import { reqGetHotSinger, reqGetSingerHotMusic } from "@/api"
const state = {
    singerList: [],
    hotMusic: [],
}

const actions = {
    // 获取热门歌手
    async getHotSingers(store, { pageNo, limit }) {
        let a = await reqGetHotSinger(pageNo, limit);
        if (a.code == 200) {
            // console.log(a)
            store.commit('GETHOTSINGER', a.artists)
        }
    },
    // 获取歌手热门50首歌曲
    async getSingerMusic(store, singerId) {
        let a = await reqGetSingerHotMusic(singerId);
        if (a.code == 200) {
            // console.log(a.songs);
            store.commit('GETSINGERMUSIC', a.songs);
            // console.log(a.songs);
            return 'ok';
        } else {
            return Promise.reject(new Error('获取失败'));
        }
    }
}

const mutations = {
    // 歌曲列表
    GETHOTSINGER(state, data) {
        state.singerList = data || [];
    },
    // 热门歌曲
    GETSINGERMUSIC(state, data) {
        state.hotMusic = data;
    }
}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters,
}