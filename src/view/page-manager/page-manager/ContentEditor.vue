<template>
  <Card style="background: #f5f7f9">
    <Row class="relative" style="padding-left: 360px;min-height: 720px;">
      <div class="content left bgfff">
        <!--<div class="module-title">大图</div>-->
        <!--<img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4127978443,3621625360&fm=111&gp=0.jpg" class="scroll-img">-->
        <!--<div class="module-title">横向直播模块</div>-->
        <!--<div class="list-lr clear">-->
          <!--<div class="list-lr-item" v-for="item of 6">-->
            <!--<div class="list-lr-item-state clear">-->
              <!--<div class="list-lr-item-state-info">直播中</div>-->
            <!--</div>-->
            <!--<div class="list-lr-item-title line2">小程序测试</div>-->
            <!--<div class="list-lr-item-dec line2">小程序作为2018年新产品，依赖于各大BAT的平台，自带流量，更少的成本获得更多的用户</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="module-title">横图横拉模块</div>-->
        <!--<div class="list-tb">-->
          <!--<Row>-->
            <!--<Col class="list-tb-item" span="8" v-for="item of 9">-->
              <!--<div class="list-tb-item-img">-->
                <!--<img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4127978443,3621625360&fm=111&gp=0.jpg">-->
              <!--</div>-->
              <!--<p class="list-tb-item-dec line">往事随风去，我愿乘风随。消逝了就成为往事。回不了头。</p>-->
            <!--</Col>-->
          <!--</Row>-->
        <!--</div>-->
        <!--模块列表，render显示内容，1：每个模块写对应render，2：数据库保存dom，jquery覆盖对应的字段-->
        <Collapse v-model="collapse" accordion>
          <Panel :name="'panel'+index" v-for="(item, index) of layouts" :key="">
            {{item.title}}
          </Panel>
        </Collapse>
      </div>
      <Col span="24" class="pl-20">
        <div class="bgfff pb-20">
          <div class="pd-15 borderB clear">
            <span class="pt-10 inline-block">模块数据内容</span>
            <span class="ml-40">[名称：大图/类型：轮播图模块]</span>
            <div class="right pr-30">
              <Button class="ml-15" icon="md-add" type="primary">新增内容</Button>
              <Button class="ml-15" icon="md-search" type="primary">从数据库中检索</Button>
              <Button class="ml-15" shape="circle" icon="ios-refresh"></Button>
              <Button class="ml-15" shape="circle" icon="ios-search"></Button>
            </div>
          </div>
          <div class="pl-15 pr-15">
            <Tabs type="card" class="mt-20">
              <TabPane label="模块">
                <Table :columns="module_col" :data="module_list" :show-header="false"></Table>
                <div class="t-right mt20">
                  <Page :current="modulePage.current" :total="modulePage.total" :page-size="modulePage.pageSize"
                        @on-change="pageChange" @on-page-size-change="pageSizeChange" :page-size-opts="[10,20]"
                        size="small" show-total show-elevator show-sizer></Page>
                </div>
              </TabPane>
              <TabPane label="关键字">
                <Table :columns="module_col" :data="module_list" :show-header="false"></Table>
                <div class="t-right mt20">
                  <Page :current="modulePage.current" :total="modulePage.total" :page-size="modulePage.pageSize"
                        @on-change="pageChange" @on-page-size-change="pageSizeChange" :page-size-opts="[10,20]"
                        size="small" show-total show-elevator show-sizer></Page>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Col>
    </Row>
    <ModalUtil ref="create" title="创建内容" :loading="loading">
      <FormUtil :model="createModel" :rules="createRule" :comp="createComp"></FormUtil>
    </ModalUtil>
    <ModalUtil ref="search" title="从数据库中检索" :width="800" :footerHide="true">
      <div>
        <SearchItem>搜索类型：<Input class="w150"/></SearchItem>
        <SearchItem>关键字：<Input class="w150"/></SearchItem>
        <SearchItem>GUID：<Input class="w150"/></SearchItem>
        <SearchItem>时间检索：<Checkbox>是</Checkbox></SearchItem>
      </div>
      <div>
        <SearchItem><Button type="primary">检索内容</Button></SearchItem>
        <SearchItem><Button type="primary">重置检索</Button></SearchItem>
        <SearchItem><Button type="primary">查看推荐内容</Button></SearchItem>
        <Table class="un-border" :columns="search_col" :data="search_list" :show-header="false"></Table>
        <Page class="mt10" :current="searchPage.current" :total="searchPage.total" :page-size="searchPage.pageSize"
              @on-change="pageChange" @on-page-size-change="pageSizeChange" :page-size-opts="[10,20]"
              size="small" show-total show-elevator show-sizer></Page>
      </div>
    </ModalUtil>
    <Spin fix v-if="showSpin">
      <Icon type="ios-loading" size=18 class="spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </Card>
</template>

