import Vue from 'vue';
import Vuex from 'vuex';
// vuex 持久化
// import createPersistedState from 'vuex-persistedstate';
import createLogger from 'vuex/dist/logger';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  cash: 0,
};
const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  // plugins: debug ?
  //   [createLogger(), createPersistedState({ storage: window.sessionStorage })] :
  //   [createPersistedState({ storage: window.sessionStorage })],
});

/* eslint-disable global-require */

if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations',
    './mutationType',
  ], () => {
    store.hotUpdate({
      // !important
      // 因为 babel 6 的模块编译格式问题，这里需要加上 .default
      getters: require('./getters').default,
      actions: require('./actions').default,
      mutations: require('./mutations').default,
    });
  });
}


export default store;
