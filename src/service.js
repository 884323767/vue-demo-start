import store from './store.js'
import { api, services } from './services';

export default {
  methods: {
    ...services,
    getTokenParams() {
      return {
        access_token: sessionStorage.getItem('access_token')
      };
    },
    testBaidu() {
      // return Promise.resolve(mock.fxRate);
      return this.$http.get(api.testBaidu).then(res => {
        return res.body;
      }).catch(res => {
        return Promise.reject(res);
      });
    },
    // deleteToken(account) {
    //   let uid = sessionStorage.getItem('uid');
    //   if (!uid) {
    //     util.errHandle(this, "请先登录");
    //     Promise.reject();
    //   }
    //   let url = api.deleteToken.replace(':AccessTokens', uid);
    //   return this.$http.delete(url, {
    //     params: {
    //       start_time: 0,
    //       end_time: +new Date()
    //     }
    //   }).then(res => {
    //     if (res.body.errors) {
    //       return Promise.reject(res.body.errors);
    //     }
    //     return res.body;
    //   }).catch(res => {
    //     return Promise.reject(res);
    //   });
    // },
    publicHistory(account) {
      let uid = sessionStorage.getItem('uid');
      if (!uid) {
        util.errHandle(this, "请先登录");
        Promise.reject();
      }
      let url = api.publicHistory.replace(':uid', uid).replace(':account', account);
      return this.$http.get(url, {
        params: {
          start_time: 0,
          // end_time: +new Date()
        }
      }).then(res => {
        if (res.body.errors) {
          return Promise.reject(res.body.errors);
        }
        return res.body;
      }).catch(res => {
        return Promise.reject(res);
      });
    },
    getUsers(data) {
      var uid = sessionStorage.getItem('uid') || data;
      if (!uid) {
        // util.errHandle(this,"请先登录");
        util.errHandle(this, "请先登录");
        Promise.reject();
      }
      var url = api.users.replace(':uid', uid);
      return this.$http.get(url).then(res => {
        if (res.body.errors) {
          return Promise.reject(res.body.errors);
        }
        return res.body;
      }).catch(res => {
        return Promise.reject(res);
      });
    },
    getMaster() {
      var uid = sessionStorage.getItem('uid');
      if (!uid) {
        util.errHandle(this, "请先登录");
        Promise.reject();
      }
      var url = api.master.replace(':uid', uid);

      return this.$http.get(url).then(res => {
        if (res.body.errors) {
          return Promise.reject(res.body.errors);
        }
        return res.body;
      }).catch(res => {
        return Promise.reject(res);
      });
    },
    postMaster(data) {
      // return Promise.resolve(mock.fxRate);
      // var uid = document.cookie.AQuid;
      var uid = sessionStorage.getItem('uid');
      if (!uid) {
        util.errHandle(this, "请先登录");
        Promise.reject();
      }
      var url = api.master.replace(':uid', uid);
      return this.$http.post(url, data).then(res => {
        if (res.body.errors) {
          return Promise.reject(res.body.errors);
        }
        return res.body;
      }).catch(res => {
        return Promise.reject(res);
      });
    },
    getPrice(data) {
      // return Promise.resolve(mock.fxRate);
      var url = api.price.replace(':iuid_list', JSON.stringify(data));
      return this.$http.get(url).then(res => {
        if (res.body.errors) {
          return Promise.reject(res.body.errors);
        }
        return res.body;
      }).catch(res => {
        return Promise.reject(res);
      });
    },
    getInstruments(data) {
      var url = api.instruments.replace(':iuid_list', JSON.stringify(data));
      return this.$http.get(url).then(res => {
        if (res.body.errors) {
          return Promise.reject(res.body.errors);
        }
        return res.body;
      }).catch(res => {
        return Promise.reject(res);
      });
    },
    getDrift(data) {
      var uid = sessionStorage.getItem('uid');
      var accuid = data;
      if (!uid) {
        util.errHandle(this, "请先登录");
        Promise.reject();
      }
      var url = api.drift.replace(':uid', uid).replace(':account', accuid);
      return this.$http.get(url).then(res => {
        if (res.body.errors) {
          return Promise.reject(res.body.errors);
        }
        return res.body;
      }).catch(res => {
        return Promise.reject(res);
      });
    },
    getDetail(accuid) {
      var uid = sessionStorage.getItem('uid');
      var accuid = accuid;
      if (!uid) {
        util.errHandle(this, "请先登录");
        Promise.reject();
      }
      var url = api.detail.replace(':uid', uid).replace(':account', accuid);
      return this.$http.get(url).then(res => {
        return res.body;
      }).catch(res => {
        return Promise.reject(res);
      });
    },
    postRebalance(data, accuid) {
      var uid = sessionStorage.getItem('uid');
      var accuid = accuid;
      if (!uid) {
        util.errHandle(this, "请先登录");
        Promise.reject();
      }
      var url = api.rebalance.replace(':uid', uid).replace(':account', accuid);
      return this.$http.post(url, data).then(res => {
        if (res.body.errors) {
          return Promise.reject(res.body.errors);
        }
        return res.body;
      }).catch(res => {
        return Promise.reject(res);
      });
    },
    getSearch(data, region, category) {
      var url = api.search.replace(':ticker', data).replace(':category', category).replace(':region', region);
      return this.$http.get(url).then(res => {
        if (res.body.errors) {
          return Promise.reject(res.body.errors);
        }
        return res.body;
      }).catch(res => {
        return Promise.reject(res);
      });
    },
    getGuoduStatus(accid) {
      let uid = sessionStorage.getItem('uid');
      let url = api.guoduStatus;
      let data = {
        uid: uid,
        account_id: accid
      };
      return this.$http.get(url, {
        params: data
      }).then(res => {
        if (res.body.errors) {
          return Promise.reject(res.body.errors);
        }
        sessionStorage.setItem('accStatus', res.body.status);
        return res.body;
      }).catch(res => {
        return Promise.reject(res);
      });
    },
    setUserStatus(status) {
      var url = api.users;
      // const userId = sessionStorage.getItem('userId');
      const uid = sessionStorage.getItem('uid');
      return this.$http.patch(url.replace(':uid', uid), { 'accountStatus': status }).then(res => {
        if (res.body.errors) {
          return Promise.reject(res.body.errors);
        }
        return res.body;
      }).catch(res => {
        return Promise.reject(res);
      });
    },
    getUserInfo() {
      var url = api.users;
      const uid = sessionStorage.getItem('uid');
      return this.$http.get(url.replace(':uid', uid)).then(res => {
        if (res.body.errors) {
          return Promise.reject(res.body.errors);
        }
        sessionStorage.setItem('userStatus', res.body.accountStatus);
        return res.body;
      }).catch(res => {
        return Promise.reject(res);
      });
    }
  }
}
