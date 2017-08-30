import demo from './demo';
// import store from '@/vuex/store' 之后可以使用vuex中store commit等方法

// 不同类型请求，写不用文件，同意导入services 然后导出
const services = {
  ...demo,
};

export default services;
