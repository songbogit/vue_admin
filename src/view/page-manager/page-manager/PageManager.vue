<template>
  <Card>
    <div>
      <SearchItem>页面名称：<Input placeholder="页面名称" class="w200" v-model="searchData.name"/></SearchItem>
      <SearchItem>创建者：<Input placeholder="创建者" class="w200" v-model="searchData.created_username"/></SearchItem>
      <SearchItem>
        页面类型：
        <Select placeholder="请选择" class="w200" v-model="searchData.type">
          <Option :value="0">页面</Option>
          <Option :value="1">专题</Option>
        </Select>
      </SearchItem>
      <SearchItem><Button type="primary" icon="md-search" @click="search">查询</Button></SearchItem>
      <SearchItem><Button type="primary" @click="resetSearch">重置查询条件</Button></SearchItem>
    </div>
    <ManagerView ref="manager" :searchData="searchData" :columns="columns" @on-save="toggleAddPage" @on-success="managerSuccess" @on-error="managerError"></ManagerView>
    <ModalUtil ref="addPage" title="新建页面" :loading="loading" :labelWidth="100" @on-ok="checkAddPage" @reset="resetPageData">
      <!--<FormUtil :model="addPageData" :rules="addPageRule" :comp="addPageComp" @on-submit="submitAddPage"></FormUtil>-->
      <Form ref="fm" :label-width="100" :model="addPageData" :rules="addPageRule">
        <FormItem label="页面名称：">
          <Input placeholder="请输入页面名称" v-model="addPageData.instance_name"/>
        </FormItem>
        <FormItem label="关键字：">
          <Input placeholder="请输入关键字" v-model="addPageData.instance_keywords"/>
        </FormItem>
        <FormItem label="页面类型：">
          <RadioGroup v-model="addPageData.instance_type">
            <Radio :label="0">页面</Radio>
            <Radio :label="1">专题</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="模板：">
          <Checkbox v-model="addPageData.is_use_template">是否使用模板</Checkbox>
        </FormItem>
        <FormItem label="模板选择：" v-show="addPageData.is_use_template">
          <Select v-model="addPageData.template_id">
            <Option :value="item.id" v-for="(item, index) of templates" :key="'tp' + index">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="是否跳转：">
          <Checkbox v-model="addPageData.is_to_edit">保存后跳转到页面属性编辑</Checkbox>
        </FormItem>
      </Form>
    </ModalUtil>
  </Card>
</template>

<script>
  import {getDateTime} from "../../../libs/tools";
  import {pageList, addPage, pageTemplateList} from "../../../api/page_template";

  export default {
    name: "page-manager",
    data() {
      return {
        loading: false,
        searchData: {
          name: null,
          created_username: null,
          type: null
        },
        columns: [
          {
            type: 'selection',
            width: 40,
            align: 'center'
          },
          {
            title: 'ID',
            key: 'id',
            sortable: true,
            width: 80,
            align: 'center'
          },
          {
            title: '页面名称',
            key: 'name',
            align: 'center'
          },
          {
            title: '页面类型',
            key: 'type',
            align: 'center',
            width: 80
          },
          {
            title: '创建者',
            key: 'created_uid',
            align: 'center',
            width: 100
          },
          {
            title: '修改时间',
            key: 'createTime',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('span', getDateTime(params.row.create_time));
            }
          },
          {
            title: '状态',
            key: 'status',
            width: 80,
            align: 'center'
          },
          {
            title: '操作',
            key: 'action',
            width: 460,
            align: 'center',
            render: (h, params) => {
              const props = {size: 'small'};
              const classes = {'mr-5': true, 'cl-primary': true};
              return h('div', [
                h('Button', {
                  props: props,
                  class: classes,
                  on: {
                    click: () => {

                    }
                  }
                }, '静态地址'),
                h('Button', {
                  props: props,
                  class: classes,
                  on: {
                    click: () => {
                      const id = params.row.id;
                      this.$store.commit('setPageEditId', id);
                      localStorage.setItem('pageEditId', id);
                      this.$router.push('/page-template/page-edit');
                    }
                  }
                }, '页面管理'),
                h('Button', {
                  props: props,
                  class: classes,
                  on: {
                    click: () => {
                      console.log(params.row)
                      const id = params.row.id;
                      this.$store.commit('setContentEditId', id);
                      localStorage.setItem('contentEditId', id);
                      this.$router.push('/page-template/content-edit');
                    }
                  }
                }, '内容管理'),
                h('Button', {
                  props: props,
                  class: classes,
                  on: {
                    click: () => {

                    }
                  }
                }, '删除'),
                h('Button', {
                  props: props,
                  class: classes,
                  on: {
                    click: () => {

                    }
                  }
                }, '发布'),
                h('Button', {
                  props: props,
                  class: classes,
                  on: {
                    click: () => {

                    }
                  }
                }, '审核'),
                h('Button', {
                  props: props,
                  class: classes,
                  on: {
                    click: () => {

                    }
                  }
                }, '历史')
              ])
            }
          },
        ],
        addPageData: {
          is_use_template: false,
          template_id: null,
          instance_name: null,
          instance_type: null,
          instance_keywords: null,
          is_to_edit: false
        },
        addPageRule: {

        },
        templates: []
      }
    },
    methods: {
      search() {
        this.$refs['manager'].emitManagerHandler(3, {
          unFresh: true
        })
      },
      // 新建页面
      toggleAddPage() {
        this.$refs['addPage'].toggleShow();
      },
      checkAddPage() {
        // this.$refs['fm'].validate(valid => {
        //   if (valid) {
        //     const {is_use_template, template_id, instance_name, instance_type, instance_keywords} = this.addPageData;
        //
        //   }
        // })
        const {is_use_template, template_id, instance_name, instance_type, instance_keywords} = this.addPageData;
        this.loading = true;
        this.$refs['manager'].emitManagerHandler('save', {
          // unFresh: true,
          params: {
            is_use_template: is_use_template?'1':'0',
            template_id,
            instance_name,
            instance_keywords,
            instance_type
          }
        })
      },
      resetSearch() {
        this.searchData = {
          name: null,
          created_username: null,
          type: null
        };
      },
      resetPageData() {
        this.addPageData = {
          is_use_template: false,
          template_id: null,
          instance_name: null,
          instance_type: null,
          instance_keywords: null,
          is_to_edit: false
        };
      },
      managerSuccess(type, data) {
        this.loading = false;
        if (type == 'save') {
          this.toggleAddPage();
        }
      },
      managerError(type) {
        this.loading = false;
      }
    },
    provide() {
      return {
        handlers: {
          search: pageList,
          save: addPage
        }
      }
    },
    mounted() {
      pageTemplateList({}).then(res => {
        if (res.code == 200) {
          this.templates = res.data.list || [];
        }
      }).catch(res => {})
    }
  }
</script>

<style scoped>

</style>
