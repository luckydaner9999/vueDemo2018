<template>
    <div class="demo-split">
        <Split v-model="split1">
            <div slot="left" class="demo-split-pane">
                <div class="title">通用组件</div>
                <div>
                      <div v-for="(control,index) in controls" :key="index" @click="selectCon(control)" class="conItem">
                          {{control.label}}
                     </div>  
                </div>
            </div>
            <div slot="right" class="demo-split-pane">
              <div v-for="(item, m) in items" :key="m" class="element" @click="showEdit(item,m)">
                  <div class="itemTitle">
                      {{item.label}}
                  </div>
                <div v-if="item.type==='radio'">
                  
                  <div v-for="(childItem,k) in item.options" :key="k" class="childItem">
                      <Icon type="ios-radio-button-off" />
                      <input type="text" v-model="childItem.label">
                      <Tooltip content="删除" placement="top">
                         <i class="ivu-icon ivu-icon-md-remove-circle" @click="deleteChild(item,k)"></i>
                     </Tooltip>
                      
                  </div>
                   <Button type="text" @click="addDatas(item)" v-if="m==checkIndex"> <Icon type="md-add" />添加选项</Button>
                </div>
                <!-- <div v-if="item.type==='checkbox'">
              
                  <div v-for="(childItem,k) in item.options" :key="k" class="childItem">
                      <Icon type="ios-radio-button-off" />
                      <input type="text" v-model="childItem.label">
                      <i class="ivu-icon ivu-icon-md-remove-circle"></i>
                  </div>
                   <Button type="text" @click="addDatas(item)" v-if="m==checkIndex"> <Icon type="md-add" />添加选项</Button>
                </div> -->
                <div class="elOpt">
                   <span @click="deleteEle(m)">
                        <Icon type="ios-trash" />
                   </span>
                   <span @click="copyEl(item)">
                       <Icon type="md-copy" />
                   </span>

                </div>
              </div>
             
            </div>
        </Split>
    </div>
</template>
<script>
export default {
  data() {
    return {
      split1: 0.15,
      checkIndex: -1,
      controls: [
        {
          type: "radio", //类型
          label: "单选", //组件名称
          displayDescription: false, //是否展示描述信息
          description: "", //描述信息
          isHidden: false, //是否隐藏
          _id: "", //关联数据项
          required: true, //对否必填
          text: "", //内容
          titleAlign: "", // 标题样式,
          options: []
        },
        {
          type: "checkbox", //类型
          label: "多选", //组件名称
          displayDescription: false, //是否展示描述信息
          description: "", //描述信息
          isHidden: false, //是否隐藏
          _id: "", //关联数据项
          required: true, //对否必填
          text: "", //内容
          titleAlign: "", // 标题样式
          options: []
        },
        {
          type: "dropdown", //类型
          label: "下拉框", //组件名称
          displayDescription: false, //是否展示描述信息
          description: "", //描述信息
          isHidden: false, //是否隐藏
          _id: "", //关联数据项
          required: true, //对否必填
          text: "", //内容
          titleAlign: "", // 标题样式，
          options: [
            {
              label: "",
              value: ""
            }
          ]
        }
      ],
      items: []
    };
  },
  methods: {
    selectCon(obj) {
      let ob = JSON.parse(JSON.stringify(obj));
      this.items.push(ob);
    },
    showEdit(obj, m) {
      this.checkIndex = m;
    },
    addDatas(obj) {
      obj.options.push({ label: "选项" + (obj.options.length + 1) });
    },
    deleteChild(obj, k) {
      obj.options = obj.options.filter((val, index) => index !== k);
    },
    // 删除
    deleteEle(m) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要删除该选项吗",
        onOk: () => {
          this.items = this.items.filter((val, index) => index !== m);
        }
      });
    },
    // 复制
    copyEl(obj) {
      this.items.push(obj);
    }
  }
};
</script>
<style>
.title {
  color: #333333;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
}
.demo-split {
  height: 800px;
  border: 1px solid #dcdee2;
  margin: 20px;
  overflow: auto;
}
.demo-split-pane {
  padding: 10px;
}
.conItem {
  cursor: pointer;
  border: solid 1px #d2d2d2;
  border-radius: 3px;
  padding: 5px;
  margin-bottom: 10px;
  text-align: center;
}
.itemTitle {
  font-size: 16px;
  color: #333333;
  padding: 10px 10px 0 10px;
}
.element {
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
  margin: 10px;
  box-sizing: border-box;
  /* padding:10px 0; */
  font-size: 14px;
}
.element input {
  border: none;
  width: 300px;
  outline: none;
  margin-left: 5px;
  padding: 5px;
}
.element input:focus {
  border: none;
}
.childItem:hover input {
  border-bottom: solid 1px #d2d2d2;
}
.childItem:hover .ivu-icon.ivu-icon-md-remove-circle {
  display: inline-block;
}
.element:hover {
  border: dashed 2px #f65;
}
.element .ivu-icon.ivu-icon-md-remove-circle,
a,
.element .ivu-btn-text {
  color: #f65;
}
.element .ivu-icon.ivu-icon-md-remove-circle {
  display: none;
}

.childItem {
  margin-bottom: 10px;
  padding-left: 10px;
}
.elOpt {
  height: 40px;
  background: #f2f2f2;
  margin-top: 10px;
  text-align: right;
  line-height: 40px;
  padding-right: 10px;
}
.elOpt span {
  padding: 5px;
}
.elOpt .ivu-icon {
  font-size: 18px;
}

</style>
