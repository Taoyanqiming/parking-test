import instance from '@/utils/request.js'; // 确保导入正确的实例

// 分页查询反馈信息
export const getMessageListService = (FeedBacksPageQueryDTO) => {
  return instance.get("/feedback/page/message", { params: FeedBacksPageQueryDTO });
};

// 创建回复
export const replyToFeedbackService = (RepliesDTO) => {
  return instance.post("/feedback/reply", RepliesDTO);
};

// 删除反馈信息
export const deleteFeedbackService = (feedbackId) => {
  return instance.delete(`/feedback/delete/${feedbackId}`);
};

// 删除回复信息
export const deleteReplyService = (replyId) => {
  return instance.delete(`/feedback/delete/${replyId}`);
};