<script>
  import { getBlockContent, getPageDetail } from "../../../api/page_template";

  export default {
    name: "ContentEditor",
    data() {
      return {
        layouts: [],
        showSpin: false,
        loading: false,
        module_col: [
          {
            type: 'selection',
            width: 40,
            align: 'center'
          },
          {
            render: (h, params) => {
              const props = {type: 'dashed', size: 'small'};
              const classes = {'mr-5': true};
              return h('div',{
                class: {
                  clear: true,
                  'mt-10': true,
                  'mb-10': true,
                  relative: true
                }
              },[
                h('img', {
                  class: {
                    left: true,
                    block: true,
                    'h60': true,
                    'w100': true,
                    'img-col': true
                  },
                  domProps: {
                    src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4127978443,3621625360&fm=111&gp=0.jpg'
                  }
                }),
                h('div', {
                  class: {
                    left: true,
                    ml10: true,
                    'content-col': true
                  }
                },[
                  h('p', {
                    class: {
                      bold: true,
                      fs14: true,
                      line: true,
                      'mb-5': true
                    }
                  }, '头条小程序预计明年中旬正式公测'),
                  h('p', {
                    class: {
                      'cl-dec': true,
                      'mb-5': true,
                      line2: true
                    }
                  }, '继微信、支付宝、百度后，头条正式宣布研发小程序，并已进入内测阶段，预计明年九月份正式公测，' +
                    '集抖音、头条等九大流量，更具宣传力。九大流量入口将使头条小程序的广告无处不在，让用户更容易发现。'),
                  h('div', [
                    h('Button', {
                      props: props,
                      class: classes
                    },'2018-11-20 18:53:11')
                  ])
                ])
              ])
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 120,
            align: 'center',
            render: (h, params) => {
              const props = {size: 'small'};
              const classes = {'mr-5': true};
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  class: classes,
                  on: {
                    click: () => {

                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  class: classes,
                  on: {
                    click: () => {

                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        modulePage: {
          current: 1,
          total: 0,
          pageSize: 10
        },
        module_list: [{}, {}],
        search_col: [
          {
            render: (h, params) => {
              const props = {type: 'dashed', size: 'small'};
              const classes = {'mr-5': true};
              return h('div',{
                class: {
                  clear: true,
                  'mt-10': true,
                  'mb-10': true,
                  relative: true
                }
              },[
                h('img', {
                  class: {
                    left: true,
                    block: true,
                    'h60': true,
                    'w100': true,
                    'img-col': true
                  },
                  domProps: {
                    src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4127978443,3621625360&fm=111&gp=0.jpg'
                  }
                }),
                h('div', {
                  class: {
                    left: true,
                    ml10: true,
                    'content-col': true
                  }
                },[
                  h('p', {
                    class: {
                      bold: true,
                      fs14: true,
                      line: true,
                      'mb-5': true
                    }
                  }, '头条小程序预计明年中旬正式公测'),
                  h('div', [
                    h('Button', {
                      props: props,
                      class: classes
                    },'2018-11-20 18:53:11')
                  ])
                ])
              ])
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 120,
            align: 'center',
            render: (h, params) => {
              const props = {size: 'small'};
              const classes = {'mr-5': true};
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  class: classes,
                  on: {
                    click: () => {

                    }
                  }
                }, '编辑')
              ])
            }
          }
        ],
        searchPage: {
          current: 1,
          total: 0,
          pageSize: 10
        },
        search_list: [{}, {}],
        createModel: {
          title: null,
          subTitle: null,
          desc: null,
          tags: null,
          type: [],
          img: [],
          leftTitle: null,
          role: 0,
          state: 1
        },
        createRule: {

        },
        createComp: [
          {compName: 'Input', label: '主标题：', value: 'title', placeholder: '主标题'},
          {compName: 'Input', label: '副标题：', value: 'subTitle', placeholder: '副标题'},
          {compName: 'Input', label: '简介：', value: 'desc', type: 'textarea', placeholder: '简介'},
          {compName: 'Input', label: '标签：', value: 'tags', placeholder: '请选择标签'},
          {compName: 'Select', label: '内容类型：', value: 'type', list: [], placeholder: '内容类型'},
          {compName: 'upload', label: '展示图片：', value: 'img'},
          {compName: 'Input', label: '左上角标文字：', value: 'leftTitle', placeholder: '左上角标文字'},
          {compName: 'RadioGroup', label: '浏览权限：', value: 'role', list: [{label: '所有用户', value: 0}, {label: '仅限会员', value: 1}]},
          {compName: 'RadioGroup', label: '硬件状态：', value: 'state', list: [{label: '发布', value: 0}, {label: '草稿', value: 1}]},
        ],
        contents: [], // 模块的内容
        keyWords: [], // 模块关键字
        collapse: 'panel0',
        allContents: [], // 查询到的内容
      }
    },
    computed: {
      editId() {
        return Number(this.$store.state.page.editContentId);
      }
    },
    methods: {
      pageChange(current) {

      },
      pageSizeChange(pageSize) {

      },
      // 获取页面模块内容
      getBlockContent() {
        this.showSpin = true;
        getBlockContent({
          id: this.editId
        }).then(res => {
          this.showSpin = false;
        }).catch(res => {
          this.showSpin = false;
        })
      },
      //  获取页面模块
      getPageDetail() {
        this.showSpin = true;
        getPageDetail({}, this.editId).then(res => {
          this.showSpin = false;
          if (res.code == 200) {
            const data = res.data;
            this.layouts = data.ConfigsList || [];
          }
        }).catch(res => {
          this.showSpin = false
        })
      },
    },
    mounted() {
      this.$refs['create'].toggleShow();
    },
    created() {
      if (!this.editId) {
        this.$Message.error('页面内容编辑缓存id丢失，请重新选择页面');
      } else {
        this.getPageDetail();
      }
    }
  }
</script>

<style scoped>
  .content {
    width: 360px;
    height: 720px;
    overflow-x: hidden;
    overflow-y: auto;
    position: absolute;
    left: 0;
  }
  .spin-icon-load{
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
</style>
