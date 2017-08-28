// 创建账户, 问卷答案，账户状态，设置偏好，创建现金账户，入金，绑定账户
const api = {
  invtAccount: 'v1/users/:uid/accounts/invtaccounts',
  questionnaire: 'v1/users/:uid/questionnaire',
  defaultAcc: 'v1/users/:uid/accounts/defaultaccount',
  defaultPreference: 'v1/users/:uid/accounts/:account/preference/default',
  cashaccounts: 'v1/users/:uid/accounts/cashaccounts',
  cashin: 'v1/users/:uid/accounts/:account/cashin',
  bundle: 'v1/users/:uid/accounts/accounts_bundle',
  accountIncome: 'v1/users/:uid/accounts/:account/history',
  backdate: 'v1/users/:uid/accounts/:account/backtesting',
  activities: 'v1/users/:uid/accounts/:account/activities',
  tradingDay: 'v1/partners/guodu/hours?format=json&region=HK',
  tradingDayOffset: 'v1/partners/sfc/trading_days?offset=:offset&region=HK',
};

const account = {
  // invtAccount
  getInvtAccount() {
    // return Promise.resolve(mock.fxRate);
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.invtAccount.replace(':uid', uid);
    return this.$http.get(url).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  getTradingDay() {
    // return Promise.resolve(mock.fxRate);
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.tradingDay;
    return this.$http.get(url).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  getTradingDayOffset(offset) {
    // return Promise.resolve(mock.fxRate);
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.tradingDayOffset.replace(':offset', offset);
    return this.$http.get(url).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  postInvtAccount(data) {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.invtAccount.replace(':uid', uid);
    return this.$http.post(url, data).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },

  // questionnaire
  getQuestionnaire() {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.questionnaire.replace(':uid', uid);
    return this.$http.get(url).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  postQuestionnaire(data) {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.questionnaire.replace(':uid', uid);
    return this.$http.post(url, data).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },

  // defaultAcc
  getDefaultAcc() {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.defaultAcc.replace(':uid', uid);

    return this.$http.get(url).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      const data = res.body;
      sessionStorage.setItem('accid', data.id);
      sessionStorage.setItem('accStatus', data.status);
      sessionStorage.setItem('tradeCounter', data.trade_counter);
      data.total_value = parseFloat(data.total_value);
      data.invested_amount = parseFloat(data.invested_amount);
      data.total_return = data.total_value - data.invested_amount;
      data.return_rate = ((data.total_return * 100) / data.invested_amount).toFixed(2);
      if (data.total_return === 0 || data.invested_amount === 0) {
        data.return_rate = '0.00';
      }
      return data;
    }).catch(res => Promise.reject(res));
  },

  // defaultPreference
  postDefaultPreference(accid) {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.defaultPreference.replace(':uid', uid).replace(':account', accid);
    return this.$http.post(url, {}).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      sessionStorage.setItem('riskratio', res.body.risk_ratio);
      return res.body;
    }).catch(res => Promise.reject(res));
  },

  // cashaccounts
  getCashaccounts() {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.cashaccounts.replace(':uid', uid);
    return this.$http.get(url).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  postCashaccounts(data) {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.cashaccounts.replace(':uid', uid);
    return this.$http.post(url, data).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },

  // cashin
  getCashin(accuid) {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.cashin.replace(':uid', uid).replace(':account', accuid);
    return this.$http.get(url).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  postCashin(data, accuid) {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.cashin.replace(':uid', uid).replace(':account', accuid);
    return this.$http.post(url, data).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },

  // cashin
  postBundle(data) {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.bundle.replace(':uid', uid);
    return this.$http.post(url, data).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },

  // accountIncome
  getAccountIncome(data) {
    const uid = sessionStorage.getItem('uid');
    const accuid = data;
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.accountIncome.replace(':uid', uid).replace(':account', accuid);
    return this.$http.get(url).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },

  // backdate
  getBackdate(data) {
    const uid = sessionStorage.getItem('uid');
    const accuid = data;
    // accuid = 438
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.backdate.replace(':uid', uid).replace(':account', accuid);
    return this.$http.get(url).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },

  getActivities(data) {
    const uid = sessionStorage.getItem('uid');
    const accuid = data;
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.activities.replace(':uid', uid).replace(':account', accuid);
    return this.$http.get(url).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
};


export default account;
