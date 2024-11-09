import instance from '@/utils/request.js'; // 确保导入正确的实例

// 获取停车位信息
export const getParkingSpaces = (parkingLotId) => {
  return instance.get(`/parking/page/spaces/${parkingLotId}`);
}

// 提交预约信息
export const reserveParkingSpace = (spaceId, reservationData) => {
  return instance.post(`/parking/parking-spaces/${spaceId}`, reservationData);
};

// 根据ID查询停车位
export const getSpaceById = (spaceId) => {
  return instance.get(`/parking/${spaceId}`);
};

// 根据ID查询停车场
export const getLotById = (parkingLotId) => {
  return instance.get(`/parking/parkingLots/${parkingLotId}`);
};

// 修改停车场
export const updateLotService = (updateLotsDTO) => {
  return instance.put("/parking/admin/update", updateLotsDTO);
};
