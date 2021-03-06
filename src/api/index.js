import requests from "./axios";

// 获取轮播图
export const reqGetBanner = () => requests({
    url: 'https://cloud-music-api-bay-alpha.vercel.app/banner?type=0',
    method: 'GET',
})

// 获取首页新歌

export const reqGetNewMusic = (type) => requests({
    url: `https://cloud-music-api-bay-alpha.vercel.app/top/song?type=${type}`,
    method: 'GET',
})

// 获取热门歌手

export const reqGetHotSinger = (pageNo, limit) => requests({
    url: `https://cloud-music-api-bay-alpha.vercel.app/top/artists?offset=${(pageNo-1)*limit}&limit=${limit}`,
    method: 'GET',
})

// 获取歌手热门50曲
export const reqGetSingerHotMusic = (singerId) => requests({
        url: `https://cloud-music-api-bay-alpha.vercel.app/artist/top/song?id=${singerId}`,
        method: 'GET',
    })
    // 获取精品歌单标签列表
export const reqGetHighQualityTags = () => requests({
        url: 'https://cloud-music-api-bay-alpha.vercel.app/playlist/highquality/tags',
        method: 'GET',
    })
    // 获取精品歌单
export const reqGetHighQuality = (limit, type, offset) => requests({
        url: `https://cloud-music-api-bay-alpha.vercel.app/top/playlist?limit=${limit}&cat=${type}&offset=${(offset-1)*limit}`,
        method: 'GET',
    })
    /*// 获取网友精选碟    精品歌单url: `http://47.112.103.44:3000/top/playlist/highquality?limit=${limit}&cat=${type}`,
    export const reqGetHighQuality = (limit, type, offset) => requests({
        url: `http://47.112.103.44:3000/top/playlist?limit=${limit}&cat=${type}&offset=${(offset-1)*limit}`,
        method: 'GET',
    }) */

// 获取歌单详情
export const reqGetListDetail = (listId) => requests({
    url: `https://cloud-music-api-bay-alpha.vercel.app/playlist/detail?id=${listId}`,
    method: 'GET',
})

// 获取推荐歌单

export const reqGetRecommendList = (limit) => requests({
        url: `https://cloud-music-api-bay-alpha.vercel.app/personalized?limit=${limit}`,
        method: 'GET',
    })
    // 相关歌单
export const reqGetRelatedList = (listId) => requests({
    url: `https://cloud-music-api-bay-alpha.vercel.app/related/playlist?id=${listId}`,
    mwthod: 'GET',
})

// 歌曲url
export const reqGetMusicUrl = (musicId) => requests({
    url: `https://cloud-music-api-bay-alpha.vercel.app/song/url?id=${musicId}`,
    method: 'GET',
})

// 歌词
export const reqGetMusicLrc = (musicId) => requests({
        url: `https://cloud-music-api-bay-alpha.vercel.app/lyric?id=${musicId}`,
        method: 'GET',
    })
    // 歌曲详情
export const reqGetMusicDetail = (musicId) => requests({
        url: `https://cloud-music-api-bay-alpha.vercel.app/song/detail?ids=${musicId}`,
        method: 'GET'
    })
    // 推荐MV
export const reqGetRecommendMv = () => requests({
        url: 'https://cloud-music-api-bay-alpha.vercel.app/personalized/mv',
        method: 'GET',
    })
    // 最新mv
export const reqGetNewMv = () => requests({
    url: 'https://cloud-music-api-bay-alpha.vercel.app/mv/first?limit=1',
    method: 'GET',
})

// mv  Url
export const reqGetMvUrl = (mvId) => requests({
        url: `https://cloud-music-api-bay-alpha.vercel.app/mv/url?id=${mvId}&r=1080`,
        method: 'GET',
    })
    // mv数据
export const reqGetMvDetail = (mvId) => requests({
        url: `https://cloud-music-api-bay-alpha.vercel.app/mv/detail?mvid=${mvId}`,
        method: 'GET'
    })
    // mv点赞数据
