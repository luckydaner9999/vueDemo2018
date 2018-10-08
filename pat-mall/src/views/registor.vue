
<template>
    <div>
       <div class="registor">
         <!-- <Button @click="toggleTheme">切换主题</Button> -->
         <div class="cont">
           <Tabs value="registor">
               <TabPane label="注册" name="registor">
                  <Form ref="formInline" :model="formInline" :rules="ruleInline">
                    <FormItem prop="user">
                        <Input type="text" v-model="formInline.user" placeholder="请输入用户名">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" placeholder="请输入密码">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="confirmPass">
                        <Input type="password" v-model="formInline.confirmPass" placeholder="请再次输入密码">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem style="text-align:center">
                        <Button type="primary" @click="handleSubmit('formInline')" >注册</Button>
                    </FormItem>
                  </Form>
               </TabPane>
               <TabPane label="登录" name="login">
                 <Form ref="formInline" :model="formInline" :rules="ruleInline">
                    <FormItem prop="user">
                        <Input type="text" v-model="formInline.user" placeholder="请输入用户名">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" placeholder="请输入密码">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem style="text-align:center">
                        <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
                    </FormItem>
                  </Form>
               </TabPane>
              
           </Tabs>
          
         </div>
          

       </div>
    </div>
</template>
<script>
import headTop from "@/components/headTop.vue";

export default {
  data() {
    return {
      logo: "logo",
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [{ required: true, message: "请填写用户名" }],
        password: [
          { required: true, message: "请填写密码" },
          { type: "string", min: 6, message: "密码长度应超过6位" }
        ]
      }
    };
  },
  methods:{
toggleTheme(){
  alert('切换主题');
}
  },
  components: {
    "head-top": headTop
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/styles/variables.less";
@import "~@/assets/styles/style.less";
</style>


