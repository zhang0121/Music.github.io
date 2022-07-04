<template>
  <div class="container">
    <div class="container1">
      <div class="conleft">
        <div class="conleft1">
          <div class="head">
            <div class="left">
              <img v-lazy="listDetail.coverImgUrl" />
            </div>
            <div class="right">
              <li class="title">
                <img src="./img/精品歌单.png" />
                <span :id="listDetail.userId">{{ listDetail.name }}</span>
              </li>
              <li class="author">
                <img v-lazy="authorUrl" />
                <a href="">{{ creator }}</a>
                <span>{{ getTime(listDetail.createTime) }} 创建</span>
              </li>
              <li class="button">
                <button @click="playAll"><img src="./img/播放.png" /></button>
                <button><img src="./img/收藏.png" /></button>
                <button><img src="./img/3.1分享.png" /></button>
                <button><img src="./img/下载.png" /></button>
                <button><img src="./img/评论.png" /></button>
              </li>
              <li class="tags">
                <span>标签：</span>
                <span
                  class="tag"
                  v-for="(item, index) in listDetail.tags"
                  :key="index"
                  >{{ item }}</span
                >
              </li>
              <li class="introduce">
                <span>介绍：{{ listDetail.description }} </span>
              </li>
            </div>
          </div>
          <Song :listDetail="listDetail"></Song>
        </div>
      </div>
      <div class="conright">
        <div class="conright1">
          <div class="like">
            <span>
              <h3>喜欢这个歌单的人</h3>
              <hr />
            </span>
            <ul>
              <li v-for="item in listDetail.subscribers" :key="item.userId">
                <img v-lazy="item.avatarUrl" />
              </li>
            </ul>
          </div>
          <div class="related">
            <span>
              <h3>相关歌单</h3>
              <hr />
            </span>
            <!-- <ul @click="changeListId($event)">
              <li v-for="item in recommendList" :key="item.id">
                <img v-lazy="item.picUrl" :id="item.id" />
                <p :id="item.id">{{ item.name }}</p>
                <span>播放：{{ item.playCount }}次 </span>
              </li>
            </ul> -->
            <ul @click="changeListId($event)">
              <li v-for="item in relatedList" :key="item.id">
                <img v-lazy="item.coverImgUrl" :id="item.id" />
                <p :id="item.id">{{ item.name }}</p>
                <span class="author1">by：{{ item.creator.nickname }}</span>
              </li>
            </ul>
          </div>
          <div class="recommend">
            <span>
              <h3>推荐歌单</h3>
              <hr />
            </span>
            <ul @click="changeListId($event)">
              <li v-for="item in recommendList" :key="item.id">
                <img v-lazy="item.picUrl" :id="item.id" />
                <p :id="item.id">{{ item.name }}</p>
                <span>播放：{{ item.playCount }}次 </span>
              </li>
            </ul>
          </div>
          <!-- <Aplayer></Aplayer> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Song from "./Song/Song.vue";
