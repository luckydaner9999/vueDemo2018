<template>
  <div id="app">   
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 0.3rem;
}
body{
  background: #ffffff;
  margin: 0;
}
p{
  margin: 0;
}
.content{
  padding: 8px;
}

</style>
