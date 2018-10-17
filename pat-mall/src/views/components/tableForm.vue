<style lang="less" scoped>
.table-template {
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;

  .div-table {
    box-sizing: border-box;
    border: 1px solid #e9eaec;
    border-bottom: 0;

    .d-table-header {
      background-color: #f8f8f9;
      border-bottom: 1px solid #e9eaec;

      > div {
        color: #495060;
        font-size: 12px;
        font-weight: 600;
      }
    }

    .d-table-row,
    .d-table-header > div {
      position: relative;
      .d-close {
        position: absolute;
        top: 5px;
        right: 20px;
        content: " ";
        font-size: 17px;
        &:hover {
          color: #ed3f14;
        }
      }
    }

    .d-table-row,
    .d-table-header {
      display: flex;
      border-bottom: 1px solid #e9eaec;

      > div {
        flex: 1;
        padding: 5px 18px;
        outline: 0;
        border-right: 1px solid #e9eaec;
        &:last-child {
          border-right: 0;
        }
      }
    }

    .d-table-footer {
      border-bottom: 1px solid #e9eaec;
    }
  }
}
</style>
<!--
使用方法

<FormItem v-if="item.type==='table'">
    <table-form :table="formItem.table" :isEdit="true"></table-form>
</FormItem>

formItem.table = {
    columns: [{
            title: '标题', // 表头
            key: 'key0',   // `key${this.table.columns.length}`
            status: false  // 控制表头的输入框焦点状态， 默认false
    }],
    data:[]
}

-->
<template>
    <div class="table-template">
        <Input type="text" v-model="table.title" placeholder="请输入标题" :disabled="!isEdit"/>
        <Row>
            <Col span="24" class="text-right">
                <Button size="small" type="primary"
                        v-if="isEdit"
                        @click.stop="onAddTitle">
                    <Icon type="plus-round"></Icon>&nbsp;添加列
                </Button>
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <div class="div-table">
                    <!--数据头-->
                    <div class="d-table-header">
                        <div v-for="(item, index) in table.columns" :key="index"
                             tabindex="0"
                             @focus="isEdit && (item.status = true)">
                            <template v-if="!item.status">{{item.title}}</template>
                            <template v-else>
                                <input v-focus="item.status"
                                       v-model="item.title"
                                       class="ivu-input"
                                       @blur="item.status = ''"/></template>
                            <span class="d-close"
                                  v-if="isEdit"
                                  @click.stop="table.columns.splice(index, 1)">
                                <Icon type="close-circled"></Icon>
                            </span>
                        </div>
                    </div>
                    <!--数据行-->
                    <div class="d-table-body">
                        <div class="d-table-row" v-for="(row, rowindex) in table.data" :key="rowindex">
                            <div v-for="(item, index) in table.columns" :key="index">
                                <Input v-model="row[`key${index}`]"/>
                            </div>
                            <span class="d-close"
                                  v-if="isEdit"
                                  @click.stop="table.data.splice(rowindex, 1)">
                                <Icon type="android-remove-circle"></Icon>
                            </span>
                        </div>
                    </div>

                    <!--行添加 (编辑模式或者设置为可追加行时显示) -->
                    <div class="d-table-footer text-center" v-if="isEdit || isCanAddRow">
                        <Button type="primary" size="small"
                                :disabled="!table.columns.length"
                                @click.stop="()=> table.data.push({})">
                            <Icon type="plus-round"></Icon> &nbsp;添加行
                        </Button>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
  props: ["table", "isEdit", "isCanAddRow"],
  directives: {
    focus: {
      inserted: (el, { value }) => value && el.focus()
    }
  },
  data() {
    return {
      table: [],
      isEdit: true,
      isCanAddRow: true
    };
  },
  methods: {
    onAddTitle() {
      this.table.columns.push({
        title: "标题",
        key: `key${this.table.columns.length}`,
        status: true
      });
    }
  }
};
</script>


