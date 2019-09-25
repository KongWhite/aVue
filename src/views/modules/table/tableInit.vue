<template>
  <div>
    <avue-crud :data="data" :option="option"></avue-crud>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          name: "张三",
          sex: "男",
          date: "1994-02-23"
        },
        {
          name: "李四",
          sex: "女",
          date: "1994-02-23"
        },
        {
          name: "王五",
          sex: "女",
          date: "1994-02-23"
        },
        {
          name: "赵六",
          sex: "男",
          date: "1994-02-23"
        }
      ],
      option: {
        title: "",
        menu: false,
        addBtn: false,
        refreshBtn: false,
        columnBtn: false,
        page: false,
        border: true,
        cancelBtn: false,
        delBtn: false,
        align: "center",
        menuAlign: "center",
        column: [
          {
            label: "姓名",
            prop: "name"
          },
          {
            label: "性别",
            prop: "sex"
          },
          {
            label: "日期",
            prop: "date",
            type: "date",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd"
          }
        ]
      }
    };
  }
};
</script>
