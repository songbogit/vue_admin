<template>
  <Card>
    <div>
      <SearchItem>
        用户名称：<Input class="w200" placeholder="请输入用户名称"/>
      </SearchItem>
      <SearchItem>
        用户角色：
        <Select placeholder="请选择用户角色" clearable class="w200"></Select>
      </SearchItem>
      <SearchItem>
        用户状态：
        <Select placeholder="请选择用户状态" clearable class="w200"></Select>
      </SearchItem>
      <SearchItem>
        <Button type="primary" @click="mgrSearch">搜索</Button>
      </SearchItem>
      <SearchItem>
        <Button type="primary" @click="reset">重置搜索条件</Button>
      </SearchItem>
    </div>
    <ManagerView ref="manager" :del="false" :columns="columns" @on-save="toggle('modal')" @on-success="successHandler" @on-error="errorHandler">
      <Button type="error" @click="del">批量删除</Button>
    </ManagerView>
    <ModalUtil ref="modal" :title="!entity.id ? '添加用户' : '修改用户'" :loading="loading" @on-ok="save" @reset="reset(entity, 'form')">
      <Form ref="form" :label-width="100" :model="entity" :rules="rules">
        <FormItem label="头像:">
          <NewUpload v-model="entity.avatar"/>
        </FormItem>
        <FormItem label="用户名：" prop="username">
          <Input v-model="entity.username"/>
        </FormItem>
        <FormItem label="密码：" class="ivu-form-item-required" v-if="!entity.id">
          <Input v-model="entity.password"/>
        </FormItem>
        <FormItem label="角色：" prop="roleId">
          <Select v-model="entity.roleId">
            <Option v-for="(item, index) of roles" :value="item.id" :key="'role' + index">{{item.roleName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="昵称：" prop="nickName">
          <Input v-model="entity.nickName"/>
        </FormItem>
        <FormItem label="状态：">
          <RadioGroup v-model="entity.status">
            <Radio :label="0">启用</Radio>
            <Radio :label="-1">禁用</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </ModalUtil>
    <ImageView :imgName="imgName"/>
  </Card>
</template>

<script>
  import {userList, userInfo, userAdd, userEdit, userDelete, userEditStatus, roleList} from "../../../api/sys";
  export default {
    name: "SysUser",
    data() {
      return {
        imgName: '',
        loading: false,
        roles: [],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '用户名',
            align: 'center',
            key: 'username'
          },
          {
            title: '昵称',
            align: 'center',
            key: 'nickName'
          },
          {
            title: '角色',
            align: 'center',
            render: (h, params) => {
              return h('span', params.row.role.roleName);
            }
          },
          {
            title: '头像',
            align: 'center',
            render: (h, params) => {
              return this.$imgRender(h, params.row.avatar);
            }
          },
          {
            title: '操作',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props :{
                    size: 'small',
                    type: 'error'
                  },
                  class: 'mr-5',
                  on: {
                    click: () => {
                      this.$sure(() => {
                        this.$mgr('delete', [params.row.id]);
                      });
                    }
                  }
                }, '删除'),
                h('Button', {
                  props: {
                    size: 'small',
                    type: params.row.status == 0 ? 'warning' : 'default'
                  },
                  class: 'mr-5',
                  on: {
                    click: () => {
                      this.$sure(() => {
                        this.$mgr('status', {
                          id: params.row.id,
                          status: params.row.status == 0 ? -1 : 0
                        })
                      }, `${params.row.status == 0 ? '禁用' : '启用'}确认`,  `是否${params.row.status == 0 ? '禁用' : '启用'}用户${params.row.nickName}？`)
                    }
                  }
                }, params.row.status == 0 ? '禁用' : '启用'),
                h('Button', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      const {id, username, nickName, roleId, avatar} = params.row;
                      this.entity.id = id;
                      this.entity.username = username;
                      this.entity.nickName = nickName;
                      this.entity.roleId = roleId;
                      this.entity.avatar = avatar;
                      this.toggle('modal');
                    }
                  }
                }, '编辑'),
              ]);
            }
          },
        ],
        entity: {
          id: null,
          avatar: null,
          username: null,
          nickName: null,
          password: null,
          roleId: null,
          type: null,
          status: null
        },
        rules: {
          username: [
            { required: true, type: 'string', message: '请输入用户名', trigger: 'blur' }
          ],
          nickName: [
            { required: true, type: 'string', message: '请输入昵称', trigger: 'blur' }
          ],
          roleId: [
            { required: true, type: 'number', message: '请选择角色', trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      save() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            const entity = {...this.entity};
            const key = !!entity.id ? 'edit' : 'add';
            if (!!entity.id) {
              delete entity.password;
            } else {
              if (!entity.password) {
                this.$Message.error('添加用户请填写密码');
                return ;
              }
            }
            this.loading = true;
            this.$mgr(key, entity);
          }
        });
      },
      del() {
        const ids = this.$refs['manager'].removeChecked();
        if (ids.length == 0) {
          this.$Message.error('请选择删除项');
          return ;
        } else {
          this.$sure(() => {
            this.$mgr('delete', ids);
          })
        }
      },
      successHandler(type) {
        this.loading = false;
        if (['add', 'edit'].indexOf(type) > -1) {
          this.toggle('modal', false);
        }
      },
      errorHandler() {
        this.loading = false;
      }
    },
    provide() {
      return {
        handlers: {
          search: userList,
          add: userAdd,
          edit: userEdit,
          status: userEditStatus,
          delete: userDelete
        }
      }
    },
    created() {
      roleList({}).then(res => {
        if (res.code == 200) {
          this.roles = res.data || [];
        }
      })
    }
  }
</script>

<style scoped>

</style>
