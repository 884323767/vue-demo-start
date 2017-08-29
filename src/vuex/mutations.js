import {
  CHANGE_CASH,
} from './mutationType';

const mutations = {
  [CHANGE_CASH](state, data) {
    state.cash = data;
  },
  [ADD_CASH_GUODU](state, data) {
    state.cashGuodu += data;
  },
};


export default mutations;
