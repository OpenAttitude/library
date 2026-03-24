import { createApp } from 'vue';
import { installPanelMath } from '@openattitude/core';
import App from './App.vue';
import 'leaflet/dist/leaflet.css';
import './testbed.css';

installPanelMath();
createApp(App).mount('#app');
