<template>
  <Modal title="View Image" v-model="visible" :width="680">
    <div class="center">
      <img :src="imgBaseUrl + imgName" v-if="visible" style="max-width: 650px">
    </div>
  </Modal>
</template>

<script>
  import {imgBaseUrl} from "../../../config";

  export default {
    name: "ImageView",
    props: ['imgName'],
    data() {
      return {
        imgBaseUrl: imgBaseUrl,
        visible: false
      }
    },
    methods: {
      toggleShow(flag) {
        if (flag !== null && flag !== undefined) {
          this.visible = !!flag;
        } else {
          this.visible = !this.visible;
        }
      }
    }
  }
</script>

<style scoped>

</style>
