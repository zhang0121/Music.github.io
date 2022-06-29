import {
    reqGetMvList,
    reqGetAllMvList,
    reqGetVideoList
} from "@/api/index.js";
const state = {
    mvList: [],
    videoList: [],

}


const actions = {

    // mv排行
    async getMvList(store, {
        area,
        pageNo,
        limit,
        isHot,
    }) {
        let function1;
        if (isHot == 1) {
            // 获取热门mv
            // console.log("热门");
            function1 = reqGetMvList;
        } else {
            // 获取全部mv
            // console.log("全部");
            function1 = reqGetAllMvList;
        }

        let a = await function1(area, pageNo, limit);
        if (a.code = 200) {
            // console.log(a);
            store.commit('GETMVLIST', a.data);

        }
    },
    // ,
    async getVideoList(store, { typeId, offset }) {
        let a = await reqGetVideoList(typeId, offset);
        if (a.code == 200) {
            // console.log(a);
            store.commit("GETVIDEOLIST", a.datas);
        }
    }
}

const mutations = {
    // GETRECOMMENDMV(state, data) {
    //     state.mvList = data;
    // }
    GETMVLIST(state, data) {
        state.mvList = data;
    },
    GETVIDEOLIST(state, data) {
        state.videoList = data;
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