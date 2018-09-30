<style lang="less">
.top-right {
  height: 60px;
  line-height: 60px;
  text-align: right;
  padding-right: 20px;
  ul {
    display: inline-block;
    list-style: none;
    height: 60px;
    line-height: 60px;
    li {
      display: inline-block;
    }
  }
}
.ivu-row.navTop {
  border-bottom: solid 1px #dcdee2;
}
.ivu-menu-horizontal.ivu-menu-light:after {
  background: #ffffff;
  height: 0;
}
</style>

<template>
 <div>
     <Row class="navTop">
        <Col span="12">
        <Menu mode="horizontal" :theme="theme1" active-name="1">
            <MenuItem name="1">
                波奇网
            </MenuItem>
            <MenuItem name="2">
               波奇商城
            </MenuItem>
            <MenuItem name="3">   
                波奇服务
            </MenuItem>
            <MenuItem name="4">
               波奇论坛
            </MenuItem>
            <MenuItem name="5">
               宠物百科
            </MenuItem>
        </Menu>  
        </Col>
        <Col span="12" class="top-right">
         <ul>
            <li><a href="登录">登录</a></li>
            <li><a href="注册">注册</a></li>
            <li><a href="微博">微博</a></li>
            <li><a href="微信">微信</a></li>
            <li><a href="手机版">手机版</a></li>
        </ul>
        </Col>
     </Row>
       
   
 </div>
</template>
<script>
export default {
  name: "headTop",
  data() {
    return {
      theme1: "light"
    };
  }
};
</script>

