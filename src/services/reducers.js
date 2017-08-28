/**
 * @module reducers
 * @description 这个文件内的Reducers, 请当成 mapReduce<br />
 * reduceAllTransactions -> reduceType<br />
 */
const reducers = {
  /**
   * 获取同一类型
   * @method reduceRecord
   * @param  {String} targetType 你要获取的类型
   * @param  {Array} allRecord   所有记录
   * @return {Object}            Reduce 之后的对象
   */
  reduceRecord(targetType, allRecord) {
    const obj = {};
    for (let i = 0, n = allRecord.length; i < n; i += 1) {
      const type = allRecord[i][targetType];
      obj[type] = obj[type] || [];
      obj[type].push(allRecord[i]);
    }
    return obj;
  },

  /**
   * 返回同一样的记录
   * @name {module:#reduceType}
   * @method reduceType
   * @param  {Array} sameDateTransaction 同一天的记录
   * @return {Object}                     同一样的记录
   */
  reduceType(sameDateTransaction) {
    const types = [];
    for (const transaction of sameDateTransaction) {
      // console.log(transaction.txn);
      const index = transaction.txnType || -1;
      if (index !== -1) {
        // Ensure there is a array indside the types array
        types[index] = types[index] || [];
        types[index].push(transaction);
      }
    }
    return types;
  },

  /**
   * combineTypes
   * @function combineTypes
   * @param  {Array} transactions 所有交易记录
   * @return {Array}              交易记录
   * @see combine
   */
  combineTypes(transactions) {
    /**
     * 把买入，卖出，交易手续费归类成调仓，单独处理，存款，取款单独处理。
     * @const types
     * @type {Object}
     */
    const types = {
      1: 1,
      2: 1,
      3: 2,
      4: 3,
      5: 1,
      6: 4,
      7: 4,
    };

    const arr = new Array(Object.keys(types).length + 1).fill([]);
    /**
     * 映射现在的值到目标值
     * @function combine
     * @param  {Number} curr   现在的值
     * @param  {Number} target 目标映射值
     */
    function combine(curr, target) {
      try {
        arr[curr] = [...arr[curr], ...transactions[target]];
      } catch (e) {
        // pass
        console.log(e);
        console.log('reducers combine try catch error');
      }
    }
    for (const i of Object.keys(types)) {
      combine(types[i], i - 1);
    }

    // Return Array with Array<Object> that has Object
    return arr.filter(x => x.length >= 1);
  },

  /**
   * reduceAllTransactions
   * @function reduceAllTransactions
   * @see {@link module:reducers.reduceType}
   * @param  {Array} sortedDates         已经排序的日期
   * @param  {Array} sameDateTransaction 同一天的交易记录
   * @return {Array}                     整理好的交易记录
   */
  reduceAllTransactions(sortedDates, sameDateTransaction) {
    let allTransactions = [];
    // Reduce Type
    for (let i = 0, n = sortedDates.length; i < n; i += 1) {
      const temp = this.reduceType(sameDateTransaction[sortedDates[i]])
                       .slice(1);

      // Group buy and sell and fee
      // transaction is an array in order to iterate
      // let transaction = [...temp];

      allTransactions = [...allTransactions, ...this.combineTypes(temp)];
    }
    return allTransactions;
  },

  /**
   * 把 transactions 里面的金钱加起来，返回总金额
   * @function sumOfMoney
   * @param  {Array.transaction} transactions 交易记录
   * @return {Number}              总计
   */
  sumOfMoney(transactions) {
    let amount = 0;
    for (const t of transactions) {
      amount += +t.money;
    }
    return amount;
  },

  /**
   * 把 transactions 里面的金钱加起来，返回总金额
   * @function sumFee
   * @param  {Array} record 交易记录
   * @return {Number}                   总计
   */
  sumFee(record) {
    let fee = 0;
    for (let i = 0; i < record.length; i += 1) {
      // 交易手續費
      if (record[i].txnType === 5) {
        fee += +record[i].money;
      }
    }
    return fee;
  },

  /**
   * Calculate the total amount of the transaction
   * @function calculateTotalAmount
   * @param  {Array} records  交易记录
   * @return {Object}         混合交易记录所需要的 UI 对象，以及算好的总金额
   */
  calculateTotalAmount(records) {
    const transactions = [];
    for (let i = 0, n = records.length; i < n; i += 1) {
      const types = records[i];
      /**
       * 扁平化处理数组
       * @function flattened
       * @param  {Array} arr 传入一个未扁平化数组
       * @return {Array}     一个只有一层深度的数组
       */
      const flattened = arr => arr.reduce((a, b) => a.concat(b), []);
      const sumMoney = arr => arr.reduce((prev, curr) => prev + +curr.money, 0);

      const flattenedArray = flattened(types).filter(item => item);

      let amount;

      if (types.length >= 2) {
        amount = sumMoney(flattenedArray);
      } else {
        amount = flattenedArray[0].money;
      }

      // First key of types
      // const key = types.findIndex(x => typeof x !== 'undefined');
      const firstItem = types.filter(x => x)[0];

      const obj = {
        date: firstItem.date,
        amount,
        txn: firstItem.txn,
        txnType: firstItem.txnType,
        records: records[i],
        // fee: this.sumFee(types[4]) || 0,
      };
      transactions.push(obj);
    }

    return transactions;
  },

  /**
   * 根据原始日期排序，并返回 b[0].originalDate - a[0].originalDate;
   * @function sortByOriginalDate
   * @param  {Array} a 测试对象 A
   * @param  {Date} a[0].originalDate 原始日期
   * @param  {Array} b 测试对象 B
   * @param  {Date} b[0].originalDate 原始日期
   * @return {Number}
   */
  sortByOriginalDate(a, b) {
    return b[0].originalDate - a[0].originalDate;
  },

  /**
   * 翻译原始日期为中文日期
   * @function transalteIntoChinese
   * @param  {Date} date   日期
   * @return {String}      中文日期
   */
  transalteIntoChinese(date) {
    return date.toISOString()
               .slice(0, 11)
               .replace('-', '年')
               .replace('-', '月')
               .replace('T', '日');
  },
};

export default reducers;
