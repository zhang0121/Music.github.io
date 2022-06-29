<template>
  <div class="container">
    <div class="container1">
      <div class="search">
        <div class="input" @keydown.enter="search()">
          <el-input
            v-model="input"
            placeholder="请输入内容"
            
          ></el-input>
        </div>
        <div class="button" @click="search()">
          <el-button type="info" icon="el-icon-search">搜索</el-button>
        </div>
      </div>

      <div class="main">
        <p>搜索结果（目前仅歌曲、视频、mv、歌单可用）</p>
        <div class="head" @click="changeSearch($event.target.id)">
          <el-row type="flex" justify="space-between">
            <el-col :span="4"
              ><div
                class="grid-content bg-purple"
                :class="{ checked: index == 1 }"
                :id="1"
              >
                歌曲
              </div></el-col
            >
            <el-col :span="4"
              ><div
                class="grid-content bg-purple"
                :class="{ checked: index == 1000 }"
                :id="1000"
              >
                歌单
              </div></el-col
            >
            <el-col :span="4"
              ><div
                class="grid-content bg-purple"
                :class="{ checked: index == 1004 }"
                :id="1004"
              >
                MV
              </div></el-col
            >
            <el-col :span="4"
              ><div
                class="grid-content bg-purple"
                :class="{ checked: index == 1014 }"
                :id="1014"
              >
                视频
              </div></el-col
            >
            <el-col :span="4"
              ><div
                class="grid-content bg-purple"
                :class="{ checked: index == 10 }"
                :id="10"
              >
                专辑
              </div></el-col
            >
            <el-col :span="4"
              ><div
                class="grid-content bg-purple"
                :class="{ checked: index == 100 }"
                :id="100"
              >
                歌手
              </div></el-col
            >
            <el-col :span="4"
              ><div
                class="grid-content bg-purple"
                :class="{ checked: index == 1006 }"
                :id="1006"
              >
                歌词
              </div></el-col
            >
          </el-row>
        </div>

        <router-view></router-view>
        <Pagination :pageNo="pageNo" :limit="limit"  @upData="upData"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      index: '1',
      input: "",
      limit: 20,
      pageNo: 1,
    };
  },

  methods: {
    getData() {
      this.$store.dispatch("getSearchDetail", {
        type: this.index,
        keyWord: this.$route.query.keyWord,
        limit: this.limit,
        offset: this.pageNo,
      });
    },
    changeSearch(type) {
        // 专辑 歌手 歌词不可用
     if(type!='1006'&type!='100'&type!='10'&&type) {
        let name = "";
        switch (type) {
          case "1":
            name = "songs";

            break;
          case "10":
            name = "albums";
            break;

          case "100":
            name = "singers";
            break;
          case "1000":
            name = "lists";
            break;

          case "1004":
            name = "mvs";
            break;
          case "1014":
            name = "videos";
            break;
          case "1006":
            name = "lyrics";
            break;
        }
        
        this.$router.push({
          name: name,
          query: { type: type, keyWord: this.input },
        });
      }
    },
    search() {
        this.changeSearch(this.index);
    },
    // 分页回调
    upData(num){
        if(num<0){
            num=0;
        }
        this.pageNo=num;
        this.getData();
    }

  },

  watch: {
    // 监听路由变化发消息
    $route: {
      immediate: true,
      deep: true,
      handler() {
        this.index = this.$route.query.type;
        this.input = this.$route.query.keyWord;
        this.getData();
      },
    },
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  background-color: #eee;
  .container1 {
    width: 1000px;
    margin: auto;
    background-color: #f2f1ef;
    padding: 20px;
    .search {
      width: 420px;
      height: 40px;
      line-height: 40px;
      margin: auto;
      margin-bottom: 50px;
      padding: 10px;
      background-color: #f0f8ff;

      .input {
        width: 320px;
        display: inline-block;
      }
      .button {
        display: inline-block;
      }
    }
    .main {
      width: 940px;
      .head {
        margin: 20px 0;
        border-left: 1px solid #9b9898;
        border-right: 1px solid #9b9898;
        .el-row {
          margin-bottom: 20px;
          &:last-child {
            margin-bottom: 0;
          }
        }
        .el-col {
          border-radius: 4px;
        }
        .bg-purple-dark {
          background: #99a9bf;
        }
        .bg-purple {
          background: #d3dce6;
        }
        .bg-purple-light {
          background: #e5e9f2;
        }
        .grid-content {
          font-size: 16px;
          text-align: center;
          height: 38px;
          border-radius: 1px;
          border-top: 3px solid #9b9898;
          border-bottom: 1.5px solid #bcb8b8;
          line-height: 38px;
          cursor: pointer;
          background: #f8f9fa;
          // border-radius: 4px;
          min-height: 36px;
          &:hover {
            border-top: 3px solid #c24040;
          }
        }
        .checked {
          border-top: 3px solid #c24040;
          border-bottom: none;
          border-left: 1px solid #9b9898;
          border-right: 1px solid #9b9898;
        }
        .row-bg {
          padding: 10px 0;
          background-color: #f9fafc;
        }
      }
    }
  }
}
</style>
