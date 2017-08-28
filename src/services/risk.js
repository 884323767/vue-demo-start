// 账户信息相关
// 获取风险承受能力

const api = {
  getRiskType: 'v1/users/:uid/questionnaire/risk_profile_by_answer',
  riskProfile: 'v1/users/:uid/questionnaire/risk_profile',
  preference: 'v1/users/:uid/accounts/:account/preference',
  // deprecated
  accRiskProfile: 'v1/users/:uid/accounts/:account/risk_profile',
};

const risk = {
  // getRiskType
  getRiskType() {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.riskType.replace(':uid', uid);
    return this.$http.get(url).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  getRiskTypeAnswer(answer) {
    const uid = sessionStorage.getItem('uid');
    const algoProductId = sessionStorage.getItem('algoProductId');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.getRiskType.replace(':uid', uid);
    return this.$http.get(url, {
      params: {
        format: 'json',
        algo_product_id: algoProductId,
        answer,
      },
    }).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },

  // riskProfile
  getRiskProfile(algo_product_id) {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.riskProfile.replace(':uid', uid);
    const params = {
      algo_product_id,
    };

    return this.$http.get(url, { params }).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },

  // preference
  getPreference(accuid) {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.preference.replace(':uid', uid).replace(':account', accuid);
    return this.$http.get(url).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  postPreference(data, accuid) {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.preference.replace(':uid', uid).replace(':account', accuid);
    return this.$http.post(url, data).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  putPreference(data, accuid) {
    const uid = sessionStorage.getItem('uid');

    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.preference.replace(':uid', uid).replace(':account', accuid);
    return this.$http.put(url, data).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },

  // accRiskProfile
  getAccRiskProfile(accid, product_id) {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.accRiskProfile.replace(':uid', uid).replace(':account', accid);
    const params = { product_id };
    return this.$http.get(url, { params }).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
};

export default risk;
