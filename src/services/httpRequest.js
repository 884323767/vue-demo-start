import axios from 'axios'; // 需要放services 中？
// import store from '@/vuex/store' 之后可以使用vuex中store commit等方法


axios.defaults.timeout = 30000;
// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    // let url = config.url;
    // if (url.indexOf('?') !== -1) {
    //   url = `${url}&random=${Math.random()}`;
    // } else {
    //   url = `${url}?random=${Math.random()}`;
    // }
    // i += 1;
    // config.headers.set('X-requestid', i.toString());
    config.headers['X-timestamp'] = `${+new Date()}`;
    config.headers['X-product'] = '2.1';
    // request.url = url;
    // if (store.state.token) {
    //     config.headers.Authorization = `token ${store.state.token}`;
    // }
    return config;
  },
  err => Promise.reject(err),
);


// http response 拦截器
axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          break;
        default:
          break;
        // 401 清除token信息并跳转到登录页面
        // store.commit(types.LOGOUT);
        // router.replace({
        //   path: 'login',
        //   query: { redirect: router.currentRoute.fullPath }
        // })
      }
    }
    return Promise.reject(error.response.data);
  },
);

export default axios;