import Aplayer from "@/components/Aplayer.vue";
export default {
  components: {
    Song,
    Aplayer,
  },
  data() {
    return {
      //

      // 右侧推荐歌单默认数量
      limit: 5,
      // listId: this.$route.query.listId,
    };
  },
  mounted() {
    this.getData();
    // console.log(this.$route.query.listId);
  },
  methods: {
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
        let h = date.getHours(); // 时
        h = h < 10 ? "0" + h : h;
        let m = date.getMinutes(); // 分
        m = m < 10 ? "0" + m : m;
        let s = date.getSeconds(); // 秒
        s = s < 10 ? "0" + s : s;
        return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
      }
    },
    // 获取详情
    getData() {
      this.$store.dispatch("getListDetail", this.$route.query.listId);
      this.$store.dispatch("getRecommendList", this.limit);
      this.$store.dispatch("getRelatedList", this.$route.query.listId);
    },

    // 改变歌单id 获取数据
    changeListId(e) {
      this.listId = e.target.id;
      this.$router.push({ name: "listdetail", query: { listId: e.target.id } });
    },
    // 播放所有
    playAll() {
      // this.listDetail.tracks.forEach((item) => {
      //   this.$store.dispatch("playMusic", { ids: item.id, type: 1 });
      // });
      // this.$router.go(0);
      let i = 0;
      let timer1 = setInterval(() => {
        i++;
        if (i < this.listDetail.tracks.length) {
          this.$store.dispatch("playMusic", { ids: this.listDetail.tracks[i].id, type: i==1?1:0 });
        } else {
          clearInterval(timer1);
        }
      }, 50);
    },
  },
  computed: {
    // 歌单详情
    listDetail() {
      return this.$store.state.listdetail.playlist;
    },
    // 右侧推荐歌单
    recommendList() {
      return this.$store.state.listdetail.recommendList;
    },
    // 右侧相关歌单
    relatedList() {
      return this.$store.state.listdetail.relatedList;
    },

    // 作者头像
    authorUrl() {
      if (this.listDetail.creator) return this.listDetail.creator.avatarUrl;
    },
    //创建者
    creator() {
      if (this.listDetail.creator) return this.listDetail.creator.nickname;
    },
  },
  watch: {
    // 路由变化就发请求，更新
    $route: {
      immediate: true,
      deep: true,
      async handler() {
        // this.listId = this.$route.query.listId;
        await this.getData();
      },
    },
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100%;

  .container1 {
    width: 1000px;
    margin: auto;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;

    display: flex;
    justify-content: space-around;
    .conleft {
      width: 710px;
      padding-top: 20px;
      border-right: 1px solid #ccc;
      .conleft1 {
        width: 680px;
        margin: auto;
        .head {
          margin-bottom: 80px;
          li {
            list-style-type: none;
          }
          .left {
            float: left;
            margin-right: 25px;
            width: 210px;
            height: 210px;
            padding: 1px;
            border: 2px solid rgb(200, 196, 196);
            border-radius: 2px;
            img {
              width: 210px;
              height: 210px;
            }
          }
          .right {
            overflow: hidden;
            width: 410px;
            .title {
              display: flex;
              align-items: center;

              img {
                width: 70px;
                height: 23px;
                border-radius: 2px;
                border-top-right-radius: 15px;
                border-bottom-right-radius: 15px;
                margin-right: 15px;
              }
              span {
                font-size: 20px;
              }
            }
            .author {
              display: flex;
              align-items: center;

              margin: 10px 0 25px 0;
              img {
                width: 35px;
                height: 40px;
              }
              a {
                font-size: 13px;
                margin: 0 15px;
                color: rgb(62, 89, 147);
              }
              span {
                color: rgb(120, 123, 126);
              }
            }
            .button {
              margin-bottom: 20px;
              button {
                width: 70px;
                height: 30px;
                margin-right: 10px;
                box-shadow: 2px -2px 2px rgba(0, 0, 0, 0.5);
                img {
                  width: 25px;
                  height: 25px;
                }
              }
            }
            .tags {
              height: 25px;
              font-size: 13px;
              color: #666;
              .tag {
                color: #666;
                height: 25px;
                margin: 0 10px 0 0;
                border-radius: 10px;
                cursor: pointer;
                background-color: rgb(245, 245, 245);
                border: 1px solid rgb(123, 121, 121);
                padding: 2px 10px;
                &:hover {
                  background-color: rgb(216, 214, 214);
                }
              }
            }
            .introduce {
              margin-top: 8px;

              span {
                text-overflow: ellipsis;
                display: -webkit-box;
                white-space: pre-wrap;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 5; //限制显示3行
                overflow-y: scroll;
                &::-webkit-scrollbar {
                  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
                  height: 1px;
                }
                &::-webkit-scrollbar-thumb {
                  /*滚动条里面小方块*/
                  border-radius: 10px;
                  background-color: skyblue;
                  background-image: -webkit-linear-gradient(
                    45deg,
                    rgba(255, 255, 255, 0.2) 25%,
                    transparent 25%,
                    transparent 50%,
                    rgba(255, 255, 255, 0.2) 50%,
                    rgba(255, 255, 255, 0.2) 75%,
                    transparent 75%,
                    transparent
                  );
                }
                &::-webkit-scrollbar-track {
                  /*滚动条里面轨道*/
                  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                  background: #ededed;
                  border-radius: 10px;
                }
              }
            }
          }
        }
      }
    }
    .conright {
      width: 270px;
      overflow: hidden;
      img {
        cursor: pointer;
      }
      .conright1 {
        padding-top: 20px;
        width: 220px;
        margin: auto;
        .like {
          span {
            hr {
              margin-top: 8px;
              width: 200px;
              height: 1px;
              background-color: rgb(133, 128, 128);
            }
          }
          ul {
            margin: 25px 0;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            li {
              width: 50px;
              height: 50px;
              img {
                width: 40px;
                height: 40px;
                cursor: pointer;
              }
            }
          }
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
              margin: 15px 0;
              img {
                width: 50px;
                height: 50px;
                float: left;
                margin-right: 15px;
              }
              p {
                font-size: 15px;
                width: 130px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                margin: 5px 0;
                cursor: pointer;
                border-radius: 4px;
                &:hover {
                  color: #fff;
                  background-color: rgb(9, 93, 145);
                }
              }
              span {
                font-size: 13px;
                color: rgb(174, 172, 172);
                width: 100px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
            }
          }
        }
        .related {
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
              margin: 15px 0;
              img {
                width: 50px;
                height: 50px;
                float: left;
                margin-right: 15px;
              }
              p {
                font-size: 15px;
                width: 130px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                margin: 5px 0;
                cursor: pointer;
                border-radius: 4px;
                &:hover {
                  color: #fff;
                  background-color: rgb(9, 93, 145);
                }
              }
              span {
                display: inline-block;
                font-size: 13px;
                color: rgb(174, 172, 172);
                width: 100px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
              //
            }
          }
        }
      }
    }
  }
}
</style>
