<template>
  <div class="parking-lot">
    <!-- 循环渲染停车位 -->
    <div v-for="space in parkingSpaces" :key="space.spaceId" class="parking-space" :style="getSpaceStyle(space)"
      @click="handleSpaceClick(space)">
      <span>{{ space.spaceId }}</span>
    </div>

    <!-- 预约停车位的对话框 -->
    <el-dialog title="预约停车位" v-model="reservationDialogVisible" width="30%">
      <el-form :model="reservationForm">
        <el-form-item label="车位ID">
          <el-input v-model="reservationForm.spaceId" readonly></el-input>
        </el-form-item>
        <el-form-item label="预约时间">
          <el-date-picker v-model="reservationForm.reservedTime" type="datetime"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitReservation">提交预约</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getParkingSpaces, reserveParkingSpace } from '@/api/parking.js'; // 引入API

// 停车位数据
const parkingSpaces = ref([]);

// 控制预约对话框的显示
const reservationDialogVisible = ref(false);

// 预约表单
const reservationForm = ref({
  spaceId: '',
  reservedTime: ''
});

// 定义 parkingLotId
const parkingLotId = 1; // 假设 parkingLotId 为 1

const fetchParkingSpaces = async () => {
  try {
    const response = await getParkingSpaces(parkingLotId); // 传入 parkingLotId
    if (response.code === 1) {
      parkingSpaces.value = response.data.records; // 获取停车位数据
    } else {
      console.error('获取停车位数据失败:', response.msg);
    }
  } catch (error) {
    console.error('获取停车位数据失败:', error);
  }
};

// 获取车位样式，动态设置位置和颜色
const getSpaceStyle = (space) => {
  const colors = {
    '空闲': 'green',
    '占用': 'red'
  };
  return {
    position: 'absolute',
    top: `${space.y * 10}px`, // 调整比例，例如乘以50
    left: `${space.x * 10}px`, // 调整比例，例如乘以50
    width: '50px',
    height: '50px',
    backgroundColor: colors[space.status] || 'gray',
    border: '1px solid black',
    textAlign: 'center',
    lineHeight: '50px',
    cursor: 'pointer'
  };
};

// 处理点击事件，弹出预约对话框
const handleSpaceClick = (space) => {
  if (space.status === '空闲') {
    reservationForm.value.spaceId = space.spaceId;
    reservationDialogVisible.value = true;
  } else {
    alert(`车位 ${space.spaceId} 已被占用`);
  }
};

// 提交预约请求
const submitReservation = async () => {
  try {
    const response = await reserveParkingSpace(reservationForm.value);
    if (response.code === 1) {
      alert('预约成功');
      reservationDialogVisible.value = false;
      // 重新获取停车位数据以更新状态
      await fetchParkingSpaces(); // 刷新停车位数据
    } else {
      alert('预约失败，服务端返回错误');
    }
  } catch (error) {
    console.error('预约失败:', error);
  }
};

// 页面挂载时获取停车位数据
onMounted(async () => {
  await fetchParkingSpaces();
});
</script>

<style scoped>
.parking-lot {
  position: relative;
  width: 500px;
  /* 停车场宽度 */
  height: 500px;
  /* 停车场高度 */
  border: 1px solid #ccc;
}

.parking-space {
  color: white;
  border-radius: 4px;
  /* 圆角 */
}
</style>
