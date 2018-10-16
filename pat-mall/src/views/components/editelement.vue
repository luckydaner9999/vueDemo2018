<template>
    <div class="element">
        <!-- 修改标题 -->
                  <div class="itemTitle" :class="item.required ? 'xing' : ''">
                    <input type="text" v-model="item.label">
                     <Select v-model="item.type" size="small" class="selSty" v-if="item.type==='radio' || item.type==='checkbox' || item.type==='dropdown'">
                     <Option  value="radio" key="radio">单选</Option>
                     <Option  value="checkbox" key="checkbox">多选</Option>
                     <Option  value="dropdown" key="dropdown">下拉</Option>
                     </Select>
                  </div>
                  <div v-if="item.displayDescription" class="txtSty">
                    <Input v-model="item.description" placeholder="请输入提示信息（可选）" style="width: 300px" />
                  </div>
                <div v-if="item.type==='radio' || item.type==='checkbox' || item.type==='dropdown'">
                  
                  <div v-for="(childItem,k) in item.items" :key="k" class="childItem">
                      <Icon type="ios-radio-button-off" v-if="item.type==='radio'"/>
                      <span v-if="item.type==='checkbox'" class="checkboxIcon"></span>
                      <span v-if="item.type==='dropdown'">{{k+1}}.</span>
                      <span v-if="childItem.isOther" class="others"><span>其他</span><span></span></span>
                      <input v-else type="text" v-model="childItem.text" >
                      <Tooltip content="移除" placement="top">
                         <i class="ivu-icon ivu-icon-md-remove-circle" @click="deleteChild(item,k)"></i>
                     </Tooltip>
                      
                  </div>
                  <Button type="text" @click="addDatas(item)" v-if="item.type==='radio' || item.type==='checkbox' || item.type==='dropdown'"> <Icon type="md-add" />添加选项</Button>
                   
                   <Button type="text" @click="addDatas(item,'other')" v-show="other"> <Icon type="md-add" />添加其他</Button>
                </div>
                <div v-if="item.type==='text-matrix' || item.type==='radio-matrix' || item.type==='checkbox-matrix'">
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
                         <Input v-if="column.type==='input'"></Input>
                          <Input v-if="column.type==='textarea'" type="textarea" ></Input>
                        
                      </td>
                    </tr>
                     <tr v-else>
                      <td v-for="(column,n) in item.table.columns" :key="n" :class="{hidden:column}" v-if="n>0">
                         <Input v-if="column.type==='input'"></Input>
                          <Input v-if="column.type==='textarea'" type="textarea" ></Input>
                      </td>
                    </tr>
                      
                 </table>

                
               <Button type="text" @click="addnewRow()" > <Icon type="md-add" />添加新题目</Button>                    
                   <Button type="text" @click="addnewColumn()" > <Icon type="md-add" />添加新选项</Button>
                </div>
               
                <div v-if="item.type==='text'" class="txtSty">
                    <Input :type="item.isMultiline ? 'textarea' : 'text'"  style="width: 200px;" disabled :placeholder="item.isNumber ? '123' : ''"></Input>
                </div>
               
                <div class="elOpt">
                   <Checkbox v-model="item.required">必填</Checkbox>                 
                   <Checkbox v-model="item.isHidden">隐藏</Checkbox>
                   <Checkbox v-model="item.isNumber">数字</Checkbox>
                   <Checkbox v-model="item.isMultiline" v-if="item.type==='text'">多行</Checkbox>
                   <span @click="islogic"><i class="ivu-icon ivu-icon-ios-git-branch" style="color:#333333"></i></span>
                   <span @click="showAction">
                        <Tooltip content="更多设置" placement="top">
                         <i class="ivu-icon ivu-icon-ios-more"></i>
                     </Tooltip>
                   </span>
                   <div class="actionsheet" v-show="isShow">
                      <div>
                         <Checkbox v-model="item.displayDescription" @on-change="isAddDes">添加提示信息</Checkbox>    
                      </div>
                      <div>
                         <Checkbox v-model="item.isVertical" v-show="item.type==='radio' || item.type==='checkbox'">纵向显示选项</Checkbox>    
                      </div>             
                   </div>

                  <span class="op">
                       <span @click="deleteEle(item)">
                        <Icon type="ios-trash" />
                   </span>
                   <span @click="copyEl(item)">
                       <Icon type="md-copy" />
                   </span>
                  </span>

                </div>
    </div>
