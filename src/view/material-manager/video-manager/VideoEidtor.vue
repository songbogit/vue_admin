<template>
  <Card>
    <Form :label-width="120" :model="entity" :rules="rules">
      <Row>
        <Col span="12">
          <FormItem label="视频标题：">
            <Input class="w300" v-model="entity.title"/>
          </FormItem>
          <FormItem label="历史标题：">
            <Select class="w300" placeholder="请选择"></Select>
          </FormItem>
          <FormItem label="关键字：">
            <div>
              <Tag color="primary" type="dot">测试回显</Tag><Tag color="primary" type="dot">测试</Tag>
            </div>
            <div class="mt-5">
              <Input class="w300" @keyup.enter=""/>
              <Button type="primary" class="ml-5">添加关键字</Button>
            </div>
            <p>关键字可输入多个</p>
          </FormItem>
          <FormItem label="编目状态：">
            <Input  class="w300"/>
          </FormItem>
          <FormItem label="封面图片：">
            <Input class="w300"/>
          </FormItem>
          <FormItem label="历史封面地址：">
            <Select class="w300" placeholder="请选择"></Select>
          </FormItem>
          <FormItem label="所属栏目：">
            <Input  class="w300"/>
          </FormItem>
          <FormItem label="栏目状态：">
            <Input  class="w300"/>
          </FormItem>
          <FormItem label="主持人：">
            <Input  class="w300"/>
          </FormItem>
          <FormItem label="重播时间：">
            <DatePicker class="w300" placeholder="请选择"></DatePicker>
          </FormItem>
          <FormItem label="媒体属性：">
            <Input  class="w300"/>
          </FormItem>
          <FormItem label="视频集广告定向ID：">
            <Input  class="w300"/>
          </FormItem>
          <FormItem label="看点描述：">
            <Input  class="w300" type="textarea" :rows="4"/>
          </FormItem>
          <FormItem label="父视频GUID：">
            <Input  class="w300"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="所属视频集：">
            <Select class="w200 mr-20"></Select>
            主视频集：
            <Select class="w200"></Select>
          </FormItem>
          <FormItem label="所处媒体号：">
            <Input  class="w300"/>
          </FormItem>
          <FormItem label="分类：">
            <Input  class="w300"/>
          </FormItem>
          <FormItem label="GUID：">
            <Input  class="w300"/>
          </FormItem>
          <FormItem label="简介：">
            <Input class="w300"/>
          </FormItem>
          <FormItem label="嘉宾：">
            <Input  class="w300"/>
          </FormItem>
          <FormItem label="同步直播频道：">
            <Select class="w300" placeholder="请选择"></Select>
          </FormItem>
          <FormItem label="首播频道：">
            <Select class="w300" placeholder="请选择"></Select>
          </FormItem>
          <FormItem label="首播时间：">
            <DatePicker class="w300" placeholder="请选择"></DatePicker>
          </FormItem>
          <FormItem label="重播频道：">
            <Select class="w300" placeholder="请选择"></Select>
          </FormItem>
          <FormItem label="视频web地址：">
            <Input  class="w300"/>
          </FormItem>
          <FormItem label="内容状态：">
            <Input  class="w300"/>
          </FormItem>
          <FormItem label="标签：">
            <div>
              <Tag color="primary" type="dot">测试回显</Tag><Tag color="primary" type="dot">测试</Tag>
            </div>
            <div class="mt-5">
              <Input class="w300" @keyup.enter=""/>
              <Button type="primary" class="ml-5">添加标签</Button>
            </div>
            <p>标签可输入多个</p>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div class="center">
      <Button type="primary" class="w200 mt-20">提交</Button>
    </div>
    <SpinUtil :show="showSpin"></SpinUtil>
  </Card>
</template>

<script>
  import {getVideoById} from "../../../api/material";

  export default {
    name: "VideoEidtor",
    data() {
      return {
        showSpin: false,
        entity: {
          title: '', // 标题
          keywords: '', // 关键字
          cataloging_status: '', // 编目状态
          photo_url: '', // 封面地址
          column: '', // 栏目
          host: '', // 主持人
          play_time: null, // 首播时间
          replay_time: null, // 重播时间
          content_brief: '', // 内容概要
          content: '', // 内容
          channel: '', // 直播频道
          synchronized_channel: '', // 同步直播频道
          core_tags: '', // 标签
          content_guid: '', //GUID
          guests: '', // 嘉宾
          main_set: '', // 主视频集
          web_url: '', // 视频web地址
        },
        rules: {

        }
      }
    },
    computed: {
      editId() {
        return this.$store.state.material.videoEditId;
      }
    },
    methods: {
      getVideoDetail() {
        this.showSpin = true;
        getVideoById({id: this.editId}).then(res => {
          this.showSpin = false;
        }).catch(res => {
          this.showSpin = false;
        })
      }
    },
    mounted() {
      if (this.editId) {
        document.title = '添加视频';
        this.getVideoDetail();
      } else {
        document.title = '编辑视频';
      }
    }
  }
</script>

<style scoped>

</style>
