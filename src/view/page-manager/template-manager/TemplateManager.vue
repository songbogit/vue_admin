<template>
  <Card>
    <div>
      <span class="mr-10">模块名称：<Input class="w200" v-model="page.name" placeholder="模块名称"/></span>
      <Button class="mr-10" type="primary" icon="md-search" @click="getList">查询</Button>
      <Button class="mr-10" type="primary" @click="page.name = null">清除查询条件</Button>
      <Button class="mr-10" type="primary" icon="md-add" @click="showModal">新建模板</Button>
    </div>
    <div class="mt-20 clear borderB">
      <div class="item left border radius4 ivu-card-shadow mr-20 mb-20 relative" v-for="(item, index) of list" :key="index">
        <div class="item-icon center pd-10 borderB">
          <img :src="imgBaseUrl + item.thumb" class="item-img">
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
    <ModalUtil ref="create" title="创建模板" :loading="loading" @reset="resetCreateData" @on-ok="okHandler">
      <!--<FormUtil ref="createForm" :label-width="100" :model="createModel" :rules="createRule" :comp="createComp" @on-submit="submit"></FormUtil>-->
      <Form ref="form" :model="createModel" :rules="createRule" :label-width="100">
        <FormItem label="标题">
          <Input v-model="createModel.name"/>
        </FormItem>
        <FormItem label="展示图片">
          <MyUpload
            :upload-list="createModel.thumb"
            @on-success="handleSuccess"
            @on-remove="removeHandler"
            :format="['jpg','jpeg','png','svg']"
            type="drag"
          />
        </FormItem>
      </Form>
    </ModalUtil>
  </Card>
</template>

<script>
  import {imgBaseUrl} from "../../../config";
  import { pageTemplateList, createTemplate } from "../../../api/page_template";
  import MyUpload from '@/view/components/global-util/MyUpload';

  export default {
    name: "TemplateManager",
    components: {
      MyUpload
    },
    data() {
      return {
        imgBaseUrl: imgBaseUrl,
        page: {
          pageNum: 1,
          total: 0,
          pageSize: 10,
          name: null
        },
        list: [],
        createModel: {
          name: null,
          status: 0,
          thumb: [],
          // thumb: 'http://p2.img.cctvpic.com/oms/upload/image/20181019/CkYiPlvJjKGAKxOZAAF418jPZwE274.jpg'
        },
        loading: false,
        createRule: {
          // name: [
          //   { required: true, type: 'string', message: '请输入模板名称', trigger: 'blur' }
          // ],
          // thumb: [
          //   { required: true, type: 'array', message: '请选择模板示图', trigger: 'change' }
          // ]
        },
        createComp: [
          {compName: 'Input', label: '标题：', value: 'name', placeholder: '主标题'},
          {compName: 'upload', label: '展示图片：', value: 'thumb'},
        ]
      }
    },
    methods: {
      removeHandler(index) {
        this.createModel.thumb.splice(index, 1);
      },
      handleSuccess(res, file) {
        if (res.code == 200) {
          this.createModel.thumb.push(res.data);
        }
      },
      showModal() {
        this.$refs['create'].toggleShow();
      },
      okHandler() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.submit(this.createModel);
          }
        });
      },
      submit(entity) {
        const params = JSON.parse(JSON.stringify(entity));
        params.thumb = params.thumb[0];
        this.loading = true;
        createTemplate(params).then(res => {
          this.loading = false;
          if (res.code == 200) {
            this.showModal();
            this.getList();
          }
        }).catch(res => {
          this.loading = false;
        })
      },
      resetCreateData() {
        this.createModel = {
          name: null,
          status: 0,
          thumb: [],
        }
      },
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
        localStorage.setItem('templateEditId', id);
        this.$router.push('/page/template-edit');
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
