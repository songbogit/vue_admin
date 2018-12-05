<template>
  <Card>
    <div>
      <SearchItem>页面名称：<Input placeholder="页面名称" class="w200"/></SearchItem>
      <SearchItem>创建者：<Input placeholder="创建者" class="w200"/></SearchItem>
      <SearchItem>
        页面类型：
        <Select placeholder="请选择" class="w200"></Select>
      </SearchItem>
      <SearchItem><Button type="primary" icon="md-search" @click="search">查询</Button></SearchItem>
      <SearchItem><Button type="primary" @click="resetSearch">重置查询条件</Button></SearchItem>
    </div>
    <ManagerView ref="manager" :searchData="searchData" :columns="columns" @on-save="toggleAddPage" @on-success="managerSuccess" @on-error="managerError"></ManagerView>
    <ModalUtil ref="addPage" title="新建页面" :labelWidth="100" @on-ok="checkAddPage" @reset="resetPageData">
      <FormUtil :model="addPageData" :rules="addPageRule" :comp="addPageComp" @on-submit="submitAddPage"></FormUtil>
    </ModalUtil>
  </Card>
</template>

<script>
  import {getDateTime} from "../../../libs/tools";

  export default {
    name: "PageManager",
    data() {
      return {
        searchData: {

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
            key: 'tradeId'
          },
          {
            title: '页面类型',
            key: 'itemTitle',
            align: 'center',
            width: 120
          },
          {
            title: '创建者',
            key: 'numIid',
            align: 'center',
            width: 120
          },
          {
            title: '修改时间',
            key: 'createTime',
            width: 180,
            align: 'center',
            render: (h, params) => {
              return h('span', getDateTime(params.row.createTime));
            }
          },
          {
            title: '状态',
            key: 'phone',
            width: 120,
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

                    }
                  }
                }, '页面管理'),
                h('Button', {
                  props: props,
                  class: classes,
                  on: {
                    click: () => {

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
          name: null,
          key: null,
          type: null,
          useable: false,
          linkable: false
        },
        addPageRule: {

        },
        addPageComp: [
          {compName: 'Input', label: '页面名称', value: 'name', placeholder: '请输入页面名称'},
          {compName: 'Input', label: '关键字', value: 'key', placeholder: '请输入关键字'},
          {compName: 'RadioGroup', label: '页面类型', value: 'type', list:[{label: '页面', value: '0'},{label: '名称', value: '1'}]},
          {compName: 'Checkbox', label: '是否使用模板', value: 'useable', placeholder: '请输入页面名称'},
          {compName: 'Checkbox', label: '保存后跳转到页面属性编辑', value: 'false', placeholder: '请输入页面名称'},
        ]
      }
    },
    methods: {
      search() {

      },
      resetSearch() {

      },
      // 新建页面
      toggleAddPage() {
        this.$refs['addPage'].toggleShow();
      },
      checkAddPage() {

      },
      submitAddPage() {

      },
      resetPageData() {

      },
      managerSuccess(type, data) {

      },
      managerError(type) {

      }
    },
    provide() {
      return {
        handlers: {

        }
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>
