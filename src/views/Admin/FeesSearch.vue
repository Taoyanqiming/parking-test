import { onMounted } from 'vue';

<template>
  <el-card class="all">
    <template #header>
      <div class="header">
        <span>缴费记录管理</span>
      </div>
    </template>
    
     <!-- 搜索表单 -->
     <div>
      <el-row>
        <el-col :span="12">
          <el-row>
          <el-col :span="12">
          <input type="text" id="phoneInput" placeholder="请输入手机号" v-model="phoneNumber">
        </el-col>
        <el-col :span="12">
          <el-select v-model="status" placeholder="请选择支付状态">
  <el-option label="已支付" value="已支付"></el-option>
  <el-option label="未支付" value="未支付"></el-option>
</el-select>
        </el-col>
      </el-row>
        </el-col>
        <el-col :span="12">
          <button @click="fetchPayments">确定</button>
        </el-col>
      </el-row>
    </div>
    
   <!-- 用户信息展示表格 -->
  <el-table :data="payments" style="width: 100%">
    
    <el-table-column label="ID" prop="paymentId" width="40"></el-table-column>
    <el-table-column label="姓名" prop="username" width="140"></el-table-column>
    <el-table-column label="手机号" prop="phoneNumber" width="140"></el-table-column>
    <el-table-column label="金额" prop="amount" width="140"></el-table-column>
    <el-table-column label="账单状态" prop="status" width="140"></el-table-column>
    <el-table-column label="支付方式" prop="paymentMethod" width="140"></el-table-column>
    <el-table-column label="支付时间" prop="paymentTime" width="140"></el-table-column>
    <el-table-column label="操作" width="200">
      <template v-slot="scope">
        <el-button @click="handleEdit(scope.row)" plain type="primary">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
    
    <!-- 分页组件 -->  
    <el-pagination  
      v-model:current-page="pagination.page"  
      :page-size="pagination.pageSize"  
      :total="pagination.total"  
      layout="prev, pager, next"  
      @current-change="handlePageChange"  
    />

   


  </el-card>
</template>


<script setup>
import { ref , onMounted} from 'vue'
import { ElMessage } from 'element-plus'
import { getPaymentsService } from '@/api/pay.js' // 调用你封装的 API

const phoneNumber = ref('')  // 存储输入的手机号
const status = ref('') // 存储支付状态
const payments = ref([])  // 存储用户数据

// 分页数据
const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 0
});

// 处理修改按钮点击事件  
const handleEdit = (row) => {  
  console.log('Selected Row:', row); // 调试信息
  editForm.value = { ...row }; // 复制当前行数据到 editForm
  editDialogVisible.value = true; // 显示对话框
};
 
// 查询订单数据
const fetchPayments = async () => {
  try {
    const PaymentsPageQueryDTO = {
      phoneNumber: phoneNumber.value,
      status: status.value,  // 添加状态筛选条件
      page: pagination.value.page,
      pageSize: pagination.value.pageSize
    };
    const result = await getPaymentsService(PaymentsPageQueryDTO);  // 调用封装的 API
    payments.value = result.data.records;  
    pagination.value.total = result.data.total; 
  } catch (error) {
    ElMessage.error(error.message || '查询订单失败');
  }
};


// 处理分页变化  
const handlePageChange = (newPage) => {  
  pagination.value.page = newPage;  
  fetchUsers();  
};  
// 组件初始化时，默认获取所有数据
onMounted(() => {
  fetchPayments();
});
</script>