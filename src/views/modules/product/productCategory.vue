<template>
  <div>
    <avue-crud :option="option" :data="data">
      <template slot="menuLeft">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="categoryDialog"
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
    </avue-crud>
    <el-dialog title="新增分类" :visible.sync="dialogFormVisible" width="400px">
      <el-form :model="form">
        <el-form-item label="一级分类名称">
          <el-select placeholder="请选择一级分类" v-model="form.category_parentId">
            <el-option value="" label="请选择一级分类"></el-option>
            <el-option
              v-for="item in parentList"
              :key="item.category_id"
              :value="item.category_id"
              :label="item.category_name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="新增一级/二级分类名称">
          <el-input v-model="form.category_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="categoryAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isSubmit: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        category_name: "",
        category_parentId: ""
      },
      option: {
        headerAlign: "center",
        align: "center",
        border: true,
        addBtn: false,
        defaultExpandAll: true,
        column: [
          {
            label: "分类编码",
            prop: "type_id"
          },
          {
            label: "分类名称",
            prop: "type_name"
          },
          {
            label: "创建时间",
            prop: "creat_time"
          },
          {
            label: "状态",
            prop: "status"
          }
        ]
      },
      data: [],
      parentList: [],
      parentName: ""
    };
  },
  methods: {
    categoryDialog() {
      this.dialogFormVisible = true;
      this.categoryparentList();
    },
    categoryparentList() {
      this.$http({
        url: this.$http.adornUrl(`/category/parertList`),
        method: "get"
      }).then(res => {
        let result = res.data;
        if (result.code === "0") {
          console.log(result.data)
          this.parentList = result.data;
        } else {
          this.$message.error(result.msg);
        }
      });
    },
    categoryAdd() {
      this.categoryparentList();
      this.load = true;
      this.isSubmit = true;
      this.$http({
        url: this.$http.adornUrl(`/category/saveByCategory`),
        method: "post",
        data: this.$http.adornData(this.form)
      }).then(res => {
        let result = res.data;
        this.load = false;
        this.isSubmit = false;
        if (result.code === "0") {
          this.dialogFormVisible = false;
          this.$message.success(result.msg);
        } else {
          this.$message.error(result.msg);
        }
      });
    }
  }
};
</script>
<style scoped>
.el-select {
  width: 100%;
}
</style>
