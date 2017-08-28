import * as types from './mutationType';

const statementActions = {
  showStatement({ commit }, statement = 'RISK') {
    const data = {
      shown: true,
      confirmed: false,
    };
    if (statement === 'RISK') {
      commit(types.SHOW_RISK_STATEMENT, data, statement);
    } else {
      commit(types.SHOW_STATEMENT, data, statement);
    }
  },

  agreeStatement({ commit }, data) {
    if (data.confirmed === true) {
      commit(types.AGREE_STATEMENT, data.statement);
    } else {
      commit(types.DISAGREE_STATEMENT, data.statement);
    }
  },

  enableUserConfirm({ commit }, data) {
    commit(types.TOGGLE_USER_SUMMARY_CONFIRMED, data);
  },
};

const userActions = {
  setUserClient({ commit }, data) {
    commit(types.SET_USER_CLIENT, data);
  },
};

const actions = {
  ...statementActions,
  ...userActions,
  despatchDemo: ({ commit, state }, testData) => {
    setTimeout(() => {
      commit(types.CHANGE_DEMO);
    }, 5000);
    commit(types.CHANGE_DEMO);
  },

  incrementLang({ commit }) {
    commit(types.CHANGE_NAME);
  },

  changeCash({ commit }, data) {
    commit(types.CHANGE_CASH, data);
  },

  changeInvestmentType({ commit }, data) {
    commit(types.CHANGE_INVESTMENT_TYPE, data);
  },

  // SUBMIT_QUESTIONNAIRE
  submitQuestionnaire({ commit, state }, data) {
    commit(types.SUBMIT_QUESTIONNAIRE, data);
    if (!state.isSFC) {
      commit(types.NAVIGATE_TO_CONFIRM);
    }
  },

  // Navigate
  // data: object
  /*
    page: String
  */
  navigateToPage({ commit }, data) {
    commit(types.NAVIGATE_TO_PAGE, data);
  },

  storeNextUrl({ commit }, data) {
    commit(types.STORE_NEXT_URL, data);
  },

  storeCurrentPage({ commit }, data) {
    commit(types.STORE_CURRENT_PAGE, data);
  },

  openTransaction({ commit }, index) {
    commit(types.STORE_TRANSACTION_INDEX, index);
    commit(types.NAVIGATE_TO_PAGE, { page: 'trade_detail' });
  },
};

export default actions;
//
// 调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters
// Action 通过 store.dispatch 方法触发：

// actions: {
//   actionA ({ commit }) {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         commit('someMutation')
//         resolve()
//       }, 1000)
//     })
//   }
// }

// actions: {
//   // ...
//   actionB ({ dispatch, commit }) {
//     return dispatch('actionA').then(() => {
//       commit('someOtherMutation')
//     })
//   }
// }
