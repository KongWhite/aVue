<template>
  <div>
    <el-page-header @back="goBack" content="商品新增"></el-page-header>
    <el-form
      :model="form"
      ref="form"
      label-width="80px"
      :rules="rules"
      class="demo-ruleForm"
      style="margin-top: 20px;"
    >
      <el-form-item label="商品图片" prop="pic">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio label="1">上架</el-radio>
          <el-radio label="0">下架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品编码" prop="prod_id">
        <el-input v-model="form.prod_id" disabled></el-input>
      </el-form-item>
      <el-form-item label="商品名称" prop="prod_name">
        <el-input v-model="form.prod_name"></el-input>
      </el-form-item>
      <el-form-item label="商品分类" prop="category_id">
        <el-select placeholder="商品分类" v-model="form.category_id">
          <el-option label="食品" value="001"></el-option>
          <el-option label="电器" value="002"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格" prop="ori_price">
        <el-input v-model="form.ori_price"></el-input>
      </el-form-item>
      <el-form-item label="建议售价" prop="price">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="form.create_time" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageUrl: "",
      uploadUrl: window.SITE_CONFIG.baseUrl + "/upload/imgUpload",
      form: {
        status: "1",
        create_time: this.$moment(new Date()).format("YYYY-MM-DD"),
        category_id: "001",
        pic: "",
        prod_id: this.$moment(new Date()).format("YYYYMMDDmmss"),
        prod_name: "",
        ori_price: "",
        price: ""
      },
      rules: {
        pic: [
          {
            required: true,
            message: "请上传图片！",
            trigger: "blur"
          }
        ],
        prod_id: [
          {
            required: true,
            message: "请输入商品编码",
            trigger: "blur"
          }
        ],
        prod_name: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "blur"
          },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur"
          }
        ],
        ori_price: [
          {
            required: true,
            message: "请输入商品价格",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "请输入建议售价",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === "image/png" || file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传商品图片只能是 JPG 格式或者 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传商品图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res) {
      if (res.code === 0) {
        this.$message.success(res.msg);
        this.form.pic = window.SITE_CONFIG.baseUrl + "/" + res.data.url;
        this.imageUrl = window.SITE_CONFIG.baseUrl + "/" + res.data.url;
      } else {
        this.$message.error(res.msg);
      }
    },
    submitForm(formName) {
      console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.productAdd();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    productAdd() {
      this.$http({
        url: this.$http.adornUrl(`/product/add`),
        method: "post",
        data: this.$http.adornData(this.form)
      }).then(res => {
        let result = res.data;
        if (result.code === "0") {
          this.$message.success(result.msg);
          setTimeout(() => {
            this.goBack();
          }, 3000);
        } else {
          this.$message.error(result.msg);
        }
      });
    },
    goBack() {
      this.$router.replace({ path: "/product-productList" });
    }
  }
};
</script>
<style scoped>
.el-form {
  width: 460px;
}
.header {
  margin-bottom: 20px;
}
</style>
