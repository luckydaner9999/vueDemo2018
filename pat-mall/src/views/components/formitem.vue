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
                    <!-- <div v-if="item.type==='text-matrix' || item.type==='radio-matrix' || item.type==='checkbox-matrix'">
                      <table class="matrix" v-show="item.columns.length>0 || item.rows.length>0">
                        <tr >
                          <th></th>
                          <th v-for="(column,n) in item.columns" :key="n" >
                            {{column.text}}
                          </th>
                        </tr>  
                        <tr v-for="(row,m) in item.rows" :key="m">
                        
                          <td>{{row.text}}</td>
                          <td v-for="(column,n) in item.columns" :key="n" >
                           <Input v-if="item.type==='text-matrix'"></Input>
                           <Radio v-if="item.type==='radio-matrix'"></Radio>
                           <Checkbox v-if="item.type==='checkbox-matrix'"></Checkbox>
                          </td>
                        </tr>
                 
                      </table>
                    </div> -->
                      <div v-if="item.type==='text-matrix'">
                        <!-- {{item.table}} -->
                        <table class="matrix" v-show="item.table.columns.length>0 || item.table.data.length>0">
                    <tr >                      
                      <th v-for="(column,n) in item.table.columns" :key="n" >
                        <Input placeholder="Enter name" style="width: auto" v-model="column.title">
                        <Icon type="md-close-circle" slot="suffix" @click="item.table.columns.splice(n,1)"/> 
                         </Input> 
                      </th>
                    </tr>  
                    <tr>
                    <tr v-for="(row, r) in item.table.data" :key="r" v-if="r%item.table.row===0">
                      <td :rowspan="item.table.row" :class="{ts:item.table.row>1}">
                           {{item.table.columns[0].key}}
                      </td>
                      <td v-for="(column,n) in item.table.columns" :key="n" :class="{hidden:column}" v-if="n>0">
                        <Input v-if="column.type==='text'"></Input>
                           <Radio v-if="column.type==='radio'"></Radio>
                           <Checkbox v-if="column.type==='checkbox'"></Checkbox>
                           <Input type="textarea"></Input>
                        <!-- <Input v-model="row[column.key]"></Input> -->
                      </td>
                    </tr>
                     <tr v-else>
                      <td v-for="(column,n) in item.table.columns" :key="n" :class="{hidden:column}" v-if="n>0">
                        <Input v-model="row[column.key]"></Input>
                      </td>
                    </tr>
                      
                 </table>
                    </div>
                     
                  </div>
                <edit-element v-if="selectObj && m===checkIndex"
                ref="editEle"
                :item.sync="selectObj"
                @delete="deleteEle"
                @copy="copyEl"
                @isLogicRule="isLogicRule">
                </edit-element>
             
              </div>
             
            </div>
        </Split>
        
    </div>
    <Button @click="saveTemplate" style="float:right">保存模板</Button>
     <Modal
        v-model="logicModal"
        title="逻辑设置"
        @on-ok="ok"
        width="500px"
        >
        <Row>
          <Col span="11">
          <div class="modalLog">
            <div class="des">
            如果本题选中
            </div>
            <div v-if="selectObj" >
              <div v-for="(item, index) in selectObj.items" :key="index" class="btn100" :class="logIndex===index ? 'active' : ''" @click="checkLog(index)">
                {{item.text}}
              </div>
            </div>
          </div>
            
          </Col>
          <Col span="2" style="line-height:300px;text-align:center">
          <Icon type="ios-git-branch" style="color: #333;font-size: 20px;"/>
          </Col>
          <Col span="11">
          
         <div class="modalLog">
           <div class="des"> 
           则显示以下问题
          </div>
            <CheckboxGroup v-model="selectLogic.rule.displayItem">
              <Checkbox :label="item._id" v-for="(item, m) in items" :key="m" v-show="m>checkIndex">{{item.label}}</Checkbox>
          </CheckboxGroup>
         </div>
          </Col>
        </Row>
     
    </Modal>
   </div>