</template>
<script>
export default {
  props: ["item"],
  data() {
    return {
      other: true,
      isShow: false
    };
  },
  methods: {
    addnewRow() {
      for (let i = 0; i < this.item.table.row; i++) {
        let rowObj = {};

        this.item.table.columns.forEach(element => {
          this.$set(rowObj, element.key, '');
          console.log(element.key);
        });
        this.item.table.data.push(rowObj);
      }
    },

    addnewColumn() {
      this.item.table.columns.push({
        key: this.getRandomId(),
        title: "标题" + (this.item.table.columns.length + 1),
        type: "date"
      });
      console.log(this.item.table.columns);
    },
    deleteEle(obj) {
      this.$emit("delete", obj);
    },
    delColumn(obj) {
      this.item.columns = this.item.columns.filter(el => el._id !== obj._id);
    },
    delRow(obj) {
      this.item.rows = this.item.rows.filter(el => el._id !== obj._id);
    },
    copyEl(obj) {
      this.$emit("copy", obj);
    },
    showAction() {
      this.isShow = !this.isShow;
    },
    isAddDes() {
      this.isShow = false;
    },
    islogic() {
      this.$emit("isLogicRule", this.item);
    },
    // 添加选项
    addDatas(obj, isOther) {
      if (isOther) {
        obj.items.push({
          isOther: true,
          text: "其他",
          _id: this.getRandomId()
        });
        this.other = false;
      } else {
        obj.items.push({
          isOther: false,
          text: "选项" + (obj.items.length + 1),
          _id: this.getRandomId()
        });
      }
    },
    // 删除当前选项
    deleteChild(obj, k) {
      obj.items = obj.items.filter((val, index) => index !== k);
      this.judgeHasOther(obj.items);
    },
    // 获取随机id
    getRandomId() {
      return new Date()
        .getTime()
        .toString(32)
        .toUpperCase();
    }
  }
};
</script>

<style lang="less" scoped>
.itemTitle {
  font-size: 16px;
  color: #333333;
  padding: 10px 10px 0 10px;
  position: relative;
  margin-left: 15px;
  margin-bottom: 10px;
}
.itemTitle.xing::before {
  content: "*";
  color: #f65;
  position: absolute;
  top: 18px;
  left: 0;
}
.itemTitle input {
  width: 500px;
  border: none;
  outline: none;
  padding: 5px;
}
.checkboxIcon {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: solid 1px #d2d2d2;
}
.element {
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
  margin: 10px;
  box-sizing: border-box;
  font-size: 14px;
  border: solid 2px #f65;
}
.txtSty {
  margin-bottom: 10px;
  margin-left: 10px;
}

.element .selSty {
  width: 100px;
  float: right;
}
.childItem input {
  border: none;
  width: 300px;
  outline: none;
  margin-left: 5px;
  padding: 5px;
}
.element input:focus {
  border: none;
}
.childItem:hover input,
.itemTitle:hover input {
  border-bottom: solid 1px #d2d2d2;
}
.childItem:hover .ivu-icon.ivu-icon-md-remove-circle {
  display: inline-block;
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
  padding-left: 10px;
  line-height: 40px;
  padding-right: 10px;
  position: relative;
}
.elOpt .actionsheet {
  width: 200px;
  background: #ffffff;
  box-shadow: 2px 2px 2px #d2d2d2;
  padding: 5px;
  position: absolute;
  left: 150px;
  top: 30px;
  z-index: 3;
}
.elOpt > span.op {
  display: inline-block;
  line-height: 40px;
  padding: 0;
  float: right;
}
.elOpt > span {
  padding: 5px;
}
.elOpt .ivu-icon {
  font-size: 18px;
}
.others {
  padding-left: 10px;
  height: 40px;
  display: inline-block;
  line-height: 40px;
  position: relative;
  width: 300px;
}

.others span:last-child {
  position: absolute;
  display: inline-block;
  width: 100px;
  height: 30px;
  border: solid 1px #d2d2d2;
  top: 5px;
  left: 50px;
}
.table-header > div,
.table-row > div {
  display: inline-block;
  width: 200px;
}
</style>

