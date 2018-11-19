<style lang="less" scoped>
.searchpart{
  .selCity{
     position: absolute;
    left: 0.3rem;
    top: 0.35rem;
    font-size: 0.3rem;
  }
  .ipt{
    margin-left: 1.2rem;
    background: #f2f2f2;
    border-radius: 3px;
    padding: 8px 6px;
  }
  .weui-cell:before{
    border-top: none;
  }
}
</style>

<template>
    <div class="content">
        <div class="searchpart">
            <span @click.stop="selectCity" class="selCity">苏州   <x-icon type="ios-arrow-down" size="15"></x-icon></span>
            <x-input  title="" placeholder="电影 / 电视剧 / 影人" class="ipt"></x-input> 
        </div>

    </div>
</template>
<script>
export default {
  data() {
    return {
      results: [],
      value: "",
      style:'color:red'
    };
  },
  methods: {
    setFocus() {
      this.$refs.search.setFocus();
    },
    resultClick(item) {
      window.alert("you click the result item: " + JSON.stringify(item));
    },
    getResult(val) {
      console.log("on-change", val);
      this.results = val ? getResult(this.value) : [];
    },
    onSubmit() {
      this.$refs.search.setBlur();
      this.$vux.toast.show({
        type: "text",
        position: "top",
        text: "on submit"
      });
    },
    onFocus() {
      console.log("on focus");
    },
    onCancel() {
      console.log("on cancel");
    },
    selectCity(){
      this.$router.push({
        name:'city'
      })
      console.log('clic')
    }
  }
};
</script>

