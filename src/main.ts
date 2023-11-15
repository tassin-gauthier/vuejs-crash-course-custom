import { createApp } from "vue";
import { createPinia } from "pinia";

import app from "./modules/common-module/app.vue";
import "./global.scss";

createApp(app).use(createPinia()).mount("#app");
