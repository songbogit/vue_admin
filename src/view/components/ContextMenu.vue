<template>
  <ul class="context-menu border radius4 ivu-card-shadow" v-show="isShow" :style="menuAxis">
    <li></li>
    <Button
      class="cursor menu-item center bgfff"
      v-for="(item, index) of menuList"
      :key="index"
      @click="emitHandler(item.handler)"
      type="text"
      :disabled="item.unable"
    >
      {{item.title}}
    </Button>
  </ul>
</template>

<script>
  export default {
    name: "ContextMenu",
    props: {
      // isShow: {
      //   type: Boolean,
      //   default: false
      // },
      axis: {
        type: Object,
        default() {
          return {
            x: 0,
            y: 0
          }
        }
      },
      menuList: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        isShow: false
      }
    },
    computed: {
      menuAxis() {
        let {x, y} = this.axis;
        return {
          left: x + 'px',
          top: y + 'px'
        }
      }
    },
    methods: {
      emitHandler(eventStr) {
        this.$emit(eventStr);
      }
    }
  }
</script>

<style scoped>
  .context-menu {
    position: fixed;
    width: 120px;
    z-index: 999;
    overflow: hidden;
  }
  .menu-item {
    border-radius: 0;
    width: 100%;
    height: 32px;
    display: block;
  }
  li {
    list-style: none;
  }
</style>
