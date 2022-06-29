<template>
  <div class="pagination">
    <button @click="emit(pageNo - 1)">上一页</button>
    
    <button
      v-for="(num, index) in total"
      :key="index"
      @click="emit(num)"
      :class="{ active: pageNo == num }"
    >
      {{ num }}
    </button>


    <button @click="emit(pageNo + 1)">下一页</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total"],
  methods: {
    emit(num) {
      this.$emit("upData", num);
      // console.log(this.total)
    },
  },
  
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  margin-top: 10px;
  button {
    margin: 0 5px;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &:hover {
      background-color: rgb(154, 154, 168);
      color: #fff;
    }

    // &[disabled] {
    //   color: #c0c4cc;
    //   cursor: not-allowed;
    // }

    &.active {
      cursor: not-allowed;
      // background-color: #409eff;
      background-color: rgb(154, 154, 168);
      color: #fff;
    }
  }
}
</style>
