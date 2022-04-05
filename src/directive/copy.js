import { copyContent } from '@/utils';
const vue2Copy = {
  // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  bind(el, binding) {
    el.$value = binding.value;
    el.handler = () => {
      copyContent(el.$value);
    };
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler);
  },
  // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  inserted() {},
  // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前
  update() {},
  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
    el.$value = value;
  },
  // 只调用一次，指令与元素解绑时调用
  unbind(el) {
    el.removeEventListener('click', el.handler);
  },
};

const vue3Copy = {
  // 指令具有一组生命周期钩子：
  // 在绑定元素的 attribute 或事件监听器被应用之前调用
  created(
    el,
    { instance, value, oldValue, arg, modifiers, dir },
    vnode,
    preVnode,
  ) {},
  // 在绑定元素的父组件挂载之前调用
  beforeMount(el, binding) {
    el.$value = binding.value || el.textContent;
    el.handler = () => {
      copyContent(el.$value);
    };
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler);
  },

  // 在绑定元素的父组件挂载之后调用
  mounted(el, binding) {},

  // 在包含组件的 VNode 更新之前调用
  beforeUpdate() {},

  // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
  updated(el, { value }) {
    el.$value = value;
  },

  // 在绑定元素的父组件卸载之前调用
  beforeUnmount(el) {
    el.removeEventListener('click', el.handler);
  },

  // 在绑定元素的父组件卸载之后调用
  unmounted() {},
};

export default vue3Copy;
