import './assets/main.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@fontsource/roboto/100.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto/900.css'

import '@fontsource/roboto/100-italic.css'
import '@fontsource/roboto/300-italic.css'
import '@fontsource/roboto/400-italic.css'
import '@fontsource/roboto/500-italic.css'
import '@fontsource/roboto/700-italic.css'
import '@fontsource/roboto/900-italic.css'

import '@mdi/font/css/materialdesignicons.css' // Material Design Icons


import App from './App.vue'
import router from './router'

const appTheme = {
    dark: true,
    colors: {
        primary: '#2ECC71',
    },
};


const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
    },
    theme: {
        defaultTheme: 'appTheme',
        themes: {
            appTheme,
        },
    },
});

createApp(App)
    .use(createPinia())
    .use(router)
    .use(vuetify)
    .mount('#app');
