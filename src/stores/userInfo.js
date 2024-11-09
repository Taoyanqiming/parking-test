import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserInfoStore = defineStore('userInfo', () => {
  const userInfo = ref({
    userId: '',
    userName: '',
    email: '',
    phoneNumber: ''
  });

  const setInfo = (newInfo) => {
    userInfo.value = newInfo; // 这里会更新用户信息
  }

  const clearInfo = () => {
    userInfo.value = {
      userId: '',
      userName: '',
      email: '',
      phoneNumber: ''
    };
  }

  return {
    userInfo, setInfo, clearInfo
  };
}, {
  persist: true // 持久化
});
