import { createApp } from 'vue'

// import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
// import Lei from './index.ts'
import router from './router/index.ts'
// new Lei()

createApp(App).use(ElementPlus).use(router).mount('#app')
