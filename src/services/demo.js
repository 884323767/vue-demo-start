import axios from 'axios'
// import store from '../vuex/store' 之后可以使用vuex中store commit等方法

const api = {
  demo: '/v1/products/domain_product',
};

const demo = {
  // invtAccount
  getProduct() {
    const url = api.demo.replace(':uid', uid);
    return axios.get(url).then((response) => {
      const res = response.data;
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
};


export default demo;
