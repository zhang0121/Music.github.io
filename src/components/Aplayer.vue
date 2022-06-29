<template>
  <div class="container">
    <aplayer
      :audio="audio"
      theme="lightblue"
      preload="auto"
      ref="aplayer"
      :lrcType="1"
      
      fixed
    />
    <div class="clear" @click="clear">
      <el-button type="info" icon="el-icon-delete">清空</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["musicId"],
  data() {
    return {
      audio: [],
    };
  },
  mounted() {
    //  遍历会话储存的id 到播放列表中
    try {
      this.ids.forEach(async (item) => {
        if (item != 0 && item != 1 && item != -1) {
          let song = await this.getSongDetail(item);
          if (song.a.songs[0]) {
            let song1 = {
              ids: song.a.songs[0].id,
              name: song.a.songs[0].name,
              artist: this.getSingers(song.a.songs[0].ar),
              url: `https://music.163.com/song/media/outer/url?id=${song.a.songs[0].id}.mp3`,
              cover: song.a.songs[0].al.picUrl, // prettier-ignore
              lrc: song.b.lrc.lyric,
            };
            this.audio.push(song1);
          }
        }
      });
    } catch (error) {
      alert("失败");
    }
  },
  methods: {
    //歌手名字
    getSingers(arr) {
      let name = "";
      if (arr.length > 1) {
        arr.forEach((item) => {
          name += item.name + "、";
        });
      } else {
        name = arr[0].name;
      }
      // console.log(arr)
      return name;
    },
    // 歌曲详情并加入播放列表
    async getSongDetail(id) {
      let a = await this.$API.reqGetMusicDetail(id);
      let b = await this.$API.reqGetMusicLrc(id);
      if (a.code == 200 && b.code == 200) {
      
        return { a, b };
      }
    },
    // 清空
    clear(){
      sessionStorage.clear();
    }
   
  },
  computed: {
    // 播放列表歌曲id
    ids() {
      if (this.$store.state.play.ids) {
        return this.$store.state.play.ids;
      }
    },
  },
  watch: {
    // 用户点击播放是添加到播放列表
    ids: {
      // immediate: true,
      deep: true,
      async handler() {
        console.log(this.ids);
        let id = this.ids[this.ids.length - 1];
        if (id != 0 && id != 1 && id != 0) {
          try {
            let song = await this.getSongDetail(id[0]);
            if (song.a.songs[0]) {
              let song1 = {
                ids: song.a.songs[0].id,
                name: song.a.songs[0].name,
                artist: this.getSingers(song.a.songs[0].ar),
                url: `https://music.163.com/song/media/outer/url?id=${song.a.songs[0].id}.mp3`,
                cover: song.a.songs[0].al.picUrl, // prettier-ignore
                lrc: song.b.lrc.lyric,
              };
              this.audio.push(song1);
              if ((id[1] == 1)) {
                this.$refs.aplayer.switch(song1.name); // 切换到播放列表中歌曲名包含“东西”的第一首歌
                this.$refs.aplayer.play(); //播放音频
              }
            }
          } catch (error) {}
        }
      },
    },
  },
};
</script>
<style scoped lang="less"> 
.container{
  .clear{
    position: absolute;
    top: 1px;
    left: -2px;
  }
}

</style>
