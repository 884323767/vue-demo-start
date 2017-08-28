<template>
  <div class="portfolio-chart">
    <div class="top">{{$t('portfolio.title')}}</div>
    <VueECharts class="bar" :options="barData" :initOptions="barInitData"></VueECharts>
  </div>
</template>

<script>
import VueECharts from 'vue-echarts';

let beforeT = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#ffe5ab"></span>';
let afterT = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#feb834"></span>';
export default {
  components: {
    VueECharts,
  },
  data() {
    return {
      barInitData: {
        height: '240px',
      },
      barData: {}
    };
  },
  methods: {
    updateData(xAxisData, ...seriesData) {
      this.barData.xAxis.data = xAxisData;
      this.barData.series[0].data = seriesData[0];
      this.barData.series[1].data = seriesData[1];
    },
  },
  mounted() {
    const _this = this;
    this.barData = {
        tooltip: {
          trigger: 'axis',
          // formatter: `{b0}<br>$t(portfolio.{b0}_name)<br>${beforeT}{a0} : {c0}%<br>${afterT}{a1} : {c1}%`,
          formatter(params) {
            let html = _this.$t(`portfolio.${params[0].name}_name`);
            let etfId = params[0].name.replace("_10_"," 0");
            html += "<br>";
            if(params[0]){
              html += `${etfId}<br>${beforeT}${params[0].seriesName} : ${params[0].value}%<br>`
            }
            if(params[1]){
              html += `${afterT}${params[1].seriesName} : ${params[1].value}%`
            }
            return html;
         },
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: [{
            name: _this.$t('portfolioChart.holding'),
            icon: 'circle',
          }, {
            // name: '调整后持仓',
            name:  _this.$t('portfolioChart.holding_after'),
            icon: 'circle',
          }],
          padding: [10, 0, 0, 0],
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            fontSize: 10,
          },
          right: 0,
        },
        grid: {
          left: '0%',
          right: '0%',
          bottom: '0%',
          top: '15%',
          containLabel: true,
        },
        color: ['#ffe5ab', '#feb834'],
        xAxis: {
          type: 'category',
          data: [],
          nameRotate: 30,
          axisLabel: {
            show: false,
            formatter: 'xx',
            textStyle: {
              color: '#858585',
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          // name: '百分比（%）',
          name: '         '+_this.$t('portfolioChart.percent'),
          nameRotate: 0,
          nameTextStyle: {
            color: '#858585',
          },
          axisLabel: {
            textStyle: {
              color: '#858585',
            },
          },
          axisLine: {
            lineStyle: {
              color: '#d8d8d8',
            },
          },
          splitLine: {
            lineStyle: {
              color: '#f8f8f8',
            },
          },
        },
        series: [{
          // name: '当前持仓',
          name: _this.$t('portfolioChart.holding'),
          type: 'bar',
          barWidth: 6,
          itemStyle: {
            normal: {
              barBorderRadius: 20,
            },
          },
          data: [],
          animationDelay(idx) {
            return idx * 150;
          },
        }, {
          // name: '调整后持仓',
          name: _this.$t('portfolioChart.holding_after'),
          type: 'bar',
          barWidth: 6,
          itemStyle: {
            normal: {
              barBorderRadius: 20,
            },
          },
          data: [],
          animationDelay(idx) {
            return (idx * 150) + 100;
          },
        }],
        animationEasing: 'elasticOut',
      }
    if(this.$store.state.isSFC){
      this.barData.color[0]="#c7c5c1";
      this.barData.color[1]="#f47137";
      beforeT = beforeT.replace('#ffe5ab', '#c7c5c1');
      afterT = afterT.replace('#feb834', '#f47137');
    }
  }
};
</script>

<style lang="scss">
.portfolio-chart {
  .top {
    padding-top: 19px;
    padding-bottom: 13px;
    border-top: none;
    border-bottom: none;
    font-size: 18px;
    color: #313131;
    letter-spacing: -0.29px;

    text-align: center;
  }
  .before-trading-prompt {
    margin-bottom: 17px;
    font-size: 10px;
    line-height: 1.5;
    color: #898989;
    letter-spacing: -0.34px;
    text-align: center;
    span {
      font-weight: bold;
    }
  }
}
</style>
