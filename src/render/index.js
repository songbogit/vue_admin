// 大图
function bigImage(h, data) {
  return h('img', {
    props: {
      'class': {
        block: true,
        w: true
      }
    },
    domProps: {
      src: data
    }
  })
}
