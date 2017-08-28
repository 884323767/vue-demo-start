<template>
  <div class="main-container">
    <ul class="time-select">
      <li :class="{active: selectTime == 1}" @click="changeTime(1)">{{$t('historyChart.oneMonth')}}</li>
      <li :class="{active: selectTime == 2}" @click="changeTime(2)">{{$t('historyChart.threeMonths')}}</li>
      <li :class="{active: selectTime == 3}" @click="changeTime(3)">{{$t('historyChart.oneYear')}}</li>
      <li :class="{active: selectTime == 4}" v-if='!$store.state.isSFC' @click="changeTime(4)">{{$t('historyChart.fromYearBeginning')}}</li>
      <li :class="{active: selectTime == 4}" v-if='$store.state.isSFC' style="width:80px;" @click="changeTime(4)">自配置以來</li>
    </ul>
    <div style="width:90%;margin:0 auto;padding:15px 0;font-size:14px;color:#787878;">
      {{$t('historyChart.accountValue')}}
    </div>
    <div class="chart-content">
      <div id='chart' class="chart-picture"></div>
    </div>
    <div style="width:90%;margin:auto;height:20px;" v-if="false">
      <p class="hint hint-left">
        {{$t('historyChart.from')}} {{accData.create_time}} {{$t('historyChart.totalValue')}}
      </p>
      <p class="hint hint-right">
        {{$t('historyChart.fromYearBeginning')}}
      </p>
    </div>
    <div class="description" v-if="reason !== ' '">
      <div class="col">
        <div class="circle" v-bind:style="{border: '2px solid' + color}"></div>
      </div>
      <div class="col">
        <span class="reason">{{reason}}</span>
        <span class="detail">{{detail}}</span>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import echarts from 'echarts';
import service from '../../service';
import mock from '../../mock.js';

let formatMoney;

