<template>
  <div>
    <avue-crud :data="data" :option="option" :page="page"></avue-crud>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      option: {
        title: "",
        index: true,
        indexLabel: "序号",
        menu: false,
        addBtn: false,
        refreshBtn: false,
        columnBtn: false,
        selection: true,
        page: true,
        border: true,
        cancelBtn: false,
        delBtn: false,
        align: "center",
        menuAlign: "center",
        column: [
          {
            label: "商品编码",
            prop: "prod_id"
          },
          {
            label: "商品名称",
            prop: "prod_name"
          },
          {
            label: "商品类别",
            prop: "brief"
          },
          {
            label: "商品图片",
            prop: "pic"
          },
          {
            label: "商品价格",
            prop: "ori_price"
          },
          {
            label: "建议售价",
            prop: "price"
          },
          {
            label: "创建时间",
            prop: "create_time",
            type: "date",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd"
          },
          {
            label: "状态",
            prop: "status"
          }
        ]
      },
      page: {
        pageSize: 20,
        total: 40
      }
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.$http({
        url: this.$http.adornUrl(`/product/list`),
        methods: "get"
      }).then(res => {
        console.log(res);
        let result = res.data;
        if (result.code == "0") {
          this.data = result.data.list;
        }
      });
    }
  }
};
</script>
