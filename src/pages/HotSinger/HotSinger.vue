<template>
  <div class="container">
    <div class="container1">
      <div class="left">
        <img src="./img/热门.png" />
        <span class="recommend">热门歌手</span>

        <div class="list" @click="changeSingerId($event)">
          <ul>
            <li
              v-for="(item, index) in singerList"
              :key="item.id"
              @mouseenter="index1 = index"
              @mouseout="index1 = -1"
              class="animate__animated animate__infinite"
              :class="{
                animate__pulse: index == index1,
                infinite: index == index1,
              }"
            >
              <span
                :id="item.id"
                class="singer"
                :class="{ checked: singerId == item.id }"
                >~ {{ item.name }}</span
              >
            </li>
          </ul>
        </div>
        <div class="pagination">
          <Pagination
            :pageNo="spageNo"
            :pageSize="slimit"
            @upData="upData"
          ></Pagination>
        </div>
      </div>

      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      index1: -1,
      spageNo: 1,
      slimit: 16,
      index2: -1,
      // 右边展示的歌曲对应的 歌手id
      singerId: 2116,
    };
  },
  methods: {
    // 获取歌手
    getData() {
      this.$store.dispatch("getHotSingers", {
        pageNo: this.spageNo,
        limit: this.slimit,
      });
    },
    // 更新歌手
    upData(num) {
      if (num <= 0 || num > 7) {
        num = 1;
      }
      this.spageNo = num;
      this.getData();
    },
    // 改变默认歌手id并获取歌曲列表
    changeSingerId(e) {
      this.singerId = e.target.id;
    },
    // 获取对应歌手歌曲
    getMusicList() {
      this.$store.dispatch("getSingerMusic", this.singerId);
    },
  },

  mounted() {
    this.getData();
  },

  computed: {
    // 歌手列表
    singerList() {
      return this.$store.state.hotsinger.singerList;
    },
  },

  watch: {
    // 默认歌手id 用于暂时右边歌曲
    singerList: {
      // immediate: true,
      deep: true,
      async handler() {
        // 默认列表第一个歌手id
        this.singerId = this.singerList[0].id;
      },
    },
    // id一旦变化就路由跳转
    singerId: {
      immediate: true,
      deep: true,
      handler() {
        this.$router.push({
          name: "hotmusic",
          query: { singerId: this.singerId },
        });
      },
    },
  },
};
</script>

<style scoped lang="less">
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.container {
  width: 100%;

  .container1 {
    width: 1000px;
    margin: auto;

    .left {
      float: left;
      margin-right: 30px;
      margin-top: 6px;
      img {
        width: 20px;
        height: 20px;
      }
      .recommend {
        font-size: 20px;
        margin: 0 10px 0 5px;
      }
      .list {
        width: 130px;

        li {
          margin: 1px 0;
          box-sizing: border-box;
        }

        .singer {
          height: 25px;
          border: 1px solid;
          font-size: 13px;
          background-color: rgb(154, 154, 168);
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          align-items: center; //垂直
          padding-left: 20%;
          overflow: hidden;
        }
        .singer:hover {
          background-color: rgb(241, 243, 247);
        }
        .checked {
          background-color: rgb(241, 243, 247);
        }
      }

      .pagination {
        width: 130px;
        box-sizing: border-box;
      }
    }
    .main {
      overflow: hidden;
      // margin-top: 8px;
    }
  }
}
</style>
