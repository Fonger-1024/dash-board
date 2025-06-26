<template>
  <div class="login-container">
    <!-- 3D背景效果 -->
    <div class="background-3d">
      <div class="circle-ring"></div>
      <div class="tech-lines"></div>
    </div>
    
    <!-- 登录框 -->
    <div class="login-card">
      <div class="welcome-section">
        <h2>Hi，您好！欢迎进入</h2>
        <h1>最高法安全运营平台</h1>
      </div>
      
      <div class="login-form-section">
        <div class="tabs">
          <div class="tab active">账号密码登录</div>
        </div>
        
        <el-form :model="loginForm" class="login-form" @submit.prevent="handleLogin">
          <el-form-item>
            <el-input
              v-model="loginForm.username"
              placeholder="请输入账号"
              prefix-icon="User"
              size="large"
            />
          </el-form-item>
          
          <el-form-item>
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              prefix-icon="Lock"
              size="large"
              show-password
            />
          </el-form-item>
          
          <el-button 
            type="primary" 
            size="large" 
            class="login-btn"
            @click="handleLogin"
            :loading="loading"
          >
            登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export default {
  name: 'Login',
  setup() {
    const store = useStore()
    const router = useRouter()
    const loading = ref(false)
    
    const loginForm = ref({
      username: '',
      password: ''
    })
    
    const handleLogin = async () => {
      if (!loginForm.value.username || !loginForm.value.password) {
        ElMessage.warning('请输入账号和密码')
        return
      }
      
      loading.value = true
      
      try {
        // 模拟登录
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const userData = {
          username: loginForm.value.username,
          name: loginForm.value.username === 'admin' ? '王浩' : loginForm.value.username
        }
        
        store.dispatch('login', userData)
        ElMessage.success('登录成功')
        router.push('/dashboard')
      } catch (error) {
        ElMessage.error('登录失败')
      } finally {
        loading.value = false
      }
    }
    
    return {
      loginForm,
      loading,
      handleLogin
    }
  }
}
</script>

<style scoped lang="scss">
.login-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.background-3d {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.circle-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: rotate 20s linear infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    border: 2px solid rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    animation: rotate 30s linear infinite reverse;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 50%;
    animation: rotate 15s linear infinite;
  }
}

.tech-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: move 10s linear infinite;
}

@keyframes rotate {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes move {
  from { transform: translate(0, 0); }
  to { transform: translate(50px, 50px); }
}

.login-card {
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 0;
  width: 800px;
  height: 500px;
  display: flex;
  overflow: hidden;
}

.welcome-section {
  flex: 1;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  padding: 60px 40px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
    background-size: 30px 30px;
  }
  
  h2 {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
    opacity: 0.9;
  }
  
  h1 {
    font-size: 32px;
    font-weight: 600;
    line-height: 1.2;
  }
}

.login-form-section {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
}

.tabs {
  display: flex;
  margin-bottom: 40px;
  border-bottom: 1px solid #eee;
}

.tab {
  padding: 12px 24px;
  cursor: pointer;
  color: #999;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
  
  &.active {
    color: #409eff;
    border-bottom-color: #409eff;
  }
}

.login-form {
  flex: 1;
  
  .el-form-item {
    margin-bottom: 24px;
  }
  
  .el-input {
    height: 50px;
    
    :deep(.el-input__wrapper) {
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
}

.login-btn {
  width: 100%;
  height: 50px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  background: linear-gradient(135deg, #409eff, #66b3ff);
  border: none;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(64, 158, 255, 0.4);
  }
}
</style>
