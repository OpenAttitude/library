import { createApp } from 'vue';
import { installPanelMath } from '@openattitude/core';
import App from './App.vue';
import './testbed.css';

installPanelMath();
createApp(App).mount('#app');
