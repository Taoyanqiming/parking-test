import { onMounted } from 'vue';
<template>
    <el-card class="all">
      <template #header>
        <div class="header">
          <span>预约信息管理</span>
        </div>
      </template>
      
      <!-- 搜索表单 -->
      <div>
        <el-row>
          <el-col :span="12">
            <input type="text" id="phoneInput" placeholder="请输入手机号" v-model="phoneNumber">
          </el-col>
          <el-col :span="12">
            <button @click="fetchReservation">查询</button>
          </el-col>
        </el-row>
      </div>
      
      <!-- 信息展示表格 -->
      <el-table :data="Reservation" style="width: 100%">
        <el-table-column label="ID" prop="reservationId" width="40"></el-table-column>
        <el-table-column label="预约人姓名" prop="username" width="140"></el-table-column>
        <el-table-column label="手机号" prop="phoneNumber" width="140"></el-table-column>
        <el-table-column label="停车场" prop="name" width="140"></el-table-column>
        <el-table-column label="停车位" prop="spaceId" width="140"></el-table-column>
        <el-table-column label="状态" prop="status" width="140"></el-table-column>
        <el-table-column label="起始时间" prop="startTime" width="140"></el-table-column>
        <el-table-column label="结束时间" prop="endTime" width="140"></el-table-column>
        <el-table-column label="费用" prop="totalFee" width="140"></el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button @click="update(scope.row)" plain type="primary">修改</el-button>
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
  import { ref ,onMounted} from 'vue'
  import { ElMessage } from 'element-plus'
  import { getReservationService } from '@/api/reservation.js'
  
  const phoneNumber = ref('')  // 存储输入的手机号
  const Reservation = ref([])  // 存储用户数据
  
  // 分页数据
  const pagination = ref({
    page: 1,
    pageSize: 10,
    total: 0
  });
  

  // 查询用户数据
  const fetchReservation = async () => {
    try {
        const ReservationsPageQueryDTO = {
      
      phoneNumber: phoneNumber.value,
      page: pagination.value.page,
      pageSize: pagination.value.pageSize
    };

      const result = await getReservationService(ReservationsPageQueryDTO);
      Reservation.value = result.data.records;  // 用户列表
      pagination.value.total = result.data.total;  // 总记录数
    } catch (error) {
      ElMessage.error(error.message || '预约订单查询失败');
    }
  };
// 处理分页变化  
const handlePageChange = (newPage) => {  
  pagination.value.page = newPage;  
  fetchUsers();  
};  
// 组件初始化时，默认获取所有用户数据
onMounted(() => {
    fetchReservation();
});

  </script>
  
  