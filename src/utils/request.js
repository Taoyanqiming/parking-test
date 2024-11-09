
import axios from 'axios';

import { ElMessage } from 'element-plus'

const baseURL = '/api';
const instance = axios.create({ baseURL })

import {useTokenStore} from '@/stores/token.js'
import { getActivePinia, setActivePinia, createPinia } from 'pinia';
if (!getActivePinia()) {
    setActivePinia(createPinia());
}

const tokenStore = useTokenStore();
//添加请求拦截器
instance.interceptors.request.use(
    (config)=>{
        //请求前的回调
        //添加token
        
        //判断有没有token
        if (tokenStore.token) {
            config.headers.Authorization = `Bearer ${tokenStore.token}`;
        }
        
        return config;
    },
    (err)=>{
        //请求错误的回调
      
        return Promise.reject(err)
        
    }
)

/* import {useRouter} from 'vue-router'
const router = useRouter(); */

import router from '@/router'
//添加响应拦截器
instance.interceptors.response.use(
    result => {
        //判断业务状态码
        if(result.data.code===1){
            return result.data;
        }

        //操作失败
        //alert(result.data.msg?result.data.msg:'服务异常')
        ElMessage.error(result.data.msg?result.data.msg:'服务异常')
        //异步操作的状态转换为失败
        return Promise.reject(result.data)
        
    },
    err => {
        //判断响应状态码,如果为401,则证明未登录,提示请登录,并跳转到登录页面
        if(err.response.status===401){
            tokenStore.removeToken(); // 清除 token
            ElMessage.error('请先登录');
            router.push('/admin/login');
        }else{
            ElMessage.error('服务异常')
        }
       
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

export default instance;