"use strict";(self["webpackChunkcloudmusic"]=self["webpackChunkcloudmusic"]||[]).push([[621],{621:function(t,A,i){i.r(A),i.d(A,{default:function(){return r}});var s=function(){var t=this,A=t.$createElement,s=t._self._c||A;return s("div",{staticClass:"container"},[s("div",{staticClass:"container1"},[s("div",{staticClass:"left"},[s("img",{attrs:{src:i(1439)}}),s("span",{staticClass:"recommend"},[t._v("热门歌手")]),s("div",{staticClass:"list",on:{click:function(A){return t.changeSingerId(A)}}},[s("ul",t._l(t.singerList,(function(A,i){return s("li",{key:A.id,staticClass:"animate__animated animate__infinite",class:{animate__pulse:i==t.index1,infinite:i==t.index1},on:{mouseenter:function(A){t.index1=i},mouseout:function(A){t.index1=-1}}},[s("span",{staticClass:"singer",class:{checked:t.singerId==A.id},attrs:{id:A.id}},[t._v("~ "+t._s(A.name))])])})),0)]),s("div",{staticClass:"pagination"},[s("Pagination",{attrs:{pageNo:t.spageNo,pageSize:t.slimit},on:{upData:t.upData}})],1)]),s("div",{staticClass:"main"},[s("router-view")],1)])])},n=[],a={components:{},data(){return{index1:-1,spageNo:1,slimit:16,index2:-1,singerId:2116}},methods:{getData(){this.$store.dispatch("getHotSingers",{pageNo:this.spageNo,limit:this.slimit})},upData(t){(t<=0||t>7)&&(t=1),this.spageNo=t,this.getData()},changeSingerId(t){this.singerId=t.target.id},getMusicList(){this.$store.dispatch("getSingerMusic",this.singerId)}},mounted(){this.getData()},computed:{singerList(){return this.$store.state.hotsinger.singerList}},watch:{singerList:{deep:!0,async handler(){this.singerId=this.singerList[0].id}},singerId:{immediate:!0,deep:!0,handler(){this.$router.push({name:"hotmusic",query:{singerId:this.singerId}})}}}},e=a,g=i(1001),u=(0,g.Z)(e,s,n,!1,null,"1cca08e4",null),r=u.exports},1439:function(t){t.exports="data:image/png;base64,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"}}]);