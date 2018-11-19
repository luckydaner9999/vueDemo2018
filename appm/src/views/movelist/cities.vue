<style lang="less" scoped>
.cities {
  .vux-tab-wrap {
    border-top: solid 1px #e5e5e5;
  }
  .vux-x-input {
    background: #ffffff;
  }
  .city {
    p {
      line-height: 0.6rem;
      text-align: left;
      padding: 5px;
      border-bottom: solid 1px #eeeeee;
    }
    .title {
      background: #f2f2f2;
      color: #666666;
      border: none;
    }
    button {
      background: #fff;
      border: none;
      outline: none;
      height: 0.65rem;
      line-height: 0.65rem;
      width: 70%;
      font-size: 0.3rem;
      border-radius: 3px;
    }
    .vux-flex-row {
      padding: 5px;
      background: #f2f2f2;
      text-align: center;
    }
  }
}
</style>

<template>
    <div class="cities">
        <x-header :left-options="{backText: ''}" >选择城市</x-header>
        <tab v-model="index01" prevent-default @on-before-index-change="switchTabItem">
          <tab-item selected>国内</tab-item>
          <tab-item>海外</tab-item>       
        </tab>
        <x-input title="必须输入2333"  placeholder="输入城市名称查询">
           <icon type="search" slot="label"></icon>
        </x-input>
        <div class="city">
           <p class="title">热门城市</p>
           <flexbox :gutter="0">
             <flexbox-item >
                <x-button  :plain="true">深圳</x-button>
             </flexbox-item>
             <flexbox-item >
                <x-button  :plain="true">成都</x-button>
             </flexbox-item>
             <flexbox-item>
                <x-button  :plain="true">武汉</x-button>
             </flexbox-item>
           </flexbox>
        </div>
        <div v-for="(city,idx) in cities" :key="idx" class="city">
           <p class="title">{{city.captal}}</p>
           <div class="list">
               <p class="item" v-for="(item,index) in city.cities" :key="index">
                    {{item.value}}
               </p>
           </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      index01: 0,
      type: 1,
      lang: "zh-CN",
      cities: [
        {
          captal: "A",
          cities: [
            {
              key: "anhui",
              value: "安徽"
            },
            {
              key: "aomen",
              value: "澳门"
            }
          ]
        }
      ]
    };
  },
  methods: {
    switchTabItem(index) {
      console.log("on-before-index-change", index);
      this.index01 = index;
      /**
       * 切换语言
       */
      if (index) {
        this.lang = "en-US";
        this.$i18n.locale = this.lang; //关键语句
      } else {
        this.lang = "zh-CN";
        this.$i18n.locale = this.lang; //关键语句
      }
    },
    getP() {},
    change(value, label) {
      console.log("change:", value, label);
    }
  },
  computed: {}
};
</script>

