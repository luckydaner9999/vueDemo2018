<template>
    <div>
        <Form  :label-width="80" class="prevForm" :model="dataValue" id="pdfDom">
            <div v-for="(item,index) in datas.items" :key="index">
              <FormItem :label="item.label" v-if="item.type==='text'" :prop="item._id">
                <Input v-if="item.isMultiline" placeholder="请填写" type="textarea" v-model="dataValue[item._id]"></Input>
                <Input v-else placeholder="请填写" type="text" v-model="dataValue[item._id]"></Input>
              </FormItem>
               <FormItem :label="item.label" v-if="item.type==='radio'" :prop="item._id">
                <RadioGroup :vertical="item.isVertical" v-model="dataValue[item._id]">
                  <Radio :label="option._id" v-for="(option,idx) in item.items" :key="idx">{{option.text}}</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem :label="item.label" v-if="item.type==='checkbox'" :prop="item._id">
                <CheckboxGroup  v-model="dataValue[item._id]">
                 <Checkbox :label="option._id" v-for="(option,idx) in item.items" :key="idx" :class="item.isVertical ? 'isVertical' : ''">{{option.text}}</Checkbox>
               </CheckboxGroup>  
              </FormItem>
              <FormItem :label="item.label" v-if="item.type==='dropdown'" :prop="item._id">
              <Select v-model="dataValue[item._id]">
                <Option :value="option._id" v-for="(option) in item.items" :key="option._id">{{option.text}}</Option>
              </Select>    
              </FormItem>
              <FormItem :label="item.label" v-if="item.type==='date' || item.type==='datetime'" :prop="item._id">
              <DatePicker :type="item.type" :placeholder="'Select'+ item.type" v-model="dataValue[item._id]"></DatePicker>   
              </FormItem>
              <FormItem :label="item.label" v-if="item.type==='time'" :prop="item._id">
              <TimePicker :type="item.type" placeholder="Select time" v-model="dataValue[item._id]"></TimePicker >   
              </FormItem>      
               <div v-if="item.type==='text-matrix' || item.type==='radio-matrix' || item.type==='checkbox-matrix'">
               <div class="title">{{item.label}}</div>
               <table class="matrix" v-show="item.columns.length>0 || item.rows.length>0">
                  <tr >
                    <th>题目</th>
                    <th v-for="(column,n) in item.columns" :key="n">                     
                      {{column.text}}
                    </th>
                  </tr>  
                  <tr v-for="(row,m) in item.rows" :key="m">
                    <td>{{row.text}}</td>
                    <td v-for="(column,n) in item.columns" :key="n">
                    
                      <div v-if="item.type==='radio-matrix'">
                        <input type="radio" :id="row._id+column._id" :value="row._id+column._id" v-model="picked">
                        <label :for="row._id+column._id"></label>
                      </div>
                      <div v-if="item.type==='checkbox-matrix' " >
                        <input type="checkbox" :name="row._id" :id="row._id+column._id" :value="row._id+column._id" v-model="checkList">   
                        <label :for="row._id+column._id"></label>
                      </div>
                      <Input v-if="item.type==='text-matrix'" v-model="dataValue[item._id+'-'+row._id+'-'+column._id]"></Input>
                    </td>
                  </tr>
                 
                </table> 
           
         
               
                </div>

            </div>
        
     
    </Form>
    <Button @click="previewForm">预览</Button>
    <Button @click="saveData">保存</Button>
    <Button @click="getPdf()">导出PDF文件</Button>
    </div>
</template>
<script>
export default {
  data() {
    return {
      dataValue: {},
      datas: {
        checkList: [],
        items: [],
        logicRules: []
      },
      picked: [],
      checkList: [],
      htmlTitle: "页面导出PDF文件名"
    };
  },
  methods: {
    saveData() {
      debugger;
    },
    previewForm() {
      (this.datas.items = [
        {
          type: "radio",
          label: "单选",
          displayDescription: false,
          description: "",
          isHidden: false,
          _id: "1CPH800M9",
          required: true,
          items: [
            { isOther: false, text: "选项1", _id: "1CPH7VUFU" },
            { isOther: false, text: "选项2", _id: "1CPH803RH" },
            { isOther: false, text: "选项3", _id: "1CPH804CJ" },
            { isOther: false, text: "选项4", _id: "1CPH804U1" },
            { isOther: true, text: "其他", _id: "1CPH805M1" }
          ]
        },
        {
          type: "checkbox",
          label: "多选",
          displayDescription: false,
          description: "",
          isHidden: false,
          _id: "1CPH801L8",
          required: true,
          items: [
            { isOther: false, text: "选项1", _id: "1CPH7VUFU" },
            { isOther: false, text: "选项2", _id: "1CPH80GJI" }
          ]
        },
        {
          type: "text",
          label: "输入框",
          displayDescription: false,
          description: "",
          isHidden: false,
          _id: "1CPH80E73",
          required: true
        }
      ]),
        (this.datas.logicRules = [
          {
            item: "1CPH800M9",
            rule: { options: "1CPH7VUFU", displayItem: ["1CPH80E73"] }
          }
        ]);

      this.datas.logicRules.forEach(element => {
        if (
          this.dataValue[element.item] &&
          element.rule.options === this.dataValue[element.item]
        ) {
          debugger;
          console.log(element.rule.displayItem);
        }
      });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.prevForm {
  margin: 20px 400px;
  background: #ffffff;
  padding: 10px;
  border-radius: 3px;
  box-shadow: 0px 2px 8px #f2f2f2;
  .title {
    font-size: 12px;
    color: #515a6e;
    line-height: 1;
    padding: 10px 12px 10px 0;
  }
}
.isVertical.ivu-checkbox-group-item {
  display: block;
}
.matrix {
  width: 100%;
  border-spacing: 0;
  border-radius: 3px;
  box-sizing: border-box;
  text-align: center;
  margin-bottom: 24px;
  border-right: solid 1px #e5e5e5;
  border-bottom: solid 1px #e5e5e5;
}

.matrix tr th:first-child {
  min-width: 60px;
}
.matrix tr th,
.matrix tr td:first-child {
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


