<template>
  <div class="dashboard-container">
    <!-- 顶部导航 -->
    <header class="dashboard-header">
      <div class="header-left">
        <h1 class="system-title">最高法安全运营统一门户</h1>
      </div>
      
      <div class="header-center">
        <div class="scrolling-text">
          <div class="scroll-content">
            {{ scrollingText }}
          </div>
        </div>
      </div>
      
      <div class="header-right">
        <el-button 
          type="text" 
          @click="showSettings = true"
          class="settings-btn"
        >
          <el-icon><Setting /></el-icon>
        </el-button>
        
        <div class="user-info">
          <span>欢迎访问，{{ user?.name || '用户' }}</span>
          <el-icon class="user-icon"><User /></el-icon>
        </div>
      </div>
    </header>
    
    <!-- 主要内容区域 -->
    <main class="dashboard-main">
      <div class="systems-grid">
        <div 
          v-for="system in selectedSystems" 
          :key="system"
          class="system-card"
        >
          <div class="system-header">
            <h3>{{ system }}</h3>
            <el-button type="text" size="small">
              <el-icon><ArrowRight /></el-icon>
            </el-button>
          </div>
          
          <div class="system-content">
            <!-- 折线图 -->
            <div class="chart-section">
              <div class="chart-container">
                <v-chart 
                  :option="getLineChartOption(system)" 
                  style="height: 200px;"
                />
              </div>
            </div>
            
            <!-- 饼图和小方块 -->
            <div class="bottom-section">
              <div class="pie-chart">
                <v-chart 
                  :option="getPieChartOption(system)" 
                  style="height: 150px;"
                />
              </div>
              
              <div class="stat-boxes">
                <div class="stat-box">
                  <div class="stat-icon" :style="{ backgroundColor: getSystemColor(system, 0) }">
                    <el-icon><Monitor /></el-icon>
                  </div>
                  <div class="stat-info">
                    <div class="stat-value">{{ getRandomValue(100, 999) }}</div>
                    <div class="stat-label">设备数量</div>
                  </div>
                </div>
                
                <div class="stat-box">
                  <div class="stat-icon" :style="{ backgroundColor: getSystemColor(system, 1) }">
                    <el-icon><Warning /></el-icon>
                  </div>
                  <div class="stat-info">
                    <div class="stat-value">{{ getRandomValue(0, 50) }}</div>
                    <div class="stat-label">告警数量</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <!-- 设置弹窗 -->
    <el-dialog 
      v-model="showSettings" 
      title="系统设置" 
      width="500px"
      :before-close="handleCloseSettings"
    >
      <div class="settings-content">
        <h4>选择要显示的系统：</h4>
        <el-checkbox-group v-model="tempSelectedSystems" class="system-checkboxes">
          <el-checkbox 
            v-for="system in allSystems" 
            :key="system"
            :label="system"
            class="system-checkbox"
          >
            {{ system }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showSettings = false">取消</el-button>
          <el-button type="primary" @click="saveSettings">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { LineChart, PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  CanvasRenderer
])

