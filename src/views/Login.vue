<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useTokenStore } from '@/stores/token.js'
import { useUserInfoStore } from '@/stores/userInfo.js';
import { useRouter } from 'vue-router'
import { userLoginService, userRegisterService } from '@/api/users.js'


// 控制注册与登录表单的显示，默认显示注册
const isRegister = ref(false)

// 定义登录数据模型
const loginData = ref({
  phoneNumber: '',
  password: ''
})

// 定义注册数据模型
const registerData = ref({
  phoneNumber: '',
  username: '',
  password: '',
  rePassword: ''
})

// 定义表单校验规则
const loginRules = {
  phoneNumber: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 11, max: 16, message: '长度为11位非空字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
  ]
}

const registerRules = {
  phoneNumber: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 11, max: 16, message: '长度为11位非空字符', trigger: 'blur' }
  ],
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
  ],
  rePassword: [
    { validator: (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次确认密码'))
      } else if (value !== registerData.value.password) {
        callback(new Error('请确保两次输入的密码一致'))
      } else {
        callback()
      }
    }, trigger: 'blur' }
  ]
}

// 登录函数
const router = useRouter()
const tokenStore = useTokenStore()
const userInfoStore = useUserInfoStore(); 

const login = async () => {
  try {
    let result = await userLoginService(loginData.value);
    if (result.code === 1) { // 确保返回的 code 是成功的
      ElMessage.success(result.msg ? result.msg : '登录成功');
      
      // 将用户信息和token存储到Pinia中
      tokenStore.setToken(result.data.token);
      userInfoStore.setInfo({
        userId: result.data.userId,
        userName: result.data.userName, // 确保这里的 userName 大小写匹配
        email: result.data.email,
        phoneNumber: result.data.phoneNumber
      });

      // 跳转到首页
      router.push('/');
    } else {
      ElMessage.error(result.msg ? result.msg : '登录失败');
    }
  } catch (error) {
    ElMessage.error('登录请求失败，请重试！');
    console.error(error);
  }
};



// 注册函数（保持原有逻辑）
const register = async () => {
  let result = await userRegisterService(registerData.value)
  ElMessage.success(result.msg ? result.msg : '注册成功')
}

// 清空数据模型
const clearLoginData = () => {
  loginData.value = {
    phoneNumber: '',
    password: ''
  }
}

const clearRegisterData = () => {
  registerData.value = {
    phoneNumber: '',
    username: '',
    password: '',
    rePassword: ''
  }
}
</script>


<template>
    <el-row class="login-page">
      <el-col :span="12" class="bg"></el-col>
      <el-col :span="6" :offset="3" class="form">
        <!-- 注册表单 -->
        <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="registerRules">
          <el-form-item>
            <h1>注册</h1>
          </el-form-item>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
          </el-form-item>
          <el-form-item prop="phoneNumber">
            <el-input :prefix-icon="Lock" type="phoneNumber" placeholder="请输入手机号" v-model="registerData.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
          </el-form-item>
          <el-form-item prop="rePassword">
            <el-input :prefix-icon="Lock" type="password" placeholder="请再次输入密码" v-model="registerData.rePassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="button" type="primary" auto-insert-space @click="register">注册</el-button>
          </el-form-item>
          <el-form-item class="flex">
            <el-link type="info" :underline="false" @click="isRegister = false;clearRegisterData()">← 返回</el-link>
          </el-form-item>
        </el-form>
  
        <!-- 登录表单 -->
        <el-form ref="form" size="large" autocomplete="off" v-else :model="loginData" :rules="loginRules">
          <el-form-item>
            <h1>登录</h1>
          </el-form-item>
          <el-form-item prop="phoneNumber">
            <el-input :prefix-icon="User" placeholder="请输入手机号" v-model="loginData.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="loginData.password"></el-input>
          </el-form-item>
          <el-form-item class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </el-form-item>
          <el-form-item>
            <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
          </el-form-item>
          <el-form-item class="flex">
            <el-link type="info" :underline="false" @click="isRegister = true;clearLoginData()">注册 →</el-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </template>
  