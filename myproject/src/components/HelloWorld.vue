<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>d</div>
   
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "HelloWorld"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@fColor:#2d8cf0;
h1,
h2 {
  font-weight: normal;
  color: @fColor;
  
}
div{
  color: @fColor
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
