<template>
  <Card>
    <div>
      <span class="mr-10">模块名称：<Input class="w200" v-model="page.name" placeholder="模块名称"/></span>
      <Button class="mr-10" type="primary" icon="md-search">查询</Button>
      <Button class="mr-10" type="primary">清除查询条件</Button>
      <Button class="mr-10" type="primary" icon="md-add">新建模板</Button>
    </div>
    <div class="mt-20 clear borderB">
      <div class="item left border radius4 ivu-card-shadow mr-20 mb-20 relative" v-for="(item, index) of list" :key="index">
        <div class="item-icon center pd-10 borderB">
          <img :src="item.thumb" class="item-img">
        </div>
        <div class="item-title bold nowrap pl-10 pr-10 cursor" title="点击编辑模板" @click="edit(item.id)">{{item.name}}</div>
        <Icon type="ios-trash" class="item-del hide cl-error" title="删除模块"/>
      </div>
    </div>
    <div class="t-right mt20">
      <Page :current="page.pageNum" :total="page.total" :page-size="page.pageSize"
            @on-change="pageChange" @on-page-size-change="pageSizeChange" :page-size-opts="[10,20,50]"
            size="small" show-total show-elevator show-sizer></Page>
    </div>
  </Card>
</template>

<script>
  import { pageTemplateList, getAllBlock } from "../../../api/page_template";

  export default {
    name: "TemplateManager",
    data() {
      return {
        page: {
          pageNum: 1,
          total: 0,
          pageSize: 10,
          name: null
        },
        list: []
      }
    },
    methods: {
      pageChange(pageNum) {
        this.page.pageNum = pageNum;
        this.getList();
      },
      pageSizeChange(pageSize) {
        this.page.pageSize = pageSize;
        this.getList();
      },
      getList() {
        const {name, pageNum, pageSize} = this.page;
        pageTemplateList({
          name,
          pageNum,
          pageSize
        }).then(res => {
          if (res.code == 200) {
            this.list = res.data.list || [];
            this.page.total = res.data.total || 0;
          }
        }).catch(res => {})
      },
      // 跳转模板编辑页面
      edit(id) {
        this.$store.commit('setTemplateEditId', id);
        sessionStorage.setItem('templateEditId', id);
        this.$router.push('/page-template/template-edit');
      }
    },
    created() {
      this.getList();
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
  .item-icon {
    height: 120px;
  }
  .item-img {
    width: 100%;
    height: 100%;
  }
</style>
