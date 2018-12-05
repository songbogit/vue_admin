<template>
  <Card>
    <div>
      <div>
        <SearchItem>标题：<Input placeholder="请输入标题" class="w200"/></SearchItem>
        <SearchItem>
          <span>入库时间：</span>
          <DatePicker type="datetime" placeholder="开始时间" v-model="searchData.createTimeStart" @on-change="startTimeChange" :options="startTimeOptions"></DatePicker>
          <span class="mlr5">-</span>
          <DatePicker type="datetime" placeholder="结束时间" v-model="searchData.createTimeEnd" @on-change="endTimeChange" :options="endTimeOptions"></DatePicker>
        </SearchItem>
        <DateUtil title="发布时间：" :startTime="searchData.createTimeStart" :endTime="searchData.createTimeEnd" @change="change"></DateUtil>
      </div>
      <div>
        <SearchItem>
          部门：
          <Select placeholder="请选择" class="w200"></Select>
        </SearchItem>
        <SearchItem><Checkbox>查看已订阅</Checkbox></SearchItem>
        <SearchItem><Checkbox>查看已删除</Checkbox></SearchItem>
        <SearchItem><Checkbox>查看已下架</Checkbox></SearchItem>
        <SearchItem><Button type="primary" icon="md-search" @click="search">查询</Button></SearchItem>
        <SearchItem><Button type="primary" @click="resetSearch">重置查询条件</Button></SearchItem>
      </div>
      <ManagerView ref="manager" :save="save" :del="false" :searchData="searchData" :columns="columns" @on-success="managerSuccess" @on-error="managerError"></ManagerView>
    </div>
  </Card>
</template>

<script>
  import {getDateTime} from "../../../libs/tools";

  export default {
    name: "VideogroupManager",
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
            title: '视频集名称',
            key: 'tradeId',
          },
          {
            title: '视频集ID',
            key: 'itemTitle',
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
            width: 250,
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
                }, '编目'),
                h('Button', {
                  props: props,
                  class: classes,
                  on: {
                    click: () => {

                    }
                  }
                }, '挑选'),
                h('Button', {
                  props: props,
                  class: classes,
                  on: {
                    click: () => {

                    }
                  }
                }, '订阅')
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
