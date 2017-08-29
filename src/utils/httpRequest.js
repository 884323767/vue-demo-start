import axios from 'axios'; //需要放services 中？

// let i = 0;

axios.interceptors.request.use(function(config) {
  //在发送请求之前做某事
  let url = request.url;
  if (url.indexOf('?') !== -1) {
    url = `${url}&random=${Math.random()}`;
  } else {
    url = `${url}?random=${Math.random()}`;
  }
  i += 1;
  request.headers.set('X-requestid', i.toString());
  request.headers.set('X-timestamp', `${+new Date()}`);
  request.headers.set('X-product', 'guodu');
  request.url = url;
  return config;
},function(error) {
  //请求错误时做些事
  return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(function(response) {
  //对响应数据做些事

  return response;
},function(error) {
  //请求错误时做些事
  return Promise.reject(error);
});
