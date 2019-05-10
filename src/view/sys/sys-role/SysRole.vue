<template>
  <Card>
    <ManagerView ref="manager" :del="false" :columns="columns" @on-save="toggle('modal')" @on-success="successHandler" @on-error="errorHandler">
      <Button class="ml-10" type="error" @click="del" @on-save="toggle('modal')">批量删除</Button>
    </ManagerView>
    <ModalUtil ref="modal" :title="entity.id ? '编辑角色' : '添加角色'" @reset="reset(entity)" @on-ok="save" :loading="loading">
      <Form ref="form" :label-width="100" :model="entity" :rules="rules">
        <FormItem label="角色名称：" prop="roleName">
          <Input v-model="entity.roleName"/>
        </FormItem>
        <FormItem label="角色描述：">
          <Input v-model="entity.description"/>
        </FormItem>
      </Form>
    </ModalUtil>
    <ModalUtil ref="role" @on-ok="editPerm">
      <Tree ref="tree" :data="menus" multiple></Tree>
    </ModalUtil>
  </Card>
</template>

<script>
  import {rolePageList, roleAdd, roleEdit, roleDelete, roleEditPerm} from "../../../api/sys";
  import {permissionList} from "../../../api/sys";

  export default {
    name: "SysRole",
    data() {
      return {
        loading: false,
        menus: [],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '角色名称',
            align: 'center',
            key: 'roleName'
          },
          {
            title: '备注',
            align: 'center',
            key: 'description'
          },
          {
            title: '操作',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  class: 'mr-5',
                  on: {
                    click: () => {
                      const {id, roleName, description} = params.row;
                      this.entity.roleName =roleName;
                      this.entity.id = id;
                      this.entity.description = description;
                      this.toggle('modal');
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    size: 'small',
                    type: 'warning'
                  },
                  class: 'mr-5',
                  on: {
                    click: () => {
                      this.perms = params.row.permissions || [];
                      this.selectedTree(this.menus);
                      this.roleId = params.row.id;
                      this.toggle('role');
                    }
                  }
                }, '分配权限'),
                h('Button', {
                  props: {
                    size: 'small',
                    type: 'error'
                  },
                  on: {
                    click: () => {
                      this.$sure(() => {
                        this.$mgr('del', [params.row.id]);
                      })
                    }
                  }
                }, '删除'),
              ]);
            }
          },
        ],
        entity: {
          roleName: null,
          description: null,
        },
        roleId: null,
        perms: [],
        rules: {
          roleName: [
            {required: true, type: 'string', message: '请填写角色名称', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      selectedTree(arr) {
        const ids = this.perms.map(item => item.id);
        arr.forEach(item => {
          if (ids.indexOf(item.id) > -1) {
            item.selected = true;
          } else {
            item.selected = false;
          }
          if (Array.isArray(item.children) && item.children.length > 0) {
            this.selectedTree(item.children);
          }
        })
      },
      editPerm() {
        const permIds = this.$refs['tree'].getSelectedNodes().map(item => item.id);
        this.loading = true;
        this.$mgr('perm', {
          roleId: this.roleId,
          permIds: permIds.join(',')
        })
      },
      save() {
        const key = !!this.entity.id ? 'edit' : 'add';
        this.loading = true;
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.$mgr(key, this.entity);
          }
        })
      },
      del() {
        const ids = this.$refs['manager'].removeChecked();
        if (ids.length == 0) {
          this.$Message.error('请选择删除项');
          return ;
        } else {
          this.$sure(() => {
            this.$mgr('del', ids);
          })
        }
      },
      successHandler(type) {
        this.loading = false;
        if (['add', 'edit'].indexOf(type) > -1) {
          this.toggle('modal', false);
        } else if (type == 'perm') {
          this.toggle('role', false);
        }
      },
      errorHandler() {
        this.loading = false;
      }
    },
    provide() {
      return {
        handlers: {
          search: rolePageList,
          add: roleAdd,
          edit: roleEdit,
          perm: roleEditPerm,
          del: roleDelete
        }
      }
    },
    created() {
      permissionList({}).then(res => {
        if (res.code == 200) {
          this.menus = res.data || [];
        }
      })
    }
  }
</script>

<style scoped>

</style>
