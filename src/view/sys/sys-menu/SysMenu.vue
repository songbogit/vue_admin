<template>
  <Card>
    <Row>
      <Col span="24" class="mb-10">
        <Button type="primary" class="mr-5" icon="md-add">添加子菜单</Button>
        <Button class="mr-5" icon="md-add" @click="addLevelOne">添加一级菜单</Button>
        <Button class="mr-5" icon="md-trash">批量删除</Button>
        <Button class="mr-5" icon="ios-refresh">刷新</Button>
      </Col>
      <Col span="6">
        <Alert show-icon>当前选择：</Alert>
        <!--<Input placeholder="请输入菜单名称搜索" clearable icon="md-search"/>-->
        <Tree :data="menus" @on-select-change="selectChange" show-checkbox></Tree>
        <SpinUtil :show="loading"/>
      </Col>
      <Col span="10">
        <Form ref="change" :label-width="120" :model="changeEntity" :rules="rules">
          <FormItem label="菜单名称：" prop="title">
            <Input v-model="changeEntity.title" clearable/>
          </FormItem>
          <FormItem label="路由path：" prop="path">
            <Input v-model="changeEntity.path" clearable/>
          </FormItem>
          <FormItem label="路由name：" prop="name">
            <Input v-model="changeEntity.name" clearable/>
          </FormItem>
          <FormItem label="排序值：">
            <InputNumber v-model="changeEntity.sortOrder" /><span class="ml-5">值越小越靠前，支持小数</span>
          </FormItem>
          <FormItem label="菜单图标：" prop="icon">
            <Input v-model="changeEntity.icon" :icon="changeEntity.icon"/>
            <a target="_blank" href="https://www.iviewui.com/components/icon">参考iview官方icons</a>
          </FormItem>
          <FormItem label="前端组件路径：" prop="component">
            <Input v-model="changeEntity.component" clearable/>
          </FormItem>
          <FormItem>
            <Button type="primary" icon="ios-create" class="mr-5" :loading="loading" @click="save(false)">修改并保存</Button>
            <Button @click="resetChangeEntity">重置数据</Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
    <ModalUtil ref="modal" title="添加菜单" @reset="reset(saveEntity, 'save')" :loading="loading" @on-ok="save(true)">
      <Form ref="save" :label-width="120" :model="saveEntity" :rules="rules">
        <FormItem label="上级菜单：" v-if="saveEntity.parentId">
          {{saveEntity.parentName}}
        </FormItem>
        <FormItem label="菜单名称：" prop="title">
          <Input v-model="saveEntity.title" clearable/>
        </FormItem>
        <FormItem label="路由path：" prop="path">
          <Input v-model="saveEntity.path" clearable/>
        </FormItem>
        <FormItem label="路由name：" prop="name">
          <Input v-model="saveEntity.name" clearable/>
        </FormItem>
        <FormItem label="排序值：">
          <InputNumber v-model="saveEntity.sortOrder" /><span class="ml-5">值越小越靠前，支持小数</span>
        </FormItem>
        <FormItem label="菜单图标：" prop="icon">
          <Input v-model="saveEntity.icon" :icon="saveEntity.icon"/>
          <a target="_blank" href="https://www.iviewui.com/components/icon">参考iview官方icons</a>
        </FormItem>
        <FormItem label="前端组件路径：" prop="component">
          <Input v-model="saveEntity.component" clearable/>
        </FormItem>
      </Form>
    </ModalUtil>
  </Card>
</template>

<script>
  import {permissionSave, permissionList} from "../../../api/sys";

  export default {
    name: "SysMenu",
    data() {
      return {
        loading: false,
        menus: [],
        changeEntity: {
          component: null,
          icon: null,
          path: null,
          name: null,
          sortOrder: null,
          title: null
        },
        saveEntity: {
          parentName: '',
          component: null,
          icon: null,
          path: null,
          name: null,
          sortOrder: null,
          title: null
        },
        rules: {
          name: [
            { required: true, type: 'string', message: '请输入路由name', trigger: 'blur' }
          ],
          component: [
            { required: true, type: 'string', message: '请输入组件路径', trigger: 'blur' }
          ],
          path: [
            { required: true, type: 'string', message: '请输入路由path', trigger: 'blur' }
          ],
          title: [
            { required: true, type: 'string', message: '请输入菜单名称', trigger: 'blur' }
          ],
          icon: [
            { required: true, type: 'string', message: '请输入菜单图标', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      addLevelOne() {
        this.reset(this.saveEntity, 'save');
        this.saveEntity.level = 1;
        this.toggle('modal', true);
      },
      save(flag) {
        const refName = flag ? 'save' : 'change';
        const entity = flag ? this.saveEntity : this.changeEntity;
        this.$refs[refName].validate(valid => {
          if (valid) {
            this.loading = true;
            permissionSave(entity).then(res => {
              this.loading = false;
              if (res.code == 200) {
                this.toggle('modal', false);
                this.get();
              }
            })
          }
        })
      },
      get() {
        this.loading = true;
        permissionList({}).then(res => {
          this.loading = false;
          if (res.code == 200) {
            this.menus = res.data || [];
          }
        })
      },
      selectChange(arr) {
        this.changeEntity = {...(arr[0] || {})};
      },
      resetChangeEntity() {
        Object.assign(this.changeEntity, {
          title: null,
          path: null,
          name: null,
          sortOrder: null,
          icon: null,
          component: null
        })
      }
    },
    created() {
      this.get();
    }
  }
</script>

<style scoped>

</style>
