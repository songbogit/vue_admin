<template>
  <Card>
    <Row class="relative container">
      <div class="layout absolute">
        <div class="pb-10 bgf2 template-title">
          <p class="nowrap">{{detail.name || '请填写标题'}}</p>
        </div>
        <img v-for="(item, index) of layouts" :key="'layout' + index" :src="imgBaseUrl + item.thumb" class="w block" @contextmenu="showMenu(index)">
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
              <Button type="primary">保存修改</Button>
            </FormItem>
          </Form>
        </div>
      </Col>
    </Row>
    <ContextMenu ref="menu" :axis="axis" :menuList="menuList" @move-top="moveTop" @move-bottom="moveBottom" @delete="deleteBlock" @add="addBlock"/>
    <Spin fix v-if="showSpin">
      <Icon type="ios-loading" size=18 class="spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </Card>
</template>

<script>
  import ContextMenu from './../../components/ContextMenu';
  import {getTemplateDetail, deleteTemplateBlock, sortTemplateBlock} from "../../../api/page_template";
  import { imgBaseUrl } from "../../../config";

  export default {
    name: "TemplateEdit",
    components: {
      ContextMenu
    },
    data() {
      return {
        showSpin: false,
        imgBaseUrl: imgBaseUrl,
        menuList: [
          {title: '上移模块', handler: 'move-top'},
          {title: '下移模块', handler: 'move-bottom'},
          {title: '删除模块', handler: 'delete'},
          {title: '增加模块', handler: 'add'}
        ],
        layouts: [],
        detail: {},
        axis: {
          x: 0,
          y: 0
        },
        actionIndex: null
      }
    },
    computed: {
      editId() {
        return this.$store.state.page.editId;
      }
    },
    methods: {
      moveTop() {
        if (this.editId) {
          const ids = this.layouts.map(item => item.id);
          const [first, second] = [ids[this.actionIndex], ids[this.actionIndex - 1]];
          ids.splice(this.actionIndex - 1, 2, first, second);
          this.showSpin = true;
          sortTemplateBlock({
            template_id: this.editId,
            sort: ids
          }).then(res => {
            this.showSpin = false;
            if (res.code == 200) {
              this.moveLocalTop();
            }
          }).catch(res => {
            this.showSpin = false;
          })
        } else {
          this.moveLocalTop();
        }
      },
      moveLocalTop() {
        const [first, second] = [this.layouts[this.actionIndex], this.layouts[this.actionIndex - 1]];
        this.layouts.splice(this.actionIndex - 1, 2, first, second);
      },
      moveBottom() {

      },
      deleteBlock() {
        if (this.editId) {
          this.showSpin = true;
          deleteTemplateBlock({
            template_id: this.editId,
            layout_id: this.layouts[this.actionIndex].id
          }).then(res => {
            this.showSpin = false;
            if (res.code == 200) {
              this.$Message.success(`成功删除模块${this.layouts[this.actionIndex].name}`);
              this.delLocalBlock();
            }
          }).catch(res => {
            this.showSpin = false;
          })
        }
      },
      addBlock() {

      },
      delLocalBlock() {
        this.layouts.splice(this.actionIndex, 1);
      },
      // 计算位置，显示菜单
      showMenu(index) {
        event.preventDefault();
        const {clientX, clientY} = event;
        this.axis = {
          x: clientX,
          y: clientY
        };
        const len = this.menuList.length;
        if (index == 0) {
          this.menuList[0].unable = true;
        }
        if (index == (len -1) || len == 0) {
          this.menuList[1].unable = true;
        }
        this.actionIndex = index;
        this.$refs['menu'].isShow = true;
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
            {title: '增加模块', handler: 'add'}
          ]
        }
      })
    },
    created() {
      if (this.editId) {
        document.title = '编辑模板';
        getTemplateDetail({}, this.editId).then(res => {
          const {code, data} = res;
          if (code == 200) {
            this.layouts = data.layouts || [];
            this.detail = data.pageTemplage || {};
          }
        });
      } else {
        document.title = '创建模板';
      }
    },
    // 路由离开之前给个提示，编辑的情况下id会清空
    beforeRouteLeave(to, from, next) {
      if (this.editId) {
        if (confirm('离开页面编辑的模板id将清空')) {
          sessionStorage.removeItem('templateEditId');
          this.$store.commit('setTemplateEditId', null);
          next();
        }
      } else {
        next();
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
</style>
