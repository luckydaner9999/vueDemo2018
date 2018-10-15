<template>
    <div>
        <h2>动态表格</h2>
        <Row>
            <Col span="4">
            <Button @click="addTable">表格</Button>
            <Button @click="getData">获取数据</Button>
            <Button @click="getRowTable">获取表格</Button>

            <Button>输入框</Button>

            </Col>
            <Col span="24">
           <div  v-for="item in tableList">
             {{item.label}} 
              <Table :columns="item.table.columns" :data="item.table.data" border></Table>
           </div>
            </Col>
             <Col span="24">
         
             <div  v-for="item in rowsTableList">
             {{item.label}} 
              <Table :columns="item.table.columns" :data="item.table.data" border ref="rowTable"></Table>
              <Button v-if="item.isCanAddRow" @click="addRows(item)">添加受试者</Button>
           </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import tableCell from "./tableCell.vue";
import tableCellVue from "./tableCell.vue";
export default {
  data() {
    return {
      tableList: [
        {
          label: "预设表格",
          required: false,
          description: "",
          displayDescription: false,
          isHidden: false,
          type: "table",
          isCanAddRow: false,
          table: {
            columns: [
              {
                title: "受试者编号",
                key: "key0",
                status: ""
              },
              {
                title: "访视周期",
                key: "key1",
                status: ""
              },
              {
                title: "访视日期",
                key: "key2",
                status: "",
                type: "date",
                render: (h, params) => {
                  return h(tableCell, {
                    props: {
                      type: params.column.type
                    }
                  });
                }
              },
              {
                title: "工作内容（相应工作内容请打√）",
                key: "key3",
                status: "",
                children: [
                  {
                    title: "edc登记",
                    key: "key2-0",
                    status: "",
                    type: "Input",
                    render: (h, params) => {
                      console.log(params.column.type);
                      return h(params.column.type, []);
                    }
                  },
                  { title: "药品发放", key: "key2-1", status: "" },
                  { title: "药品计数", key: "key2-2", status: "" },
                  {
                    title: "EDC录入",
                    key: "key2-3",
                    status: "",
                    type: "Checkbox",
                    render: (h, params) => {
                      return h(params.column.type, []);
                    }
                  }
                ]
              }
            ],
            data: [
              {
                key0: "受试者编号1",
                key1: "访视周期1",
                "key2-0": "1",
                "key2-1": "2"
              },
              {
                key0: "受试者编号2",
                key1: "访视周期2",
                "key2-0": "12",
                "key2-1": "23"
              }
            ]
          },
          _id: 1539334152346
        }
      ],
      rowsTableList: [
        {
          label: "预设表格多行",
          required: false,
          description: "",
          displayDescription: false,
          isHidden: false,
          type: "table",
          isCanAddRow: true,
          table: {
            row:2,
            columns: [
              {
                title: "受试者编号",
                key: "key0",
                status: "",
              },
              { title: "访视代码", key: "key1", status: "" },
              {
                title: "样本类型",
                key: "key2",
                status: "",
                type: "date"
              },
              {
                title: "计划寄送时间",
                key: "key3",
                status: ""
              },
              {
                title: "实际寄送时间",
                key: "key4",
                status: ""
              }
            ],
            data: [
              {
                key0: "受试者编号1",
                key1: "访视编号1",
                key2: "ADA NAB检测样本",
                key3: "NA",
                key4: "NA",
                key5: "NA"
              },
              {
                key0: "受试者编号1",
                key1: "访视编号1",
                key2: "ADA 备份样本",
                key3: "NA",
                key4: "NA",
                key5: "NA"
              }
            ]
          },
          _id: 1539334152346
        }
      ]
    };
  },
  methods: {
    addTable() {
      this.tableList.push({
        title: "表格1"
      });
    },
    getData() {
      const data = [];
      for (let i = 0; i < 20; i++) {
        data.push({
          key: i,
          name: "John Brown",
          age: i + 1,
          street: "Lake Park",
          building: "C",
          door: 2035,
          caddress: "Lake Street 42",
          cname: "SoftLake Co",
          gender: "M"
        });
      }
      this.data10 = data;
    },
    getRowTable(){
      this.$refs.rowTable;
      debugger;
    },
    addRows(obj){
      for (let i=0;i<obj.table.row;i++){
        let rowDat={};
       obj.table.columns.forEach(element => {
         rowDat[element.key]='';
        
       });
        obj.table.data.push(rowDat);  
      }
      console.log(obj.table.data)

    }
  },
  components: {
    tableCell
  }
};
</script>
<style lang="less" scoped>
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


