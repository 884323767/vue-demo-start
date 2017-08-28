<template>
  <div class="predict">
    <div class="chart-content">
      <chart class="line" :options="lineData" :autoResize="true" :initOptions="lineInitOptions" ref="profitChart"></chart>
    </div>
    <f7-block>
      <p class="caption">
        {{$t('predictChart.Hypothesis')}}{{baseMoney | formatMoney('number')}}{{$t('predictChart.HKD')}}，<br />
        {{$t('predictChart.portfolio')}}
      </p>
    </f7-block>
  </div>
</template>
<script>
import VueECharts from 'vue-echarts';
import Vue from 'vue';
import service from '../../service';

export default {
  props: {
    accid: {
      type: Number,
      default: 0,
    },
    fromQuestionnaire: {
      type: Boolean,
      default: false,
    },
    region: {
      type: String,
      default: 'HK',
    },
    accData: {
      type: Object,
      default: {},
    },
    investedAmt: {
      type: Number,
      default: 100000,
    },
  },
  components: {
    chart: VueECharts,
  },
  mixins: [service],
  data() {
    return {
      lineData: {},
      baseMoney: 100000,
      yMin: 0,
      yMax: 0,
      lineInitOptions: {
        height: '240px',
      },
      totalValue: '', // for i18n
           lineDataSeries: [{
        name: '95%',
        type: 'line',
        smooth: true,
        stack: '量',
        showSymbol: false,
        symbolSize: 1,
        animationDuration: 500,
        itemStyle: {
          normal: {
            color: '#9e999a',
          },
          emphasis: {
            color: '#d0c3c6',
          },
        },
        lineStyle: {
          normal: {
            color: '#9f9f9f',
            opacity: 1,
            width: 1,
          },
        },
        areaStyle: {
          normal: {
            color: 'rgba(0,0,0,0)',
          },
        },
        data: [],
      }, {
        name: '75%',
        type: 'line',
        smooth: true,
        stack: '量',
        showSymbol: false,
        symbolSize: 0,
        animationDuration: 500,
        lineStyle: {
          normal: {
            color: '#969797',
            opacity: 0,
          },
        },
        areaStyle: {
          normal: {
            color: 'rgba(74,144,226,0.25)',
          },
        },
        data: [],
      }, {
        name: '50%',
        type: 'line',
        smooth: true,
        stack: '量',
        showSymbol: false,
        symbolSize: 1,
        animationDuration: 500,
        itemStyle: {
          normal: {
            color: '#31629a',
          },
          emphasis: {
            color: '#4d8cd6',
          },
        },
        lineStyle: {
          normal: {
            color: '#4990e2',
            opacity: 1,
            width: 1,
          },
        },
        areaStyle: {
          normal: {
            color: 'rgba(74,144,226,0.5)',
          },
        },
        data: [],
      }, {
        name: '25%',
        type: 'line',
        smooth: true,
        stack: '量',
        showSymbol: false,
        symbolSize: 0,
        animationDuration: 500,
        lineStyle: {
          normal: {
            opacity: 0,
          },
        },
        areaStyle: {
          normal: {
            color: 'rgba(74,144,226,0.5)',
          },
        },
        data: [],
      }, {
        name: '5%',
        type: 'line',
        smooth: true,
        stack: '量',
        showSymbol: false,
        symbolSize: 1,
        animationDuration: 500,
        itemStyle: {
          normal: {
            color: '#7dabe8',
          },
          emphasis: {
            color: '#b0cbf4',
          },
        },
        lineStyle: {
          normal: {
            opacity: 0,
          },
        },
        areaStyle: {
          normal: {
            color: 'rgba(74,144,226,0.25)',
          },
        },
        data: [],
      }, {
        name: 'base',
        type: 'line',
        z: 0,
        showSymbol: false,
        symbolSize: 0,
        animationDuration: 100,
        lineStyle: {
          normal: {
            color: '#cdcdcd',
            width: '2',
            opacity: 1,
          },
        },
        data: [],
      }],
    };
  },
  methods: {
    startDraw(accid, riskRatio) {
      this.predictionChart(accid, riskRatio);
    },
    formatMoney(value, region) {
      return Vue.filter('formatMoney')(value, region);
    },
    lineDatasSet() {
      const self = this;
      const goodMarket = this.$t('predictChart.goodMarket');
      const normalMarket = this.$t('predictChart.normalMarket');
      const worseMarket = this.$t('predictChart.worseMarket');
      const year = this.$t('predictChart.year');
      const expectedRevenue = this.$t('predictChart.expectedRevenue');
      let chartTitle = self.$t('result.chart_title');
      if(this.$store.state.isSFC){
        chartTitle = '模擬收益';
      }
      this.lineData = {
        title: {
          text: chartTitle,
          textStyle: {
            color: 'rgba(42,49,57,0.39)',
            fontSize: 14,
          },
          left: 'center',
          top: 10,
        },
        tooltip: {
          trigger: 'axis',
          // formatter:"{b}年预期收益<br />{a0}收益: ${c0}<br />{a1}收益: ${c1}<br />{a2}收益: ${c2}<br />{a3}收益: ${c3}<br />{a4}收益: ${c4}"
          backgroundColor: '#fff',
          padding: 10,
          textStyle: {
            color: '#8e9091',
          },
          borderWidth: 1,
          borderColor: '#ddd',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: '#7c91a9',
              width: '1',
            },
          },
          position(pos, params, dom) {
            let position = { left: pos[0], top: pos[1] };
            if (pos[0] > dom.clientWidth) {
              const left = pos[0] - dom.clientWidth;
              position = { left, top: -15 };
            }
            return position;
          },
          formatter(params) {
            let html = `<span style='font-weight:bold;'>${params[0].name}${year}${expectedRevenue}</span><br>`;
            let sum = 0;
            params.forEach((v) => {
              sum += parseFloat(v.value);
            });

            params.reverse().forEach((v) => {
              if (v.seriesIndex % 2 !== 0) {
                sum -= parseFloat(v.value);
                return;
              }
              html += '<div style="text-align:left;"><div style="display:inline-block;width:100px;font-size:12px;padding-top:5px;">';
              html += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${v.color}"></span>`;
              if (v.seriesIndex === 4) html += goodMarket;
              if (v.seriesIndex === 2) html += normalMarket;
              if (v.seriesIndex === 0) html += worseMarket;
              // html += '</div><span style="font-size:12px;">' + "$" + (sum > 999 ? (sum/1000).toFixed(0) + 'k' : sum) + '</span></div>';
              html += `</div><span style="font-size:12px;">${self.formatMoney(sum, false)}</span></div>`;
              sum -= parseFloat(v.value);
            });
            return html;
          },
          extraCssText: 'text-align: left; font-size: 12px;',
        },
        grid: {
          left: '4.3%',
          right: '4.3%',
          bottom: '0%',
          top: '25%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          z: 100,
          boundaryGap: false,
          splitLine: false, // 去除网格线
          axisLabel: {
            margin: 12,
            formatter(value, index) {
              return value;
            },
            inside: false,
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
          data: this.lineDataLabels,
        },
        yAxis: {
          min: this.yMin,
          max: this.yMax,
          interval: this.yInterval,
          type: 'value',
          z: 0,
          axisLabel: {
            show: true,
            margin: 0,
            inside: true,
            formatter(value, index) {
              return `$${value > 999 ? `${(value / 1000).toFixed(0)}k` : value}\n\n`;
            },
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
              color: 'rgba(0,0,0,0.1)',
              width: 1,
              type: 'dotted',
            },
          },
        },
        series: this.lineDataSeries,
      };
      if(this.$store.state.isSFC){
        this.lineData.tooltip.axisPointer.lineStyle.color = '#545D72';
        // this.lineData.tooltip.axisPointer.lineStyle.width = '10';
      }
    },
    predictionChart(accid, riskRatio) {
      const getPredictionFail = this.$t('predictChart.getPredictionFail');
      const getInvestmentTypeFail = this.$t('predictChart.getInvestmentTypeFail');
      if (this.fromQuestionnaire) {
        if (!this.accData.algo_product_id) {
          this.accData.algo_product_id = sessionStorage.getItem('algoProductId');
        }
        if(riskRatio){
          this.getPrediction(riskRatio, 'NON', 'NON', this.accData.algo_product_id).then(
            this.handlePredictionCallback,
          ).catch((err) => {
            window.util.errHandle(this, getPredictionFail, err);
            console.error(err);
          }).finally(() => {
            console.log('finally');
          });
        } else {
          this.getRiskProfile(this.accData.algo_product_id).then((res) => {
            const ratio = res.risk_ratio;
            this.getPrediction(ratio, 'NON', 'NON', this.accData.algo_product_id).then(
              this.handlePredictionCallback,
            ).catch((err) => {
              window.util.errHandle(this, getPredictionFail, err);
              console.error(err);
            }).finally(() => {
              console.log('finally');
            });
          }).catch((err) => {
            window.util.errHandle(this, getInvestmentTypeFail, err);
            console.error(err);
          });
        }
      } else {
        this.getaccprediction(accid).then(
          this.handlePredictionCallback,
        ).catch((err) => {
          window.util.errHandle(this, getPredictionFail, err);
          console.error(err);
        }).finally(() => {
          console.log('finally');
        });
      }
    },
    handlePredictionCallback(res) {
      const self = this;
      let baseMoney = this.investedAmt || 100000;
      if (this.investedAmt < 100000) {
        baseMoney = 100000;
      }
      this.baseMoney = baseMoney;
      // let baseMoney = 142000;//100000;
      const y = new Date().getFullYear();

      const labels = [];
      const series = [
        [],
        [],
        [],
        [],
        [],
      ];
      const rawData = res.data.slice(0, 11);
      let min = 1,
        max = 0;
      rawData.forEach((v, i) => {
        labels.push(y + parseInt(v.year));
        v.prob.forEach((p, j) => {
          min = Math.min(min, p);
          max = Math.max(max, p);
          if (i === 0) {
            series[j].push(j === 0 ? baseMoney * p : 0);
          } else {
            series[j].push(j === 0 ? baseMoney * p : baseMoney * (p - v.prob[j - 1]));
          }
        });
      });
      this.yRange = Math.round(baseMoney * (max - min) / 3);
      const scaling = Math.pow(10, this.yRange.toString().length - 1);
      this.yInterval = Math.ceil(this.yRange / scaling) * scaling;
      this.yMin = baseMoney - this.yInterval * 1; //* 0.98;
      this.yMax = baseMoney + this.yInterval * 3 + 1; // * 1.02;
      this.yBase = baseMoney;
      this.lineDataLabels = labels;
      series.forEach((s, i) => {
        self.lineDataSeries[i].data = s;
      });

      const baseSeries = [];
      for (let i = 0; i < rawData.length; i += 1) {
        baseSeries[i] = baseMoney;
      }
      self.lineDataSeries[series.length].data = baseSeries;
      this.lineDatasSet();
      this.startYear = labels[0];
      this.endYear = labels[labels.length - 1];
      const chart = this.$refs.profitChart;
      window.test = chart;
      setTimeout(() => {
        // If chart is rendered
        if (chart) {
          chart.dispatchAction({
            type: 'showTip',
            x: 185,
            y: 60,
          });
        }
      }, 1000);
    },
  },
  mounted() {
    if(this.$store.state.isSFC) {
      this.lineDataSeries =[{
        name: '95%',
        type: 'line',
        smooth: true,
        stack: '量',
        showSymbol: false,
        symbolSize: 1,
        animationDuration: 500,
        itemStyle: {
          normal: {
            color: '#9a9eac',
          },
          emphasis: {
            color: '#e4e5e6',
          },
        },
        lineStyle: {
          normal: {
            color: '#9f9f9f',
            opacity: 0,
            width: 1,
          },
        },
        areaStyle: {
          normal: {
            color: 'rgba(0,0,0,0)',
          },
        },
        data: [],
      }, {
        name: '75%',
        type: 'line',
        smooth: true,
        stack: '量',
        showSymbol: false,
        symbolSize: 0,
        animationDuration: 500,
        lineStyle: {
          normal: {
            color: '#969797',
            opacity: 0,
          },
        },
        areaStyle: {
          normal: {
            color: '#c8ccd7',
          },
        },
        data: [],
      }, {
        name: '50%',
        type: 'line',
        smooth: true,
        stack: '量',
        showSymbol: false,
        symbolSize: 1,
        animationDuration: 500,
        itemStyle: {
          normal: {
            color: '#060e1a',
          },
          emphasis: {
            color: '#1d3f77',
          },
        },
        lineStyle: {
          normal: {
            color: '#1D3E77',
            opacity: 1,
            width: 1,
          },
        },
        areaStyle: {
          normal: {
            color: '#9ba7c3',
          },
        },
        data: [],
      }, {
        name: '25%',
        type: 'line',
        smooth: true,
        stack: '量',
        showSymbol: false,
        symbolSize: 0,
        animationDuration: 500,
        lineStyle: {
          normal: {
            opacity: 0,
          },
        },
        areaStyle: {
          normal: {
            color: '#9ba7c3',
          },
        },
        data: [],
      }, {
        name: '5%',
        type: 'line',
        smooth: true,
        stack: '量',
        showSymbol: false,
        symbolSize: 1,
        animationDuration: 500,
        itemStyle: {
          normal: {
            //ouside border color top line
            color: '#8a909e',
          },
          emphasis: {
            //background color in side
            color: '#c8ccd7',
          },
        },
        lineStyle: {
          normal: {
            opacity: 0,
          },
        },
        areaStyle: {
          normal: {
            color: '#c8ccd7',
          },
        },
        data: [],
      }, {
        name: 'base',
        type: 'line',
        z: 0,
        showSymbol: false,
        symbolSize: 0,
        animationDuration: 100,
        lineStyle: {
          normal: {
            color: '#cdcdcd',
            width: '2',
            opacity: 1,
          },
        },
        data: [],
      }];
    }
    this.$nextTick(() => {
      let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
      // The maximum width of the history Chart should be less than
      // the width of iPhone 6+
      width = width > 414 ? 414 : width;
      width *= 0.986;
      $('.chart-content .echarts.line').css('width', `${width}px`);
    });
  },
};
</script>
<style lang="scss" scoped>
.sfc .predict {
  .chart-content {
    background-color: #f7f7f6;
    border-radius:4px;
  }
}
.predict {
  .chart-content {
    margin-top: 14px;
    text-align: center;
    background-color: rgba(241, 244, 251, 0.80);
    position: relative;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 10px;
    padding-bottom: 15px;
    .echarts {
      &.line {
        width: 98.6%;
        margin: 0 auto;
        height: 240px;
      }
    }
  }
  .caption {
    // font-family:NotoSansCJKsc-Regular;
    font-size:12px;
    color:#333333;
    line-height: 1.2;
    letter-spacing:-0.2px;
    text-align:center;
  }
}
</style>
