import { createApp  } from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import './assets/style.css'
import App from './App.vue'

const options = {
  // Límite de 1 toast a la vez
  maxToasts: 1,
  newestOnTop: true,
  timeout: 2000,

};

const app = createApp(App)
app.use(Toast, options);
app.mount('#app');
