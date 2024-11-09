import instance from '@/utils/request.js'; // 确保导入正确的实例

// 查询缴费记录
export const getPaymentsService = (PaymentsPageQueryDTO) => {
  return instance.get("/pay/page/payments", { params: PaymentsPageQueryDTO });
};
