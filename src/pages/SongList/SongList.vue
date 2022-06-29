<template>
  <div class="container">
    <div class="container1">
      <div class="head">
        <span>精品歌单</span>
        <hr />
        <div class="tags">
          <ul class="category" @click="changeId($event)">
            <li v-for="item in $store.state.hotsonglist.tags" 
            :key="item.id" :id="item.id" :class="{checked:defaultId==item.id}"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class="main">
        <QualitySongList :songList="$store.state.hotsonglist.songList"></QualitySongList>
      </div>
      
    </div>
  </div>
</template>

<script>
import QualitySongList from "@/components/QualitySongList.vue";

export default {
  components: {
    QualitySongList,
    
  },
  data() {
    return {
      // 标签列表
      highQualityTags: this.$store.state.hotsonglist.tags,
      // 默认华语类型
      defaultType: '华语',
      // 用于加背景
      defaultId:5001,
      // 默认20个
      limit:20,
      
    };
  },
  mounted() {
    this.getTags();
    this.getTagsMessage();
  },
  computed: {},
  methods: {
    // 获取标签
    getTags() {
      this.$store.dispatch("getHighQualityTags");
    },
    getTagsMessage(){
      this.$store.dispatch('getTagsMessage', {limit:this.limit,type:this.defaultType})
    },
    // 改变type
   async changeId(e) {
      // console.log(this.defaultId);
      this.defaultId=e.target.id;
      this.defaultType=e.target.innerText;
      try {
        await this.getTagsMessage();
      } catch (error) {
        alert(error)
      }
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
    .head {
      width: 90%;
      margin: auto;
      background-color: rgb(154, 154, 168);
      font-size: 17px;
      border-radius: 10px;
      margin-top: 1px;

      span {
        margin-left: 20px;
        height: 50px;
        line-height: 50px;
      }
      hr {
        height: 5px;
        background-color: #fff;
      }

      .category {
        margin-top: 10px;
        box-sizing: border-box;
        text-align: center;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li {
          width: 10%;
          height: 30px;
          line-height: 30px;
          margin: 5px 10px;
          cursor: pointer;
          border-radius: 10px;
        }
        li:hover {
          background-color: rgb(49, 59, 117);
          transition: 0.5s;
          transform: scale(1.1);
          color: #fff;
        }
        .checked{
          background-color: rgb(49, 59, 117);
          transform: scale(1.1);
           color: #fff;
        }
      }
    }
    .main{
      width: 95%;
      margin: auto;
    }
  }
}
</style>
