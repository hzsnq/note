import './assets/css/main.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
// import { wrapperEnv } from './utils/env'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
// console.log(app)
