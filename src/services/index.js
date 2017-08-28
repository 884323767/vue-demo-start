import account from './account';
import chart from './chart';
import guodu from './guodu';
import portfolio from './portfolio';
import products from './products';
import risk from './risk';
import user from './user';
import deprecated from './deprecated';
import router from './router';
import reducers from './reducers';

const api = {
  ...deprecated,
};

const services = {
  ...account,
  ...chart,
  ...guodu,
  ...portfolio,
  ...risk,
  ...user,
  ...products,
  ...router,
  ...reducers,
};

export { api, services };
