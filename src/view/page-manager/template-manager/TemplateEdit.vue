<template>
  <Card>
    <Row>
      <Col span="8">
        <div class="pb-10 bgf2">
          俄罗斯世界杯模板
        </div>
        <img src="" class="w block">
      </Col>
      <Col span="16" class="pl-20">
        <div class="border ivu-card-shadow pl-10 pr-15 bgfff">
          <div class="modal-title pl-20 borderB mb-15">模板属性</div>
          <Form :label-width="100">
            <FormItem label="模板名称：">
              <Input />
            </FormItem>
            <FormItem label="模板缩略图：">
              <Input />
            </FormItem>
            <img src="" class="w150 block">
            <FormItem>
              <Button type="primary">保存修改</Button>
            </FormItem>
          </Form>
        </div>
      </Col>
    </Row>
  </Card>
</template>

<script>
  export default {
    name: "TemplateEdit"
  }
</script>

<style scoped>

</style>
