import { debounce } from '@/utils';

const dir = {
  created() {},

  beforeMount(el, binding) {
    const { fn, event, delay } = binding.value;
    el._handler = debounce(fn, delay);
    el.addEventListener(event, el._handler);
  },

  unmounted(el, binding) {
    const { event } = binding;
    el.removeEventListener(event, el._handler);
  },
};

export default dir;
