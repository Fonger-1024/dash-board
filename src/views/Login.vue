<template>
  <div class="login-container"> <!-- 3D背景效果 -->
    <div class="background-3d">
      <div class="particle-system">
        <div class="particle" v-for="n in 50" :key="n"></div>
      </div>
      <div class="geometric-shapes">
        <div class="floating-cube"></div>
        <div class="rotating-hexagon"></div>
        <div class="pulsing-diamond"></div>
      </div>
      <div class="cyber-grid"></div>
      <div class="light-beams">
        <div class="beam beam-1"></div>
        <div class="beam beam-2"></div>
        <div class="beam beam-3"></div>
      </div>
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
            <el-input v-model="loginForm.username" placeholder="请输入账号" prefix-icon="User" size="large" />
          </el-form-item>

          <el-form-item>
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" prefix-icon="Lock" size="large"
              show-password />
          </el-form-item>

          <el-button type="primary" size="large" class="login-btn" @click="handleLogin" :loading="loading">
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
  background: radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
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

// 粒子系统
.particle-system {
  position: absolute;
  width: 100%;
  height: 100%;

  .particle {
    position: absolute;
    width: 3px;
    height: 3px;
    background: #00d4ff;
    border-radius: 50%;
    animation: float 8s ease-in-out infinite;
    box-shadow: 0 0 10px #00d4ff;

    @for $i from 1 through 50 {
      &:nth-child(#{$i}) {
        left: random(100) * 1%;
        top: random(100) * 1%;
        animation-delay: random(8) * 1s;
        animation-duration: (6 + random(4)) * 1s;
        opacity: 0.3 + random(7) * 0.1;
      }
    }
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.3;
  }

  25% {
    transform: translateY(-20px) translateX(10px) scale(1.2);
    opacity: 0.8;
  }

  50% {
    transform: translateY(-10px) translateX(-15px) scale(0.8);
    opacity: 0.5;
  }

  75% {
    transform: translateY(-30px) translateX(20px) scale(1.1);
    opacity: 0.9;
  }
}

// 几何形状
.geometric-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.floating-cube {
  position: absolute;
  top: 20%;
  left: 10%;
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, rgba(0, 212, 255, 0.3), rgba(0, 255, 157, 0.3));
  border: 1px solid rgba(0, 212, 255, 0.5);
  transform-style: preserve-3d;
  animation: cube-rotate 15s linear infinite;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    width: 60px;
    height: 60px;
    background: linear-gradient(45deg, rgba(0, 255, 157, 0.2), rgba(0, 212, 255, 0.2));
    border: 1px solid rgba(0, 255, 157, 0.3);
    transform: translateZ(-30px);
  }
}

.rotating-hexagon {
  position: absolute;
  top: 60%;
  right: 15%;
  width: 80px;
  height: 80px;
  background: linear-gradient(60deg, rgba(255, 0, 150, 0.3), rgba(0, 212, 255, 0.3));
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  animation: hexagon-spin 12s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.5));
}

.pulsing-diamond {
  position: absolute;
  top: 30%;
  right: 30%;
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, rgba(255, 215, 0, 0.4), rgba(255, 165, 0, 0.4));
  transform: rotate(45deg);
  animation: diamond-pulse 6s ease-in-out infinite;
  filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.6));
}

@keyframes cube-rotate {
  0% {
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }

  100% {
    transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
  }
}

@keyframes hexagon-spin {

  0%,
  100% {
    transform: rotate(0deg) scale(1);
  }

  50% {
    transform: rotate(180deg) scale(1.2);
  }
}

@keyframes diamond-pulse {

  0%,
  100% {
    transform: rotate(45deg) scale(1);
    opacity: 0.4;
  }

  50% {
    transform: rotate(45deg) scale(1.5);
    opacity: 0.8;
  }
}

// 赛博网格
.cyber-grid {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: grid-move 20s linear infinite;
  mask: radial-gradient(circle at center, black 20%, transparent 70%);
}

@keyframes grid-move {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(60px, 60px);
  }
}

// 光束效果
.light-beams {
  position: absolute;
  width: 100%;
  height: 100%;
}

.beam {
  position: absolute;
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom,
      transparent 0%,
      rgba(0, 212, 255, 0.8) 20%,
      rgba(0, 255, 157, 0.6) 50%,
      rgba(0, 212, 255, 0.8) 80%,
      transparent 100%);
  animation: beam-sweep 8s ease-in-out infinite;
}

.beam-1 {
  left: 20%;
  animation-delay: 0s;
  transform: skew(-15deg);
}

.beam-2 {
  left: 50%;
  animation-delay: 2s;
  transform: skew(10deg);
}

.beam-3 {
  right: 25%;
  animation-delay: 4s;
  transform: skew(-8deg);
}

@keyframes beam-sweep {

  0%,
  100% {
    opacity: 0;
    transform: scaleY(0) skew(0deg);
  }

  20% {
    opacity: 0.8;
    transform: scaleY(1) skew(-15deg);
  }

  50% {
    opacity: 1;
    transform: scaleY(1.2) skew(5deg);
  }

  80% {
    opacity: 0.6;
    transform: scaleY(0.8) skew(-10deg);
  }
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
}</style>
