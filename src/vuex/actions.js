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

  // SUBMIT_QUESTIONNAIRE
  submitQuestionnaire({ commit, state }, data) {
    commit(types.SUBMIT_QUESTIONNAIRE, data);
    if (!state.isSFC) {
      commit(types.NAVIGATE_TO_CONFIRM);
    }
  },

};

export default actions;
