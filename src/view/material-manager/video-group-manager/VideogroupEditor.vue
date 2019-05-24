<template>
  <Card>
    <Form :label-width="120">
      <Row>
        <Col span="12">
          <FormItem label="标题：">
            <Input class="w300"/>
          </FormItem>
          <FormItem label="副标题：">
            <Input class="w300"/>
          </FormItem>
          <FormItem label="历史标题：">
            <Select class="w300" placeholder="请选择"></Select>
          </FormItem>
          <FormItem label="关键字：">
            <div>
              <!--<Tag color="primary" type="dot">测试回显</Tag><Tag color="primary" type="dot">测试</Tag>-->
              <Tag color="primary" type="dot" v-for="(item, index) of keys" :key="'key'+index" closable @on-close="keyClose(index)">{{item}}</Tag>
            </div>
            <div>
              <Input class="w300" v-model="key" @on-enter="addKey"/>
              <Button type="primary" class="ml5" @click="addKey">添加关键字</Button>
            </div>
            <p>关键字可输入多个</p>
          </FormItem>
          <FormItem label="主图：">
            <MyUpload
              class="block"
              :upload-list="uploadList"
              @on-remove="removeHandler"
              @on-success="successHandler"
              :format="format"
              :max-size="2048"
            ></MyUpload>
          </FormItem>
          <FormItem label="媒体属性：">
            <Input  class="w300"/>
          </FormItem>
          <FormItem label="看点描述：">
            <Input type="textarea" :rows="5" class="w300"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="关联视频集：">
            <Input class="w200"/>
          </FormItem>
          <FormItem label="所处媒体号：">
            <Input  class="w300"/>
          </FormItem>
          <FormItem label="分类：">
            <Input  class="w300"/>
          </FormItem>
          <FormItem label="视频集ID：">
            <Input  class="w300"/>
          </FormItem>
          <FormItem label="视频集埋码：">
            <Input class="w300"/>
          </FormItem>
          <FormItem label="视频总数：">
            <Input  class="w300"/>
          </FormItem>
          <FormItem label="简介：">
            <Input type="textarea" :rows="5" class="w300"/>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <p class="bold mb-5 clear">
      <Button type="primary" class="right">挑选视频</Button>
    </p>
    <ManagerView ref="wait" :save="null" :del="false" :columns="columns">
      <p class="bold mb-5">已选视频</p>
    </ManagerView>
    <div class="center">
      <Button type="primary" class="w200 mt-20">提交</Button>
    </div>
    <BackTop></BackTop>
  </Card>
</template>

<script>
  import {getVideoSetById, updateVideoSet} from "../../../api/material";
  import MyUpload from './../../components/global-util/MyUpload';

  export default {
    name: "VideoGroupEditor",
    components: {
      MyUpload
    },
    data() {
      return {
        format: ['jpg', 'jpeg', 'png'],
        columns: [
          {
            title: '视频名称',
            key: 'id',
            align: 'center',
            width: 150
          },
          {
            title: '缩略图',
            key: 'id',
            align: 'center',
            width: 150
          },
          {
            title: '关键字',
            key: 'id',
            align: 'center',
            width: 150
          },
          {
            title: '简介',
            key: 'tradeId',
            align: 'center'
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
          }
        ],
        entity: {
          videosetName: '', // 标题
          playTime: null, // 首播时间
          playReplaytime: null, // 重播时间
          videosetCoverpic: null, // 封面
          keywords: '', // 关键字
        },
        key: '',
      }
    },
    computed: {
      editId() {
        return this.$store.state.material.videoSetEditId;
      },
      uploadList() {
        return this.entity.videosetCoverpic?[this.entity.videosetCoverpic]:[];
      },
      keys() {
        const keys = this.entity.keywords;
        return keys ? keys.split(',') : [];
      }
    },
    methods: {
      // 图片上传handler
      removeHandler() {
        this.entity.videosetCoverpic = '';
      },
      successHandler(res, file) {
        if (res.code == 200) {
          this.entity.videosetCoverpic = res.data;
        }
      },
      keyClose(index) {
        const keys = [...this.keys];
        keys.splice(index, 1);
        this.entity.keywords = keys.join(',');
      },
      addKey() {
        const key = this.key.trim();
        if (key) {
          const keys = this.entity.keywords;
          this.entity.keywords = keys ? keys + `,${key}` : key;
          this.key = '';
        }
      },
    },
    provide() {
      return {
        handlers: {

        }
      }
    },
    beforeRouteLeave (to, from, next) {
      this.$store.commit('setVideoSetEditId', '');
      next();
    },
    created() {
      if (this.editId) {
        document.title = '修改视频集';
        getVideoSetById({
          id: this.editId
        }).then(res => {
          if (res.code == 200) {

          }
        })
      } else {
        document.title = '添加视频集';
      }
    }
  }
</script>

<style scoped>

</style>
