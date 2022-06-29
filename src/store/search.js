import { reqGetSearchDetail } from "@/api"
const state = {
    songs: [],
    songLists: [],
    videos: [],
    mvs: [],

}


const actions = {
    // 
    async getSearchDetail(store, { type, keyWord, limit, offset }) {
        let a = await reqGetSearchDetail(type, keyWord, limit, offset);
        if (a.code == 200) {
            store.commit('GETSEARCHDETAIL', a)
        }
    }



}

const mutations = {

    GETSEARCHDETAIL(state, a) {
        if (a.result.songs) {
            state.songs = a.result.songs
        } else if (a.result.playlists) {
            state.songLists = a.result.playlists
        } else if (a.result.videos) {
            state.videos = a.result.videos
        } else if (a.result.mvs) {
            state.mvs = a.result.mvs
        }
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