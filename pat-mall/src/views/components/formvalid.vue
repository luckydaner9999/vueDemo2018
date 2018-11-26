<template>
    <div>
        <Button @click="toggleState">切换状态</Button>
        {{state}}
      <Form :model="formItem" :rules="ruleValidate" ref="formvalid" style="width:500px;margin:auto">
        <FormItem label="用户名称" prop="username">
            <Input v-model="formItem.username" placeholder="请输入用户名"></Input>
        </FormItem>
        <FormItem label="用户密码" prop="userpass">
            <Input v-model="formItem.userpass" placeholder="请输入用户密码"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="tel">
            <Input v-model="formItem.tel" placeholder="请输入联系电话"></Input>
        </FormItem>
        <FormItem label="用户QQ" prop="qq">
            <Input v-model="formItem.qq" placeholder="请输入用户QQ"></Input>
        </FormItem>
      </Form>
    </div>
</template>
<script>
import { validateuserFunc, notvalid } from "@/libs/valid";
export default {
  data() {
    return {
      formItem: {
        username: "",
        userpass: "",
        tel: "",
        qq: ""
      },
      ruleValidate: {
        username: [{ validator: this.validCheck, trigger: "blur" }],
        userpass: "",
        tel: "",
        qq: ""
      },
      state: true
    };
  },
  methods: {
    toggleState() {
      this.state = !this.state;
      if (this.state) {
        this.ruleValidate.username.validator = validateuserFunc;
      } else {
        this.ruleValidate.username.validator = null;
      }
    },
    validCheck(){
        
    }
  }
};
</script>

