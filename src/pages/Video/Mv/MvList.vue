<template>
  <div class="container">
    <div class="container1">
      <div class="head">
        <ul class="ul">
          <li @click="changeIndex2" :class="{ active: index2 == 1 }" :id="-1">
            热门
          </li>
          <li @click="changeIndex(0)" :class="{ active: index == 0 }" :id="0">
            全部
          </li>
          <li @click="changeIndex(1)" :class="{ active: index == 1 }" :id="1">
            内地
          </li>
          <li @click="changeIndex(2)" :class="{ active: index == 2 }" :id="2">
            港台
          </li>
          <li @click="changeIndex(3)" :class="{ active: index == 3 }" :id="3">
            欧美
          </li>
          <li @click="changeIndex(4)" :class="{ active: index == 4 }" :id="4">
            韩国
          </li>
          <li @click="changeIndex(5)" :class="{ active: index == 5 }" :id="5">
            日本
          </li>
        </ul>
      </div>
      <div class="left">
        <ul class="ul">
          <li
            v-for="(item, index) in mvList.slice(
              0,
              Math.floor(mvList.length / 2)
            )"
            :key="item.id"
          >
            <img
              v-lazy="item.cover"
              :id="item.id"
              @click="toPlayMv(item.id, index)"
            />
            <p @click="toPlayMv(item.id, index)">{{ item.name }}</p>
            <router-link to="" class="author">{{
              item.artistName
            }}</router-link>
            <span class="count">播放：{{ item.playCount }}次</span>
          </li>
        </ul>
      </div>
      <div class="right">
        <ul class="ul">
          <li
            v-for="(item, index) in mvList.slice(
              Math.floor(mvList.length / 2),
              mvList.length
            )"
            :key="item.id"
          >
            <img v-lazy="item.cover" @click="toPlayMv(item.id, index + 10)" />
            <p @click="toPlayMv(item.id, index + 10)">{{ item.name }}</p>
            <router-link to="" class="author">{{
              item.artistName
            }}</router-link>
            <span class="count">播放：{{ item.playCount }}次</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="pagination">
      <Pagination
        :pageNo="pageNo"
        :pageSize="limit"
        :total="5"
        @upData="upData"
      ></Pagination>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      index: 0,
      pageNo: 1,
      limit: 20,
      // 歌曲index
      index1: -1,
      index2: 1,
    };
  },
  computed: {
    mvList() {
      if (this.$store.state.mv.mvList) {
        return this.$store.state.mv.mvList;
      }
    },
    // 地区
    area() {
      switch (this.$route.query.type) {
        case "0":
          return "";
        case "1":
          return "内地";
        case "2":
          return "港台";
        case "3":
          return "欧美";
        case "4":
          return "韩国";
        case "5":
          return "日本";
      }
    },

  },
  methods: {
    changeIndex(id) {
      // 取消热门
      if (this.index2 == 1) {
        this.index = id;
        this.$router.push(`/mvlist?hot=1&type=${id}`);
      } else {
        this.index = id;
        this.$router.push(`/mvlist?hot=0&type=${id}`);
      }
    },
    // 控制是否是热门mv
    changeIndex2() {
      if (this.index2 == 1) {
        this.index2 = 0;
        this.index = 0;
        this.$router.push(`/mvlist?hot=0&type=0`);
      } else {
        this.index2 = 1;
        this.index = 0;
        this.$router.push(`/mvlist?hot=1&type=0`);
      }
    },
    // 右边播放mv
    toPlayMv(id, index) {
      // 左边
      this.index1 = index;

      this.$router.push({
        name: "video",
        query: {types:'mv', id: id },
      });
    },
    // 分页回调
    upData(num) {
      this.pageNo = num;
      this.$store.dispatch("getMvList", {
        area: this.area,
        pageNo: this.pageNo,
        limit: this.limit,
        // 用于判断是否是获取热门mv
        isHot: this.$route.query.hot,
      });
    },
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler() {
        this.pageNo = 1;
        // console.log(this.$route.query);
        this.$store.dispatch("getMvList", {
          area: this.area,
          pageNo: this.pageNo,
          limit: this.limit,
          // 用于判断是否是获取热门mv
          isHot: this.$route.query.hot,
        });
      },
    },
  },
};
</script>

<style scoped lang="less">
.container {
  margin-top: 5px;
  width: 100%;
  .container1 {
    width: 1000px;
    margin: auto;
    border-radius: 10px;
    padding-bottom: 20px;
    background-color: rgb(154, 154, 168);

    .head {
      width: 860px;
      margin: auto;
      ul {
        display: flex;
        justify-content: space-around;
        li {
          width: 60px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          border-radius: 10px;
          cursor: pointer;

          &:hover {
            background-color: rgb(49, 59, 117);
            color: #fff;
          }
        }
        .active {
          background-color: rgb(49, 59, 117);
          color: #fff;
        }
      }
    }
    .ul {
      img {
        width: 80px;
        height: 80px;
        border-radius: 10px;
        margin: 3px 0 0 3px;
        cursor: pointer;
      }
      li {
        margin: 10px 0;
        border: 1px solid #666;
        border-radius: 10px;
        color: rgb(123, 112, 112);
        position: relative;
      }
      p {
        display: inline-block;
        position: absolute;
        font-size: 16px;
        top: 15%;
        left: 23%;
        display: -webkit-box;
        white-space: pre-wrap;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; //限制显示3行
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
        &:hover {
          color: #000;
        }
      }

      .author {
        position: absolute;
        bottom: 10px;
        left: 23%;
        text-overflow: ellipsis;

        &:hover {
          color: rgb(82, 96, 180);
          // background-color: rgb(82, 96, 180);
        }
      }
      .count {
        position: absolute;
        bottom: 10px;
        right: 6%;
      }
    }

    .left {
      width: 430px;
      box-sizing: border-box;
      float: left;
      margin: 0 75px 0 50px;
      border: 1px solid #666;
      border-radius: 10px;
      background-color: aquamarine;
    }
    .right {
      width: 430px;
      box-sizing: border-box;
      overflow: hidden;
      border: 1px solid #666;
      border-radius: 10px;

      background-color: antiquewhite;
    }
  }
}
</style>
