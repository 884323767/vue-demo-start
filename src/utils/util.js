// import Raven from 'raven-js';

// let flag = true;

// export function getCookie(name) {
//   let value = '; ' + document.cookie;
//   let parts = value.split('; ' + name + '=');
//   if (parts.length == 2) return parts.pop().split(';').shift();
// }

// const _storageAvailable = (function () {
//   try {
//       let storage = window.localStorage,
//           x = '__storage_test__';
//       storage.setItem(x, x);
//       storage.removeItem(x);
//       return function () {
//           return true;
//         };
//     } catch (e) {
//       logger.warn('current browser do not support local storage!');
//       return function () {
//           return false;
//         };
//     }
// }());

// export default {
//   errHandle(obj, msg, err) {
//     if (flag) {
//       if (err && err.body && err.body.error && err.body.error.code &&
// (err.body.error.code === 'AUTHORIZATION_REQUIRED' || err.body.error.code === 'INVALID_TOKEN')) {
//         flag = false;
//         if (obj && obj.$f7) {
//           obj.$f7.alert(obj.$t('notes.loginExpired'), '', () => {
//             if (location.host.indexOf('uat') === -1) {
//               location.hash = '#!/login';
//               location.reload();
//             } else {
//               location.href = 'http://ats.kuaiex.com/home/link?op=out';
//             }
//           });
//         }
//         // alert("登录已过期，请重新登录");
//       } else if (err && err.body && err.body.error && err.body.error.code &&
// err.body.error.code === 'LOGIN_IN_OTHER_PLACE') {
//         flag = false;
//         if (obj && obj.$f7) {
//           obj.$f7.alert(obj.$t('notes.kickOut'), '', () => {
//             if (location.host.indexOf('uat') === -1) {
//               location.hash = '#!/login';
//               location.reload();
//             } else {
//               location.href = 'http://ats.kuaiex.com/home/link?op=out';
//             }
//           });
//         }
//         // alert("您的账户在其他设备登录，请重新登录");
//       } else {
//         flag = true;
//         if (typeof err !== 'undefined') {
//           Raven.captureException(err);
//           obj.$root.eventHub.$emit('showTabs', 0);
//           obj.$root.eventHub.$emit('error', true);
//         }
//       }
//     }
//     // sessionStorage.clear();
//     // alert(msg);
//     console.log(msg);
//     console.error(err);
//   },
// };
