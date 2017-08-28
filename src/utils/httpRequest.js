// import store from '../store.js';

let i = 0;
export default function interceptors(request, next) {
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
  next(response => response);
}
