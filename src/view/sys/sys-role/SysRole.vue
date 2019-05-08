<template>
  <Card>
    <ManagerView :columns="columns"/>
  </Card>
</template>

<script>
  export default {
    name: "SysRole",
    data() {
      return {
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '角色名称',
            align: 'center',
            key: ''
          },
          {
            title: '备注',
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
