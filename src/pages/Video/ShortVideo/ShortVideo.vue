<template>
  <div class="container">
    <div class="container1">
      <div class="video">
        <p id="p">视频</p>
       <VideoList :videoList="videoList"></VideoList>
        <Pagination :pageNo="pageNo" :pageSize="8" @upData="upData"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import VideoList from './VideoList.vue';
import Pagination from '@/components/Pagination.vue';
export default {
  components:{
    Pagination,
    VideoList,
  },
  data() {
    return {
      pageNo: 1,
    };
  },

  mounted() {
    
  },
  methods:{
    // 
    getData(){
this.$store.dispatch("getVideoList", {
      typeId: this.$route.query.typeId,
      offset: this.pageNo,
    });
    },

    // 
    upData(num){
        if (num <= 0) {
        num = 1;
      }
      this.pageNo=num;
      this.getData();
    },
  },
  computed:{
    videoList(){
        if(this.$store.state.mv.videoList){
            return this.$store.state.mv.videoList;
        }
    }
  },
  watch:{
    $route:{
      immediate:true,
      deep:true,
      handler(){
        this.getData();
      }
    }
  }

};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  .container1 {
    width: 1000px;
    margin: auto;
    background-color: antiquewhite;
    .video {
      #p {
        padding: 20px 20px;
        font-size: 20px;
        border-bottom: 2px solid #666;
      }
     
    }
  }
}
</style>