export default {
  props: {
    accData: {
      type: Object,
    },
  },
  data() {
    return {
      selectTime: 1,
      option: {},
      detail: ' ',
      reason: ' ',
      historyData: {},
      // overflowMap: {
      //   1: '市场变动',
      //   2: '算法变动',
      //   3: '用户主动调整风险承受能力',
      //   4: '用户出入金',
      // },
      // overflowMap: JSON.parse(this.$t('summary.portfolioTitle')),
      // colorMap: {
      //   市场变动: '#1495eb',
      //   算法变动: '#065f9a',
      //   用户主动调整风险承受能力: '#e74800',
      //   用户出入金: '#f6a623',
      // },
      colorMap: {
        1: '#1495eb',
        2: '#065f9a',
        3: '#e74800',
        4: '#f6a623',
      },
      markPoint: [],
      index: 28,
      topLevelDates: {},
    };
  },
  mixins: [service],
  methods: {
    formatMoney(value, region) {
      return Vue.filter('formatMoney')(value / 1000, region);
    },
    changeHistoryScope(val) {
      /**
       * index: 正值的 val - 2
       * @type {Number}
       */
      this.index = 0 - val - 2;
      this.option.xAxis[0].data = this.historyData.xData.slice(val);
      this.option.series[0].data = this.historyData.yData.slice(val);
      this.option.series[1].data = this.historyData.y1Data.slice(val);
      this.chartBackup.setOption(this.option);
    },
    changeTime(val) {
      this.selectTime = val;
      switch (val) {
        case 1:
          this.changeHistoryScope(-30);
          break;
        case 2:
          this.changeHistoryScope(-30 * 3);
          break;
        case 3:
          this.changeHistoryScope(-30 * 12);
          break;
        case 4: {
          const year = new Date().getFullYear();
          const now = +new Date();
          const last = +new Date(`${year}-01-01`);
          const num = parseInt((now - last) / (1000 * 60 * 60 * 24), 10);
          this.changeHistoryScope(-num);
          break;
        }
        default:
          break;
      }
    },
    profitChart(accid) {
      const xData = []; // Formatted Time
      const x1Data = []; // Raw time
      const yData = [];
      const y1Data = [];

      const createTime = [];
      const allChart = document.querySelectorAll('#chart');
      let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
      // The maximum width of the history Chart should be less than
      // the width of iPhone 6+
      width = width > 414 ? 414 : width;
      width *= 0.986;

      window.$('.chart-content .chart-picture').css('width', `${width}px`);

      const chart = echarts.init(allChart[allChart.length - 1]);
      this.chartBackup = chart;
      // chart.resize();
      window.Dom7(window).resize(() => {
        if (chart !== null && chart !== undefined) {
          chart.resize();
        }
      });
      // chart.showLoading();
      chart.on('datazoom', () => {
        this.adjustYMinMax(chart, yData, y1Data, true);
      });

      chart.on('click', (e) => {
        if (e.data && e.data.name) {
          if (e.data.name === 'first') {
            const type = 4;
            this.detail = this.$t('difference.detail_5');
            // e.data.reason = 4;
            this.color = this.colorMap[type];
            this.reason = this.$t(`overflowMap.${type}`);
            return;
          }
          this.detail = e.data.detail;
          this.color = this.colorMap[e.data.reason];
          this.reason = this.$t(`overflowMap.${e.data.reason}`);
        }
      });
      chart.getZr().on('click', (e) => {
        if (e.target && e.target.dataModel) {
          // e.target.style.text = "";
          // const index = e.target.dataIndex;

          // // Copy detail and reason into the Page
          // // const data = e.target.dataModel.option.data[index];
          // const data = this.markPoint[index];

          // if (data.name === 'first') {
          //   // Clear detail and reason
          //   this.detail = ' ';
          //   this.reason = ' ';
          //   return;
          // }

          // this.detail = data.detail;
          // this.reason = data.reason;
          // this.color = this.colorMap[this.reason];
        } else {
          this.detail = ' ';
          this.reason = ' ';
        }
      });

      this.getAccountIncome(accid).then((res) => {
        if (this.$store.state.isMocked) {
          // this.accData.create_time = new Date(res[0].create_time).toISOString().slice(0, 10).replace('-', '/').replace('-', '/');
        } else if (this.$store.state.isSFC && this.$store.state.accData.trade_counter === 0) {
          res = [];
        }
        // if(this.$store.state.isMocked) {
        //   // res = mock.sfcHistory;
        // } else {
        //   res = [];
        // }
        if (res && res.length !== 0) {
          console.log('res.length !== 0');
        } else {
          res = [{
            value: this.$store.state.accData.total_value,
            // Follow the naming rules in the server side
            invested_amount: this.$store.state.accData.total_value,
            dr_rate: '0.0000000000',
            twr_rate: '0.0000000000',
            create_time: +new Date(),
          }];
        }
        const userData = res;
        const region = this.accData.region;
        let yMin = this.accData.total_value;
        let yMax = 0;
        const investedAmount = userData[0].invested_amount;
        for (let i = 0; i < userData.length; i += 1) {
          const value = +userData[i].value;
          const rawTime = userData[i].create_time;
          const formattedTime = this.formatTime(rawTime);

          xData.push(formattedTime);
          x1Data.push(rawTime);
          // xData.push(rawTime);
          // x1Data.push(formattedTime);
          createTime.push(rawTime);
          yData.push(value);
          y1Data.push(userData[i].invested_amount);


          this.topLevelDates[formattedTime] = {
            rawTime,
            value,
          };

          if (yMax < value) {
            yMax = value;
          }
          if (yMin > value) {
            yMin = value;
          }
        }

        // To Number
        yMax = +yMax;
        yMin = +yMin;
        const inv = +investedAmount;

        // Modify grid size
        let range = yMax - yMin;
        let distance;
        // range = Math.ceil(range / 500) * 500;
        /**
         * 只有一个点的话，range 会是0
         * @param  {Boolean} [range=== 0]            是否没有距离？
         * True 的话，跳过以下 UI 微调步骤
         */
        if (range === 0) {
          /**
           * 加入 1000 上下高度
           */
          yMax += 3000;
          yMin -= 3000;
        } else {
          distance = range / 5;
          const temp = Math.ceil((yMax - inv) / distance) * distance || 1000;
          const temp2 = Math.ceil((inv - yMin) / distance) * distance;
          console.log('before');
          console.log(`invested amount ${inv}\nrange ${range}\nyMax ${yMax}\nyMin ${yMin}\ndistance ${distance}`);
          console.log(`temp: ${temp}`);
          if (yMax >= inv && yMin <= inv) {
            console.log('yMax >= inv && vMin <= inv');
            console.log(temp);
            yMax = inv + temp;
            if (temp2 !== 0) {
              range = yMax - yMin;
              distance = range / 6;
              yMin = inv - temp2;
              range = yMax - yMin;
              distance = range / 6;
            } else {
              range = yMax - yMin;
              distance = range / 6;
              yMin = inv - distance;
            }
          } else if (inv > yMax) {
            console.log('inv > yMax');
            distance = (inv - yMin) / 5;
            yMax = inv + distance;
            if (yMin - distance <= 0) {
              console.log('yMin - distance <= 0');
            } else {
              yMin -= distance;
            }
          } else if (inv < yMin) {
            console.log('inv < yMin');
            distance = (yMax - inv) / 5;
            yMax += distance;
            if (inv - distance <= 0) {
              console.log('inv - distance <= 0');
              yMin = inv;
            } else {
              yMin = inv - distance;
            }
          }

          yMin = parseInt(yMin, 10);

        // The minimum value of yMin should be 0 or yMin
          if (yMin < 0) {
            yMin = 0;
          }
          console.log('after');
          console.log(`invested amount ${inv}\nrange ${range}\nyMax ${yMax}\nyMin ${yMin}\ndistance ${distance}`);
          console.log(`temp: ${temp}`);
        }

        // Store the latest date of the xData
        this.$store.commit('STORE_LATEST_DATE', xData[xData.length - 1]);

        this.historyData.xData = xData;
        this.historyData.yData = yData;
        this.historyData.y1Data = y1Data;

        this.getModifications(accid).then((data) => {
          // Initial Mark Point
          let borderColor = this.colorMap[4];
          let tempMarkPoint = this.createMarkPoint([`${xData[0]}`, yData[0]], borderColor, 'first');

          this.markPoint.push(tempMarkPoint);
          /**
           * 格式化后的日期
           * @type {FormattedTime}
           */
          // const formattedTime = xData.map(x => this.formatTime(x));

          // const modificationDates = Object.keys(data).reverse();
          /**
           * 遍历 data 里面的改动，例如调仓，出入金
           * @param  {Object}
           */
          var len = Object.keys(data).length;
          const dataTemp = Object.keys(data);
          // Object.keys(data)
          // for (const modification in data) {
          // for (let i = 0; i < data. modification in data) {
          for (let m = len - 2; m >= 0; m -= 1) {
            const modification = dataTemp[m];
            // const modification = data[modificationDates[m]];
            /**
             * 从 formattedTime 里面取得 index
             * @type {Number}
             */
            // const index = formattedTime.indexOf(modificationDates[m]);
            borderColor = this.colorMap[data[modification].reason];
            // borderColor = this.colorMap[modification.reason];
            /**
             * 在图标上面显示的日期
             * @type {String}
             */
            // const day = `${xData[index]}`;
            // const day = xData[index];
            const day = modification;
            // const index = 1;

            let value = 0;
            try {
              value = this.topLevelDates[day].value;
            } catch (err) {
              console.log('history chart try catch value error');
              // console.log(err);
            }


            tempMarkPoint = this.createMarkPoint([day, value], borderColor);
            // tempMarkPoint = this.createMarkPoint([day, yData[index]], borderColor);


            const obj = {
              ...tempMarkPoint,
              ...data[modification],
            };

            this.markPoint.push(obj);
          }

          const _this = this;
          this.option = {
            tooltip: {
              trigger: 'axis',
              backgroundColor: 'rgba(255,2552,255,0.9)',
              borderColor: '#b6ccdc',
              textStyle: {
                color: '#303030',
              },
              extraCssText: 'box-shadow: 0 0 5px #b6ccdc',
              axisPointer: {
                type: 'line',
                lineStyle: {
                  color: 'rgba(0,0,0,0.1)',
                  width: '2',
                },
              },
              formatter(params) {
                // const date = _this.formatTime(params[0].axisValue);
                const date = params[0].axisValue;
                let html = `${date}<br>`;
                const total_value = parseFloat(params[0].value);
                const investedAmount = parseFloat(params[1].value);
                const earn = total_value - investedAmount;
                html += `<div style="text-align:left;"><div style="display:inline-block;width:80px;font-size:12px;color:#32629A;">${_this.$t('historyChart.list_1')}</div>`;
                html += `<span style="font-size:12px;color:#32629A;">${formatMoney(total_value, region, true)}</span></div>`;

                html += `<div style="text-align:left;"><div style="display:inline-block;width:80px;font-size:12px;color:#7DABE7;">${_this.$t('historyChart.list_2')}</div>`;
                html += `<span style="font-size:12px;color:#7DABE7;">${formatMoney(investedAmount, region, true)}</span></div>`;

                // const color = earn > 0 ? '#789336' : '#f00';
                const color = '#545D72';
                html += `<div style="text-align:left;"><div style="display:inline-block;width:80px;font-size:12px;color:${color}">${_this.$t('historyChart.list_3')}</div>`;
                html += `<span style="font-size:12px;color:${color};">${formatMoney(total_value - investedAmount, region, true)}</span></div>`;
                if (_this.$store.state.isSFC) {
                  html += `<div style="text-align:left;"><div style="display:inline-block;width:80px;font-size:12px;color:#F88049">${_this.$t('historyChart.list_4')}</div>`;
                  html += `<span style="font-size:12px;color:#F88049;">${formatMoney((earn / investedAmount) * 100, region, false)}%</span></div>`;
                }
                return html;
              },
            },
            // dataZoom: [1.2288],
            grid: {
              top: '8%',
              left: '4.3%',
              right: '4.3%',
              bottom: '5%', // 设置图表主题距离容器底侧距离
              containLabel: true,
            },
            xAxis: [{
              type: 'category',
              z: 100,
              boundaryGap: false,
              splitLine: false, // 去除网格线
              axisLabel: {
                formatter(value, index) {
                  /**
                   * 如果是最后一个 Label，加1天
                   * @param  {Number} index 现在的值
                   * @return {FormattedTime}       格式化后的日期 08/15
                   * @todo 改变 28 为最后一个值
                   */
                  const maximum = _this.index;
                  if (index >= maximum) {
                    return value;
                    // return _this.formatTime(value, true, true);
                  }
                  return value;
                  // return _this.formatTime(value);
                  // return value;
                },
                textStyle: {
                  color: '#8e9091',
                  align: 'center',
                },
              },
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              data: xData.slice(-30),
            }],
            yAxis: [{
              type: 'value',
              z: 100,
              scale: true,
              min: yMin,
              max: yMax,
              // splitNumber: 10,
              interval: distance,
              axisLabel: {
                margin: 0,
                formatter(value) {
                  return `${value > 1000 ? `${_this.formatMoney(value)}k` : `$${value.toFixed(2)}`}\n`;
                },
                inside: true,
                textStyle: {
                  color: '#8e9091',
                  align: 'left',
                  baseline: 'middle',
                },
              },
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(0,0,0,0.03)',
                  width: 1,
                },
              },
            }],
            series: [{
              name: 'Balance',
              type: 'line',
              animationDuration: 500,
              lineStyle: {
                normal: {
                  color: '#1495eb', // 设置折线的颜色
                  width: 2, // 设置折线的宽度
                  z: 1,
                },
              },
              itemStyle: {
                normal: {
                  color: '#1495eb',
                },
              },
              areaStyle: {
                normal: {
                  color: '#dbeaf9', // 设置覆盖区域的颜色
                  z: 1,
                },
              },
              markPoint: {
                symbol: 'circle',
                // symbol: 'image://img/blueCircle.png',
                symbolSize: 10,
                data: this.markPoint,
              },
              showSymbol: false,
              hoverAnimation: true,
              data: yData.slice(-30),
            }, {
              name: 'Balance',
              type: 'line',
              animationDuration: 500,
              lineStyle: {
                normal: {
                  color: '#9c9c9c', // 设置折线的颜色
                  width: 1, // 设置折线的宽度
                  z: 1,
                },
              },
              itemStyle: {
                normal: {
                  color: '#9c9c9c',
                },
              },
              showSymbol: false,
              data: y1Data.slice(-30),
            }],
          };
          if (this.$store.state.isSFC) {
            // 方案 1
            // this.option.series[0].lineStyle.normal.color = '#FFBA95';
            // this.option.series[0].itemStyle.normal.color = '#f47137';
            // this.option.series[0].areaStyle.normal.color = '#f7e6dd';
            // 方案 2
            this.option.series[0].lineStyle.normal.color = '#547192';
            this.option.series[0].itemStyle.normal.color = '#547192';
            this.option.series[0].areaStyle.normal.color = '#d0d7df';
          }
          chart.setOption(this.option);
        });
      }).catch((err) => {
        console.error(err);
        window.util.errHandle(this, '获取收益信息失败', err);
      }).finally(() => {

      });
    },
  },
  created() {
    formatMoney = Vue.filter('formatMoney');
  },
};
</script>
<style lang="scss">
.sfc {
  .main-container {
    background-color: #f7f7f6;
  }
}
.main-container {
    padding-top: 15px;
    background-color: rgba(241,244,251,0.80);
    padding-bottom: 10px;
  .time-select {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    // font-family: PingFangSC-Regular;

    li {
      border:1px solid #418fea;
      border-radius:2px;

      padding: 13px 7px;

      width:64px;
      height:30px;

      display: flex;
      justify-content: center;
      align-items: center;

      color:#418fea;

      &.active {
        color: #ffffff;
        background-color: #71aef7;
      }
    }
  }
  .title {
    font-size: 12px;
    text-align: center;
    color: #8e9091;
  }
  .chart-content {
    text-align: center;
    position: relative;
    .chart-picture {
      margin: 0 auto;
      width: 98.6%;
      height: 300px;
    }
  }
  .hint {
    padding: 5px 0px;
    font-size: 12px;
    color: #8e9091;
  }
  .hint-left {
    float: left;
    text-align: left;
  }
  .hint-right {
    float: right;
    text-align: right;
  }

  .description {
    margin-top: 8px;
    margin-bottom: 32px;
    display: flex;
  }
  .circle {
    height: 13px;
    width: 13px;
    border-radius: 100%;
    border: 2px solid #065f9a;
    margin-top: 3px;
  }
  .reason {
    // font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #8e9091;
    text-align: left;
    display: inline-block;
  }
  .detail {
    @extend .reason;
    margin-top: 2px;
    line-height: 1.2;
  }
  .col {
    &:first-child {
      display: inline-block;
    }
    display: inline;
    margin-left: 13px;
  }
}
</style>
