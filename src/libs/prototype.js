import {imgBaseUrl} from "../config";

/**
 *   全局 util  handler
 */
/**
 * 时间转化字符串
 */
export const getDateTime = (date) => {
  if (date) {
    date = new Date(date);
    let [year, month, day, hour, minute, second] = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
    if (year == NaN) {
      return null;
    }
    month = month < 10 ? '-0' + month : '-' + month
    day = day < 10 ? '-0' + day : '-' + day;
    hour = hour < 10 ? '0' + (hour+':') : hour+':';
    minute = minute < 10 ? '0' + (minute+':') : minute+':';
    second = second < 10 ? '0' + second : second;
    return year+month+day+ ' '+hour+minute+second;
  }
  return null;
};

const data = {

};
// 通用状态获取   value-label
const statusRender = (value, key, h) => {
  let text = '';
  const list = data[key];
  const index = list.findIndex(item => item.value == value);
  if (index > -1) {
    text = list[index].label;
  }
  return !!h ? h('span', text) : text;
};

// 表格 img render
function imgRender(h, src, width, height) {
  if (!src) {
    return;
  }
  return h('img', {
    domProps: {
      src: imgBaseUrl + src,
      title: '点击查看大图'
    },
    style:{
      width: width,
      height: height,
    },
    class: {
      w80: true,
      'mt-5': true,
      cursor: true
    },
    on: {
      click: () => {
        this.imgName = src;
        this.$refs['img'].toggleShow();
      }
    }
  })
}

// 用户ManagerView
function mgr (key, params, isBatch, unFresh, name) {
  const ref = this.$refs[name || 'manager'];
  if (key === 3) {
    ref.page.current = 1;
  }
  ref.emitManagerHandler(key, {
    params,
    isBatch,
    unFresh: key == 3 || unFresh,
  })
}

// 操作确认
function sure(handler, title, content) {
  this.$Modal.confirm({
    title: title || '删除确认',
    content: content || '是否确定执行当前删除操作',
    onOk: () => {
      handler();
    }
  })
}

// 用于 modal util  隐藏后需 清空 entity
const reset = (o) => {
  Object.keys(o).forEach(key => {
    if (Array.isArray(o[key])) {
      o[key] = [];
    } else if (typeof o[key] == 'object' && o[key] !== null) {
      reset(o[key]);
    } else {
      o[key] = null;
    }
  })
};

const filter = (obj) => {
  obj = obj || {};
  const o = {};
  Object.keys(obj).forEach(key => {
    const v = obj[key];
    if (v !== null && v !== undefined && v !== '') {
      o[key] = v;
    }
  });
  return o;
};

export default {
  mgr,
  reset,
  statusRender,
  imgRender,
  sure,
  filter,
  getDateTime
}
