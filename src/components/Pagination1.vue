<template>
  <div class="pagination">
    <button @click="emit(pageNo - 1)" :disabled="pageNo==1">上一页</button>
    <!-- <button @click="emit(1)" :class="{ active: pageNo == 1 }">1</button> -->
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <button
      v-for="(num, index) in startNumAndEndNum.end"
      :key="index"
      v-show="num > startNumAndEndNum.start"
      @click="emit(num)"
      :class="{ active: pageNo == num }"
    >
      {{ num }}
    </button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button @click="emit(totalPage)" :class="{ active: pageNo == totalPage }">
      {{ totalPage }}
    </button>

    <button @click="emit(pageNo + 1)" :disabled="pageNo==totalPage">下一页</button>
    <button style="margin-left: 30px">共 {{ totalPage }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  methods: {
    emit(num) {
      this.$emit("upData", num);
    },
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startNumAndEndNum() {
      const { pageNo, total, continues } = this;
      let start = 0;
      let end = 0;
      if (total < continues) {
        start = 1;
        end = continues;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
      }
      if (start < 1) {
        start = 1;
        end = continues;
      }
      if (end >= this.totalPage) {
        start = this.totalPage - continues + 1;
        end = this.totalPage - 1;
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
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

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
