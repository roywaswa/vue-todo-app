import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/style/css/main.css'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
