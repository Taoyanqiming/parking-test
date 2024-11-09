<template>
  <div id="map-container" style="width: 100%; height: 700px;"></div>
  <!-- 悬停显示的信息 -->
  <div v-if="showTooltip" :style="tooltipStyle" class="tooltip">
    <p>停车场名称: {{ parkingLotInfo.name }}</p>
    <p>位置: {{ parkingLotInfo.location }}</p>
    <p>总车位: {{ parkingLotInfo.totalSpaces }}</p>
    <p>空闲车位: {{ parkingLotInfo.availableSpaces }}</p>
    <p>每小时价格: {{ parkingLotInfo.pricePerHour }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getLotById } from '@/api/parking.js';

// 状态变量
const showTooltip = ref(false);
const tooltipStyle = ref({ top: '0px', left: '0px' });
const parkingLotInfo = ref({});

// 初始化地图并添加点
onMounted(() => {
  const map = new AMap.Map('map-container', {
    center: [106.6062525, 29.5263],
    zoom: 16,
  });

  // 停车点数组，包含 parkingLotId
  const points = [
    { parkingLotId: 1, name: '停车点 1', location: [106.607056, 29.525854] },
    { parkingLotId: 2, name: '停车点 2', location: [106.605449, 29.52679] },
  ];

  points.forEach((point) => {
    const marker = new AMap.Marker({
      position: point.location,
      title: point.name,
      map: map,
    });

    // 悬停时获取停车场信息并展示
    marker.on('mouseover', async (event) => {
      await fetchAndShowInfo(point.parkingLotId, event);
    });

    // 鼠标移出隐藏信息框
    marker.on('mouseout', () => {
      showTooltip.value = false;
    });

    // 点击跳转到对应停车场页面
    marker.on('click', () => {
      window.location.href = `/admin/parking-spaces?lotId=${point.parkingLotId}`;
    });
  });
});

// 请求并显示停车场信息
const fetchAndShowInfo = async (parkingLotId, event) => {
  tooltipStyle.value = {
    top: event.pixel.y + 'px',
    left: event.pixel.x + 'px',
  };

  try {
    const response = await getLotById(parkingLotId);
    if (response && response.code === 1) {
      parkingLotInfo.value = response.data;
      showTooltip.value = true;
    } else {
      console.error('Failed to fetch parking lot info: Invalid response code');
      showTooltip.value = false;
    }
  } catch (error) {
    console.error('Error fetching parking lot info:', error);
    showTooltip.value = false;
  }
};
</script>



<style>
#map-container {
  width: 100%;
  height: 500px;
}

.tooltip {
  position: absolute;
  background-color: white;
  padding: 10px;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
}
</style>
