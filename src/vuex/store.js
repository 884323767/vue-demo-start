import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import createLogger from 'vuex/dist/logger';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  cash: 0,
  cashGuodu: '0.00',
  nextUrl: '',
  riskStatement: {
    confirmed: false,
    shown: false,
  },
  qAnswer: '',
  userClient: '',
  statement: {
    confirmed: false,
    shown: false,
  },
  currentPage: 'login',
  previousPage: '',
  questionStatus: 0,
  isSFC: false,
  isGuodu: false,
  isConvoy: false,
  isMocked: false,
  menu: {
    backable: false,
    settingable: true,
    title: '康宏证券投资',
  },
  userSummaryConfirmed: false,
  records: [],
  transactionIndex: 0,
  transaction: {},
  amount: 0,
  accData: {},
  checkbox: false,
  latestDate: new Date(),
  //ws event
  wsConnect: false,
  wsConfirm: false,
  wsReject: false,
  wsNotice: false,
  wsKickoff: false,
  //
  isTest: false,
};
const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ?
    [createLogger(), createPersistedState({ storage: window.sessionStorage })] :
    [createPersistedState({ storage: window.sessionStorage })],
});

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
