// 产品信息相关
// 算法产品，域名产品

const api = {
  defaultAlgoProduct: 'v1/orgs/:oid/default_algo_product',
  defaultProduct: 'v1/products/domain_product',
  notice: 'v1/notifications/announcements/enable?oid=:oid'
};

const products = {
  getDefaultAlgoProduct(oid) {
    const url = api.defaultAlgoProduct.replace(':oid', oid);

    return this.$http.get(url).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }

      sessionStorage.setItem('algoProductId', res.body.id);
      sessionStorage.setItem('algoProductCurrency', res.body.currency);
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  getNotice(oid) {
    const url = api.notice.replace(':oid', oid);
    return this.$http.get(url).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },
  getDomainProduct() {
    const url = api.defaultProduct;

    return this.$http.get(url).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      sessionStorage.setItem('productId', res.body.id);
      sessionStorage.setItem('oid', res.body.oid);
      return res.body;
    }).catch(res => Promise.reject(res));
  },
};

export default products;
