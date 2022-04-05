/**
 * 防抖函数，最后一次事件触发之后指定时间后执行回调
 * 你尽管触发事件，但是我一定在事件触发 n 秒后才执行，如果你在一个事件触发的 n 秒内又触发了这个事件，
 * 那我就以新的事件的时间为准，n 秒后才执 秒内不再触发事件，我才执行，真是任性呐!
 * @param {Function} fn fn
 * @param {Number} delay 毫秒数
 * @returns
 */
export const debounce = (fn, delay = 0) => {
  let timout;
  return (...args) => {
    clearTimeout(timout);
    timout = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

/**
 * 节流函数-时间戳  如果你持续触发事件，每隔一段时间，只执行一次事件
 * @param {Function} fn ad
 * @param {Number} delay
 * @returns
 */
export const throtter1 = (fn, delay = 0) => {
  let pre = 0;
  return (...args) => {
    console.log('throtter1******', new Date());
    const now = Date.now();
    if (now - pre > delay) {
      pre = now;
      fn.apply(this, args);
    }
  };
};

/**
 * 节流函数-定时器  一点时间内，只触发一次，之后再重新计时
 * @param {Function} fn ad
 * @param {Number} delay
 * @returns
 */
export const throtter2 = (fn, delay = 0) => {
  let timout;
  return (...args) => {
    console.log('throtter2******', new Date());
    if (!timout) {
      timout = setTimeout(() => {
        timout = null;
        fn.apply(this, args);
      }, delay);
    }
  };
};

/**
 * 深度优先搜索 一般用堆数据结构来辅助实现DFS算法。
 * @param {Array} tree 树结构数组
 */
export const dfs1 = (tree) => {
  const stack = [];
  const res = [];
  for (let index = 0; index < tree.length; index++) {
    const node = tree[index];
    stack.push(node);
    while (stack.length) {
      const item = stack.pop();
      res.push(item);
      const children = item.children || [];
      if (children.length) {
        for (let i = children.length - 1; i >= 0; i--) {
          const child = children[i];
          stack.push(child);
        }
      }
    }
  }
  return res;
};

/**
 * 广度优先搜索 一般用堆数据结构来辅助实现BFS算法。
 * @param {Array} tree 树结构数组
 */
export const bfs1 = (tree) => {
  const queue = [];
  const res = [];
  for (const node of tree) {
    queue.push(node);
  }
  while (queue.length) {
    const item = queue.shift();
    res.push(item);
    const children = item.children || [];
    if (children.length) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        queue.push(child);
      }
    }
  }
  return res;
};

// 柯里化通用函数
export const curry = (fn, ...args) => {
  return args.length >= fn.length
    ? fn.apply(this, args)
    : (...args2) => curry(fn, ...args, ...args2);
};

export const uncurried = (fn, length) => {
  return (...args) => {
    if (args.length >= length) {
      return fn.apply(this, args);
    }
    return (...args2) => uncurried(fn, length)(...args, ...args2);
  };
};

// 节流函数
export const throtter = (fn, delay = 0) => {
  let pre = 0;
  return (...args) => {
    console.log('throtter******', new Date());
    const now = Date.now();
    if (now - pre > delay) {
      pre = now;
      fn.apply(this, args);
    }
  };
};

// 遍历树结构 reduce
export const reduceTree = (tree, childrenKey = 'children') => {
  return tree.reduce((pre, item) => {
    pre.push(item);
    if (item[childrenKey] && item[childrenKey].length) {
      pre = pre.concat(reduceTree(item[childrenKey], childrenKey));
    }
    return pre;
  }, []);
};

// 平铺树成map reduce
export const reduceTreeToMap = (tree, childrenKey = 'children') => {
  return tree.reduce((pre, item) => {
    pre[item.id] = item;
    if (item[childrenKey] && item[childrenKey].length) {
      pre = { ...pre, ...reduceTreeToMap(item[childrenKey], childrenKey) };
    }
    return pre;
  }, {});
};

// 一键复制

export function copyContent(value) {
  if (!value) {
    console.log('无复制内容');
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.readOnly = 'readonly';
  textarea.style.zIndex = '-9999';
  textarea.style.position = 'absolute';

  textarea.value = value;
  document.body.appendChild(textarea);
  // 选中并复制
  textarea.select();
  const res = document.execCommand('Copy');
  if (res) {
    console.log('复制成功：', res);
  }
  document.body.removeChild(textarea);
}

export default {
  copyContent,
  debounce,
};