export default {
  name: 'Dashboard',
  components: {
    VChart
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const showSettings = ref(false)
    const scrollingText = ref('系统运行正常 | 安全态势良好 | 威胁检测活跃 | 数据处理正常 | 服务运行稳定')
    const tempSelectedSystems = ref([])
    
    const user = computed(() => store.state.user)
    const selectedSystems = computed(() => store.state.selectedSystems)
    const allSystems = computed(() => store.state.allSystems)
    
    // 系统颜色配置
    const systemColors = [
      ['#4A90E2', '#67B7DC'],
      ['#7ED321', '#A8E6CF'],
      ['#F5A623', '#FFD93D'],
      ['#D0021B', '#FF6B6B'],
      ['#9013FE', '#B794F6'],
      ['#00D4AA', '#4ECDC4']
    ]
    
    const getSystemColor = (system, index) => {
      const systemIndex = allSystems.value.indexOf(system) % systemColors.length
      return systemColors[systemIndex][index % 2]
    }
    
    const getRandomValue = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
    
    const generateRandomData = (count = 7) => {
      return Array.from({ length: count }, () => Math.floor(Math.random() * 100) + 20)
    }
    
    const getLineChartOption = (system) => {
      return {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'transparent',
          textStyle: { color: '#fff' }
        },
        grid: {
          left: '5%',
          right: '5%',
          top: '10%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisLine: { lineStyle: { color: '#eee' } },
          axisTick: { show: false },
          axisLabel: { color: '#999', fontSize: 12 }
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: '#999', fontSize: 12 },
          splitLine: { lineStyle: { color: '#f5f5f5' } }
        },
        series: [{
          data: generateRandomData(),
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: {
            width: 3,
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [
                { offset: 0, color: getSystemColor(system, 0) },
                { offset: 1, color: getSystemColor(system, 1) }
              ]
            }
          },
          itemStyle: {
            color: getSystemColor(system, 0),
            borderWidth: 2,
            borderColor: '#fff'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: getSystemColor(system, 0) + '40' },
                { offset: 1, color: getSystemColor(system, 0) + '10' }
              ]
            }
          }
        }]
      }
    }
    
    const getPieChartOption = (system) => {
      return {
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'transparent',
          textStyle: { color: '#fff' }
        },
        series: [{
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '50%'],
          data: [
            { value: getRandomValue(20, 40), name: '正常' },
            { value: getRandomValue(5, 15), name: '警告' },
            { value: getRandomValue(1, 8), name: '严重' }
          ],
          itemStyle: {
            borderRadius: 5,
            borderColor: '#fff',
            borderWidth: 2
          },
          color: [
            getSystemColor(system, 0),
            '#FFB84D',
            '#FF6B6B'
          ],
          label: {
            show: true,
            fontSize: 12
          }
        }]
      }
    }
    
    const handleCloseSettings = () => {
      tempSelectedSystems.value = [...selectedSystems.value]
      showSettings.value = false
    }
    
    const saveSettings = () => {
      store.dispatch('updateSelectedSystems', tempSelectedSystems.value)
      showSettings.value = false
    }
    
    onMounted(() => {
      // 检查登录状态
      const token = localStorage.getItem('token')
      const userData = localStorage.getItem('user')
      
      if (!token || !userData) {
        router.push('/login')
        return
      }
      
      // 恢复用户状态
      if (userData && !user.value) {
        store.commit('SET_USER', JSON.parse(userData))
      }
      
      // 初始化临时选择的系统
      tempSelectedSystems.value = [...selectedSystems.value]
    })
    
    return {
      showSettings,
      scrollingText,
      tempSelectedSystems,
      user,
      selectedSystems,
      allSystems,
      getSystemColor,
      getRandomValue,
      getLineChartOption,
      getPieChartOption,
      handleCloseSettings,
      saveSettings
    }
  }
}
</script>

<style scoped lang="scss">
.dashboard-container {
  height: 100vh;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
}

.dashboard-header {
  background: #fff;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.header-left {
  flex: 0 0 auto;
  
  .system-title {
    font-size: 20px;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
  }
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 0 40px;
  
  .scrolling-text {
    background: #f8fafc;
    border-radius: 20px;
    padding: 8px 24px;
    overflow: hidden;
    width: 400px;
    
    .scroll-content {
      animation: scroll 15s linear infinite;
      white-space: nowrap;
      color: #6b7280;
      font-size: 14px;
    }
  }
}

@keyframes scroll {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

.header-right {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 20px;
  
  .settings-btn {
    font-size: 18px;
    color: #6b7280;
    
    &:hover {
      color: #4f46e5;
    }
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #374151;
    font-size: 14px;
    
    .user-icon {
      font-size: 18px;
      color: #6b7280;
    }
  }
}

.dashboard-main {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.systems-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.system-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
}

.system-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
  }
  
  .el-button {
    color: #6b7280;
    
    &:hover {
      color: #4f46e5;
    }
  }
}

.system-content {
  .chart-section {
    margin-bottom: 20px;
    
    .chart-container {
      border-radius: 8px;
      overflow: hidden;
    }
  }
  
  .bottom-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    align-items: center;
  }
  
  .pie-chart {
    border-radius: 8px;
    overflow: hidden;
  }
  
  .stat-boxes {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .stat-box {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: #f8fafc;
    border-radius: 8px;
    
    .stat-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 18px;
    }
    
    .stat-info {
      .stat-value {
        font-size: 20px;
        font-weight: 600;
        color: #1f2937;
        line-height: 1;
      }
      
      .stat-label {
        font-size: 12px;
        color: #6b7280;
        margin-top: 2px;
      }
    }
  }
}

.settings-content {
  .system-checkboxes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 16px;
    
    .system-checkbox {
      padding: 8px 0;
    }
  }
}

:deep(.el-dialog__header) {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 16px;
}

:deep(.el-dialog__body) {
  padding-top: 20px;
}
</style>
