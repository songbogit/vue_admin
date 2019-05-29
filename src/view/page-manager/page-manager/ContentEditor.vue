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
          <Panel :name="(index + 1).toString()" v-for="(item, index) of layouts" :key="'panel' + index">
            <Button type="text" size="small" :ref="'pbtn'+index">{{item.title}}</Button>
            <div slot="content" class="cursor" @click="checkBlockHandler(item.id, item.title)">
              <div v-if="item.items && item.items.length">

              </div>
              <div class="center pt-20 pb-20" v-else>
                该模块没有内容
              </div>
            </div>
          </Panel>
        </Collapse>
      </div>
      <Col span="24" class="pl-20">
        <div class="bgfff pb-20" v-if="checkBlockId!==null">
          <div class="pd-15 borderB clear">
            <span class="pt-10 inline-block">模块数据内容</span>
            <span class="ml-40">[名称：{{checkBlockTitle}}]</span>
            <div class="right pr-30">
              <Button class="ml-15" icon="md-add" type="primary" @click="showAddContent">新增内容</Button>
              <Button class="ml-15" icon="md-search" type="primary">从数据库中检索</Button>
              <Button class="ml-15" shape="circle" icon="ios-refresh" @click="getBlockContents(stype)"></Button>
              <!--<Button class="ml-15" shape="circle" icon="ios-search"></Button>-->
            </div>
          </div>
          <div class="pl-15 pr-15">
            <Tabs type="card" class="mt-20" v-model="stype">
              <TabPane label="内容(可拖拽排序)" name="0">
                <!--<Table :columns="content_col" :data="content_list" :show-header="true"></Table>-->
                <div v-if="content_list.length" class="borderB">
                  <Row>
                    <Col class="center" span="4">是否为草稿</Col>
                    <Col class="center" span="12">详情</Col>
                    <Col class="center" span="8">操作</Col>
                  </Row>
                  <Row
                    class="drag-item"
                    v-for="content in content_list" v-dragging ="{ item: content, list: content_list, group: 'content' }"
                    :key="content.id"
                  >
                    <Col span="4" class="center mt-35">
                      <Checkbox v-model="content.is_draft == 1" @on-change="content.is_draft = content.is_draft?0:1"></Checkbox>
                    </Col>
                    <Col span="12">
                      <div class="clear mt-10 mb-10 relative">
                        <img :src="imgBaseUrl + content.image" class="left block h60 w100 img-col">
                        <div class="left ml-10 content-col" style="width: 100%;">
                          <p class="bold fs14 line mb-5">{{content.title}}</p>
                          <p class="cl-dec mb-5 line2">{{content.description}}</p>
                          <div>
                            <Button type="dashed" size="small" class="mr-5">{{content.update_datetime}}</Button>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col span="8" class="center mt-35">
                      <Button type="primary" class="mr-5" @click="getContentDetail(content.id)">编辑</Button>
                      <Button type="error" class="mr-5" @click="deleteContentById(content.id)">删除</Button>
                    </Col>
                  </Row>
                </div>
                <div v-if="!content_list.length" class="border middle h60">暂时没有数据</div>
                <div class="t-right mt20">
                  <Page :current="content_page.pageNum" :total="content_page.total" :page-size="content_page.pageSize"
                        @on-change="contentPageChange" @on-page-size-change="contentPageSizeChange" :page-size-opts="[10,20]"
                        size="small" show-total show-elevator show-sizer></Page>
                </div>
                <div class="mt10">
                  <Button type="primary" @click="saveContents">保存状态</Button>
                  <Button type="primary" class="ml-10" @click="sortContentList">保存排序</Button>
                </div>
              </TabPane>
              <TabPane label="关键字(可拖拽排序)" name="1">
                <!--<Table :columns="keyword_col" :data="keyword_list" :show-header="true"></Table>-->
                <div v-if="keyword_list.length" class="borderB">
                  <Row class="drag-item">
                    <Col class="center" span="4">是否为草稿</Col>
                    <Col class="center" span="12">详情</Col>
                    <Col class="center" span="8">操作</Col>
                  </Row>
                  <Row
                    class="drag-item"
                    v-for="keyword in keyword_list" v-dragging ="{ item: keyword, list: keyword_list, group: 'keyword' }"
                    :key="keyword.id"
                  >
                    <Col span="4" class="center mt-35">
                      <Checkbox v-model="keyword.is_draft == 1" @on-change="keyword.is_draft = keyword.is_draft?0:1"></Checkbox>
                    </Col>
                    <Col span="12">
                      <div class="clear mt-10 mb-10 relative">
                        <img :src="imgBaseUrl + keyword.image" class="left block h60 w100 img-col">
                        <div class="left ml-10 content-col">
                          <p class="bold fs14 line mb-5">{{keyword.title}}</p>
                          <p class="cl-dec mb-5 line2">{{keyword.description}}</p>
                          <div>
                            <Button type="dashed" size="small" class="mr-5">{{keyword.update_datetime}}</Button>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col span="8" class="center mt-35">
                      <Button type="primary" class="mr-5" @click="getContentDetail(keyword.id)">编辑</Button>
                      <Button type="error" class="mr-5" @click="deleteContentById(keyword.id)">删除</Button>
                    </Col>
                  </Row>
                </div>
                <div v-if="!keyword_list.length" class="border middle h60">暂时没有数据</div>
                <div class="t-right mt20">
                  <Page :current="keyword_page.pageNum" :total="keyword_page.total" :page-size="keyword_page.pageSize"
                        @on-change="keyPageChange" @on-page-size-change="keyPageSizeChange" :page-size-opts="[10,20]"
                        size="small" show-total show-elevator show-sizer></Page>
                </div>
                <div class="mt10">
                  <Button type="primary" @click="saveContents">保存状态</Button>
                  <Button type="primary" class="ml-10" @click="sortContentList">保存排序</Button>
                </div>
              </TabPane>
            </Tabs>
            <Spin fix v-if="showRightSpin">
              <Icon type="ios-loading" size=18 class="spin-icon-load"></Icon>
              <div>Loading</div>
            </Spin>
          </div>
        </div>
        <div v-else class="center bgfff pt-30 pb-30">请选择点击左侧模块内容区域查看模块详情</div>
      </Col>
    </Row>
    <ModalUtil ref="create" :title="createModel.id?'编辑':'创建'" :loading="loading" @on-ok="okHandler" @reset="resetAddContent">
      <!--<FormUtil ref="createModel" :model="createModel" :rules="createRule" :comp="createComp" @on-submit="createSubmit"></FormUtil>-->
      <Form ref="form" :model="createModel" :rules="createRule" :label-width="100">
        <FormItem label="标题">
          <Input v-model="createModel.title"/>
        </FormItem>
        <FormItem label="副标题">
          <Input v-model="createModel.sub_title"/>
        </FormItem>
        <FormItem label="简介">
          <Input v-model="createModel.description" type="textarea" :rows="2"/>
        </FormItem>
        <FormItem label="标签">
          <Select></Select>
        </FormItem>
        <FormItem label="展示图片">
          <MyUpload
            :upload-list="createModel.image"
            @on-success="handleSuccess"
            @on-remove="removeHandler"
            :format="['jpg','jpeg','png','svg']"
            type="drag"
          />
        </FormItem>
        <FormItem label="左上角文字">
          <Input v-model="createModel.imgmark_lt_text"/>
        </FormItem>
        <FormItem label="浏览权限">
          <RadioGroup v-model="createModel.permission">
            <Radio :label="0">所有用户</Radio>
            <Radio :label="1">仅限会员</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="内容状态">
          <RadioGroup v-model="createModel.is_draft">
            <Radio :label="0">发布</Radio>
            <Radio :label="1">草稿</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
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
        <Page class="mt10" :current="search_page.pageNum" :total="search_page.total" :page-size="search_page.pageSize"
              @on-change="searchPageChange" @on-page-size-change="searchPageSizeChange" :page-size-opts="[10,20]"
              size="small" show-total show-elevator show-sizer></Page>
      </div>
    </ModalUtil>
    <Spin fix v-if="showSpin">
      <Icon type="ios-loading" size=18 class="spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <!--<div class="color-list">-->
      <!--<div-->
        <!--class="color-item"-->
        <!--v-for="color in colors" v-dragging="{ item: color, list: colors, group: 'color' }"-->
        <!--:key="color.text"-->
      <!--&gt;{{color.text}}</div>-->
    <!--</div>-->

  </Card>
