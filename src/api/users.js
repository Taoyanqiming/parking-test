import instance from '@/utils/request.js'; // 确保导入正确的实例

// 1. 用户登录
export const userLoginService = (userLoginDTO) => {
  return instance.post("/admin/login", userLoginDTO);
};

// 2. 用户登出
export const logoutService = () => {
  return instance.post("/admin/logout");
};

// 3. 新增用户（注册）
export const userRegisterService = (userDTO) => {
  return instance.post("/admin/add", userDTO);
};

// 4. 分页展示用户
export const getUsersService = (userPageQueryDTO) => {
  return instance.get("/admin/page", { params: userPageQueryDTO }

  );
};

// 5. 根据 ID 查询用户信息
export const getUserByIdService = (userId) => {
  return instance.get(`/admin/${userId}`);
};

// 6. 修改用户信息
export const updateUserService = (userDTO) => {
  return instance.put("/admin/update", userDTO);
};
