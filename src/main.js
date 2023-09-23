import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './vuex/store';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

axios.defaults.baseURL = 'http://localhost:3000';

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
