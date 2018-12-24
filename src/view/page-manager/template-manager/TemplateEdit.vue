<template>
  <Card>
    <Row class="relative container">
      <div class="layout absolute border">
        <div class="pb-10 bgf2 template-title">
          <p class="nowrap">{{detail.name || '请填写标题'}}</p>
        </div>
        <img v-for="(item, index) of layouts" :key="'layout' + index" :src="imgBaseUrl + item.thumb" class="w block" @contextmenu="showMenu(index)">
        <div class="center pt-30" v-if="layouts && !layouts.length">
          <Button @click="addBlock" type="primary">暂无模块，点击添加</Button>
        </div>
      </div>
      <Col span="24" class="pl-20">
        <div class="border ivu-card-shadow pl-10 pr-15 bgfff">
          <div class="modal-title pl-20 borderB mb-15">模板属性</div>
          <Form :label-width="100">
            <FormItem label="模板名称：">
            <Input v-model="detail.name"/>
          </FormItem>
            <FormItem label="模板缩略图：">
              <Input v-model="detail.thumb"/>
            </FormItem>
            <img :src="detail.thumb" class="w150 block" style="margin-left: 100px;">
            <FormItem class="mt10">
              <Button type="primary" @click="update">保存修改</Button>
            </FormItem>
          </Form>
        </div>
      </Col>
    </Row>
    <ModalUtil ref="block" @on-ok="insertBlock" :loading="addBlockLoading" :width="800" @reset="block_id = null">
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
  import {getTemplateDetail, deleteTemplateBlock, sortTemplateBlock, getAllBlock, addTemplateBlock, updateTemplate} from "../../../api/page_template";
  import { imgBaseUrl } from "../../../config";

  export default {
    name: "TemplateEdit",
    components: {
      ContextMenu
    },
    data() {
      return {
        showSpin: false,
        addBlockLoading: false,
        imgBaseUrl: imgBaseUrl,
        menuList: [
          {title: '上移模块', handler: 'move-top'},
          {title: '下移模块', handler: 'move-bottom'},
          {title: '删除模块', handler: 'delete'},
          {title: '向上增加模块', handler: 'add-top'},
          {title: '向下增加模块', handler: 'add'}
        ],
        layouts: [],
        detail: {},
        axis: {
          x: 0,
          y: 0
        },
        actionIndex: null,
        block_id: null,
        allBlocks: []
      }
    },
    computed: {
      editId() {
        return Number(this.$store.state.page.editTemplateId);
      }
    },
    methods: {
      // 上移操作的请求
      moveTop() {
        const ids = this.layouts.map(item => item.id);
        const [first, second] = [ids[this.actionIndex], ids[this.actionIndex - 1]];
        ids.splice(this.actionIndex - 1, 2, first, second);
        this.showSpin = true;
        sortTemplateBlock({
          template_id: this.editId,
          sortStr: ids.join(',')
        }).then(res => {
          this.showSpin = false;
          if (res.code == 200) {
            // this.moveLocalTop();
            this.getTemplateDetail();
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
        sortTemplateBlock({
          template_id: this.editId,
          sortStr: ids.join(',')
        }).then(res => {
          this.showSpin = false;
          if (res.code == 200) {
            // this.moveLocalBottom();
            this.getTemplateDetail();
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
        deleteTemplateBlock({
          template_id: this.editId,
          layout_id: this.layouts[this.actionIndex].id
        }).then(res => {
          this.showSpin = false;
          if (res.code == 200) {
            this.$Message.success(`成功删除模块${this.layouts[this.actionIndex].name}`);
            // this.delLocalBlock();
            this.getTemplateDetail();
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
        if (this.actionIndex == 0) {
          this.actionIndex = null;
        } else {
          this.actionIndex = this.actionIndex - 1;
        }
        this.$refs['block'].toggleShow();
      },
      //
      insertBlock() {
        if (this.block_id) {
          this.addBlockLoading = true;
          addTemplateBlock({
            block_id: this.block_id,
            template_id: this.editId,
            layout_after: this.actionIndex!==null?this.layouts[this.actionIndex].id:0
          }).then(res => {
            this.addBlockLoading = false;
            if (res.code == 200) {
              this.$refs['block'].toggleShow();
              this.getTemplateDetail();
            }
          }).catch(res => {
            this.addBlockLoading = false;
          })
        }
      },
      // 计算位置，显示菜单
      showMenu(index) {
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
      // 获取详情
      getTemplateDetail() {
        this.showSpin = true;
        getTemplateDetail({}, this.editId).then(res => {
          this.showSpin = false;
          const {code, data} = res;
          if (code == 200) {
            this.layouts = data.layouts || [];
            this.detail = data.pageTemplage || {};
          }
        }).catch(res => {
          this.showSpin = false;
        });
      },
      update() {
        let {thumb, name} = this.detail;
        this.showSpin = true;
        updateTemplate({
          id: this.editId,
          thumb: thumb,
          name: name
        }).then(res => {
          this.showSpin = false;
        }).catch(res => {
          this.showSpin = false;
        })
      }
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
    created() {
      if (this.editId) {
        this.getTemplateDetail();
      } else {
        this.$Message.error('编辑的模板id缓存丢失，请重新选择模板');
      }
      getAllBlock().then(res => {
        if (res.code == 200) {
          this.allBlocks = res.data || [];
        }
      })
    },
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
    height: 720px;
  }
  .spin-icon-load{
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
  .block-container {
    height: 520px;
    overflow-y: auto;
  }
</style>
