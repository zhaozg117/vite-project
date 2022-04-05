import { createApp } from 'vue';
import App from './App.vue';
import router from './route';
import directive from './directive';
import 'uno.css';
const app = createApp(App);
app.use(router);
app.use(directive);
app.mount('#app');