</template>
<script>
import editElement from "./editelement.vue";
export default {
  data() {
    return {
      split1: 0.15,
      checkIndex: -1,
      logIndex: 0,
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
        },
        {
          type: "text-matrix", //类型
          label: "矩阵填空", //组件名称
          displayDescription: false, //是否展示描述信息
          description: "", //描述信息
          isHidden: false, //是否隐藏
          _id: "", //关联数据项
          table: {
            row: 4,
            columns: [],
            data: []
          },
          required: true //对否必填
        },
        {
          type: "radio-matrix", //类型
          label: "矩阵单选", //组件名称
          displayDescription: false, //是否展示描述信息
          description: "", //描述信息
          isHidden: false, //是否隐藏
          _id: "", //关联数据项
          columns: [],
          rows: [],
          required: true //对否必填
        },
        {
          type: "checkbox-matrix", //类型
          label: "矩阵多选", //组件名称
          displayDescription: false, //是否展示描述信息
          description: "", //描述信息
          isHidden: false, //是否隐藏
          _id: "", //关联数据项
          columns: [],
          rows: [],
          required: true //对否必填
        }
      ],
      items: [
        {
          type: "text-matrix",
          label: "矩阵填空",
          displayDescription: false,
          description: "",
          isHidden: false,
          _id: "1CPU2TH5Q",
          table: {
            row: 2,
            columns: [
              { key: "1CPU2TJ1A", title: "标题1", type: "text" },
              { key: "1CPU2TJOB", title: "标题2", type: "input" },
              { key: "1CPU2TKCR", title: "标题3", type: "input" },
              // { key: "1CPU2TKOA", title: "标题4", type: "checkbox" },
              { key: "1CPU2TKUK", title: "标题5", type: "textarea" },
              { key: "1CPU2TL5A", title: "标题6", type: "date" }
            ],
            data: [
              {
                "1CPU2TJ1A": "",
                "1CPU2TJOB": "",
                "1CPU2TKCR": "",
                "1CPU2TKOA": "",
                "1CPU2TKUK": "",
                "1CPU2TL5A": ""
              },
              {
                "1CPU2TJ1A": "",
                "1CPU2TJOB": "",
                "1CPU2TKCR": "",
                "1CPU2TKOA": "",
                "1CPU2TKUK": "",
                "1CPU2TL5A": ""
              },
              {
                "1CPU2TJ1A": "",
                "1CPU2TJOB": "",
                "1CPU2TKCR": "",
                "1CPU2TKOA": "",
                "1CPU2TKUK": "",
                "1CPU2TL5A": ""
              },
              {
                "1CPU2TJ1A": "",
                "1CPU2TJOB": "",
                "1CPU2TKCR": "",
                "1CPU2TKOA": "",
                "1CPU2TKUK": "",
                "1CPU2TL5A": ""
              },
              {
                "1CPU2TJ1A": "",
                "1CPU2TJOB": "",
                "1CPU2TKCR": "",
                "1CPU2TKOA": "",
                "1CPU2TKUK": "",
                "1CPU2TL5A": ""
              },
              {
                "1CPU2TJ1A": "",
                "1CPU2TJOB": "",
                "1CPU2TKCR": "",
                "1CPU2TKOA": "",
                "1CPU2TKUK": "",
                "1CPU2TL5A": ""
              },
              {
                "1CPU2TJ1A": "",
                "1CPU2TJOB": "",
                "1CPU2TKCR": "",
                "1CPU2TKOA": "",
                "1CPU2TKUK": "",
                "1CPU2TL5A": ""
              },
              {
                "1CPU2TJ1A": "",
                "1CPU2TJOB": "",
                "1CPU2TKCR": "",
                "1CPU2TKOA": "",
                "1CPU2TKUK": "",
                "1CPU2TL5A": ""
              },
              {
                "1CPU2TJ1A": "",
                "1CPU2TJOB": "",
                "1CPU2TKCR": "",
                "1CPU2TKOA": "",
                "1CPU2TKUK": "",
                "1CPU2TL5A": ""
              },
              {
                "1CPU2TJ1A": "",
                "1CPU2TJOB": "",
                "1CPU2TKCR": "",
                "1CPU2TKOA": "",
                "1CPU2TKUK": "",
                "1CPU2TL5A": ""
              },
              {
                "1CPU2TJ1A": "",
                "1CPU2TJOB": "",
                "1CPU2TKCR": "",
                "1CPU2TKOA": "",
                "1CPU2TKUK": "",
                "1CPU2TL5A": ""
              },
              {
                "1CPU2TJ1A": "",
                "1CPU2TJOB": "",
                "1CPU2TKCR": "",
                "1CPU2TKOA": "",
                "1CPU2TKUK": "",
                "1CPU2TL5A": ""
              }
            ]
          },
          required: true
        }
      ],
      selectObj: null,
      logicRule: [],
      logicModal: false,
      selectLogic: {
        item: "",
        rule: {
          options: "",
          displayItem: []
        }
      }
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
          this.items = this.items.filter(val => val._id !== obj._id);
        }
      });
    },
    // 复制当前组件
    copyEl(obj) {
      let ob = JSON.parse(JSON.stringify(obj));
      ob._id = this.getRandomId();
      this.items.push(ob);
      this.other = false;
    },
    // 关联逻辑
    isLogicRule(obj) {
      this.selectLogic.item = obj._id;
      this.logicModal = true;
    },
    ok() {
      if (this.selectObj)
        this.selectLogic.rule.options = this.selectObj.items[this.logIndex]._id;
      this.logicRule.push(this.selectLogic);
    },
    checkLog(index) {
      this.logIndex = index;
    },
    saveTemplate() {
      debugger;
      console.log(JSON.stringify(this.items));
      console.log(JSON.stringify(this.logicRule));
    },
    // 获取随机id
    getRandomId() {
      return new Date()
        .getTime()
        .toString(32)
        .toUpperCase();
    }
  },
  created() {},
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
.btn100 {
  width: 100%;
  border: none;
  text-align: left;
  height: 36px;
  line-height: 36px;
  padding-left: 10px;
  cursor: pointer;
}

