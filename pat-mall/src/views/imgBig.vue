<style lang="less" scoped>
.title {
  text-align: center;
  line-height: 50px;
  margin-bottom: 20px;
}
</style>

<template>
  <div>
    <h2 class="title">图片放大镜效果实现</h2>
    <div>
      <img-zoom
        src="https://raw.githubusercontent.com/jsonpeter/vue2.0-zoom/master/example/img/img-samll.png"
        width="450"
        height="250"
        bigsrc="https://raw.githubusercontent.com/jsonpeter/vue2.0-zoom/master/example/img/img-big.jpg"
        :configs="configs"
      ></img-zoom>
    </div>
  </div>
</template>
<script>
import imgZoom from "vue2.0-zoom";
export default {
  data() {
    return {
      configs: {
        width: 650,
        height: 350,
        maskWidth: 100,
        maskHeight: 100,
        maskColor: "red",
        maskOpacity: 0.2
      }
    };
  },
  components: {
    imgZoom
  }
};
</script>

