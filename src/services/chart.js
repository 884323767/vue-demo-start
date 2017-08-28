// 图相关
// 预测信息， 收益信息，回溯信息
import guodu from './guodu';
import mock from '../mock';

const api = {
  accprediction: 'v1/users/:uid/accounts/:account/prediction',
  prediction: 'v1/users/:uid/accounts/algo/prediction',
};

const GuoduStockColor = ['#ffe5b2', '#ffdd95', '#fad27d', '#fcbe76', '#f9b267', '#f8a059', '#f58649', '#f46a3f', '#f05728', '#e54d1f', '#d6410d', '#be3e05', '#a43300'];
const GuoduBondColor = ['#d0e8f1', '#81d8f5', '#0aa0d1', '#0b69a5', '#064890', '#02366e', '#c4a627', '#e6c842', '#f5d834', '#fbe381'];

const ConvoyStockColor = ['#DCE8FC', '#C2D9FF', '#A3C8FD', '#7FAEFC', '#477ED7', '#2663C8', '#0646AF', '#0E2699', '#22233B'];
const ConvoyBondColor = ['#FDE6EE', '#FFB7D1', '#FF88B2', '#FF5592', '#FF227A', '#D4005B', '#B4005B', '#950050'];

const SfcStockColor = ['#F47137', '#F88049', '#FC8F5B', '#FF9D6E', '#FFBA95', '#FFBA95', '#FFC8A9', '#FFD5BE'];
// const SfcBondColor = ['#AEACA6', '#BCBAB5', '#C7C5C1', '#D0CFCC', '#DCDBD9', '#DFDEDB', '#E6E6E4'];
const SfcBondColor = ['#12223D', '#495569', '#687282', '#868D9A', '#9A9EAC', '#B7BAC4', '#D0D1D7'];

const stockColorMap = {
  guodu: GuoduStockColor,
  convoy: ConvoyStockColor,
  sfc: SfcStockColor,
};
const bondColorMap = {
  guodu: GuoduBondColor,
  convoy: ConvoyBondColor,
  sfc: SfcBondColor,
};

let client = guodu.checkHostClient();
const vuexStore = JSON.parse(sessionStorage.getItem('vuex'));
if (vuexStore && vuexStore.isSFC) {
  client = 'sfc';
}
const stockColor = stockColorMap[client];
const bondColor = bondColorMap[client];

const InstFlag = {
  Stock: 1,
  Bond: 2,
};


