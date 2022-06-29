<template>
  <div class="container">
    <div class="container1 clearfix">
      <div class="left">
        <div class="left1">
          <Mv :detail="detail"></Mv>
        </div>
      </div>
      <div class="right">
        <div class="right1">
          <h2 v-if="$route.query.types=='mv'">MV简介</h2>
          <h2 v-else>视频简介</h2>
          <hr />
          <p>发布时间： {{ detail.pubTime }}</p>
          <p>播放次数： {{ detail.playTime }}</p>
          <div class="introduce">
            {{ detail.desc }}
          </div>
          <div class="recommend">
            <span>
              <h3>相关推荐</h3>
              <hr />
            </span>
            <ul v-if="detail.similarMv">
              <li v-for="item in detail.similarMv" :key="item.id">
               <router-link :to="{ name: 'video', query: {types:'mv', id: item.id } }"><img v-lazy="item.cover" :title="item.name"/></router-link> 
                <router-link
                  class="title"
                  :to="{ name: 'video', query: {types:'mv', id: item.id } }"
                  :title="item.name"
                  >{{ item.name }}</router-link
                >
                <span
                  >by： <a href="javascript:">{{ item.artistName }}</a></span
                >

                <span>播放： {{ item.playCount }}</span>
              </li>
            </ul>
             <ul >
              <li v-for="item in detail.similarVideo" :key="item.vid">
               <router-link :to="{ name: 'video', query: {types:'shortvideo', id: item.vid } }"><img v-lazy="item.coverUrl" :title="item.title"/></router-link> 
                <router-link
                  class="title"
                  :to="{ name: 'video', query: {types:'shortvideo', id: item.vid } }"
                  :title="item.title"
                  >{{ item.title }}</router-link
                >
                <span
                  >by： <a href="javascript:">{{ item.creator[0].userName }}</a></span
                >

                <span>播放： {{ item.playTime }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Mv from "./Mv/Mv.vue";
export default {
  name: "Video",
  components: {
    Mv,
  },
  data() {
    return {
      detail: {
        // mv名
        mvName: "",
        // 作者
        author: "",
        likedCount: "",
        shareCount: "",
        commentCount: "",
        // 评论列表
        hotComments: [],
        // 总评论
        comments: [],
        // 默认评论数量
        limit: 10,
        // 相似mv
        similarMv: [],
        // 
        similarVideo:[],
        //
        pubTime: "",
        //
        playTime: '',
        desc: "",
        playerOptions: {
          playbackRates: [0.75, 1.0, 1.25, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: "zh-CN",
          aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [
            {
              // src: "http://vodkgeyttp8.vod.126.net/cloudmusic/e955/core/9ac0/31aedd650889950eb2c4f94fc77bb7c7.mp4?wsSecret=42104fa3f1848e39ab5c8573e47e05e7&wsTime=1655734995",
              type: "video/mp4",
            },
          ],
          // poster:
          // "https://p1.music.126.net/s2DVFbNDh3ILbJxGPogj5w==/109951167569301313.jpg", //你的封面地址
          // width: document.documentElement.clientWidth,
          notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true, // 当前时间和持续时间的分隔符
            durationDisplay: true, // 显示持续时间
            remainingTimeDisplay: false, // 是否显示剩余时间功能
            fullscreenToggle: true, // 是否显示全屏按钮
          },
        },
      },
    };
  },
  methods: {
    async getMvDetail() {
      // mv url
      let a = await this.$API.reqGetMvUrl(this.$route.query.id);
      this.detail.playerOptions.sources = a.data.url;
      // mv 详情
      let b = await this.$API.reqGetMvDetail(this.$route.query.id);
      this.detail.mvName = b.data.name;
      this.detail.author = b.data.artistName;
      this.detail.playerOptions.poster = b.data.cover;
      this.detail.pubTime = this.getTime(b.data.publishTime);
      this.detail.playTime = b.data.playCount;
      this.detail.desc = b.data.description;
      // console.log(b);
      // mv评论数
      let c = this.$API.reqGetMvInfo(this.$route.query.id);
      this.detail.likedCount = c.likedCount;
      this.detail.shareCount = c.shareCount;
      this.detail.commentCount = c.commentCount;
      // mv评论
      let d = await this.$API.reqGetMvComment(
        this.$route.query.id,
        this.detail.limit
      );
      // console.log(d);
      this.detail.hotComments = d.hotComments;
      this.detail.comments = d.comments;

      // 相似mv
      let e = await this.$API.reqGetSimilarMv(this.$route.query.id);
      this.detail.similarMv = e.mvs;
    },
    //
    async getVideoDetail() {
      // mv url
      let a = await this.$API.reqGetVideoUrl(this.$route.query.id);
      this.detail.playerOptions.sources = a.urls[0].url;
      // console.log(a);
      // mv 详情
      let b = await this.$API.reqGetVideoDetail(this.$route.query.id);
      this.detail.mvName = b.data.title;
      this.detail.author = b.data.creator.nickname;
      this.detail.playerOptions.poster = b.data.coverUrl;
      this.detail.pubTime = this.getTime(b.data.publishTime);
      this.detail.playTime = b.data.playTime;
      this.detail.desc = b.data.description;
      // mv评论数
      let c = this.$API.reqGetVideoInfo(this.$route.query.id);
      this.detail.likedCount = c.likedCount;
      this.detail.shareCount = c.shareCount;
      this.detail.commentCount = c.commentCount;
      // mv评论
      let d = await this.$API.reqGetVideoComment(
        this.$route.query.id,
        this.detail.limit
      );
      // console.log(d);
      this.detail.hotComments = d.hotComments;
      this.detail.comments = d.comments;

      // 相似mv
      let e = await this.$API.reqGetSimilarVideo(this.$route.query.id);
      this.detail.similarVideo = e.data;
      // console.log(this.detail.similarMv);
    },
    // 转换时间
    getTime(value) {
      if (value == null) {
        return "";
      } else {
        let date = new Date(value);
        let y = date.getFullYear(); // 年
        let MM = date.getMonth() + 1; // 月
        MM = MM < 10 ? "0" + MM : MM;
        let d = date.getDate(); // 日
        d = d < 10 ? "0" + d : d;
       
        return y + "-" + MM + "-" + d;
      }
    },
  },

  mounted() {
    if (this.$route.query.types == "mv") {
      this.getMvDetail();
    } else {
      this.getVideoDetail();
    }
  },
  watch: {
    $route: {
      // immediate: true,
      deep: true,
      handler() {
        if (this.$route.query.types == "mv") {
          this.getMvDetail();
        } else {
          this.getVideoDetail();
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.clearfix::after {
    content: "";
    display: block;
    clear: both;
}
.container {
  width: 100%;
  .container1 {
    width: 1000px;
    // border-left: 1px solid #979797;
    border-right: 1px solid #979797;
    margin: auto;
    .left {
      width: 730px;
      float: left;
      box-sizing: border-box;
      border-right: 1px solid #979797;
      border-left: 1px solid #979797;

      .left1 {
        width: 640px;
        margin-left: 40px;
      }
    }
    .right {
      box-sizing: border-box;
      overflow: hidden;
      width: 270px;
      .right1 {
        width: 200px;
        margin: auto;
        h2 {
          padding-top: 20px;
        }
        hr {
          width: 200px;
          height: 1px;
          background-color: #979797;
          margin: 10px 0 20px 0;
        }
        p {
          color: #979797;
          margin: 3px 0;
        }
        .introduce {
          margin: 20px 0 40px 0;
        }
        .recommend {
          margin-bottom: 20px;
          span {
            hr {
              margin-top: 8px;
              width: 200px;
              height: 1px;
              background-color: rgb(133, 128, 128);
            }
          }
          ul {
            li {
              width: 200px;
              height: 50px;
              margin: 30px 0;
              img {
                width: 60px;
                height: 60px;
                float: left;
                margin-right: 15px;
                cursor: pointer;
              }
              .title {
                color: #333;
                display: block;
                font-size: 15px;
                max-width: 120px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                margin: 5px 0;
                cursor: pointer;
                border-radius: 4px;
                &:hover {
                  color: #fff !important;
                  background-color: rgb(9, 93, 145);
                }
              }
              span {
                font-size: 13px;
                display: inline-block;
                color: rgb(174, 172, 172);
                width: 100px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
            }
          }
        }
      }
    }
  }
}
</style>
