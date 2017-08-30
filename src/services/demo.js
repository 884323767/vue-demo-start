import axios from './httpRequest';
// import store from '../vuex/store' 之后可以使用vuex中store commit等方法

const api = {
  demo: '/v1/products/domain_product',
};

const demo = {
  // invtAccount
  getProduct(uid) {
    const url = api.demo.replace(':uid', uid);
    return axios.get(url).then((response) => {
      const res = response.data;
      return res;
    }).catch(res => Promise.reject(res));
  },
};


export default demo;
