<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form';
import { login } from "../../api/user";
import { setUserInfo } from "../../libs/util";

export default {
  components: {
    LoginForm
  },
  methods: {
    handleSubmit ({ userName, password }) {
      login({
        username: userName,
        password: password
      }).then(res => {
        if (res.code == 200) {
          setUserInfo(JSON.stringify(res.data.rbacUser));
          window.location.reload();
          this.$router.push('/home');
        }
      }).catch(res => {

      })
    }
  }
}
</script>

<style>

</style>
