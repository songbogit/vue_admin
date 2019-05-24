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
              <!--<Tag color="primary" type="dot">测试回显</Tag><Tag color="primary" type="dot">测试</Tag>-->
              <Tag color="primary" type="dot" v-for="(item, index) of keys" :key="'key'+index" closable @on-close="keyClose(index)">{{item}}</Tag>
            </div>
            <div>
              <Input class="w300" v-model="key" @on-enter="addKey"/>
              <Button type="primary" class="ml5" @click="addKey">添加关键字</Button>
            </div>
            <p>关键字可输入多个</p>
          </FormItem>
          <FormItem label="编目状态：">
            <Input  class="w300"/>
          </FormItem>
          <FormItem label="封面图片：">
            <MyUpload
              class="block"
              :upload-list="uploadList"
              @on-remove="removeHandler"
              @on-success="successHandler"
              :format="format"
              :max-size="2048"
            ></MyUpload>
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
            <Input  class="w300" v-model="entity.host"/>
          </FormItem>
          <FormItem label="重播时间：">
            <DatePicker class="w300" placeholder="请选择" v-model="entity.replayTime"></DatePicker>
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
            <Input  class="w300" v-model="entity.mId"/>
          </FormItem>
          <FormItem label="分类：">
            <Input  class="w300" v-model="entity.first"/>
          </FormItem>
          <FormItem label="GUID：">
            <Input  class="w300" v-model="entity.contentGUID"/>
          </FormItem>
          <FormItem label="简介：">
            <Input class="w300" v-model="entity.contentBrief"/>
          </FormItem>
          <FormItem label="嘉宾：">
            <Input  class="w300" v-model="entity.guests"/>
          </FormItem>
          <FormItem label="同步直播频道：">
            <Select class="w300" placeholder="请选择"></Select>
          </FormItem>
          <FormItem label="首播频道：">
            <Select class="w300" placeholder="请选择"></Select>
          </FormItem>
          <FormItem label="首播时间：">
            <DatePicker class="w300" placeholder="请选择" v-model="entity.playTime"></DatePicker>
          </FormItem>
          <FormItem label="重播频道：">
            <Select class="w300" placeholder="请选择"></Select>
          </FormItem>
          <FormItem label="重播时间：">
            <DatePicker class="w300" placeholder="请选择" v-model="entity.replayTime"></DatePicker>
          </FormItem>
          <FormItem label="视频web地址：">
            <Input  class="w300"/>
          </FormItem>
          <FormItem label="内容状态：">
            <Input  class="w300"/>
          </FormItem>
          <FormItem label="标签：">
            <div>
              <!--<Tag color="primary" type="dot">测试回显</Tag><Tag color="primary" type="dot">测试</Tag>-->
              <Tag color="primary" type="dot" v-for="(item, index) of tags" :key="'tag'+index" closable @on-close="tagClose(index)">{{item}}</Tag>
            </div>
            <div>
              <Input class="w300" v-model="tag" @on-enter="addTag"/>
              <Button type="primary" class="ml-5" @click="addTag">添加标签</Button>
            </div>
            <p>标签可输入多个</p>
          </FormItem>
          <FormItem label="单视频id：">
            <Input  class="w300" v-model="entity.contentGUID"/>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div class="center">
      <Button type="primary" class="w200 mt-20" @click="addVideo">提交</Button>
    </div>
    <SpinUtil :show="showSpin"></SpinUtil>
  </Card>
</template>

