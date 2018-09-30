
<template>
    <div>
       <div class="registor">
           <!-- <div class="title">
               <span>{{logo}}</span><span>用户注册</span>
           </div> -->
       </div>
    </div>
</template>
<script>
import headTop from "@/components/headTop.vue";

export default {
  data() {
    return {
      logo: "logo"
    };
  },
  components: {
    "head-top": headTop
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/styles/variables.less";
.bg {
  background: @bgColor;
  color: @baseColor;
}
</style>


