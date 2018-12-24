<template>
  <Card style="background: #f5f7f9">
    <Row class="relative container">
      <div class="layout absolute border">
        <div class="tags mb-5 ml-5 mt-5">
          <Tag color="primary">喜剧</Tag><Tag color="primary">动作</Tag>
          <Tag color="primary">惊悚</Tag><Tag color="primary">古装</Tag>
        </div>
        <!--<div class="content bgfff">-->
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
        <!--</div>-->
        <img v-for="(item, index) of layouts" :key="'layout' + index" :src="imgBaseUrl + item.thumb" class="w block" @click="actionBlockIndex = index" @contextmenu="showMenu(index)">
        <div class="center pt-30" v-if="layouts && !layouts.length">
          <Button @click="addBlock" type="primary">暂无模块，点击添加</Button>
        </div>
      </div>
      <Col span="12" class="pl-15">
        <div class="border ivu-card-shadow pl-10 pr-15 bgfff">
          <div class="modal-title pl-20 borderB mb-15">页面属性编辑器</div>
          <Form :label-width="100">
            <FormItem label="页面标题：">
              <Input v-model="pageDetail.name"/>
            </FormItem>
            <FormItem label="关键字：">
              <Input v-model="pageDetail.keywords"/>
            </FormItem>
            <FormItem label="页面类型：">
              <RadioGroup v-model="pageDetail.type">
                <Radio :label="0">页面</Radio><Radio :label="1">专题</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="筛选开关：">
              <i-switch v-model="pageDetail.has_filter"></i-switch>
            </FormItem>
            <FormItem label="筛选器类型：">
              <Select placeholder="请选择" v-model="pageDetail.filter_type"></Select>
            </FormItem>
            <FormItem label="筛选地址：">
              <Input v-model="pageDetail.filter_url"/>
            </FormItem>
            <FormItem label="筛选关键字：">
              <Select placeholder="请选择" v-model="pageDetail.filter"></Select>
            </FormItem>
            <FormItem label="分享开关：">
              <i-switch v-model="pageDetail.can_share"></i-switch>
            </FormItem>
            <FormItem label="分享缩略图：">
              <Input />
            </FormItem>
            <FormItem label="分享说明文字：">
              <Input type="textarea" :rows="3"/>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="updatePage">保存修改</Button>
            </FormItem>
          </Form>
        </div>
      </Col>
      <Col span="12" class="pl-15">
        <div v-if="actionBlockIndex !== null" class="border ivu-card-shadow pl-10 pr-15 bgfff">
          <div class="modal-title pl-20 borderB mb-15">模块属性编辑器 [名称：大图/类型：轮播图模块]</div>
          <Form :label-width="100">
            <FormItem label="模块名称：">
              <Input v-model="blockDetail.title"/>
            </FormItem>
            <FormItem label="是否显示关键字：">
              <i-switch v-model="blockDetail.has_titlekeyword"></i-switch>
            </FormItem>
            <FormItem label="关键字：" v-if="blockDetail.has_titlekeyword">
              <Input v-model="blockDetail.keyWords"/>
            </FormItem>
            <FormItem label="双标题：">
              <i-switch v-model="blockDetail.double_title"></i-switch>
            </FormItem>
            <FormItem label="显示更多按钮：">
              <i-switch v-model="blockDetail.has_more"></i-switch>
            </FormItem>
            <div v-if="blockDetail.has_more">
              <FormItem label="更多文字：">
                <Input v-model="blockDetail.more_text"/>
              </FormItem>
              <FormItem label="目标页面：">
                <Select placeholder="请选择" v-model="blockDetail.more_target"></Select>
              </FormItem>
            </div>
            <FormItem label="显示换一换按钮：">
              <i-switch v-model="blockDetail.has_change"></i-switch>
            </FormItem>
            <FormItem label="换一换文字：" v-if="blockDetail.has_change">
              <Input v-model="blockDetail.change_text"/>
            </FormItem>
            <FormItem label="内容显示数量：">
              <InputNumber v-model="blockDetail.showcount"></InputNumber>
            </FormItem>
            <FormItem label="内容获取数量：">
              <InputNumber v-model="blockDetail.fetchcount"></InputNumber>
            </FormItem>
            <FormItem label="内容跳过数量：">
              <InputNumber v-model="blockDetail.skipcount"></InputNumber>
            </FormItem>
            <FormItem label="数据引用：">
              <i-switch v-model="blockDetail.is_quote"></i-switch>
            </FormItem>
            <FormItem label="数据引用源：" v-if="blockDetail.is_quote">
              <Select placeholder="请选择"></Select>
            </FormItem>
            <FormItem label="模块合并：">
              <i-switch v-model="blockDetail.is_merge"></i-switch>
            </FormItem>
            <FormItem label="最低版本：">
              <Select placeholder="请选择"></Select>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="updatePageBlock">保存修改</Button>
            </FormItem>
          </Form>
        </div>
        <div v-else class="border ivu-card-shadow pl-10 pr-15 bgfff">
          <p class="center pt-50 pb-50">请点击选择模块获取模块详情</p>
        </div>
      </Col>
    </Row>
    <ModalUtil ref="block" title="添加模块" @on-ok="insertBlock" :loading="addBlockLoading" :width="800" @reset="block_id = null">
      <RadioGroup v-model="block_id">
        <Row class="block-container">
          <Col span="8" class="pr-10 mb-10" v-for="(item, index) of allBlocks" :key="'block'+index">
            <div class="border radius4 pl-5 pr-5">
              <img :src="imgBaseUrl + item.thumb" class="block w">
              <div class="mt-5 mb-5">
                <Radio :label="item.id">{{item.name}}</Radio>
              </div>
            </div>
          </Col>
        </Row>
      </RadioGroup>
    </ModalUtil>
    <ContextMenu
      ref="menu"
      :axis="axis"
      :menuList="menuList"
      @move-top="moveTop"
      @move-bottom="moveBottom"
      @delete="deleteBlock"
      @add="addBlock"
      @add-top="addToTop"
    />
    <Spin fix v-if="showSpin">
      <Icon type="ios-loading" size=18 class="spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </Card>
