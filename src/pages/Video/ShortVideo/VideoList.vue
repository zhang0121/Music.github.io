<template>
  <div class="contaoner">
     <div class="main">
          <ul v-if="videoList">
            <li v-for="item in videoList" :key="item.data.vid">
              <router-link :to="{name:'video',query:{types:'shortvideo',id:item.data.vid}}"><img v-lazy="item.data.coverUrl" :title="item.data.title"/></router-link>
              <p class="play">
                <span class="playimg"></span>
                <span class="playtime">{{item.data.playTime}}</span>
              </p>
              <p class="time">{{getSongTime(item.data.durationms)}}</p>
              <h4>
                <span class="mv" v-if="item.type==2"> 
                </span>
                <router-link :to="{name:'video',query:{types:'shortvideo',id:item.data.vid}}" class="title" :title="item.data.title"> {{item.data.title}}</router-link>
              </h4>
              <p class="author">
                by：<a href="javascript:">{{item.data.creator.nickname}}</a>
              </p>
            </li>
           
          </ul>

           <ul v-else-if="$route.query.type=='1014'">
            <li v-for="item in searchVideos" :key="item.vid">
              <router-link :to="{name:'video',query:{types:item.type==0?'mv':'shortvideo',id:item.vid}}"><img v-lazy="item.coverUrl" :title="item.title"/></router-link>
              <p class="play">
                <span class="playimg"></span>
                <span class="playtime">{{item.playTime}}</span>
              </p>
              <p class="time">{{getSongTime(item.durationms)}}</p>
              <h4>
                <span class="mv" v-if="item.type==2"> 
                </span>
                <router-link :to="{name:'video',query:{types:item.type==0?'mv':'shortvideo',id:item.vid}}" class="title" :title="item.title"> {{item.title}}</router-link>
              </h4>
              <p class="author">
                by：<a href="javascript:">{{item.creator[0].userName}}</a>
              </p>
            </li>
           
          </ul>
           <ul v-else-if="$route.query.type=='1004'">
            <li v-for="item in searchMvs" :key="item.id">
              <router-link :to="{name:'video',query:{types:'mv',id:item.id}}"><img v-lazy="item.cover" :title="item.name"/></router-link>
              <p class="play">
                <span class="playimg"></span>
                <span class="playtime">{{item.playCount}}</span>
              </p>
              <p class="time">{{getSongTime(item.duration)}}</p>
              <h4>
                <span class="mv"> 
                </span>
                <router-link :to="{name:'video',query:{types:'mv',id:item.id}}" class="title" :title="item.name"> {{item.name}}</router-link>
              </h4>
              <p class="author">
                by：<a href="javascript:" to="">{{item.artistName}}</a>
              </p>
            </li>
           
          </ul>
        </div>
  </div>
</template>

<script>
export default {
    props:['videoList'],
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
},
computed:{
  searchVideos(){
    if(this.$store.state.search.videos)
   return  this.$store.state.search.videos
  },
  searchMvs(){
     if(this.$store.state.search.mvs)
   return  this.$store.state.search.mvs
  }
}
}
</script>

<style scoped lang="less">
.container{
     .main {
        width: 900px;
        padding: 20px 30px;
        margin: auto;
        background-color: #f0f8ff;
        ul {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          li {
            width: 185px;
            height: 150px;
            margin-bottom: 40px;
            // background-color: rgb(165, 173, 180);
            position: relative;
            img {
              width: 185px;
              height: 96px;
              cursor: pointer;
            }
            .play {
              position: absolute;
              top: 2px;
              right: 1px;
              font-size: 10px;
              color: rgb(243, 241, 241);
              height: 16px;
              background-color: rgba(0, 0, 0, 0.3);
              .playimg {
                display: inline-block;
                width: 15px;
                height: 10px;
                margin-right: 4px;
                background-image: url("../img/icon2.png");
                background-position: -60px -309.5px;
                .playtime {
                  //   display: inline-block;
                  background-color: rgba(0, 0, 0, 0.5);
                }
              }
            }
            .time {
              position: absolute;
              bottom: 54px;
              left: 1px;
              color: #fff;
              background-color: rgba(0, 0, 0, 0.5);
            }
            h4 {
              display: inline-block;
              max-width: 185px;
             
              .mv{
                display: inline-block;
                margin-right: 4px;
                width: 26px;
                height: 16px;
                background-image: url('../img/icon2.png');
                background-position: -270px -480px;
                vertical-align: baseline;
              }
              .title {
                color: rgb(37, 37, 37);
                display: inline-block;
                max-width: 155px;
                 white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              }
            }
            .author {
              display: inline-block;
              width: 185px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              color: #666;
            }
          }
        }
      }
}
</style>