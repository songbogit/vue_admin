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
        <Button type="primary">搜索</Button>
      </SearchItem>
      <SearchItem>
        <Button type="primary">重置搜索条件</Button>
      </SearchItem>
    </div>
    <ManagerView :columns="columns"/>
  </Card>
</template>

<script>
  export default {
    name: "SysUser",
    data() {
      return {
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '用户名',
            align: 'center',
            key: ''
          },
          {
            title: '昵称',
            align: 'center',
            key: ''
          },
          {
            title: '角色',
            align: 'center',
            key: ''
          },
          {
            title: '状态',
            align: 'center',
            key: ''
          },
          {
            title: '操作',
            align: 'center',
            render: (h, params) => {

            }
          },
        ]
      }
    },
    methods: {

    },
    provide() {
      return {
        handlers: {

        }
      }
    }
  }
</script>

<style scoped>

</style>
