<script setup>
import {
    Management,
    Promotion,
    UserFilled,
    User,
    Crop,
    EditPen,
    SwitchButton,
    CaretBottom
} from '@element-plus/icons-vue'
import { useTokenStore } from '@/stores/token.js'
import { useUserInfoStore } from '@/stores/userInfo.js';
const tokenStore = useTokenStore()
const userInfoStore = useUserInfoStore(); 

//条目被点击后,调用的函数
import {useRouter} from 'vue-router'
const router = useRouter();
import {ElMessage,ElMessageBox} from 'element-plus'
const handleCommand = (command) => {
  if (command === 'logout') {
    ElMessageBox.confirm('您确认要退出吗?', '温馨提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        // 清空Pinia中存储的token和用户信息
        tokenStore.removeToken();
        userInfoStore.removeInfo();

        // 跳转到登录页面
        router.push('/admin/login');
        ElMessage({
          type: 'success',
          message: '退出登录成功',
        });
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '用户取消了退出登录',
        });
      });
  } else {
    router.push('/user/' + command);
  }
};

</script>

<template>
    <!-- element-plus中的容器 -->
    <el-container class="layout-container">
        <!-- 左侧菜单 -->
        <el-aside width="200px">
            <div class="el-aside__logo"></div>
            <!-- element-plus的菜单标签 -->
            <el-menu active-text-color="#ffd04b" background-color="#232323"  text-color="#fff"
                router>
                <el-menu-item index="/admin/parkingLots">
                    <el-icon>
                        <Management />
                    </el-icon>
                    <span>首页</span>
                </el-menu-item>
                <el-menu-item index="/admin/users">
                    <el-icon>
                        <Management />
                    </el-icon>
                    <span>用户信息管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/parking-spaces">
                    <el-icon>
                        <Promotion />
                    </el-icon>
                    <span>车位信息管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/fees">
                    <el-icon>
                        <Management />
                    </el-icon>
                    <span>查询缴费管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/reservation">
                    <el-icon>
                        <Management />
                    </el-icon>
                    <span>预约记录查询</span>
                </el-menu-item>
                <el-menu-item index="/admin/feedbacks">
                    <el-icon>
                        <Management />
                    </el-icon>
                    <span>意见反馈管理</span>
                </el-menu-item>
               
                
            </el-menu>
        </el-aside>
        <!-- 右侧主区域 -->
        <el-container>
            <!-- 头部区域 -->
            <el-header>
                <div>你好：<strong>{{ userInfoStore.userInfo?.userName || '游客' }}</strong></div>

                <!-- 下拉菜单 -->
                <!-- command: 条目被点击后会触发,在事件函数上可以声明一个参数,接收条目对应的指令 -->
                <el-dropdown placement="bottom-end" @command="handleCommand">
                    <span class="el-dropdown__box">
                        <el-avatar :icon="UserFilled" />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                           
                            <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <!-- 中间区域 -->
            <el-main>
                <!-- <div style="width: 1290px; height: 570px;border: 1px solid red;">
                    内容展示区
                </div> -->
                <router-view></router-view>
            </el-main>
            <!-- 底部区域 -->
            <el-footer></el-footer>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
    height: 100vh;

    .el-aside {
        background-color: #232323;

        &__logo {
            height: 120px;
            background: url('@/assets/logo.jpg') no-repeat center / 120px auto;
        }

        .el-menu {
            border-right: none;
        }
    }

    .el-header {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-dropdown__box {
            display: flex;
            align-items: center;

            .el-icon {
                color: #999;
                margin-left: 10px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
    }

    .el-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;
    }
}
</style>