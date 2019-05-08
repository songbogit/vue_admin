export default {
  methods: {
    mgrSearch() {
      this.$mgr(3);
    },
    reset(params, name) {
      this.$reset(params || this.searchData);
      // name 为表单 ref 若存在，重置验证
      if (!!name) {
        this.$refs[name].resetFields();
      }
    },
    toggle(key, flag) {
      this.$refs[key].toggleShow(flag);
    },
  },
  computed: {
    filter() {
      const obj = this.searchParams || this.searchData;
      return this.$filter(obj);
    }
  }
}
