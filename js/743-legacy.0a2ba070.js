"use strict";(self["webpackChunkcloudmusic"]=self["webpackChunkcloudmusic"]||[]).push([[743],{9743:function(t,i,e){e.r(i),e.d(i,{default:function(){return u}});var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"container"},[e("div",{staticClass:"container1"},[e("div",{staticClass:"head"},[e("ul",{staticClass:"ul"},[e("li",{class:{active:1==t.index2},attrs:{id:-1},on:{click:t.changeIndex2}},[t._v(" 热门 ")]),e("li",{class:{active:0==t.index},attrs:{id:0},on:{click:function(i){return t.changeIndex(0)}}},[t._v(" 全部 ")]),e("li",{class:{active:1==t.index},attrs:{id:1},on:{click:function(i){return t.changeIndex(1)}}},[t._v(" 内地 ")]),e("li",{class:{active:2==t.index},attrs:{id:2},on:{click:function(i){return t.changeIndex(2)}}},[t._v(" 港台 ")]),e("li",{class:{active:3==t.index},attrs:{id:3},on:{click:function(i){return t.changeIndex(3)}}},[t._v(" 欧美 ")]),e("li",{class:{active:4==t.index},attrs:{id:4},on:{click:function(i){return t.changeIndex(4)}}},[t._v(" 韩国 ")]),e("li",{class:{active:5==t.index},attrs:{id:5},on:{click:function(i){return t.changeIndex(5)}}},[t._v(" 日本 ")])])]),e("div",{staticClass:"left"},[e("ul",{staticClass:"ul"},t._l(t.mvList.slice(0,Math.floor(t.mvList.length/2)),(function(i,s){return e("li",{key:i.id},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:i.cover,expression:"item.cover"}],attrs:{id:i.id},on:{click:function(e){return t.toPlayMv(i.id,s)}}}),e("p",{on:{click:function(e){return t.toPlayMv(i.id,s)}}},[t._v(t._s(i.name))]),e("router-link",{staticClass:"author",attrs:{to:""}},[t._v(t._s(i.artistName))]),e("span",{staticClass:"count"},[t._v("播放："+t._s(i.playCount)+"次")])],1)})),0)]),e("div",{staticClass:"right"},[e("ul",{staticClass:"ul"},t._l(t.mvList.slice(Math.floor(t.mvList.length/2),t.mvList.length),(function(i,s){return e("li",{key:i.id},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:i.cover,expression:"item.cover"}],on:{click:function(e){return t.toPlayMv(i.id,s+10)}}}),e("p",{on:{click:function(e){return t.toPlayMv(i.id,s+10)}}},[t._v(t._s(i.name))]),e("router-link",{staticClass:"author",attrs:{to:""}},[t._v(t._s(i.artistName))]),e("span",{staticClass:"count"},[t._v("播放："+t._s(i.playCount)+"次")])],1)})),0)])]),e("div",{staticClass:"pagination"},[e("Pagination",{attrs:{pageNo:t.pageNo,pageSize:t.limit,total:5},on:{upData:t.upData}})],1)])},n=[],a=e(4451),c={components:{Pagination:a.Z},data:function(){return{index:0,pageNo:1,limit:20,index1:-1,index2:1}},computed:{mvList:function(){if(this.$store.state.mv.mvList)return this.$store.state.mv.mvList},area:function(){switch(this.$route.query.type){case"0":return"";case"1":return"内地";case"2":return"港台";case"3":return"欧美";case"4":return"韩国";case"5":return"日本"}}},methods:{changeIndex:function(t){1==this.index2?(this.index=t,this.$router.push("/mvlist?hot=1&type=".concat(t))):(this.index=t,this.$router.push("/mvlist?hot=0&type=".concat(t)))},changeIndex2:function(){1==this.index2?(this.index2=0,this.index=0,this.$router.push("/mvlist?hot=0&type=0")):(this.index2=1,this.index=0,this.$router.push("/mvlist?hot=1&type=0"))},toPlayMv:function(t,i){this.index1=i,this.$router.push({name:"video",query:{types:"mv",id:t}})},upData:function(t){this.pageNo=t,this.$store.dispatch("getMvList",{area:this.area,pageNo:this.pageNo,limit:this.limit,isHot:this.$route.query.hot})}},watch:{$route:{immediate:!0,deep:!0,handler:function(){this.pageNo=1,this.$store.dispatch("getMvList",{area:this.area,pageNo:this.pageNo,limit:this.limit,isHot:this.$route.query.hot})}}}},r=c,o=e(1001),l=(0,o.Z)(r,s,n,!1,null,"e539f450",null),u=l.exports}}]);