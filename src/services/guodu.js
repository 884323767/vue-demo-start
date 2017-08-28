// 国都信息相关
// 创建国都用户,检查国都用户，国都登录

const api = {
  guoDuUser: 'v1/guodu_users',
  checkGuoDuUser: 'v1/guodu_users/findone',
  grantGuoDuUser: 'v1/guodu_users/grant',
};

const guodu = {
  createGuoduUser(data) {
    const url = api.guoDuUser;
    return this.$http.post(url, data).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      sessionStorage.setItem('userId', res.body.id);
      return res.body;
    }).catch((res) => {
      Promise.reject(res);
    });
  },
  grantGuoduUser(data) {
    const url = api.grantGuoDuUser;
    return this.$http.post(url, data).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      sessionStorage.setItem('uid', res.body.userId);
      sessionStorage.setItem('access_token', res.body.id);

      return res.body;
    }).catch(res => Promise.reject(res));
  },
  initGuoduUser() {
    // 未用的
    const url = api.guoDuUser;
    const uid = sessionStorage.getItem('uid');
    return this.$http.get(`${url}/${uid}/init`, {}).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  checkGuoduUser(data) {
    // return Promise.resolve(mock.fxRate);
    const url = api.checkGuoDuUser;
    return this.$http.get(url, {
      params: {
        filter: data,
      },
    }).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      sessionStorage.setItem('userId', res.body.id);
      return res.body;
    }).catch(res => Promise.reject(res));
  },

  checkUserClient() {
    let client = 'oname not find';
    const oname = sessionStorage.getItem('oname');
    if (oname === 'convoy') {
      client = 'convoy';
    } else if (oname === 'guodu') {
      client = 'guodu';
    } else if (oname === 'sfc') {
      client = 'sfc';
    }
    // if (location.href.indexOf('localhost') !== -1) {
    //   client = 'localhost';
    // } else if (oname === 'guodu') {
    //   client = 'guodu';
    // }
    if(client == 'oname not find'){
      console.error('oname not find');
      client = 'guodu';
    }
    return client;
  },
  checkHostClient() {
    let client = '';
    const regGuodu = /guodu|algo/;
    const regConvoy = /convoy|cissecurities/;
    const regSfc = /sfc|demo1/;
    if (regGuodu.test(window.location.host)) {
      client = 'guodu';
    }
    if (regConvoy.test(window.location.host)) {
      client = 'convoy';
    }
    if (regSfc.test(window.location.host)) {
      client = 'sfc';
    }
    if (!client) {
      client = this.checkUserClient();
    }
    return client;
  },
};

export default guodu;
