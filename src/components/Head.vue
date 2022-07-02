<template>
  <div class="container">
    <div class="container1">
      <div class="logo" @click="backHome">
        <img src="./img/logo.png" />
        <span>Cloud Music</span>
      </div>

      <ul class="a">
        <li class="head1" @click="getHotSinger()"><span>热门歌手</span></li>
        <li class="head1" @click="getHotSongList()"><span>精品歌单</span></li>
        <li class="head1" @click="getMvList()"><span>推荐MV</span></li>
        <li
          class="head1"
          @mouseenter="getVideoTags"
          @mouseleave="display = false"
        >
          <span>推荐视频</span>
          <img src="./img/三角1 (1).png" :class="{ hover: display }" />
          <div class="category" :class="{ hover: display }">
            <ul>
              <li class="category1" v-for="item in videoTags" :key="item.id">
                <span @click="toVideo(item.id, item.name)"
                  >&nbsp;{{ item.name }}&nbsp;</span
                >
                |
              </li>
            </ul>
          </div>
        </li>
      </ul>

      <div class="search">
        <div class="input">
          <input
            type="text"
            placeholder="音乐/视频"
            v-model="keyWord"
            @focus="getHotWord"
            @keydown.enter="search()"
          />
          <img src="./img/搜索.png" />
          <div class="hotsearch" :class="{ hover: displayHot }">
            <p>热搜词：</p>
            <ul>
              <li
                v-for="(item, index) in hotSearchList"
                :key="index"
                class="hot"
              >
                <a
                  href="javascript:"
                  class="word"
                  @click="search(item.searchWord)"
                  >{{ item.searchWord }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="baogao">
        <el-button type="password" @click="open">查看报告</el-button>
        <a id="a" href="javascript:" target="blank"></a>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      // 推荐视频
      display: false,
      displayHot: false,
      keyWord: "",
    };
  },
  mounted() {},
  methods: {
    // 热门歌手
    getHotSinger(e) {
      this.$router.push("/hotsinger");
    },
    // 热门歌单
    getHotSongList() {
      this.$router.push("/songlist");
    },
    // mv
    async getMvList() {
      this.$router.push("/mvlist?hot=1&type=0");
    },
    //
    toVideo(id, name) {
      if (name == "MV") {
        this.$router.push("/mvlist?hot=1&type=0");
      } else {
        this.$router.push({ name: "shortvideo", query: { typeId: id } });
      }
    },
    //
    getHotWord() {
      this.$store.dispatch("getHotSearchList");
      this.displayHot = true;
    },
    // 搜搜
    search(keyWords) {
      if (keyWords) {
        this.keyWord = keyWords;
      }
      this.displayHot = false;
      // sessionStorage.setItem("type",1)
      this.$router.push({
        name: "songs",
        query: { type: 1, keyWord: this.keyWord },
      });
    },
    //
    open() {
      this.$prompt("请输入密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        lockScroll: false,
        closeOnClickModal: false,
      })
        .then(({ value }) => {
          let a = document.getElementById("a");
          a.href = `http://47.112.103.44:8888/baogao?pass=${md5(value)}`;
          a.click();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    //
    getVideoTags() {
      this.display = true;
      if (this.videoTags.length == 0) this.$store.dispatch("getVideoTagsList");
    },
    backHome() {
      this.$router.push("/");
    },
  },
  computed: {
    videoTags() {
      if (this.$store.state.home.videoTags) {
        return this.$store.state.home.videoTags;
      }
    },
    hotSearchList() {
      if (this.$store.state.home.hotSearchList) {
        return this.$store.state.home.hotSearchList;
      }
    },
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  min-width: 640px;
  height: 70px;
  background-color: rgb(154, 154, 168);
  display: flex;
  align-items: center;
  .container1 {
    background-color: rgb(154, 154, 168);
    min-width: 1024px;
    height: 70px;
    margin: auto;
    display: flex;
    align-items: center;

    .logo {
      min-width: 170px;
      width: 15%;
      float: left;
      margin: 0 1%;
      font-size: 20px;
      font-weight: bold;
      color: rgb(49, 59, 117);
      display: flex;
      align-items: center;
      cursor: pointer;

      img {
        width: 40px;
        height: 40px;
        margin-right: 4px;
      }
    }
    .a {
      min-width: 400px;
      position: relative;
      img {
        display: none;
        position: absolute;
        top: 60px;
        z-index: 102;
        width: 30px;
        height: 30px;
      }
      .head1 {
        font-size: 16px;
        width: 25%;
        height: 70px;
        line-height: 70px;
        float: left;
        display: flex;
        justify-content: center;
        .category {
          display: none;

          border-radius: 5px;
          width: 900px;
          position: absolute;
          top: 72px;
          z-index: 100;
          background-color: rgb(154, 154, 168);

          // display: flex;
          // justify-content: space-between;
          .category1 {
            float: left;
            font-size: 12px;
            margin: 2px 2px;
            line-height: 20px;
            height: 20px;
            span {
              padding: 0 2px;
              color: #fff;
              border-radius: 5px;
              cursor: pointer;
              &:hover {
                background-color: rgb(49, 59, 117);
              }
            }
          }
        }
        .hover {
          display: block;
        }
      }
      .head1:hover {
        background-color: rgb(49, 59, 117);
        transition: 0.8s;

        span {
          color: white;
          text-decoration: none;
          cursor: pointer;
        }
      }
    }
    .search {
      margin-left: 10%;
      .input {
        height: 30px;
        display: flex;
        align-items: center;
        background-color: white;
        border-radius: 10px;

        input {
          outline: none;
          border: none;
          height: 25px;
          margin-left: 10px;
          border-bottom-left-radius: 10px;
          border-top-left-radius: 10px;
        }
        img {
          width: 20px;
          height: 20px;
          margin-right: 4px;
        }
      }
      .hotsearch {
        display: none;
        z-index: 99;
        position: absolute;
        top: 60px;
        width: 167px;
        border-radius: 4px;
        background-color: #95b8b8;
        p {
          margin: 2px 0;
        }
        ul {
          .hot {
            float: left;
            margin: 2px 4px;
            .word {
              color: #fff;
              &:hover {
                color: rgb(49, 59, 117);
              }
            }
          }
        }
      }
      .hover {
        display: block;
      }
    }
    .baogao {
      margin-left: 30px;
    }
  }
}
</style>
