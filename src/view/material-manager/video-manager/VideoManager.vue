<template>
  <Card>
    <div>
      <SearchItem>标题：<Input placeholder="请输入标题" class="w200"/></SearchItem>
      <DateUtil title="发布时间：" :startTime="searchData.createTimeStart" :endTime="searchData.createTimeEnd" @change="change"></DateUtil>
      <SearchItem>
        部门：
        <Select placeholder="请选择" class="w200"></Select>
      </SearchItem>
      <SearchItem><Checkbox>查看已删除</Checkbox></SearchItem>
      <SearchItem><Button type="primary" icon="md-search" @click="search">查询</Button></SearchItem>
      <SearchItem><Button type="primary" @click="resetSearch">重置查询条件</Button></SearchItem>
      <ManagerView ref="manager" :save="save" :del="false" :searchData="searchData" :columns="columns" @on-success="managerSuccess" @on-error="managerError"></ManagerView>
    </div>
  </Card>
</template>

<script>
  import {getDateTime} from "../../../libs/tools";

  export default {
    name: "VideoManager",
    data() {
      return {
        save: {
          save: true,
          modal: false
        },
        loading: false,
        searchData: { // 查询条件
          createTimeStart: null,
          createTimeEnd: null,
          itemId: null,
          category: null,
          isShow: null
        },
        columns: [
          {
            title: '序号',
            key: 'id',
            sortable: true,
            width: 80
          },
          {
            title: '标题',
            key: 'tradeId',
          },
          {
            title: 'GUID',
            key: 'tradeId',
            align: 'center',
            render: (h, params) => {
              return h('Button', {
                props: {
                  size: 'small',
                  type: 'primary'
                },
                on: {
                  click: () => {

                  }
                }
              }, '复制')
            }
          },
          {
            title: '一级分类',
            key: 'numIid',
          },
          {
            title: '二级分类',
            key: 'phone',
          },
          {
            title: '三级分类',
            key: 'phone',
          },
          {
            title: '媒体号',
            key: 'phone',
          },
          {
            title: '所属部门',
            key: 'phone',
          },
          {
            title: '发布时间',
            key: 'createTime',
            render: (h, params) => {
              return h('span', getDateTime(params.row.createTime));
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 160,
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
                }, '推荐'),
                h('Button', {
                  props: props,
                  class: classes,
                  on: {
                    click: () => {

                    }
                  }
                }, '编目')
              ])
            }
          },
        ],
      }
    },
    methods: {
      search() {

      },
      resetSearch() {

      },
      change(start, end) {
        this.searchData.createTimeStart = start;
        this.searchData.createTimeEnd = end;
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
    }
  }
</script>

<style scoped>

</style>
