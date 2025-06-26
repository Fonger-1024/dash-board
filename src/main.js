import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'

// 路由配置
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

// 状态管理
const store = createStore({
  state: {
    user: null,
    selectedSystems: [
      '指挥管理子系统',
      '监测分析子系统',
      '安全运维子系统',
      '资产管理子系统'
    ],
    allSystems: [
      '指挥管理子系统',
      '监测分析子系统', 
      '安全运维子系统',
      '资产管理子系统',
      '威胁情报子系统',
      '数据处理与服务',
      '攻防演练子系统',
      '漏洞管理子系统',
      '隔离交换通道管理子系统',
      '敏感数据管理子系统',
      '违规外联监测子系统',
      '供应链管理子系统'
    ]
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_SELECTED_SYSTEMS(state, systems) {
      state.selectedSystems = systems
    }
  },
  actions: {
    login({ commit }, userData) {
      commit('SET_USER', userData)
      localStorage.setItem('token', 'demo-token')
      localStorage.setItem('user', JSON.stringify(userData))
    },
    logout({ commit }) {
      commit('SET_USER', null)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    updateSelectedSystems({ commit }, systems) {
      commit('SET_SELECTED_SYSTEMS', systems)
    }
  }
})

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