</template>

<script>
  import ContextMenu from './../../components/ContextMenu';
  import { imgBaseUrl } from "../../../config";
  import {getPageDetail, getAllBlock, insertPageBlock, sortPageBlock, deletePageBlock, getPageBlockDetail, updatePage, updatePageBlock} from "../../../api/page_template";

  export default {
    name: "PageEditor",
    components: {
      ContextMenu
    },
    data() {
      return {
        showSpin: false,
        addBlockLoading: false,
        imgBaseUrl: imgBaseUrl,
        layouts: [],
        menuList: [
          {title: '上移模块', handler: 'move-top'},
          {title: '下移模块', handler: 'move-bottom'},
          {title: '删除模块', handler: 'delete'},
          {title: '向上增加模块', handler: 'add-top'},
          {title: '向下增加模块', handler: 'add'}
        ],
        detail: {},
        axis: {
          x: 0,
          y: 0
        },
        actionIndex: null,
        actionBlockIndex: null,
        direction: 'down',
        block_id: null,
        allBlocks: [],
        pageDetail: {
          can_share: false,
          filter: "",
          filter_type: 0,
          filter_url: '',
          has_filter: false,
          id: 2,
          keywords: "",
          name: "新建页面0",
          share_description: '',
          templateid: 0,
          thumb: "",
          thumb_cdn: "",
          type: 0,
        },
        blockDetail: {
          blockid: 105,
          change_text: "",
          double_title: false,
          fetchcount: 0,
          has_change: false,
          has_more: false,
          has_titlekeyword: false,
          id: 23,
          instanceid: 2,
          is_merge: false,
          is_quote: false,
          keyWords: '',
          more_target: "",
          more_text: "",
          quote_config_id: 0,
          quote_instance_id: 0,
          showcount: 0,
          skipcount: 0,
          title: "",
          version: "0"
        }
      }
    },
    computed: {
      editId() {
        return Number(this.$store.state.page.editPageId);
      }
    },
    methods: {
      // 上移操作的请求
      moveTop() {
        const ids = this.layouts.map(item => item.id);
        const [first, second] = [ids[this.actionIndex], ids[this.actionIndex - 1]];
        ids.splice(this.actionIndex - 1, 2, first, second);
        this.showSpin = true;
        sortPageBlock({
          instance_id: this.editId,
          sortStr: ids.join(',')
        }).then(res => {
          this.showSpin = false;
          if (res.code == 200) {
            // this.moveLocalTop();
            this.getPageDetail();
          }
        }).catch(res => {
          this.showSpin = false;
        })
      },
      // 更新data数据
      moveLocalTop() {
        const [first, second] = [this.layouts[this.actionIndex], this.layouts[this.actionIndex - 1]];
        this.layouts.splice(this.actionIndex - 1, 2, first, second);
      },
      // 下移操作的请求
      moveBottom() {
        const ids = this.layouts.map(item => item.id);
        const [first, second] = [ids[this.actionIndex + 1], ids[this.actionIndex]];
        ids.splice(this.actionIndex, 2, first, second);
        this.showSpin = true;
        sortPageBlock({
          instance_id: this.editId,
          sortStr: ids.join(',')
        }).then(res => {
          this.showSpin = false;
          if (res.code == 200) {
            // this.moveLocalBottom();
            this.getPageDetail();
          }
        }).catch(res => {
          this.showSpin = false;
        })
      },
      // 更新data数据
      moveLocalBottom() {
        const [first, second] = [ids[this.actionIndex + 1], ids[this.actionIndex]];
        this.layouts.splice(this.actionIndex, 2, first, second);
      },
      // 删除模块请求
      deleteBlock() {
        this.showSpin = true;
        deletePageBlock({
          instance_id: this.editId,
          config_id: this.layouts[this.actionIndex].id
        }).then(res => {
          this.showSpin = false;
          if (res.code == 200) {
            this.$Message.success(`成功删除模块${this.layouts[this.actionIndex].title}`);
            // this.delLocalBlock();
            this.getPageDetail();
          }
        }).catch(res => {
          this.showSpin = false;
        })
      },
      // 更新data数据
      delLocalBlock() {
        this.layouts.splice(this.actionIndex, 1);
      },
      // 向下添加模块请求
      addBlock() {
        this.$refs['block'].toggleShow();
      },
      // 向上添加模块
      addToTop() {
        this.direction = 'up';
        this.$refs['block'].toggleShow();
      },
      //
      insertBlock() {
        if (this.block_id) {
          this.addBlockLoading = true;
          insertPageBlock({
            block_id: this.block_id,
            instance_id: this.editId,
            block_after: this.actionIndex!==null?this.layouts[this.actionIndex].id:0,
            block_title: '',
            direction: this.direction
          }).then(res => {
            this.addBlockLoading = false;
            if (res.code == 200) {
              this.$refs['block'].toggleShow();
              this.getPageDetail();
            }
          }).catch(res => {
            this.addBlockLoading = false;
          })
        }
      },
      // 计算位置，显示菜单
      showMenu(index) {
        console.log(this.menuList)
        event.preventDefault();
        const {clientX, clientY} = event;
        this.axis = {
          x: clientX,
          y: clientY
        };
        const len = this.layouts.length;
        if (index == 0) {
          this.menuList[0].unable = true;
        }
        if (index == (len -1) || len == 0) {
          this.menuList[1].unable = true;
        }
        this.actionIndex = index;
        this.$refs['menu'].isShow = true;
      },
      filterBlocks(list) {
        const len = this.allBlocks.length;
        return list.map(item => {
          for (let i=0; i<len; i++) {
            if (this.allBlocks[i].id == item.blockid) {
              item.thumb = this.allBlocks[i].thumb;
              break;
            }
          }
          return item;
        })
      },
      getPageDetail() {
        this.showSpin = true;
        getPageDetail({}, this.editId).then(res => {
          this.showSpin = false;
          if (res.code == 200) {
            const data = res.data;
            this.layouts = this.filterBlocks(data.ConfigsList || []);
            let pageDetail = data.pageInstances || {};
            delete pageDetail.create_time;
            delete pageDetail.created_uid;
            delete pageDetail.created_username;
            delete pageDetail.filtershow;
            delete pageDetail.update_time;
            delete pageDetail.status;
            pageDetail.can_share = !!pageDetail.can_share;
            pageDetail.has_filter = !!pageDetail.has_filter;
            this.pageDetail = pageDetail;
          }
        }).catch(res => {
          this.showSpin = false
        })
      },
      getBlockDetail() {
        if (this.actionBlockIndex == null) {
          return false;
        }
        this.showSpin = true;
        getPageBlockDetail({
          config_id: this.layouts[this.actionBlockIndex].id
        }).then(res => {
          this.showSpin = false;
          if (res.code == 200) {
            const data = res.data || {};
            data.double_title = !!data.double_title;
            data.has_change = !!data.has_change;
            data.has_more = !!data.has_more;
            data.has_titlekeyword = !!data.has_titlekeyword;
            data.is_merge = !!data.is_merge;
            data.is_quote = !!data.is_quote;
            delete data.adid;
            delete data.created_datetime;
            delete data.created_uid;
            delete data.sort;
            delete data.status;
            delete data.isad;
            delete data.items;
            delete data.icon;
            delete data.keyWords;
            this.blockDetail = data;
          }
        }).catch(res => {
          this.showSpin = false;
        })
      },
      updatePageBlock() {
        const data = JSON.parse(JSON.stringify(this.blockDetail));
        data.double_title = data.double_title?1:0;
        data.has_change = data.has_change?1:0;
        data.has_more = data.has_more?1:0;
        data.has_titlekeyword = data.has_titlekeyword?1:0;
        data.is_merge = data.is_merge?1:0;
        data.is_quote = data.is_quote?1:0;
        this.showSpin = true;
        updatePageBlock(data).then(res => {
          this.showSpin = false;
        }).catch(res => {
          this.showSpin = false;
        })
      },
      updatePage() {
        const pageDetail = JSON.parse(JSON.stringify(this.pageDetail));
        pageDetail.can_share = pageDetail.can_share?1:0;
        pageDetail.has_filter = pageDetail.has_filter?1:0;
        this.showSpin = true;
        updatePage(pageDetail).then(res => {
          this.showSpin = false;
        }).catch(res => {
          this.showSpin = false;
        })
      }
    },
    created() {
      getAllBlock().then(res => {
        if (res.code == 200) {
          this.allBlocks = res.data || [];
        }
        if (!this.editId) {
          this.$Message.error('页面编辑缓存id丢失，请重新选择页面');
        } else {
          this.getPageDetail();
        }
      }).catch(res => {
        if (!this.editId) {
          this.$Message.error('页面编辑缓存id丢失，请重新选择页面');
        } else {
          this.getPageDetail();
        }
      })
    },
    mounted() {
      document.addEventListener('click', () => {
        const menu = this.$refs['menu'];
        if (menu && menu.isShow) {
          menu.isShow = false;
          this.menuList = [
            {title: '上移模块', handler: 'move-top'},
            {title: '下移模块', handler: 'move-bottom'},
            {title: '删除模块', handler: 'delete'},
            {title: '向上增加模块', handler: 'add-top'},
            {title: '向下增加模块', handler: 'add'}
          ];
        }
      })
    },
    watch: {
      actionBlockIndex() {
        this.getBlockDetail();
      }
    }
  }
</script>

<style scoped>
  .layout {
    width: 360px;
    height: 720px;
    overflow-x: hidden;
    overflow-y: auto;
    top: 0;
    left: 0;
  }
  .container {
    padding-left: 360px;
    height: auto;
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
