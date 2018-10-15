<template>
   <div>
        <Table :columns="columns" :data="datas"></Table>
   </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: " ",
          key: "d"
        }
      ],
      datas: [
        {
          d: "1"
        },
        {
          d: "2"
        }
      ]
    };
  }
};
</script>

