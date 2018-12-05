<template>
  <Card style="background: #f5f7f9">
    <Row>
      <Col span="8">
        <div class="tags mb-5">
          <Tag>喜剧</Tag><Tag>动作</Tag>
          <Tag>惊悚</Tag><Tag>古装</Tag>
        </div>
        <div class="content bgfff">
          <div class="module-title">大图</div>
          <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4127978443,3621625360&fm=111&gp=0.jpg" class="scroll-img">
          <div class="module-title">横向直播模块</div>
          <div class="list-lr clear">
            <div class="list-lr-item" v-for="item of 6">
              <div class="list-lr-item-state clear">
                <div class="list-lr-item-state-info">直播中</div>
              </div>
              <div class="list-lr-item-title line2">小程序测试</div>
              <div class="list-lr-item-dec line2">小程序作为2018年新产品，依赖于各大BAT的平台，自带流量，更少的成本获得更多的用户</div>
            </div>
          </div>
          <div class="module-title">横图横拉模块</div>
          <div class="list-tb">
            <Row>
              <Col class="list-tb-item" span="8" v-for="item of 9">
                <div class="list-tb-item-img">
                  <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4127978443,3621625360&fm=111&gp=0.jpg">
                </div>
                <p class="list-tb-item-dec line">往事随风去，我愿乘风随。消逝了就成为往事。回不了头。</p>
              </Col>
            </Row>
          </div>
        </div>
      </Col>
      <Col span="8" class="pl-15">
        <div class="border ivu-card-shadow pl-10 pr-15 bgfff">
          <div class="modal-title pl-20 borderB mb-15">页面属性编辑器</div>
          <Form :label-width="100">
            <FormItem label="页面标题：">
              <Input />
            </FormItem>
            <FormItem label="关键字：">
              <Input />
            </FormItem>
            <FormItem label="页面类型：">
              <RadioGroup>
                <Radio :label="0">页面</Radio><Radio :label="1">专题</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="筛选开关：">
              <i-switch></i-switch>
            </FormItem>
            <FormItem label="筛选器类型：">
              <Select placeholder="请选择"></Select>
            </FormItem>
            <FormItem label="筛选地址：">
              <Input />
            </FormItem>
            <FormItem label="筛选关键字：">
              <Select placeholder="请选择"></Select>
            </FormItem>
            <FormItem label="分享开关：">
              <i-switch></i-switch>
            </FormItem>
            <FormItem label="分享缩略图：">
              <Input />
            </FormItem>
            <FormItem>
              <Input type="textarea" :rows="3"/>
            </FormItem>
            <FormItem>
              <Button type="primary">保存修改</Button>
            </FormItem>
          </Form>
        </div>
      </Col>
      <Col span="8" class="pl-15">
        <div class="border ivu-card-shadow pl-10 pr-15 bgfff">
          <div class="modal-title pl-20 borderB mb-15">模块属性编辑器 [名称：大图/类型：轮播图模块]</div>
          <Form :label-width="100">
            <FormItem label="模块名称：">
              <Input />
            </FormItem>
            <FormItem label="关键字：">
              <i-switch></i-switch>
            </FormItem>
            <FormItem label="双标题：">
              <i-switch></i-switch>
            </FormItem>
            <FormItem label="左上角标控制：">
              <i-switch></i-switch>
            </FormItem>
            <FormItem label="显示更多按钮：">
              <i-switch></i-switch>
            </FormItem>
            <FormItem label="显示换一换按钮：">
              <i-switch></i-switch>
            </FormItem>
            <FormItem label="内容显示数量：">
              <InputNumber></InputNumber>
            </FormItem>
            <FormItem label="内容获取数量：">
              <InputNumber></InputNumber>
            </FormItem>
            <FormItem label="内容跳过数量：">
              <InputNumber></InputNumber>
            </FormItem>
            <FormItem label="数据引用：">
              <i-switch></i-switch>
            </FormItem>
            <FormItem label="数据引用源：">
              <Select placeholder="请选择"></Select>
            </FormItem>
            <FormItem label="模块合并：">
              <i-switch></i-switch>
            </FormItem>
            <FormItem label="最低版本：">
              <Select placeholder="请选择"></Select>
            </FormItem>
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
    name: "PageEditor"
  }
</script>

<style scoped>

</style>
