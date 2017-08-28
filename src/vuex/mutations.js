import {
  CHANGE_CASH,
  SUBMIT_QUESTIONNAIRE,
  NAVIGATE_TO_CONFIRM,
  NAVIGATE_TO_PAGE,
  STORE_NEXT_URL,
  STORE_CURRENT_PAGE,
  SHOW_RISK_STATEMENT,
  SHOW_STATEMENT,
  AGREE_STATEMENT,
  DISAGREE_STATEMENT,
  SET_USER_CLIENT,
  SET_RISKTYPE,
  // sfc
  TOGGLE_SFC_STATE,
  CHANGE_MENU_ITEMS,
  GO_BACK,
  TOGGLE_USER_SUMMARY_CONFIRMED,
  TOGGLE_MOCK_DATA,
  STORE_RECORDS,
  STORE_TRANSACTION_INDEX,
  STORE_TRANSACTIONS,
  STORE_ACCDATA,
  CHANGE_CHECKBOX,
  CHANGE_GUODU_STATE,
  STORE_LATEST_DATE,
  CHANGE_CONVOY_STATE,
  //WS
  WS_EVENT_CONNECT,
  WS_EVENT_CONFIRM,
  WS_EVENT_REJECT,
  WS_EVENT_NOTICE,
  WS_EVENT_KICKOFF,
  //guodu
  INIT_CASH_GUODU,
  ADD_CASH_GUODU,
  //
  CHANGE_IS_TEST,
} from './mutationType';

import { navigateTo, goBack } from '../services/router';

const routers = {
  //WS
  [WS_EVENT_CONNECT](state, data) {
    state.wsConnect = data;
  },
  [CHANGE_IS_TEST](state, data) {
    state.isTest = data;
  },
  [WS_EVENT_CONFIRM](state, data) {
    state.wsConfirm = data;
  },
  [WS_EVENT_REJECT](state, data) {
    state.wsReject = data;
  },
  [WS_EVENT_NOTICE](state, data) {
    state.wsNotice = data;
  },
  [WS_EVENT_KICKOFF](state, data) {
    state.wsKickoff = data;
  },
  [GO_BACK]() {
    goBack();
  },
  // storeNextUrl
  [STORE_NEXT_URL](state, data) {
    state.nextUrl = data;
  },

  [STORE_CURRENT_PAGE](state, data) {
    state.currentPage = data;
  },
  [CHANGE_CHECKBOX](state, data) {
    state.checkbox = data;
  },

  [NAVIGATE_TO_CONFIRM]() {
    navigateTo('confirm');
  },

  [NAVIGATE_TO_PAGE](state, data) {
    state.currentPage = data.page;
    navigateTo(data.page);
  },

  [SET_RISKTYPE](state, data) {
    state.questionStatus = data;
  },

  [SHOW_RISK_STATEMENT](state, data) {
    state.riskStatement = data;
    if (state.isSFC) {
      navigateTo('sfc_risk_statement');
    } else {
      navigateTo('risk_statement');
    }
  },

  [SHOW_STATEMENT](state, data) {
    state.statement = data;
  },
};

const users = {
  [SET_USER_CLIENT](state, data) {
    state.userClient = data;
  },

  [TOGGLE_USER_SUMMARY_CONFIRMED](state, data) {
    state.userSummaryConfirmed = !state.userSummaryConfirmed;
    // if (data === true) {
    //   state.userSummaryConfirmed = true;
    // } else {
    //   state.userSummaryConfirmed = false;
    // }
  },
};

const sfc = {
  [CHANGE_MENU_ITEMS](state, data) {
    state.menu = {
      ...state.menu,
      ...data,
    };
  },
  [TOGGLE_MOCK_DATA](state, data) {
    if (state.isSFC) {
      state.isMocked = data;
    }
  },
  [TOGGLE_SFC_STATE](state, data) {
    if (data === true) {
      state.isSFC = true;
    } else {
      state.isSFC = false;
    }
  },
};

const mutations = {
  ...routers,
  ...users,
  ...sfc,
  [CHANGE_CASH](state, data) {
    state.cash = data;
  },
  [ADD_CASH_GUODU](state, data) {
    state.cashGuodu += data;
  },
  [INIT_CASH_GUODU](state, data) {
    state.cashGuodu = 0;
  },
  [CHANGE_GUODU_STATE](state, data) {
      state.isGuodu = data;
  },
  [CHANGE_CONVOY_STATE](state, data) {
      state.isConvoy = data;
  },
  [SUBMIT_QUESTIONNAIRE](state, data) {
    state.qAnswer = data;
  },

  [AGREE_STATEMENT](state, statement) {
    state[statement].confirmed = true;
  },

  [DISAGREE_STATEMENT](state, statement) {
    state[statement].confirmed = false;
  },

  [STORE_RECORDS](state, records) {
    state.records = records;
  },

  [STORE_TRANSACTION_INDEX](state, index) {
    state.transactionIndex = index;
  },

  [STORE_TRANSACTIONS](state, transaction) {
    state.transaction = transaction;
  },

  [STORE_ACCDATA](state, data) {
    state.accData = {
      ...state.accData,
      ...data,
    };
  },

  [STORE_LATEST_DATE](state, data) {
    state.latestDate = data;
  },
};


export default mutations;
