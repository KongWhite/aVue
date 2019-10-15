<template>
  <div>
    <avue-crud
      :data="data"
      :option="option"
      :page="page"
      v-loading="load"
      @search-change="changeSearch"
      @on-load="changePage"
      @selection-change="selectionChange"
    >
      <template slot-scope="scope" slot="status">
        <el-tag v-if="scope.row.status === '1'" size="small">上架</el-tag>
        <el-tag v-else size="small">未上架</el-tag>
      </template>
      <template slot-scope="scope" slot="category_id">
        <el-tag v-if="scope.row.category_id === '1'" size="small">食品</el-tag>
        <el-tag v-else size="small">手机</el-tag>
      </template>
      <template slot="menuLeft">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="addOrUpdateHandle()"
        >
          新增
        </el-button>
        <el-button
          type="danger"
          @click="deleteHandle(idArr, false)"
          size="small"
        >
          批量删除
        </el-button>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="small"
          @click="editOrUpdateHandle(scope.row.prod_id)"
        >
          修改
        </el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="small"
          @click="deleteHandle(scope.row.prod_id, true)"
        >
          删除
        </el-button>
      </template>
    </avue-crud>
  </div>
</template>
<script>
export default {
  data() {
    return {
      load: true,
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
        editBtn: false,
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
            prop: "category_id",
            search: true,
            type: "select",
            searchSpan: 4,
            dicData: [
              {
                label: "食品",
                value: "1"
              },
              {
                label: "手机",
                value: "2"
              }
            ]
          },
          {
            label: "商品图片",
            prop: "pic",
            type: "upload",
            listType: "picture-img"
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
                value: "0"
              },
              {
                label: "上架",
                value: "1"
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
      params1: {},
      idArr: []
    };
  },
  methods: {
    changeSearch(params) {
      this.params1 = params;
      this.page.pageNum = 1;
      this.getDataList(params, this.page);
    },
    getDataList(params, page) {
      this.load = true;
      var newObj = { ...page, ...params };
      this.$http({
        url: this.$http.adornUrl(`/prod/list`),
        method: "get",
        params: this.$http.adornParams(newObj)
      }).then(res => {
        let result = res.data;
        this.load = false;
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
    },
    addOrUpdateHandle() {
      this.$router.push("/productInfo");
    },
    editOrUpdateHandle(id) {
      this.$router.push({
        path: "/productInfo",
        query: {
          id: id
        }
      });
    },
    selectionChange(list) {
      this.idArr = [];
      for (let item of list) {
        this.idArr.push(item.prod_id);
      }
      console.log(this.idArr);
    },
    deleteHandle(id, type) {
      let arr = [];
      if (type) {
        arr.push(id);
      } else {
        arr = this.idArr;
      }
      this.$http({
        url: this.$http.adornUrl(`/prod/deleteByProduct`),
        method: "post",
        data: this.$http.adornData({
          prodIds: arr
        })
      }).then(res => {
        let result = res.data;
        if (result.code === "0") {
          this.$message.success(result.msg);
          this.changeSearch(this.params1);
        } else {
          this.$message.error(result.msg);
        }
      });
    }
  }
};
</script>
