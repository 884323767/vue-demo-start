// 该项目暂未用到
const deprecated = {
  guoduStatus: 'v1/partners/guodu/status',
  publicHistory: 'v1/users/:uid/accounts/:account/public_txns', // 类别历史记录
  users: 'v1/users/:uid',
  portfolioHistory: 'v1/users/:uid/accounts/:account/portfolio/history',
  master: 'v1/users/:uid/accounts/master', // master账号
  drift: 'v1/users/:uid/accounts/:account/drift', // 获取偏离度
  price: 'v1/market/price?price_type=5&iuid_list=:iuid_list', // 获取单价
  instruments: 'v1/market/instruments?iuid_list=:iuid_list',
  rebalance: 'v1/users/:uid/accounts/:account/rebalance', // 调仓
  search: 'v1/market/search?region=:region&category=:category&ticker=:ticker', // 查找基金
  riskType: 'v1/users/:uid/questionnaire/risk_type',
  cashout: 'v1/users/:uid/accounts/:account/cashout', // 出金
  detail: 'v1/users/:uid/accounts/:account',
  // deleteToken: "v1/AccessTokens/:AccessTokens",
};

export default deprecated;
