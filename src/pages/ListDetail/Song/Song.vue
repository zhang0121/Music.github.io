<template>
  <div class="container">
    <div class="main">
      <p v-if="listDetail">
        歌曲列表
        <span>共{{ listDetail.tracks ? listDetail.tracks.length : 20 }}首</span>
        <span class="count">播放：{{ listDetail.playCount }}次</span>
      </p>
      <div class="list">
        <table
          class="table"
          :style="{ width: listDetail ? 670 + 'px' : 940 + 'px' }"
        >
          <thead v-if="listDetail">
            <tr>
              <th class="th0"></th>
              <th class="th1">&nbsp; 歌曲标题</th>
              <th class="th2">&nbsp; 时长</th>
              <th class="th3">&nbsp; 歌手</th>
              <th class="th4">&nbsp; 专辑</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in listDetail ? listDetail.tracks : songs"
              :key="item.id"
              @mouseenter="index2 = index"
            >
              <td>
                &nbsp;&nbsp;&nbsp; <span class="span1">{{ index + 1 }} </span>
                <span
                  class="span2"
                  @click="playMusic(item, index)"
                  :class="{ checked: index == index1 }"
                  title="播放"
                  >&nbsp;</span
                >
              </td>
              <td>
                &nbsp; {{ item.name }}
                <router-link
                  :to="{ name: 'video', query: { types: 'mv', id: item.mv } }"
                  class="mv"
                  v-if="item.mv"
                ></router-link>
              </td>
              <td>
                &nbsp; {{ getSongTime(item.dt) }}&nbsp;&nbsp;
                <span
                  v-show="index2 == index"
                  title="添加到播放列表"
                  class="add"
                  @click="addList(item.id)"
                  >+</span
                >
              </td>
              <td>&nbsp; {{ item.ar[0].name }}</td>
              <td>&nbsp; {{ item.al.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["listDetail"],
  data() {
    return {
      // 用于判断点击了谁
      index1: -1,
      // 用于加播放列表（+）
      index2: -1,
    };
  },
  computed: {

    songs() {
      if (this.$store.state.search.songs) {
        return this.$store.state.search.songs;
      }
    },
  },
  methods: {
   
    getSongTime(value) {
      if (value == null) {
        return "";
      } else {
        let date = new Date(value);
        let m = date.getMinutes(); // 分
        m = m < 10 ? "0" + m : m;
        let s = date.getSeconds(); // 秒
        s = s < 10 ? "0" + s : s;
        return m + ":" + s;
      }
    },
    // 播放音乐
    playMusic(music1, index) {
      this.index1 = index;

      this.$store.dispatch("playMusic", { ids: music1.id, type: 1 });
    },
   
    // 加入播放列表
    addList(id) {
      this.$store.dispatch("playMusic", { ids: id, type: 0 });
    },
  },
  watch: {
    $route: {
      handler() {
        this.index1 = -1;
      },
    },
  },
};
</script>

<style scoped lang="less">
.container {
  .main {
    width: 670px;
    p {
      font-size: 20px;

      span {
        font-size: 14px;
        color: #666;
        margin-left: 20px;
      }
      .count {
        float: right;
        color: rgb(196, 32, 32);
      }
    }

    .list {
      width: 670px;
      .table {
        table-layout: fixed; /*首行统一宽度*/
        // width: 670px;
        overflow: hidden;
        border: 1px solid rgb(217, 217, 217);
        td {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          .mv {
            display: inline-block;
            width: 24px;
            height: 24px;
            background-image: url("../img/table.png");
            background-position: -118px -148px;
            vertical-align: middle;
          }
          .add {
            font-size: 18px;
            color: #666;
            font-weight: bolder;
            cursor: pointer;
            &:hover {
              color: #000;
            }
          }
          &:first-child {
            .span1 {
              vertical-align: sub;
              margin-right: 20px;
            }
          }
          .span2 {
            width: 20px;
            height: 20px;
            display: inline-block;
            cursor: pointer;
            background: url("../img/table.png") no-repeat;
            background-position: 3px -102px; //默认
            &:hover {
              background-position: 3px -127px; //鼠标移上
            }
          }
          .checked {
            background-position: -17px -127px !important; //点击
          }
        }
        thead {
          background-color: #e8e8e8;
          color: #666;
          text-align: left;
          font-size: 13px;
          font-weight: lighter;
          height: 35px;
          th {
            border: 2px solid rgb(217, 217, 217);
          }
          .th0 {
            width: 80px;
            // columns: 2;
          }
          .th1 {
            width: 280px;
          }
          .th2 {
            width: 100px;
          }
          .th3 {
            width: 100px;
          }
          .th4 {
            width: 100px;
          }
        }
        tbody {
          color: #333;
          tr {
            height: 33px;
          }
          tr:nth-child(2n-1) {
            background-color: #e8e8e8;
          }
        }
      }
    }
  }
}
</style>