.btn100:hover {
  background-color: #f2f2f2;
}
.btn100.active {
  background-color: #ffffff;
  border-top: solid 1px #d2d2d2;
  border-bottom: solid 1px #d2d2d2;
  box-sizing: border-box;
}
.btn100.active:first-child {
  border-top: none;
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
  .ivu-select-disabled .ivu-select-selection,
  .ivu-input[disabled],
  fieldset[disabled] .ivu-input {
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
.des {
  color: #999;
  font-size: 13px;
}
.modalLog .ivu-checkbox-group-item {
  width: 100%;
  margin-right: 0;
  padding-left: 10px;
  height: 32px;
  line-height: 32px;
}
.modalLog > div:last-child {
  border: solid 1px #d2d2d2;
  height: 300px;
  overflow: auto;
  margin-top: 10px;
  background: #f6f6f6;
}
.matrix {
  min-width: 500px;
  border-spacing: 0;
  border-right: solid 1px #e5e5e5;
  border-bottom: solid 1px #e5e5e5;
  margin-left: 10px;
  border-radius: 3px;
  box-sizing: border-box;
  text-align: center;
}
.matrix tr th:first-child {
  min-width: 60px;
}
.matrix tr th,
.matrix tr td.ts {
  background: #f5f5f5;
}
.matrix tr:first-child th:first-child {
  border-top-left-radius: 3px;
}
.matrix tr:last-child td:first-child {
  border-bottom-left-radius: 3px;
}

.matrix tr td,
.matrix tr th {
  padding: 6px 8px;
  border-left: solid 1px #e5e5e5;
  border-top: solid 1px #e5e5e5;
  text-align: center;
}
.matrix .ivu-input-suffix i {
  color: #f65;
}
</style>