</template>

<script>
  import {
    getBlockContentDetail, getPageDetail, getContentList,
    addBlockContent, saveConentStatus, deleteBlockContent,
    updateBlockContent, sortContentList
  } from "../../../api/page_template";
  import {imgBaseUrl} from "../../../config";
  import MyUpload from '@/view/components/global-util/MyUpload';

  export default {
    name: "ContentEdit",
    components: {
      MyUpload
    },
    data() {
      return {
        imgBaseUrl: imgBaseUrl,
        showSpin: false,
        showRightSpin: false,
        loading: false,
        // 内容检索数据
        search_col: [
          {
            title: '是否为草稿',
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('Checkbox', {
                props: {
                  value: params.row.checked
                },
                on: {
                  'on-change': (event) => {
                    this.keyword_list[event.index].checked = !this.keyword_list[event.index].checked;
                  }
                }
              })
            }
          },
          {
            title: '详情',
            render: (h, params) => {
              const props = {type: 'dashed', size: 'small'};
              const {image, description, title, update_datetime} = params.row;
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
                    src: imgBaseUrl + image
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
                  }, title),
                  h('p', {
                    class: {
                      'cl-dec': true,
                      'mb-5': true,
                      line2: true
                    }
                  }, description),
                  h('div', [
                    h('Button', {
                      props: props,
                      class: classes
                    }, update_datetime)
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
                      this.getContentDetail(params.row.id);
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
                      this.deleteContentById(params.row.id);
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        search_page: {
          pageNum: 1,
          total: 0,
          pageSize: 10
        },
        search_list: [],
        // 模块关键字数据
        keyword_page: {
          pageNum: 1,
          total: 0,
          pageSize: 10
        },
        keyword_list: [],
        // 模块内容数据
        content_page: {
          pageNum: 1,
          total: 0,
          pageSize: 10
        },
        content_list: [],
        // 创建内容数据
        createModel: {
          title: null,
          sub_title: null,
          description: null,
          tags: null,
          image: [],
          image_cdn: '',
          permission: 0,
          vtype: 1,
          ad_id: "",
          author: "",
          configid: null,
          imgmark_lb_text: "",
          imgmark_lt_text: "",
          imgmark_rb_text: "",
          imgmark_rt_text: "",
          instanceid: 0,
          is_ad: 0,
          is_draft: 0, // 内容状态 0为草稿
          is_publish: 0,
          is_top: 0,
          meta: {},
          // publish_datetime: null,
          sort: 0,
          source: "",
          top_deadline: "",
          url: "",
          video_length: "",
        },
        entity: {
          ad_id: "",
          author: "",
          configid: 0,
          description: "",
          image: "",
          image_cdn: "",
          imgmark_lb_text: "",
          imgmark_lt_text: "",
          imgmark_rb_text: "",
          imgmark_rt_text: "",
          instanceid: 0,
          is_ad: 0,
          is_draft: 0,
          is_publish: 0,
          is_top: 0,
          meta: {},
          permission: 0,
          publish_datetime: null,
          sort: 0,
          source: "",
          sub_title: "",
          tags: "",
          title: "",
          top_deadline: "",
          url: "string",
          video_length: "",
          vtype: 0
        },
        createRule: {

        },
        createComp: [
          {compName: 'Input', label: '主标题：', value: 'title', placeholder: '主标题'},
          {compName: 'Input', label: '副标题：', value: 'sub_title', placeholder: '副标题'},
          {compName: 'Input', label: '简介：', value: 'description', type: 'textarea', placeholder: '简介'},
          {compName: 'Select', label: '标签：', value: 'tags', mutiple: true, list:[], placeholder: '请选择标签'},
          {compName: 'upload', label: '展示图片：', value: 'image'},
          {compName: 'Input', label: '左上角标文字：', value: 'imgmark_lt_text', placeholder: '左上角标文字'},
          {compName: 'RadioGroup', label: '浏览权限：', value: 'permission', list: [{label: '所有用户', value: 0}, {label: '仅限会员', value: 1}]},
          {compName: 'RadioGroup', label: '内容状态：', value: 'is_draft', list: [{label: '发布', value: 0}, {label: '草稿', value: 1}]},
        ],
        collapse: ['1'],
        contents: [], // 模块的内容
        keyWords: [], // 模块关键字
        allContents: [], // 查询到的内容
        checkBlockId: null, // 选中的模块id
        checkBlockTitle: null, // 选中的模块title
        layouts: [],
        stype: '0',
        colors: [{
          text: "Aquamarine"
        },  {
          text: "Skyblue"
        }, {
          text: "Burlywood"
        }]
      }
    },
    computed: {
      editId() {
        return Number(this.$store.state.page.editContentId);
      },
    },
    methods: {
      removeHandler(index) {
        this.createModel.image.splice(index, 1);
      },
      handleSuccess(res, file) {
        if (res.code == 200) {
          this.createModel.image.push(res.data);
        }
      },
      showAddContent() {
        this.$refs['create'].toggleShow();
      },
      resetAddContent() {
        this.createModel = {
          title: null,
          sub_title: null,
          description: null,
          tags: null,
          image: [],
          image_cdn: '',
          permission: 0,
          vtype: 1,
          ad_id: "",
          author: "",
          configid: 0,
          imgmark_lb_text: "",
          imgmark_lt_text: "",
          imgmark_rb_text: "",
          imgmark_rt_text: "",
          instanceid: 0,
          is_ad: 0,
          is_draft: 0,
          is_publish: 0,
          is_top: 0,
          meta: {},
          // publish_datetime: null,
          sort: 0,
          source: "",
          top_deadline: "",
          url: "string",
          video_length: "",
        }
      },
      checkBlockHandler(id, title) {
        if (id != this.checkBlockId) {
          this.checkBlockId = id;
          this.checkBlockTitle = title;
        }
      },
      // 排序
      sortContentList() {
        const list = this.stype == 0 ? this.content_list : this.keyword_list;
        const sortStr = list.map(item => item.id).join(',');
        this.showRightSpin = true;
        sortContentList({
          sortStr
        }).then(res => {
          this.showRightSpin = false;
        }).catch(res => {
          this.showRightSpin = false;
        })
      },
      // 删除
      deleteContentById(id) {
        this.showRightSpin = true;
        deleteBlockContent({id}).then(res => {
          this.showRightSpin = false;
          if (res.code == 200) {
            this.getBlockContents(this.stype);
          }
        }).catch(res => {
          this.showRightSpin = false;
        })
      },
      // 获取模块详情
      getContentDetail(id) {
        this.showRightSpin = true;
        getBlockContentDetail({id}).then(res => {
          this.showRightSpin = false;
          if (res.code == 200) {
            const data = res.data;
            data.image = data.image?[data.image]:[];
            delete data.publish_datetime;
            delete data.update_datetime;
            this.createModel = data;
            this.showAddContent();
          }
        }).catch(res => {
          this.showRightSpin = false;
        })
      },
      // 模块内容分页
      contentPageChange(current) {
        this.content_page.pageNum = current;
        this.getBlockContents(0);
      },
      contentPageSizeChange(pageSize) {
        this.content_page.pageSize = pageSize;
        this.getBlockContents(0);
      },
      // 模块关键字分页
      keyPageChange(current) {
        this.keyword_page.pageNum = current;
        this.getBlockContents(1);
      },
      keyPageSizeChange(pageSize) {
        this.keyword_page.pageSize = pageSize;
        this.getBlockContents(1);
      },
      // 内容检索分页
      searchPageChange(current) {

      },
      searchPageSizeChange(pageSize) {

      },
      // 保存模块内容
      saveContents() {
        const list = this.stype == 0? this.content_list : this.keyword_list;
        const params = {};
        list.forEach(item => {
          params[item.id.toString()] = item.is_draft;
        })
        this.showRightSpin = true;
        saveConentStatus(params).then(res => {
          this.showRightSpin = false;
          if (res.code == 200) {
            // this.getBlockContents(this.stype);
          }
        }).catch(res => {
          this.showRightSpin = false;
        })
      },
      // 获取模块的所有内容和关键字
      getBlockContents(stype) {
        const {pageNum, pageSize} = stype==0?this.content_page:this.keyword_page
        this.showRightSpin = true;
        getContentList({
          stype: stype,
          pageNum: pageNum,
          pageSize: pageSize,
          config_id: this.checkBlockId
        }).then(res => {
          this.showRightSpin = false;
          if (res.code == 200) {
            const data = res.data
            const {list} = data || {};
            const contentList = list? list.list||[]:[];
            if (stype == 0) {
              this.content_list = contentList;
              this.content_page.total = list? list.total:0;
            } else {
              this.keyword_list = contentList;
              this.keyword_page.total = list? list.total:0;
            }
          }
        }).catch(res => {
          this.showRightSpin = false;
        })
      },
      // 创建内容
      okHandler() {
        // this.$refs['form'].validate(valid => {
        //   if (valid) {
        //     this.createSubmit(this.createModel);
        //   }
        // })
        this.createSubmit(this.createModel);
      },
      createSubmit(entity) {
        console.log(entity)
        const params = JSON.parse(JSON.stringify(entity));
        params.image = params.image[0] || '';
        params.image_cdn = params.image;
        params.configid = this.checkBlockId;
        params.instanceid = this.editId;
        this.loading = true;
        const handler = params.id?updateBlockContent:addBlockContent;
        if (!params.id) {
          params.stype = Number(this.stype);
        }
        handler(params).then(res => {
          this.loading = false;
          if (res.code == 200) {
            this.showAddContent();
            this.getBlockContents(this.stype);
          }
        }).catch(res => {
          this.loading = false;
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
            if ((data.ConfigsList || []).length > 0) {
              this.collapse.splice(0, 1, '1');
            }
          }
        }).catch(res => {
          this.showSpin = false
        })
      },
    },
    watch: {
      checkBlockId() {
        this.contents = [];
        this.keyWords = [];
        this.getBlockContents(0);
        this.getBlockContents(1);
      }
    },
    created() {
      if (!this.editId) {
        this.$Message.error('页面内容编辑缓存id丢失，请重新选择页面');
      } else {
        this.getPageDetail();
      }
    },
    mounted() {
      this.$dragging.$on('dragged', ({ value }) => {
      })
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
  .drag-item{
    border:1px solid #f2f2f2;
    border-bottom: none;
    padding:10px 5px;
  }
  .drag-item:hover {
    background: #ebf7ff;
  }
</style>
