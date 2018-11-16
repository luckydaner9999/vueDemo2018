<style lang="less" scoped>
.searchpart{
  .selCity{
     position: absolute;
    left: 0.3rem;
    top: 0.38rem;
    font-size: 0.25rem;
  }
  .ipt{
    margin-left: 1.2rem;
    background: #f2f2f2;
    border-radius: 3px;
    padding: 8px 6px;
  }
}
</style>

<template>
    <div>
        <div class="searchpart">
            <span @click.stop="select" class="selCity">苏州   <x-icon type="ios-arrow-down" size="12"></x-icon></span>
            <x-input  title="" placeholder="电影 / 电视剧 / 影人" class="ipt"></x-input> 
        </div>
    <!-- <search
      placeholder="电影 / 电视剧 / 影人"
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="value"
      position="absolute"
      auto-scroll-to-top     
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      :auto-fixed="true"
      ref="search"></search> -->
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
    select(){
      console.log('clic')
    }
  }
};
</script>

