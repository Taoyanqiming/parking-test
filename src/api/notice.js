import instance from '@/utils/request.js'; // 确保导入正确的实例

// 创建通知
export const createNoticeService = (NoticeDTO) => {
  return instance.post("/admin/create", NoticeDTO);
};

// 删除通知
export const deleteNoticeService = (noticeId) => {
  return instance.delete(`/admin/delete/${noticeId}`);
};
