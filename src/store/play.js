const state = {
    // 0表示加入播放列表  1表示播放
    ids: sessionStorage.getItem('ids') ? sessionStorage.getItem('ids').toString().split(',') : [
        [1901371647]
    ],

}


const actions = {

    async playMusic(store, {
        ids,
        type
    }) {
        let can = 1;
        store.state.ids.forEach((id) => {
            if (id[0] == ids) {
                can = 0
            }
        })
        if (can === 1) {
            store.state.ids.push(([ids, type]));
            sessionStorage.setItem('ids', store.state.ids)

        }

    },


}

const mutations = {


}


const getters = {

}

export default {
    state,
    actions,
    mutations,
    getters
}