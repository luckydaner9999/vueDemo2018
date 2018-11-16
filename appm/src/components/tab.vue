<style lang="less" scoped>
.tab {
  position: fixed;
  left: 0;
  .iconfont{
    font-size: 18px;
  }
}
</style>

<template>
  <div>
    <router-view></router-view>
    <tabbar style="position: fixed;left:0" class="tab">
      <tabbar-item v-for="(item,index) in tabs" :key="index" :link="item.link">            
        <i class="iconfont" :class="item.logo" slot="icon"></i>
        <span slot="label">{{item.tab}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabs: [
        {
          tab: "热映",
          logo: "icon-dianying",
          link:'/moveList'
        },
        {
          tab: "排行",
          logo: "icon-paihang",
          link:'/ranking'
        },
        {
          tab: "我的",
          logo: "icon-wode",
          link:'/my'
        }
      ]
    };
  },
  methods: {
    handler() {}
  }
};
</script>


