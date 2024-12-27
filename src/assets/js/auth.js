import Cookies from "js-cookie";

const Auth = {
  // 檢查是否已登入
  checkLogin(router) {
    const token = Cookies.get("token");
    if (!token) {
      alert("未登入，請重新登入！");
      router.push("/login");
    } else {
      console.log("使用者已登入，token:", token);
    }
  },

  // 登出功能
  logout(router) {
    Cookies.remove("token");
    Cookies.remove("email");
    Cookies.remove("role");
    alert("登出成功！");
    router.push("/login");
  },

  // 獲取當前用戶角色
  getRole() {
    const role = Cookies.get("role");
    return role ? parseInt(role, 10) : null;
  },

  // 檢查角色是否符合權限
  hasPermission(requiredRole) {
    const currentRole = this.getRole();
    return currentRole === requiredRole;
  },

  // 根據角色跳轉頁面
  redirectToRolePage(router) {
    const role = this.getRole();
    if (role === null) {
      alert("未找到角色，請重新登入！");
      router.push("/login");
      return;
    }

    const currentPath = router.currentRoute.path; // Vue 2 獲取當前路徑
    const roleRoutes = {
      0: "/engineer-dashboard",
      1: "/boss-dashboard",
      2: "/manager-dashboard",
      3: "/employee-dashboard",
      4: "/customer-dashboard",
    };

    const targetPath = roleRoutes[role];
    if (!targetPath) {
      Cookies.remove("role");
      Cookies.remove("token");
      alert("未知的角色，請重新登入！");
      router.push("/login");
      return;
    }

    if (currentPath !== targetPath) {
      router.push(targetPath);
    }
  },
};

export default Auth;
