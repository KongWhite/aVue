<template>
  <div>
    <avue-crud
      :data="data"
      :option="option"
      :page="page"
      @search-change="changeSearch"
      @on-load="changePage"
    >
      <template slot-scope="scope" slot="status">
        <el-tag v-if="scope.row.status === 1" size="small">上架</el-tag>
        <el-tag v-else size="small">未上架</el-tag>
      </template>
    </avue-crud>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {},
      data: [],
      option: {
        title: "",
        maxHeight: 550,
        index: true,
        indexLabel: "序号",
        menu: true,
        addBtn: false,
        refreshBtn: false,
        columnBtn: true,
        selection: true,
        page: true,
        border: true,
        cancelBtn: true,
        delBtn: false,
        align: "center",
        menuAlign: "center",
        column: [
          {
            label: "商品编码",
            prop: "prod_id",
            search: true,
            searchSpan: 4
          },
          {
            label: "商品名称",
            prop: "prod_name",
            search: true,
            searchSpan: 4
          },
          {
            label: "商品类别",
            prop: "brief",
            search: true,
            searchSpan: 4
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
            prop: "status",
            type: "select",
            search: true,
            dicData: [
              {
                label: "未上架",
                value: 0
              },
              {
                label: "上架",
                value: 1
              }
            ],
            searchSpan: 4
          }
        ]
      },
      page: {
        pageNum: 1,
        pageSize: 20,
        total: 0
      },
      params1: {}
    };
  },
  methods: {
    changeSearch(params) {
      this.params1 = params;
      this.page.pageNum = 1;
      this.getDataList(params, this.page);
    },
    getDataList(params, page) {
      var newObj = { ...page, ...params };
      this.$http({
        url: this.$http.adornUrl(`/product/list`),
        methods: "get",
        params: this.$http.adornParams(newObj)
      }).then(res => {
        let result = res.data;
        if (result.code == "0") {
          this.data = result.data.list;
          this.page.pageSize = Number(result.data.pageSize);
          this.page.pageNum = result.data.pageNum;
          this.page.currentPage = Number(result.data.pageNum);
          this.page.total = result.data.total;
        }
      });
    },
    changePage(page) {
      this.page.pageSize = Number(page.pageSize);
      this.page.pageNum = page.currentPage;
      this.getDataList(this.params1, this.page);
    }
  }
};
</script>
