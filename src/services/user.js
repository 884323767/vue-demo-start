// 用户信息相关
// 注册,检查用户存在,登录,登出,修改密码

const api = {
  register: 'v1/email_users',
  checkUser: 'v1/email_users/findone',
  resetEmailPassword: '/v1/email_users/reset_password',
  login: 'v1/sso/login',
  loginOut: 'v1/sso/logout',
  setPwd: 'v1/sso/:uid',
};

const user = {
  register(data) {
    return this.$http.post(api.register, data).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  checkUser(data) {
    // return Promise.resolve(mock.fxRate);
    const url = api.checkUser;
    return this.$http.get(url, {
      params: {
        filter: data,
      },
    }).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  resetEmailPassword(email) {
    const url = api.resetEmailPassword;
    const data = {
      email,
    };
    return this.$http.post(url, data).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  login(data) {
    return this.$http.post(api.login, data).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  loginOut() {
    const url = api.loginOut;
    return this.$http.post(url).then(res => res,
      // return res.body;
    ).catch(res => Promise.reject(res));
  },
  patchSetPwd(data) {
    const uid = sessionStorage.getItem('uid');
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.setPwd.replace(':uid', uid);
    return this.$http.patch(url, data).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
};

export default user;
