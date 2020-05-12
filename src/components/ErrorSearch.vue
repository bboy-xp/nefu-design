<template>
  <div class="container">
    <div class="header">
      <!-- 企业id和设备id的二级下拉框 -->
      <el-cascader
        v-model="selectValue"
        :options="options"
        :props="{ checkStrictly: true }"
        clearable
      ></el-cascader>
      <!-- 选择起止时间日期时间选择器 -->
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="timestamp"
      ></el-date-picker>
      <!-- 设施情况下拉框 -->
      <el-select v-model="isdeal" placeholder="请选择异常处理情况">
        <el-option v-for="item in dealArr" :key="item.name" :label="item.name" :value="item.value"></el-option>
      </el-select>
      <!-- 查询按钮 -->
      <el-button class="search-btn" @click="search" type="primary">查询</el-button>
    </div>
    <div class="table-container">
      <!-- 数据表格 -->
      <el-table :data="tableData" height="600">
        <el-table-column prop="recordId" label="异常记录编号"></el-table-column>
        <el-table-column prop="ename" label="企业名称"></el-table-column>
        <el-table-column prop="eid" label="企业id"></el-table-column>
        <el-table-column prop="equId" label="设施id"></el-table-column>
        <el-table-column prop="abnormalReason" label="异常原因"></el-table-column>
        <el-table-column prop="isdeal" label="是否处理完毕"></el-table-column>
        <el-table-column prop="createTime" label="发生时间"></el-table-column>
        <el-table-column prop="dealTime" label="处理时间"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination @current-change="currentChange" background layout="prev, pager, next" :page-count="total"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorSearch",
  props: {},
  data() {
    return {
      date: [],
      selectValue: [],
      options: [
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      isdeal: 2,
      dealArr: [
        {
          name: "全部",
          value: 2
        },
        {
          name: "处理",
          value: 1
        },
        {
          name: "未处理",
          value: 0
        }
      ],
      tableData: [],
      currentPage: 1,
      pageSize: "20",
      total: 0
    };
  },
  mounted() {
    // 请求获取企业与设备的关联数组
    this.$axios.get("/equipment/showEquData").then(res => {
      if (res.data.error.returnCode === 0) {
        this.options = res.data.data;
      } else {
        this.$message.error("获取所有企业设备信息失败");
      }
    });
  },
  methods: {
    search() {
      const reqData = {};
      if (this.date.length === 2) {
        reqData["startTime"] = this.date[0] / 1000;
        reqData["endTime"] = this.date[1] / 1000;
      }
      reqData["eid"] = this.selectValue[0];
      reqData["equId"] = this.selectValue[1];
      reqData["isdeal"] = this.isdeal;
      // 需要并将数值型的pageNo转换为字符串
      reqData["pageNo"] = this.currentPage + "";
      reqData["pageSize"] = this.pageSize;

      this.$axios.post("/abnormal/showAbnormalData", reqData).then(res => {
        if (res.data.error.returnCode === 0) {
          this.total = res.data.data.total;
          this.tableData = res.data.data.data;
        } else {
          this.$message.error("请求失败");
        }
      });
    },
    currentChange(pageNumber) {
      this.currentPage = pageNumber;
      this.search();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
  padding-bottom: 30px;
}
.pagination-container {
  margin-top: 20px;
  text-align: end;
}
</style>
