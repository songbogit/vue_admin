<template>
  <Card>
    <Form :label-width="120">
      <Row>
        <Col span="12">
          <FormItem label="视频标题：">
            <Input class="w300"/>
          </FormItem>
          <FormItem label="历史标题：">
            <Select class="w300" placeholder="请选择"></Select>
          </FormItem>
          <FormItem label="关键字：">
            <Input  class="w300"/>
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
        </Col>
      </Row>
    </Form>
    <div class="center">
      <Button type="primary" class="w200 mt-20">提交</Button>
    </div>
  </Card>
</template>

<script>
  export default {
    name: "VideoEidtor",
    data() {
      return {
        entity: {

        },
        rules: {

        }
      }
    }
  }
</script>

<style scoped>

</style>