export const reqGetMvInfo = (mvId) => requests({
    url: `https://cloud-music-api-bay-alpha.vercel.app/mv/detail/info?mvid=${mvId}`,
    method: 'GET'
})

// mv热评
/* type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型  0: 歌曲 1: mv  2: 歌单  3: 专辑 4: 电台
5: 视频*/
// export const reqGetMvComment = (mvId, type, limit) => requests({
//         url: `comment/hot?id=${mvId}&type=${type}&limit=${limit}`,
//         method: 'GET',
//     })
// mv评伦
export const reqGetMvComment = (mvId, limit) => requests({
        url: `https://cloud-music-api-bay-alpha.vercel.app/comment/mv?id=${mvId}&limit=${limit}`,
        method: 'GET',
    })
    // 相似mv
export const reqGetSimilarMv = (mvId) => requests({
    url: `https://cloud-music-api-bay-alpha.vercel.app/simi/mv?mvid=${mvId}`,
    method: 'GET',
})

/*
mv 排行
说明 : 调用此接口 , 可获取 mv 排行

可选参数 : limit: 取出数量 , 默认为 30

area: 地区,可选值为内地,港台,欧美,日本,韩国,不填则为全部

offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0

接口地址 : /top/mv

调用例子 : /top/mv?limit=10
*/
export const reqGetMvList = (area, pageNo, limit) => requests({
    url: `https://cloud-music-api-bay-alpha.vercel.app/top/mv?offset=${(pageNo-1)*limit}&limit=${limit}&area=${area}`,
    method: 'GET',
})

// 全部mv
export const reqGetAllMvList = (area, pageNo, limit) => requests({
        url: `https://cloud-music-api-bay-alpha.vercel.app/mv/all?offset=${(pageNo-1)*limit}&limit=${limit}&area=${area}`,
        method: 'GET',
    })
    // 视频标签列表

export const reqGetVideoTagsList = () => requests({
        url: 'https://cloud-music-api-bay-alpha.vercel.app/video/group/list',
        method: 'GET',
    })
    // 对应视频
    // 发https请求需要登录
export const reqGetVideoList = (typeId, offset) => requests({
        url: `https://47.112.103.44/video/group?id=${typeId}&offset=${offset*8}`,
        method: 'GET',
    })
    // 视频播放地址
export const reqGetVideoUrl = (id) => requests({
        url: `https://cloud-music-api-bay-alpha.vercel.app/video/url?id=${id}`,
        method: 'GET'
    })
    // 视频详情
export const reqGetVideoDetail = (id) => requests({
        url: `https://cloud-music-api-bay-alpha.vercel.app/video/detail?id=${id}`,
        method: 'GET'
    })
    // 视频评论数
export const reqGetVideoInfo = (id) => requests({
        url: `https://cloud-music-api-bay-alpha.vercel.app/video/detail/info?vid=${id}`,
        method: 'GET',
    })
    // 视频评论
export const reqGetVideoComment = (id, limit) => requests({
        url: `https://cloud-music-api-bay-alpha.vercel.app/comment/video?limit=${limit}&id=${id}`,
        method: 'GET',
    })
    // 相关视频
export const reqGetSimilarVideo = (id) => requests({
        url: `https://cloud-music-api-bay-alpha.vercel.app/related/allvideo?id=${id}`,
        method: "GET",
    })
    // 热搜列表

export const reqGetHotSearchList = () => requests({
        url: `https://cloud-music-api-bay-alpha.vercel.app/search/hot/detail`,
        method: 'GET',
    })
    // 搜索
export const reqGetSearchDetail = (type, keyWord, limit, offset) => requests({
    url: `https://cloud-music-api-bay-alpha.vercel.app/cloudsearch?keywords=${keyWord}&limit=${limit}&offset=${(offset-1)*limit}&type=${type}`,
    method: 'GET'
})