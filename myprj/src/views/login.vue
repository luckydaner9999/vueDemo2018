<template>
    <div class="login">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="80">
        <FormItem prop="user" label="用户">
            <Input type="text" v-model="formInline.user" placeholder="Username">
            </Input>
        </FormItem>
        <FormItem prop="password" label="密码">
            <Input type="password" v-model="formInline.password" placeholder="Password">
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')" class="loginBtn">登录</Button>
        </FormItem>
    </Form>
    </div>
</template>
<script>
import {Login} from "../libs/getData";
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
            console.log(this.formInline)
          Login(this.formInline, res => {
            debugger;
          });
        //   this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  },
  created() {}
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  margin-top: 350px;
}
.login .ivu-form {
  width: 320px;
  margin: auto;
}
.loginBtn{
   
}
</style>

