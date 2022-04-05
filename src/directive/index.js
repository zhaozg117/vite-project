import copy from './copy';
import debounce from './debounce';
const directives = {
  copy,
  debounce,
};

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key]);
    });
  },
};
