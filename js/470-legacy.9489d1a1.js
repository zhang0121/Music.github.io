"use strict";(self["webpackChunkcloudmusic"]=self["webpackChunkcloudmusic"]||[]).push([[470,387],{2387:function(t,s,e){e.r(s),e.d(s,{default:function(){return l}});var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"main"},[e("ul",{on:{click:function(s){return t.getDetail(s)}}},t._l(t.songList?t.songList:t.searchSongList,(function(s){return e("li",{key:s.id,attrs:{id:s.id}},[e("div",{staticClass:"img"},[e("span",[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:s.coverImgUrl,expression:"item.coverImgUrl"}],attrs:{id:s.id}})])]),e("div",{staticClass:"title",attrs:{id:s.id}},[t._v(t._s(s.name))])])})),0)])},a=[],n=(e(4916),e(4765),{name:"MusicList",props:["songList"],methods:{getDetail:function(t){t.target.id&&this.$router.push({name:"listdetail",query:{listId:t.target.id}})}},computed:{searchSongList:function(){if(this.$store.state.search.songLists)return this.$store.state.search.songLists}}}),r=n,c=e(1001),u=(0,c.Z)(r,i,a,!1,null,"70719ff0",null),l=u.exports},9470:function(t,s,e){e.r(s),e.d(s,{default:function(){return g}});var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"container"},[e("div",{staticClass:"container1"},[e("div",{staticClass:"head"},[e("span",[t._v("精品歌单")]),e("hr"),e("div",{staticClass:"tags"},[e("ul",{staticClass:"category",on:{click:function(s){return t.changeId(s)}}},t._l(t.$store.state.hotsonglist.tags,(function(s){return e("li",{key:s.id,class:{checked:t.defaultId==s.id},attrs:{id:s.id}},[t._v(" "+t._s(s.name)+" ")])})),0)])]),e("div",{staticClass:"main"},[e("QualitySongList",{attrs:{songList:t.$store.state.hotsonglist.songList}})],1)])])},a=[],n=e(7906),r=e(6198),c=e(2387),u={components:{QualitySongList:c["default"]},data:function(){return{highQualityTags:this.$store.state.hotsonglist.tags,defaultType:"华语",defaultId:5001,limit:20}},mounted:function(){this.getTags(),this.getTagsMessage()},computed:{},methods:{getTags:function(){this.$store.dispatch("getHighQualityTags")},getTagsMessage:function(){this.$store.dispatch("getTagsMessage",{limit:this.limit,type:this.defaultType})},changeId:function(t){var s=this;return(0,r.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return s.defaultId=t.target.id,s.defaultType=t.target.innerText,e.prev=2,e.next=5,s.getTagsMessage();case 5:e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](2),alert(e.t0);case 10:case"end":return e.stop()}}),e,null,[[2,7]])})))()}}},l=u,o=e(1001),d=(0,o.Z)(l,i,a,!1,null,"95c0f942",null),g=d.exports}}]);