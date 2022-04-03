<template>
  <div
    class="virtual-list overflow-y-auto h-120"
    ref="listRef"
    @scroll.passive="handleScroll"
  >
    <!-- 支撑容器高度 -->
    <div class="list__phantom" :style="{ height: phantomHeigh + 'px' }"></div>
    <div
      class="list__container"
      :style="{ transform: `translateY(${offsetY}px)` }"
    >
      <div
        class="item"
        v-for="(item, index) in viewData"
        :key="item[dataKey]"
        :style="{ height: itemHeight + 'px' }"
      >
        <slot v-bind="{ item: item, index: index + startIndex }">
          {{ item[dataKey] }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs, computed, watch, onMounted, reactive, ref } from "vue";
export default {
  name: "VirtualList",
  props: {
    data: { type: Array, required: true, default: () => [] },
    itemHeight: { type: Number, default: 40 },
    dataKey: { type: String, required: true },
    virtual: { type: Boolean, default: false },
  },
  setup(props, ctx) {
    const { data, itemHeight } = toRefs(props);
    const listRef = ref(null);
    const state = reactive({
      scrollTop: 0, // 滚动高度
      startIndex: 0, // 可视数据开始下标
      viewHeight: 0, // 可视区高度
    });
    const computeds = {
      viewData: computed(() => {
        const startIndex = Math.floor(state.scrollTop / itemHeight.value);
        const count = Math.floor(state.viewHeight / itemHeight.value) * 2;
        const endIndex = startIndex + count;
        return data.value.slice(startIndex, endIndex);
      }),
      offsetY: computed(() => {
        return ~~(state.scrollTop / itemHeight.value) * itemHeight.value - 1;
      }),
      phantomHeigh: computed(() => {
        return data.value.length * itemHeight.value;
      }),
    };
    const fn = {
      handleScroll(ev) {
        state.scrollTop = ev.target.scrollTop;
      },
    };

    watch(
      () => props.data,
      () => {
        listRef.value.scrollTo({
          top: state.scrollTop,
          behavior: "auto", // smooth(平滑滚动),instant(瞬间滚动),默认值auto
        });
      },
      { flush: "post" }
    );

    onMounted(() => {
      console.log("listRef.value:", listRef.value);
      const resizeObserver = new ResizeObserver((entries) => {
        state.viewHeight = entries[0].contentRect.height;
      });
      resizeObserver.observe(document.querySelector(".virtual-list"));
    });

    return { ...toRefs(state), ...computeds, ...fn };
  },
};
</script>

<style lang="less" scoped>
.virtual-list {
  position: relative;
  .list__phantom {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
}
</style>
