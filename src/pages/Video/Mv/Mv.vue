<template>
  <div class="container">
    <div class="head">
      <h2>
        <i v-if="$route.query.types=='mv'"></i><span class="title" :title="detail.mvName">{{ detail.mvName
        }}</span><a href="javascript:" class="author">{{ detail.author }}</a>
      </h2>
    </div>
    <div class="video">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="detail.playerOptions"
      ></video-player>
    </div>
    <div class="button">
      <button>
        <img src="../../ListDetail/img/3.1分享.png" /> {{ detail.shareCount }}
      </button>
      <button>
        <img src="../../ListDetail/img/收藏.png" /> {{ detail.likedCount }}
      </button>
      <button>
        <img src="../../ListDetail/img/评论.png" /> {{ detail.commentCount }}
      </button>
    </div>
    <div class="comment">
      <span>最新评论</span>
      <ul>
        <li v-for="item in detail.comments" :key="item.commentId">
          <img v-lazy="item.user.avatarUrl" /><a href="javascript:"
            >{{ item.user.nickname }}&nbsp;</a
          ><span class="word" :title="item.content">:{{ item.content }}</span
          ><span class="time">{{ item.timeStr }}</span>
        </li>
      </ul>
      <div class="zz">.......</div>
      <span>精彩评论</span>
      <ul>
        <li
          v-for="item in detail.hotComments.slice(0, 10)"
          :key="item.commentId"
        >
          <img v-lazy="item.user.avatarUrl" /><a href="javascript:"
            >{{ item.user.nickname }}&nbsp;</a
          ><span class="word" :title="item.content">:{{ item.content }}</span
          ><span class="time">{{ item.timeStr }}</span>
        </li>
      </ul>
      <div class="zz">.......</div>
    </div>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";

export default {
  components: {
    videoPlayer,
  },
  props: ["detail"],
};
</script>

<style scoped lang="less">
.container {
  width: 640px;
  img{
    cursor: pointer;
  }
  .head {
    padding-top: 20px;
    margin: 0px 0px 10px 0;
    width: 640px;
    h2 {
        width: 600px;
      font-size: 22px;
      font-weight: 500;
      height: 29px;
      display: flex;
      align-items: center;
      .title{
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      display: inline-block;
      max-width: 500px;
      }
      
      i {
        // display: inline-block;
        margin-right: 5px;
        width: 30px;
        height: 20px;
        background-image: url("../img/icon2.png");
        background-position: -230px -1554px;
      }
      .author {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 12px;
        margin: 10px 0 0 5px;
        color: #2483d5;
        display: inline-block;
        max-width: 100px;
      }
    }
  }
  .video {
    position: static;
    width: 640px;
    // height: 400px;
  }
  .button {
    margin: 20px 0;
    button {
      width: 70px;
      height: 30px;
      margin-right: 10px;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }
  .comment {
    span {
      font-size: 13px;
      font-weight: 900;
    }

    li {
      width: 640px;
      height: 82px;
      box-sizing: border-box;
      padding: 15px 0;
      border-top: 1px solid #979797;
      position: relative;
      &:first-child {
        margin-top: 15px;
      }
      img {
        width: 50px;
        height: 50px;
        float: left;
        margin-right: 10px;
      }
      a {
        float: left;
        font-size: 13px;
      }
      .word {
        color: #686363;
        text-overflow: ellipsis;
        display: -webkit-box;
        white-space: pre-wrap;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; //限制显示3行
        overflow: hidden;
      }
      .time {
        position: absolute;
        bottom: 10px;
        right: 50px;
        color: #c4c1c1;
      }
    }
    .zz {
      text-align: center;
      font-size: 40px;
    }
  }
}
</style>
