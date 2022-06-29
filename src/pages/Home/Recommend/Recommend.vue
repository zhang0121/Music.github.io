<template>
  <div class="container">
    <div class="head">
      <img src="./img/热门.png" />
      <span class="recommend">热门推荐</span>
      <div class="allType" @click="changeType($event)">
        <span :class="{ active: type == 0 }" class="type">全部</span>
        <span :class="{ active: type == 7 }" class="type">华语</span>
        <span :class="{ active: type == 96 }" class="type">欧美</span>
        <span :class="{ active: type == 8 }" class="type">日本</span>
        <span :class="{ active: type == 16 }" class="type">韩国</span>
      </div>
    </div>
    <hr />
    <div class="list">
    <MusicList :music="newMusic.slice((pageNo-1)*limit,(pageNo-1)*limit+limit)"></MusicList>
    </div>
    <Pagination :pageNo="pageNo" :limit="limit" :total="10" @upData="upData"></Pagination>
  </div>
</template>

<script>
export default {
  props: ["newMusic"],
 
  data() {
    return {
      type: 7,
      pageNo: 1,
      limit: 10,
    };
  },

  computed: {
    // 随机获取10 首
    music() {
      let arr = [];
      for (let i = 0; i < 15; i++) {
        let index = Math.floor(Math.random() * 100);
        arr[i] = this.newMusic[index];
      }
      return arr;
    },
  },
  methods: {
    // 获取音乐
    getData(type) {
      this.$store.dispatch("getNewMusic", type);
    },
    // 改变类型
    changeType(e) {
      // console.log(e.target.innerText);
      switch (e.target.innerText) {
        case "全部":
          this.type = 0;
          break;
        case "华语":
          this.type = 7;
          break;
        case "欧美":
          this.type = 96;
          break;
        case "日本":
          this.type = 8;
          break;
        case "韩国":
          this.type = 16;
          break;
      }
      // console.log(type)
      this.getData(this.type);
    },
    upData(num){
       if (num <= 0||num>10) {
        num = 1;
      }
      this.pageNo=num
    },
  },
  mounted() {
    this.getData(this.type);
  },
};
</script>

<style scoped lang="less">
.container {
  margin: 20px auto 0 auto;
  width: 890px;

  .head {
    display: flex;
    align-items: center;
    img {
      width: 20px;
      height: 20px;
    }
    .recommend {
      font-size: 20px;
      margin: 0 10px 0 5px;
    }
    .allType {
      .type {
        font-size: 14px;
        width: 40px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin: 0 8px;
        border-radius: 5px;
        cursor: pointer;
      }
      .active {
        background-color: antiquewhite;
      }
    }
  }
  .list{
    height: 480px;
  }
  hr {
    size: 3;
    background-color: rgb(49, 59, 117);
    width: 890px;
    height: 5px;
    margin: 10px 0;
  }
}
</style>
