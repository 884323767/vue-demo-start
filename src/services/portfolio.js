// 持仓相关
// 持仓类别，具体持仓，目标持仓，目标类别持仓，历史记录

const api = {
  publicPortfolio: 'v1/users/:uid/accounts/:account/public_portfolio',
  portfolio: 'v1/users/:uid/accounts/:account/portfolio?randomize=true',
  target: 'v1/users/:uid/accounts/:account/target',
  publicTarget: 'v1/users/:uid/accounts/:account/public_target',
  tradeHistory: 'v1/users/:uid/accounts/:account/txns',
  invConfirm: 'v1/users/:uid/accounts/:account/investor_confirm',
  confirmation: 'v1/users/:uid/accounts/:account/confirmation?format=json',
  mockTarget: 'v1/users/:uid/accounts/:account/fill_historical_data',
};

const portfolio = {
  publicPortfolio(data) {
    // return Promise.resolve(mock.fxRate);
    const uid = sessionStorage.getItem('uid') || data;
    if (!uid) {
      // window.util.errHandle(this,"请先登录");
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.publicPortfolio.replace(':uid', uid).replace(':account', data);
    return this.$http.get(url).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  getPortfolioHistory() {
    // return Promise.resolve(mock.fxRate);
    return this.$http.get(api.portfolioHistory).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  postPortfolioHistory(data) {
    // return Promise.resolve(mock.fxRate);
    // var uid = document.cookie.AQuid;
    const uid = sessionStorage.getItem('uid');
    const accuid = sessionStorage.getItem('accuid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.portfolioHistory.replace(':uid', uid).replace(':account', accuid);
    return this.$http.post(url, data).then(res => res.body).catch(res => Promise.reject(res));
  },
  getPortfolio(accuid) {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.portfolio.replace(':uid', uid).replace(':account', accuid);
    // return Promise.resolve(mock.fxRate);
    return this.$http.get(url).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  postPortfolio(data, accuid) {
    // return Promise.resolve(mock.fxRate);
    // var uid = document.cookie.AQuid;
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.portfolio.replace(':uid', uid).replace(':account', accuid);
    return this.$http.post(url, data).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  getTarget(data) {
    const uid = sessionStorage.getItem('uid');
    const accuid = data;
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.target.replace(':uid', uid).replace(':account', accuid);
    return this.$http.get(url).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  postInvConfirm(data, accuid) {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.invConfirm.replace(':uid', uid).replace(':account', accuid);
    return this.$http.post(url, {}).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  getConfirmation(account) {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.confirmation.replace(':uid', uid).replace(':account', account);
    return this.$http.get(url).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  postTarget(data, accuid) {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.target.replace(':uid', uid).replace(':account', accuid);
    return this.$http.post(url, {}).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  postMockTarget(data, accuid) {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.mockTarget.replace(':uid', uid).replace(':account', accuid);
    return this.$http.post(url, {}).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  publicTarget(data) {
    // return Promise.resolve(mock.fxRate);
    const uid = sessionStorage.getItem('uid') || data;
    if (!uid) {
      // window.util.errHandle(this,"请先登录");
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.publicTarget.replace(':uid', uid).replace(':account', data);
    return this.$http.get(url).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  tradeHistory(account) {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.tradeHistory.replace(':uid', uid).replace(':account', account);
    return this.$http.get(url, {
      params: {
        start_time: 0,
        // end_time: +new Date(),
      },
    }).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },

  putUserCash(amount) {
    // sessionStorage.setItem('cash', amount);
    // this.$store.commit('CHANGE_CASH', amount);
    this.$store.commit("ADD_CASH_GUODU", +amount);
    // this.$root.eventHub.$emit('cashChange', amount);
    this.accData.cash = amount;
  },
};

export default portfolio;
