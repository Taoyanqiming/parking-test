import { createRouter, createWebHistory } from 'vue-router'
import ParkingSpaceList from '../views/Admin/ParkingSpaceList.vue';// 停车场内车位信息管理
import UserList from '@/views/Admin/UserList.vue';// 用户信息管理
import ParkingLots from '@/views/Admin/Home.vue';//首页
import ReservationFind from '../views/Admin/ReservationFind.vue';
import FeedbacksFind from '../views/Admin/FeedbacksFind.vue';
import FeesSearch from '../views/Admin/FeesSearch.vue';
import LoginVue from '../views/Login.vue';
import LayoutVue from '../views/Layout.vue';

// 定义路由关系
const routes = [
    { path: '/admin/login', component: LoginVue },
    { path: '/', component: LayoutVue,
        // 重定向
        redirect: '/admin/parkingLots',
        // 子路由
        children: [
            // 用户信息管理
            { path: '/admin/users', component: UserList },

            // 停车场内车位信息管理
            { path: '/admin/parking-spaces', component: ParkingSpaceList },
          
            // 查询缴费管理
             { path: '/admin/fees', component: FeesSearch },

             // 意见反馈
             { path: '/admin/feedbacks', component: FeedbacksFind },

             //预约记录查询
             { path: '/admin/reservation', component: ReservationFind },

            // 首页停车场情况查询
            { path: '/admin/parkingLots', component: ParkingLots },
        ]
    }
];

//创建路由器
const router = createRouter({

    history: createWebHistory(),
    routes: routes
})
//导出路由
export default router