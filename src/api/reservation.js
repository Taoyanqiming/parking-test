import instance from '@/utils/request.js'; // 确保导入正确的实例

//查询车位预约记录
export const getReservationService = (ReservationsPageQueryDTO) => {
    return instance.get("/reservation/page", { params: ReservationsPageQueryDTO });
  };
//修改车位预约信息
export const updateUserService = (UpdateReservationsDTO) => {
    return instance.put("/reservation/update", UpdateReservationsDTO);
  };