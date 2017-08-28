const getters = {
  // getLang: state => state.test.currentLang,
  // getApi: state => state.getApi.demo,
  qAnswer: state => state.qAnswer,
  userClient: state => state.userClient,
  selectedNav: (state) => {
    const tabs = {
      overview: 1,
      order: 1,
      portfolio_opinion: 1,
      summary: 1,
      history: 2,
      result: 3,
      trade: 4,
      trade_detail: 4,
    };

    return tabs[state.currentPage] || 0;
  },
  hasRiskType: state => state.questionStatus === 200,
  currentPage: state => state.currentPage,

  isSFC: state => state.isSFC,
  menu: (state) => {
    if (state.isSFC === true) {
      return {
        ...state.menu,
        title: 'AQUMON',
      };
    }
    return state.menu;
  },
  userSummaryConfirmed: state => state.userSummaryConfirmed,
  transaction: (state) => {
    const target = state.records[state.transactionIndex];
    if (!target) {
      return;
    }

    const flattened = arr => arr.reduce((a, b) => a.concat(b), []);
    const sumAllMoney = arr => arr.reduce((prev, curr) => prev + +curr.money, 0);
    const exist = arr => arr.filter(x => x);

    let amount;

    const flattenedArray = exist(flattened(target));

    // If the target is an array that has more than one object
    if (target.length >= 2) {
      amount = sumAllMoney(flattenedArray);
    } else {
      // Get the object in that array
      amount = flattenedArray[0].money;
    }

    const titleType = target[0].txnType;
    // Deprecated: As the target is reduced in the previous step
    // saving only
    // if (typeof amount === 'object') {
    //   amount = amount[0].money;
    // }

    // Get all transaction fee
    const fee = sumAllMoney(target.filter(x => x.txnType === 5));
    // If there is any transaction fee,
    // Then the title should be '入金', which is obtained from the server
    // if (fee > 0) {
    //   titleType = 'trade.txnMap_1';
    // }
    // TODO: Beautify this part
    const buy = target.filter(x => x.txnType === 1);
    const sell = target.filter(x => x.txnType === 2);
    const saving = target.filter(x => x.txnType === 3);
    const dividends = target.filter(x => x.txnType === 7);
    // if(buy.length > 0) {
    //   titleType = 'trade.txnMap_2';
    // }
    // if()
    // let titleType = 'trade.txnMap_1';
    // amount: Total Amount of today transactions
    return {
      buy,
      sell,
      saving,
      dividends,
      fee,
      amount,
      titleType,
      date: flattened(target).find(x => x).date,
    };
  },
};

export default getters;