<script>
  import {getVideoById, addVideo, updateVideo} from "../../../api/material";
  import {getDateTime} from "../../../libs/tools";
  import MyUpload from './../../components/global-util/MyUpload';

  export default {
    name: "VideoEdit",
    components: {
      MyUpload
    },
    data() {
      return {
        format: ['jpg', 'jpeg', 'png'],
        showSpin: false,
        entity: {
          area: '',
          catalogingStatus: '',
          channel: '',
          cmsUpdateTime: null,
          column: '',
          content: '',
          contentBrief: '',
          contentGUID: '',
          contentId: '',
          contentProviders: '',
          contentType: '',
          coreTags: '',
          createTime: null,
          description: '',
          director: '',
          duration: '',
          editMode: '',
          entityType: '',
          first: '',
          flag: '',
          groupId: '',
          guests: '',
          host: '',
          id: '',
          inputTime: null,
          isOnshelf: '',
          is_local: '',
          keywords: '',
          language: '',
          mId: '',
          mainOrganize: '',
          majorCharacter: '',
          month: '',
          otherResponsible: '',
          otherTasks: '',
          parentId: '',
          partNumber: '',
          photoUrl: '',
          playTime: '',
          produce: '',
          producer: '',
          rater: '',
          reporter: '',
          respondents: '',
          screenWriter: '',
          second: '',
          seqNo: '',
          serviceId: '',
          size: '',
          sourceMedia: '',
          sourceType: '',
          starring: '',
          subTitle: '',
          subject: '',
          synchronizedChannel: '',
          tagId: '',
          third: '',
          timeMillis: '',
          title: '',
          totalDiversity: '',
          updateTime: '',
          year: ''
        },
        tag: '',
        key: '',
        rules: {

        }
      }
    },
    computed: {
      editId() {
        return this.$store.state.material.videoEditId;
      },
      uploadList() {
        return this.entity.photoUrl?[this.entity.photoUrl]:[];
      },
      tags() {
        const tags = this.entity.coreTags;
        return tags ? tags.split(',') : [];
      },
      keys() {
        const keys = this.entity.keywords;
        return keys ? keys.split(',') : [];
      }
    },
    methods: {
      // 图片上传handler
      removeHandler() {
        this.entity.photoUrl = '';
      },
      successHandler(res, file) {
        if (res.code == 200) {
          this.entity.photoUrl = res.data;
        }
      },
      keyClose(index) {
        const keys = [...this.keys];
        keys.splice(index, 1);
        this.entity.keywords = keys.join(',');
      },
      tagClose(index) {
        const tags = [...this.tags];
        tags.splice(index, 1);
        this.entity.coreTags = tags.join(',');
      },
      addTag() {
        if (this.tag.trim()) {
          const tags = this.entity.coreTags;
          this.entity.coreTags = tags ? tags + `,${this.tag.trim()}` : this.tag.trim();
          this.tag = '';
        }
      },
      addKey() {
        const key = this.key.trim();
        if (key) {
          const keys = this.entity.keywords;
          this.entity.keywords = keys ? keys + `,${key}` : key;
          this.key = '';
        }
      },
      // 添加视频
      addVideo() {
        const params = JSON.parse(JSON.stringify(this.entity));
        params.playTime = getDateTime(params.playTime);
        params.replayTime = getDateTime(params.replayTime);
        params.inputTime = getDateTime(new Date());
        params.cmsUpdateTime = getDateTime(new Date());
        this.showSpin = true;
        const handler = this.editId ? updateVideo : addVideo;
        if (!this.editId) {
          delete params.id;
        }
        handler(params).then(res => {
          this.showSpin = false;
          if (res.code == 200) {
            this.$router.push('/material/video-manager');
          }
        }).catch(res => {
          this.showSpin = false;
        })
      },
      // 获取视频详情
      getVideoDetail() {
        this.showSpin = true;
        getVideoById({id: this.editId}).then(res => {
          this.showSpin = false;
          if (res.code == 200) {
            const data = res.data.video;
            this.entity = data;
          }
        }).catch(res => {
          this.showSpin = false;
        })
      }
    },
    beforeRouteLeave (to, from, next) {
      this.$store.commit('setVideoEditId', '');
      next();
    },
    mounted() {
      if (this.editId) {
        document.title = '编辑视频';
        this.getVideoDetail();
      } else {
        document.title = '添加视频';
      }
    }
  }
</script>

<style scoped>

</style>
