<template>
   <div>
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
              <div v-for="(item, m) in items" :key="m"  @click="showEdit(item,m)">
                <div class="preview" v-show="m!==checkIndex">
                   <div class="title">{{item.label}}</div>
                   <RadioGroup v-if="item.type==='radio'" vertical>
                        <Radio :label="childItem.text" disabled v-for="(childItem,k) in item.items" :key="k"></Radio>
                    </RadioGroup>
                    <CheckboxGroup v-if="item.type==='checkbox'" vertical>
                        <Checkbox :label="childItem.text" disabled v-for="(childItem,k) in item.items" :key="k"></Checkbox>                       
                    </CheckboxGroup>
                    <div v-if="item.type==='date' || item.type==='datetime'" >
                      <DatePicker :type="item.type" placeholder="请选择日期时间" style="width: 200px" disabled></DatePicker>
                    </div>
                    <div v-if="item.type==='time'">
                      <TimePicker type="time" placeholder="请选择时间" style="width: 200px" disabled></TimePicker>
                    </div>
                    <div v-if="item.type==='text'">
                       <Input  placeholder="请输入" style="width: 200px" disabled></Input>
                    </div>
                    <div v-if="item.type==='dropdown'">
                      <Select style="width:200px" disabled>
                      </Select>
                    </div>
                </div>
                <edit-element v-if="selectObj && m===checkIndex"
                ref="editEle"
                :item.sync="selectObj"
                @delete="deleteEle"
                @copy="copyEl">
                </edit-element>
             
              </div>
             
            </div>
        </Split>
        
    </div>
    <Button @click="saveTemplate" style="float:right">保存模板</Button>
   </div>
</template>
<script>
import editElement from "./editelement.vue";
export default {
  data() {
    return {
      split1: 0.15,
      checkIndex: -1,
      other: true,
      controls: [
        {
          type: "radio", //类型
          label: "单选", //组件名称
          displayDescription: false, //是否展示描述信息
          description: "", //描述信息
          isHidden: false, //是否隐藏
          _id: "", //关联数据项
          required: true, //对否必填
          items: [
            {
              isOther: false,
              text: "选项1",
              _id: this.getRandomId()
            }
          ]
        },
        {
          type: "checkbox", //类型
          label: "多选", //组件名称
          displayDescription: false, //是否展示描述信息
          description: "", //描述信息
          isHidden: false, //是否隐藏
          _id: "", //关联数据项
          required: true, //对否必填
          items: [
            {
              isOther: false,
              text: "选项1",
              _id: this.getRandomId()
            }
          ]
        },
        {
          type: "dropdown", //类型
          label: "下拉框", //组件名称
          displayDescription: false, //是否展示描述信息
          description: "", //描述信息
          isHidden: false, //是否隐藏
          _id: "", //关联数据项
          required: true, //对否必填
          items: [
            {
              isOther: false,
              text: "选项1",
              _id: this.getRandomId()
            }
          ]
        },
        {
          type: "text", //类型
          label: "输入框", //组件名称
          displayDescription: false, //是否展示描述信息
          description: "", //描述信息
          isHidden: false, //是否隐藏
          _id: "", //关联数据项
          required: true //对否必填
        },
        {
          type: "date", //类型
          label: "日期", //组件名称
          displayDescription: false, //是否展示描述信息
          description: "", //描述信息
          isHidden: false, //是否隐藏
          _id: "", //关联数据项
          required: true //对否必填
        },
        {
          type: "datetime", //类型
          label: "日期时间", //组件名称
          displayDescription: false, //是否展示描述信息
          description: "", //描述信息
          isHidden: false, //是否隐藏
          _id: "", //关联数据项
          required: true //对否必填
        },
        {
          type: "time", //类型
          label: "时间", //组件名称
          displayDescription: false, //是否展示描述信息
          description: "", //描述信息
          isHidden: false, //是否隐藏
          _id: "", //关联数据项
          required: true //对否必填
        }
      ],
      items: [],
      selectObj: null
    };
  },
  methods: {
    selectCon(obj) {
      let ob = JSON.parse(JSON.stringify(obj));
      ob._id = this.getRandomId();
      this.items.push(ob);
    },
    //选中当前组件
    showEdit(obj, m) {
      this.selectObj = obj;
      this.checkIndex = m;
      if (obj.items) {
        this.judgeHasOther(obj.items);
      }
    },
    //判断是否有其他项
    judgeHasOther(obj) {
      let ob = obj.find(x => x.isOther);
      this.other = ob ? false : true;
    },
  
    // 删除当前组件
    deleteEle(obj) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要删除该选项吗",
        onOk: () => {
          this.items = this.items.filter((val) => val._id !== obj._id);
        }
      });
    },
    // 复制当前组件
    copyEl(obj) {
      let ob = JSON.parse(JSON.stringify(obj));
      ob._id=this.getRandomId();
      this.items.push(ob);
      this.other = false;
    },
    saveTemplate() {
      debugger
      console.log(JSON.stringify(this.items));
    },
    // 获取随机id
    getRandomId() {
      return new Date()
        .getTime()
        .toString(32)
        .toUpperCase();
    }
  },
  created() {
   
  },
  components: {
    editElement
  }
};
</script>
<style lang="less" >
.title {
  color: #333333;
  font-size: 15px;
  font-weight: bold;
  line-height: 36px;
}
.conItem {
  cursor: pointer;
  border: solid 1px #d2d2d2;
  border-radius: 3px;
  padding: 5px;
  margin-bottom: 10px;
  text-align: center;
}
.preview {
  padding: 10px;
  .ivu-checkbox-group-item {
    display: block;
  }
  .ivu-select-disabled .ivu-select-selection,.ivu-input[disabled], fieldset[disabled] .ivu-input{
    background: #ffffff;
  }
}
.preview:hover {
  border: dashed 2px #f65;
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
</style>
