<template>
    <div>
        <Form  :label-width="80" style="margin:20px" :model="dataValue">
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
              <table>
                  <tr v-for="(row,m) in item.rows" :key="m">
                      <th>{{row.text}}</th>
                  </tr>
              </table>

            </div>
        
     
    </Form>
    <Button @click="saveData">保存</Button>
    </div>
</template>
<script>
export default {
  data() {
    return {
      dataValue: {},
      datas: {
        items: [
          {
            type: "radio",
            label: "单选",
            displayDescription: false,
            description: "",
            isHidden: false,
            _id: "1CPEASED8",
            required: true,
            items: [
              { isOther: false, text: "选项1", _id: "1CPEAS5LC" },
              { isOther: false, text: "选项2", _id: "1CPEASK10" },
              { isOther: false, text: "选项3", _id: "1CPEASKLG" },
              { isOther: false, text: "选项4", _id: "1CPEASLC9" },
              { isOther: true, text: "其他", _id: "1CPEASLVP" }
            ],
            isVertical: true
          },
          {
            type: "checkbox",
            label: "多选",
            displayDescription: false,
            description: "",
            isHidden: false,
            _id: "1CPEASFD0",
            required: true,
            items: [
              { isOther: false, text: "选项1", _id: "1CPEAS5LD" },
              { isOther: false, text: "选项2", _id: "1CPEASPCH" },
              { isOther: false, text: "选项3", _id: "1CPEASQ7G" },
              { isOther: false, text: "选项4", _id: "1CPEASQNO" },
              { isOther: false, text: "选项5发发发", _id: "1CPEASRGN" },
              { isOther: true, text: "其他", _id: "1CPEASS48" }
            ],
            isVertical: true
          },
          {
            type: "dropdown",
            label: "下拉框",
            displayDescription: false,
            description: "",
            isHidden: false,
            _id: "1CPEASGR8",
            required: true,
            items: [
              { isOther: false, text: "选项1", _id: "1CPEAS5LD" },
              { isOther: false, text: "选项2", _id: "1CPEAT33H" },
              { isOther: false, text: "选项3", _id: "1CPEAT3U7" },
              { isOther: false, text: "选项4", _id: "1CPEAT4H0" },
              { isOther: true, text: "其他", _id: "1CPEAT567" }
            ]
          },
          {
            type: "text",
            label: "输入框1",
            displayDescription: false,
            description: "",
            isHidden: false,
            _id: "1CPEAT807",
            required: true
          },
          {
            type: "text",
            label: "输入框多行",
            displayDescription: false,
            description: "",
            isHidden: false,
            _id: "1CPEATDV8",
            required: true,
            isMultiline: true
          },
          {
            type: "date",
            label: "日期",
            displayDescription: false,
            description: "",
            isHidden: false,
            _id: "1CPEATND7",
            required: true
          },
          {
            type: "datetime",
            label: "日期时间",
            displayDescription: false,
            description: "",
            isHidden: false,
            _id: "1CPEATOVF",
            required: true
          },
          {
            type: "time",
            label: "时间",
            displayDescription: false,
            description: "",
            isHidden: false,
            _id: "1CPEATPLF",
            required: true
          }
        ],
        logicRule: [
          {
            item: "1CPEASGR8",
            rule: {
              options: "1CPEAT33H",
              displayItem: [
                "1CPEASGR8",
                "1CPEAT807",
                "1CPEATND7",
                "1CPEATOVF",
                "1CPEATDV8",
                "1CPEATPLF"
              ]
            }
          },
          {
            item: "1CPEASGR8",
            rule: {
              options: "1CPEAT33H",
              displayItem: [
                "1CPEASGR8",
                "1CPEAT807",
                "1CPEATND7",
                "1CPEATOVF",
                "1CPEATDV8",
                "1CPEATPLF"
              ]
            }
          }
        ]
      }
    };
  },
  methods: {
    saveData() {        
      debugger;
    },

  },
  created() {},
  mounted() {
  }
};
</script>
<style lang="less" scoped>
.isVertical.ivu-checkbox-group-item {
  display: block;
}
</style>


