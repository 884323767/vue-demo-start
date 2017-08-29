// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import store from './vuex/store';
import App from './App';
import router from './router';
// 如果大量用到格式化币种等，在引入accounting
// import accounting from 'accounting';

import VueI18n from 'vue-i18n';
import labelsCn from './i18n/zh-hans';
import labelsEn from './i18n/en';
import labelsZh from './i18n/zh-hant';

import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

Raven
    .config('')
    .addPlugin(RavenVue, Vue)
    .install();

//test for raven
Raven.captureException('test');

Vue.config.productionTip = false;

let language = sessionStorage.getItem('language');

Vue.use(VueI18n);
if (!language) {
  language = 'cn';
  sessionStorage.setItem('language', 'cn');
}
const i18n = new VueI18n({
  locale: language,
  messages: {
    cn: labelsCn,
    zh: labelsZh,
    en: labelsEn,
  },
  fallbackLang: 'en',
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App },
});
