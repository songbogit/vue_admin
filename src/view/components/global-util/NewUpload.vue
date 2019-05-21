<template>
  <div>
    <div class="demo-upload-list" v-if="showList" v-for="(item, index) in fileList">
      <template>
        <img :src="imgBaseUrl + item">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(imgBaseUrl + item)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
        </div>
      </template>
    </div>
    <Upload
      v-show="(multiple && (!maxLength || maxLength && fileList.length<maxLength)) || (!multiple && !value)"
      ref="upload"
      :show-upload-list="false"
      :on-success="handleSuccess"
      :format="format"
      :max-size="maxSize"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      :multiple="multiple"
      type="drag"
      action="/api/uploadimg"
      style="display: inline-block;width:58px;">
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="View Image" v-model="visible" :width="680">
      <div class="center">
        <img :src="imgName" v-if="visible" style="max-width: 650px">
      </div>
    </Modal>
  </div>
</template>

<script>

import { imgBaseUrl } from '../../../config'

export default {
  name: 'MyUpload',
  data () {
    return {
      imgName: '',
      visible: false,
      imgBaseUrl: imgBaseUrl
    }
  },
  props: {
    value: {
      type: String,
      default: null
    },
    showList: {
      type: Boolean,
      default: true
    },
    index: {
      type: Number,
      default: null
    },
    uploadList: {
      type: Array,
      default () {
        return []
      }
    },
    format: {
      type: Array,
      default () {
        return []
      }
    },
    maxLength: {
      type: Number,
      default: null
    },
    maxSize: {
      type: Number,
      default: 1024*5
    },
    onRemove: {
      type: Function,
      default () {
        return () => {

        }
      }
    },
    onSuccess: {
      type: Function,
      default () {
        return () => {

        }
      }
    },
    onFormatError: {
      type: Function,
      default () {
        return () => {

        }
      }
    },
    onExceededSize: {
      type: Function,
      default () {
        return () => {

        }
      }
    },
  },
  computed: {
    fileList: {
      get () {
        return Array.isArray(this.value) ? this.value : !!this.value ? [this.value] : [];
      },
      set (newVal) {

      }
    },
    multiple() {
      return Array.isArray(this.value);
    }
  },
  methods: {
    handleView (item) {
      this.imgName = item.src
      this.visible = true
    },
    handleRemove (index) {
      if (!this.multiple) {
        this.$emit('input', null);
      } else {
        this.value.splice(index, 1);
      }
      this.$emit('on-remove', index, this.index);
    },
    handleSuccess (res, file) {
      if (this.multiple) {
        this.value.push(res.data);
      } else {
        this.$emit('input', res.data);
      }
      this.$emit('on-success', res.data, file, this.index)
    },
    handleFormatError (file) {
      const _this = this
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select in ' + this.format.toString()
      })
      // this.onFormatError();
    },
    handleMaxSize (file) {
      const _this = this
      this.$Notice.warning({
        title: '文件大小过大',
        desc: file.name + ' 过大, 最大不能超过 ' + _this.maxSize + 'KB.'
      })
      // this.onExceededSize();
    },
    handleBeforeUpload () {
      return true
    },
    click() {
      this.$refs['upload'].handleClick();
    }
  },
  mounted () {

  },
  watch: {
    value(v) {
      if (!v) {
        this.uploadList.splice(0, 1);
      }
    }
  }
}
</script>

<style scoped>
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
