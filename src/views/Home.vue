<script setup>
import { ref } from "vue";
import VirtualList from "@/components/VirtualList.vue";
import { debounce, throtter1, throtter2 } from "@/utils";
defineProps({
  msg: String,
});

const data = Array.from({ length: 100000 }).map((e, index) => ({
  code: index,
  name: `${index}-name`,
}));
const count = ref(0);

const inputChange = throtter2((val) => {
  console.log("aaaa", new Date());
}, 1500);
</script>

<template>
  <div class="p-x-20">
    <h1>{{ msg }}</h1>
    <input type="text" @input="inputChange" />
    <virtual-list :data="data" dataKey="code"></virtual-list>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
