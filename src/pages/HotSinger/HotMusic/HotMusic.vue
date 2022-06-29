<template>
  <div class="container" >
    <MusicList
      :music="$store.state.hotsinger.hotMusic.slice((pageNo-1)*10, (pageNo-1)*10+10)"
    ></MusicList>
    <div class="pagination2">
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
import MusicList from "@/components/MusicList.vue";
export default {
  data() {
    return {
      pageNo: 1,
      limit: 10,
    };
  },
  components: {
    MusicList,
  },
  mounted() {},
  methods: {
    // 获取歌曲
    getData() {
      this.$store.dispatch("getSingerMusic", this.singerId);
    },
    upData(num){
        if (num <= 0||num>5) {
        num = 1;
      }
        this.pageNo=num;
        this.getData();
    }
  },
  watch:{
    // id一旦变化就发请求
    singerId: {
      immediate: true,
      deep: true,
      async handler() {
        // 从第一页开始展示
       this.pageNo=1;
        try {
          await this.getData();
        } catch (error) {
          alert(error);
        }
      },
    },
  },
  computed:{
    singerId(){
        return this.$route.query.singerId;
    }
  }
};
</script>

<style scoped lang="less">

</style>
