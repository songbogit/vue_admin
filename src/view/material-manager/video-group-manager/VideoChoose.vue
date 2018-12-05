<template>
  <Card>
    <div class="borderB pb-10">
      <SearchItem>视频名称： <Input class="w200"/></SearchItem>
      <SearchItem>
        分类：
        <Select class="w200" placeholder="请选择"></Select>
      </SearchItem>
      <DateUtil title="发布时间：" :startTime="selectedSearch.createTimeStart" :endTime="selectedSearch.createTimeEnd" @change="changeSelect"></DateUtil>
      <SearchItem><Checkbox>查看本部门</Checkbox></SearchItem>
      <SearchItem><Button type="primary" icon="md-search" @click="searchSelect">查询</Button></SearchItem>
      <SearchItem><Button type="primary" @click="resetSelect">重置查询条件</Button></SearchItem>
      <ManagerView ref="selected" :save="null" :del="false" :searchData="selectedSearch" :columns="columns_selected">
        <p class="bold">已选视频</p>
      </ManagerView>
    </div>
    <div class="mt-20">
      <SearchItem>视频名称： <Input class="w200"/></SearchItem>
      <SearchItem>
        分类：
        <Select class="w200" placeholder="请选择"></Select>
      </SearchItem>
      <DateUtil title="发布时间：" :startTime="waitSearch.createTimeStart" :endTime="waitSearch.createTimeEnd" @change="changeWait"></DateUtil>
      <SearchItem><Checkbox>查看本部门</Checkbox></SearchItem>
      <SearchItem><Button type="primary" icon="md-search" @click="searchWait">查询</Button></SearchItem>
      <SearchItem><Button type="primary" @click="resetWati">重置查询条件</Button></SearchItem>
      <ManagerView ref="wait" :save="null" :del="false" :searchData="waitSearch" :columns="columns_wait">
        <p class="bold">待选视频</p>
      </ManagerView>
    </div>
  </Card>
</template>

<script>
  import ManagerView from '@/view/components/global-util/ManagerView';
  import SearchItem from '@/view/components/global-util/SearchItem';
  import DateUtil from '@/view/components/global-util/DateUtil';
  import {getDateTime} from "../../../libs/tools";
  export default {
    name: "VideoChoose",
    components: {
      ManagerView,
      SearchItem,
      DateUtil
    },
    data() {
      return {
        selectedSearch: {
          createTimeStart: null,
          createTimeEnd: null,
        },
        waitSearch: {
          createTimeStart: null,
          createTimeEnd: null,
        },
        columns_selected: [
          {
            title: '视频名称',
            key: 'id',
            align: 'center'
          },
          {
            title: '缩略图',
            key: 'tradeId',
            width: 120,
            align: 'center'
          },
          {
            title: '分类',
            key: 'numIid',
            width: 120,
            align: 'center'
          },
          {
            title: '所属部门',
            key: 'phone',
            width: 120,
            align: 'center'
          },
          {
            title: '入库时间',
            key: 'createTime',
            width: 180,
            align: 'center',
            render: (h, params) => {
              return h('span', getDateTime(params.row.createTime));
            }
          },
          {
            title: '排序',
            key: 'action',
            width: 220,
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
                }, '置顶'),
                h('Button', {
                  props: props,
                  class: classes,
                  on: {
                    click: () => {

                    }
                  }
                }, '位置上移'),
                h('Button', {
                  props: props,
                  class: classes,
                  on: {
                    click: () => {

                    }
                  }
                }, '位置下移')
              ])
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 130,
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
                }, '编目'),
                h('Button', {
                  props: props,
                  class: classes,
                  on: {
                    click: () => {

                    }
                  }
                }, '取消')
              ])
            }
          },
        ],
        columns_wait: [
          {
            title: '视频名称',
            key: 'id',
            align: 'center'
          },
          {
            title: '缩略图',
            key: 'tradeId',
            width: 120,
            align: 'center'
          },
          {
            title: '分类',
            key: 'numIid',
            width: 120,
            align: 'center'
          },
          {
            title: '所属部门',
            key: 'phone',
            width: 120,
            align: 'center'
          },
          {
            title: '入库时间',
            key: 'createTime',
            width: 180,
            align: 'center',
            render: (h, params) => {
              return h('span', getDateTime(params.row.createTime));
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 130,
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
                }, '编目'),
                h('Button', {
                  props: props,
                  class: classes,
                  on: {
                    click: () => {

                    }
                  }
                }, '添加')
              ])
            }
          },
        ],
      }
    },
    methods: {
      changeSelect() {

      },
      changeWait() {

      },
      resetSelect() {

      },
      resetWati() {

      },
      searchSelect() {

      },
      searchWait() {

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
