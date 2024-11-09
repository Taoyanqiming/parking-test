import { onMounted } from 'vue';

<template>
  <el-card class="all">
    <template #header>
      <div class="header">
        <span>用户信息管理</span>
      </div>
    </template>
    
    <!-- 搜索表单 -->
    <div>
      <el-row>
        <el-col :span="12">
          <input type="text" id="phoneInput" placeholder="请输入手机号" v-model="phoneNumber">
          <input type="text" id="nameInput" placeholder="请输入用户姓名" v-model="username">
        </el-col>
        <el-col :span="12">
          <button @click="fetchUsers">查询</button>
        </el-col>
      </el-row>
    </div>
    
   <!-- 用户信息展示表格 -->
  <el-table :data="people" style="width: 100%">
    <el-table-column label="ID" prop="userId" width="40"></el-table-column>
    <el-table-column label="姓名" prop="username" width="140"></el-table-column>
    <el-table-column label="手机号" prop="phoneNumber" width="140"></el-table-column>
    <el-table-column label="邮箱" prop="email" width="140"></el-table-column>
    <el-table-column label="角色" prop="role" width="140"></el-table-column>
    <el-table-column label="操作" width="200">
      <template v-slot="scope">
        <el-button @click="handleEdit(scope.row)" plain type="primary">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
    
    <!-- 分页组件 -->  
    <el-pagination  
      v-model:current-page="pagination.page"  
      :page-size="pagination.pageSize"  
      :total="pagination.total"  
      layout="prev, pager, next"  
      @current-change="handlePageChange"  
    />

    <el-dialog  
  title="修改用户信息"  
  v-model:visible="editDialogVisible"  
  width="30%"  
>  
  <el-form :model="editForm">  
    <el-form-item label="姓名">  
      <el-input v-model="editForm.username" autocomplete="off"></el-input>  
    </el-form-item>  
    <el-form-item label="手机号">  
      <el-input v-model="editForm.phoneNumber" autocomplete="off"></el-input>  
    </el-form-item>  
    <el-form-item label="邮箱">  
      <el-input v-model="editForm.email" autocomplete="off"></el-input>  
    </el-form-item>   
    <el-form-item label="状态">  
      <el-input v-model="editForm.status" autocomplete="off"></el-input>  
    </el-form-item>  
   
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>  
        <el-button type="primary" @click="updateUser">确定</el-button>  
      </span>
    </template>  
  </el-form>  
</el-dialog>


  </el-card>
</template>


<script setup>
import { ref , onMounted} from 'vue'
import { ElMessage } from 'element-plus'
import { getUsersService,updateUserService } from '@/api/users.js' // 调用你封装的 API

const phoneNumber = ref('')  // 存储输入的手机号
const username = ref('') 
const people = ref([])  // 存储用户数据

// 分页数据
const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 0
});
const editDialogVisible = ref(false) // 控制对话框的显示  
const editForm = ref({ // 修改表单的模型  
  name: '',  
  phone: '',
  status: '',
  email: '', 
})  
// 处理修改按钮点击事件  
const handleEdit = (row) => {  
  console.log('Selected Row:', row); // 调试信息
  editForm.value = { ...row }; // 复制当前行数据到 editForm
  editDialogVisible.value = true; // 显示对话框
};
 
// 查询用户数据
const fetchUsers = async () => {
  try {
    const userPageQueryDTO = {
      username: username.value,
      phoneNumber: phoneNumber.value,
      page: pagination.value.page,
      pageSize: pagination.value.pageSize
    };

    const result = await getUsersService(userPageQueryDTO);  // 调用封装的 API
    people.value = result.data.records;  // 设置用户列表
    pagination.value.total = result.data.total;  // 设置总记录数
  } catch (error) {
    ElMessage.error(error.message || '查询用户失败');
  }
};
// 更新用户信息  
const updateUser = async () => {  
  try {  
    const result = await updateUserService(editForm.value); // 调用API更新用户信息  
    if (result.success) {  
      ElMessage.success('用户信息更新成功');  
      editDialogVisible.value = false;  
      fetchUsers(); // 重新获取用户列表
    } else {  
      ElMessage.error('用户信息更新失败');  
    }  
  } catch (error) {  
    ElMessage.error(error.message || '更新用户信息时发生错误');  
  }  
};

// 处理分页变化  
const handlePageChange = (newPage) => {  
  pagination.value.page = newPage;  
  fetchUsers();  
};  
// 组件初始化时，默认获取所有用户数据
onMounted(() => {
  fetchUsers();
});
</script>