const chart = {
  sortValue(a, b) {
    return b.value - a.value;
  },

  createMarkPoint(coord, borderColor, name = 'modification') {
    const obj = {
      name,
      coord,
      symbolSize: 13,
      label: {
        normal: {
          show: false,
        },
      },
      itemStyle: {
        normal: {
          color: 'white',
          borderColor,
        },
        emphasis: {
          label: {
            show: false,
          },
        },
      },
    };
    console.log(obj);
    console.log(this.formatTime(obj.coord[0]));
    return obj;
  },

  getaccprediction(data) {
    const uid = sessionStorage.getItem('uid');
    const accuid = data;
    // accuid = 438;
    if (!uid) {
      window.util.errHandle(this, '请先登录');
      Promise.reject();
    }
    const url = api.accprediction.replace(':uid', uid).replace(':account', accuid);
    return this.$http.get(url).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },

  getPrediction(ratio, region, sector, algoProductId) {
    const uid = sessionStorage.getItem('uid');
    const url = api.prediction.replace(':uid', uid);
    const data = {
      risk_ratio: ratio,
      region,
      sector,
      algo_product_id: algoProductId,
    };
    return this.$http.get(url, {
      params: data,
    }).then((res) => {
      if (res.body.errors) {
        return Promise.reject(res.body.errors);
      }
      return res.body;
    }).catch(res => Promise.reject(res));
  },

  formatTime(data, lastItem = false, toggle = false) {
    const t = new Date(+data);
    const m = +(t.getMonth() + 1) >= 10 ? (t.getMonth() + 1) : `0${t.getMonth() + 1}`;
    let d;

    if (lastItem === true && toggle === true) {
      // Get the latestDate in History Data
      d = new Date(this.$store.state.latestDate).getDate();
    } else {
      d = t.getDate();
    }

    const correctedDate = +d >= 10 ? d : `0${d}`;

    // console.log(`${m}/${d}`);
    return `${m}/${correctedDate}`;
  },

  adjustYMinMax(echart, yData, y1Data, positive) {
    const dataZoomObj = echart.getOption().dataZoom;
    const start = dataZoomObj[0].startValue;
    const end = dataZoomObj[0].endValue;

    let yMin = yData[start];
    let yMax = yData[start];
    for (let i = start; i <= end; i += 1) {
      if (yData[i] < yMin) {
        yMin = yData[i];
      }
      if (yData[i] > yMax) {
        yMax = yData[i];
      }
    }

    for (let i = start; i <= end; i += 1) {
      if (y1Data[i] < yMin) {
        yMin = y1Data[i];
      }
      if (y1Data[i] > yMax) {
        yMax = y1Data[i];
      }
    }

    // 計算 y軸 最大和最小值
    const range = yMax - yMin;
    const roundingScale = Math.floor(Math.log(range) / Math.log(10));
    const rounding = (10 ** roundingScale) * 2;
    yMin -= range * 0.2;
    yMax += range * 0.0;
    yMin = Math.floor(yMin / rounding) * rounding;
    yMax = Math.ceil(yMax / rounding) * rounding;
    if (yMin < 0 && positive) {
      yMin = 0;
    }
    echart.setOption({
      yAxis: [{
        min: yMin,
        max: yMax,
      }],
    });
  },

  getModifications(accid) {
    return this.getActivities(accid).then((res) => {
      // if(this.$store.state.isMocked) {
      //   res = mock.sfcActivities;
      // }
      // Existed Dates
      const dates = {};
      for (const i of res) {
        const changes = JSON.parse(i.changes);
        if (changes.overflow_trigger) {
          const overFlowNumber = changes.overflow_trigger;
          // const reason = this.overflowMap[overFlowNumber];
          const reason = overFlowNumber;
          const detail = this.$t(`difference.detail_${overFlowNumber}`);
          const date = this.formatTime(i.create_time);
          // const date = i.create_time;

          if (dates[date]) {
            // Do Nothing here
          } else {
            const obj = {
              reason,
              detail,
            };
            dates[date] = obj;
          }
        }
      }
      return dates;
    });
  },

  getEarnRatio(res) {
    const length = res.length;
    // Magic Equation
    let earnRatio = ((res[length - 1].price / res[length - 61].price) ** (1 / 5)) - 1;
    earnRatio = (earnRatio * 100).toFixed(1);
    return earnRatio;
  },

  getPieChartObject(resName, resTarget, investedAmount, isDetail = true, overview = false) {
    let weight;

    if (isDetail === true || overview === true) {
      weight = resTarget.weight;
    } else {
      weight = resTarget.value;
    }

    weight = weight || resTarget.value / investedAmount;
    const value = resTarget.value || weight;
    let iuid = 99999;
    if (resName.iuid) {
      iuid = resName.iuid.split('_');
    }
    if (iuid[2]) {
      iuid[2] = iuid[2] === 'HKD' ? 'HKD' : iuid[2].padStart(5, '0');
    }
    if (isNaN(weight)) {
      weight = 0;
    }
    const obj = {
      name: resName.name,
      desc: resName.desc,
      reason: resName.reason,
      url: resName.url,
      weight: value,
      percentage: `${parseFloat((weight * 100).toFixed(2))}%`,
      value: investedAmount * weight,
      id: iuid[2],
      area: iuid[0],
    };
    return obj;
  },

  addColor(EChartOption, color) {
    return {
      ...EChartOption,
      itemStyle: {
        normal: {
          color,
        },
      },
    };
  },

  handleWeight(target, investedAmount) {
    return target.weight || target.value / investedAmount;
  },

  handleDetail(resTarget, investedAmount, current = false, overview = false) {
    const color = '';

    // Stocks
    const stockFundsValue = [];
    const stockCount = 0;
    let stockData = [];
    // Bonds
    const bondFundsValue = [];
    const bondCount = 0;
    let bondData = [];

    let fundsValue = [];

    let iuid = 'iuid';

    if (current === true && overview === false) {
      iuid = 'holding_id';
    }
    const resName = [];
    for (let i = 0; i < resTarget.length; i += 1) {
      resName[i] = {};
      if (!resName[i].name) {
        // Change to Chinese or English name
        resName[i].name = this.$t(`portfolio.${resTarget[i][iuid]}_name`);
        resName[i].desc = this.$t(`portfolio.${resTarget[i][iuid]}_desc`);
        resName[i].reason = this.$t(`portfolio.${resTarget[i][iuid]}_reason`);
        if(this.$store.state.isSFC) {
          resName[i].url = this.$t(`portfolio.${resTarget[i][iuid]}_url`);
        }
        resName[i].iuid = resTarget[i][iuid];
        if(this.$store.state.isGuodu && resTarget[i][iuid] === 'HK_00_HKD'){
          resName[i].name = this.$t('portfolio.guodu_cash');
        }
      } else {
        console.log(resName[i].name);
      }

      const obj = this.getPieChartObject(resName[i], resTarget[i], investedAmount, current, overview);

      // EChart
      const EChartOption = {
        value: this.handleWeight(resTarget[i], investedAmount),
        name: resName[i].name,
      };
      if (obj.id === 'HKD') {
        this.putUserCash(obj.value);
      }

      if (resTarget[i].flag === InstFlag.Stock) {
        // color = stockColor[stockCount];
        // stockCount += 1;
        // obj = { ...obj, color };
        stockData.push(obj);

        // EChartOption = this.addColor(EChartOption, color);

        stockFundsValue.push(EChartOption);
      } else {
        // color = bondColor[bondCount];
        // bondCount += 1;
        // obj = { ...obj, color };
        bondData.push(obj);

        // EChartOption = this.addColor(EChartOption, color);
        bondFundsValue.push(EChartOption);
      }
    }

    // Sorted by weight
    const upperStock = stockFundsValue.sort(this.sortValue)
     .map((asset, index) => (this.addColor(asset, stockColor[index])));
    const upperBonds = bondFundsValue.sort(this.sortValue)
     .map((asset, index) => (this.addColor(asset, bondColor[index])));

    fundsValue = [...upperBonds, ...upperStock];

    stockData = stockData.sort(this.sortValue)
      .map((asset, index) => ({ ...asset, color: stockColor[index] }));
    bondData = bondData.sort(this.sortValue)
      .map((asset, index) => ({ ...asset, color: bondColor[index] }));
    return {
      stockData,
      bondData,
      upperStock,
      upperBonds,
      fundsValue,
    };
  },

  showETFDetail(accid, investedAmount) {
    return this.getTarget(accid)
      .then(resTarget => this.handleDetail(resTarget, investedAmount, false, true))
      .catch(err => window.util.errHandle(this, '获取 ETF 失败', err));
  },

  showOverviewDetail(accid, investedAmount) {
    return this.getTarget(accid)
      .then(resTarget => this.handleDetail(resTarget, investedAmount, false, true))
      .catch(err => window.util.errHandle(this, '获取 ETF 失败', err));
  },

  showMarketUpdatedDetail(accid, investedAmount, mockData) {
    debugger
    // Return the resolve from this.handleDetail and add market_update_time
    return this.getPortfolio(accid)
      .then((resTarget) => {
        debugger
        if (this.$store.state.isMocked && this.$store.state.isSFC) {
          // resTarget = mock.sfcPortfolio;
        }
        if (resTarget && resTarget.portfolios.length < 2) {
          return false;
        }
        if (this.$store.state.isSFC && this.$store.state.isPartMocked) {
          // return false;
          for(let i = 0 ;i < mockData.length;i++){
            debugger

          }
        }
        if (this.$store.state.isSFC && !this.$store.state.isMocked && !this.$store.state.isPartMocked) {
          return false;
        }
        debugger
        return {
          ...this.handleDetail(resTarget.portfolios, investedAmount, true),
          market_update_time: resTarget.market_update_time,
        };
      })
      .catch(err => window.util.errHandle(this, '获取持仓失败', err));
  },

  showMarketDetail(accid, investedAmount) {
    return this.publicTarget(accid).then((resTarget) => {
      const resName = [];
      let color = '';

      // Stocks
      const stockFundsValue = [];
      let stockCount = 0;
      const stockData = [];
      // Bonds
      const bondFundsValue = [];
      let bondCount = 0;
      const bondData = [];

      let fundsValue = [];

      for (let i = 0; i < resTarget.length; i += 1) {
        resName[i] = {};
        if (!resName[i].name) {
          resName[i].name = this.$t(`portfolio.${resTarget[i].name}_name`);
          resName[i].desc = this.$t(`portfolio.${resTarget[i].name}_desc`);
          resName[i].reason = this.$t(`portfolio.${resTarget[i].name}_reason`);
          if(this.$store.state.isSFC) {
            resName[i].url = this.$t(`portfolio.${resTarget[i][iuid]}_url`);
          }
        } else {
          console.error(resName[i].name);
        }

        // TODO: get the correct amount of money
        let obj = this.getPieChartObject(resName[i], resTarget[i], investedAmount, false);

        const EChartInitOption = {
          value: resTarget[i].value,
          name: resName[i].name,
        };

        switch (resTarget[i].name.substring(6)) {
          // 1,2,3,4 are stock
          case '1':
          case '2':
          case '3':
          case '4': {
            color = stockColor[stockCount];
            stockCount += 1;

            obj = { ...obj, color };

            stockData.push(obj);

            const EChartOption = {
              ...EChartInitOption,
              itemStyle: {
                normal: {
                  color,
                },
              },
            };
            stockFundsValue.push(EChartOption);
            break;
          }
          // 5, 6 are bond
          case '5':
          case '6': {
            color = bondColor[bondCount];
            bondCount += 1;

            obj = { ...obj, color };

            bondData.push(obj);

            const EChartOption = {
              ...EChartInitOption,
              itemStyle: {
                normal: {
                  color,
                },
              },
            };

            bondFundsValue.push(EChartOption);
            break;
          }
          default:
            break;
        }
      }
      bondFundsValue.sort(this.sortValue);
      stockFundsValue.sort(this.sortValue);
      fundsValue = bondFundsValue.concat(stockFundsValue);
      this.stockData = stockData.sort(this.sortValue);
      this.bondData = bondData.sort(this.sortValue);

      return {
        stockData,
        bondData,
        bondFundsValue,
        stockFundsValue,
        fundsValue,
      };
    });
  },
};

export default chart;
