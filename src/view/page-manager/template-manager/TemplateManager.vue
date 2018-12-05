<template>
  <Card>
    <div>
      <span class="mr-10">模块名称：<Input class="w200" placeholder="模块名称"/></span>
      <Button class="mr-10" type="primary" icon="md-search">查询</Button>
      <Button class="mr-10" type="primary">清除查询条件</Button>
      <Button class="mr-10" type="primary" icon="md-add">新建模板</Button>
    </div>
    <div class="mt-20 clear borderB">
      <div class="item left border radius4 ivu-card-shadow mr-20 mb-20 cursor relative" v-for="item in 10">
        <div class="item-icon center pt-10 pb-10 borderB">
          <Icon type="ios-list-box" class="fs-icon cl-icon"/>
        </div>
        <div class="item-title bold nowrap pl-10 pr-10">头条小程序正式公测</div>
        <Icon type="ios-trash" class="item-del hide cl-error"/>
      </div>
    </div>
    <div class="t-right mt20">
      <Page :current="page.current" :total="page.total" :page-size="page.pageSize"
            @on-change="pageChange" @on-page-size-change="pageSizeChange" :page-size-opts="[10,20,50]"
            size="small" show-total show-elevator show-sizer></Page>
    </div>
  </Card>
</template>

<script>
  export default {
    name: "TemplateManager",
    data() {
      return {
        page: {
          current: 1,
          total: 0,
          pageSize: 10
        }
      }
    },
    methods: {
      pageChange(current) {

      },
      pageSizeChange(pageSize) {

      }
    }
  }
</script>

<style scoped>
  .item {
    width: 180px;
  }
  .item-title {
    height: 32px;
    line-height: 32px;
  }
  .item-del {
    position: absolute;
    top: 5px;
    right: 0;
    font-size: 40px;
    z-index: 2;
  }
  .item:hover .item-del {
    display: inline-block;
  }
</style>
