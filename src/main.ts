import { createApp } from "vue";
import { createPinia } from "pinia";

import app from "./modules/common-module/app.vue";

createApp(app).use(createPinia()).mount("#app");
