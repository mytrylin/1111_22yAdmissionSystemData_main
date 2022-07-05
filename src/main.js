import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  createMetaManager,
  plugin as metaPlugin,
  defaultConfig
} from "vue-meta/dist/vue-meta.esm-browser";
import lazyPlugin from "vue3-lazy";


const metaManager = createMetaManager(false, {
  ...defaultConfig,
  meta: { tag: 'meta', nameless: true },
});

import App from './App.vue'
import router from './router'

import './assets/css/bootstrap.css'
import './assets/css/all.css'
import 'aos/dist/aos.css';
import 'bootstrap';
import './api/default/httpConfig'
import './api/default/errorProcess'



const app = createApp(App)

app.config.errorHandler = function(err, vm, info) {
   console.log(`Error: ${err.toString()}\nInfo: ${info}`); 
};

app.config.errorHandler = (err, vm, info) => {
  // 这里进行错误上报
  console.log(err, vm, info)
}

app.use(lazyPlugin, {
  error:
    "https://university.1111.com.tw/img/company/default_img.png", // 图片加载失败时默认图片
});

app.use(createPinia())
app.use(metaManager)
app.use(metaPlugin)
app.use(router)
app.mount('#app')
