<template>
  <div class="pie-chart">
    <div id="charts" class="firstEchart">
      <div id="main" :style="mainStyle"></div>
      <div class="round-assist-center bc" v-show="!needRebalance">
        <div class="left-data" v-show="risk">
          <em class="vStock">{{risk}}%</em>
          <h2>{{$t('pieChart.shares')}}</h2>
        </div>
        <div class="divide" v-show="risk && (100 - risk)"></div>
        <div class="right-data" v-show="100 - risk">
          <em class="vBond">{{100 - risk}}%</em>
          <h2>{{$t('pieChart.bonds')}}</h2>
        </div>
      </div>
      <div class="round-assist-center bc" v-show="needRebalance">
        <div class="btn-need-rebalance">{{$t('pieChart.rebalance')}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts"
// var STOCK = ['#ffe5b2', '#ffdd95', '#fad27d', '#fcbe76', '#f9b267', '#f8a059', '#f58649', '#f46a3f', '#f05728', '#e54d1f', '#d6410d', '#be3e05', '#a43300'];
export default {
  props: {
    width: {
      type: String,
      default: "280px"
    },
    height: {
      type: String,
      default: "280px"
    },
    chartData: {
      type: Array,
      default () {
        return []
      }
    },
    index: {
      type: Number,
      default: 0
    },
    risk: {
      type: Number,
      default: 80
    },
    needRebalance: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      mainStyle: {
        width: this.width,
        height: this.height
      },
    }
  },
  watch: {
    chartData: function(val) {
      let all_charts = document.querySelectorAll('#main');
      let myChart = echarts.init(all_charts[all_charts.length - 1]);
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: "{b}<br/><p style='text-align: center;color: #2881ef;font-size: 16px'>{d}%</p>",
          backgroundColor: 'rgba(255,2552,255,0.9)',
          borderColor: '#b6ccdc',
          textStyle: {
            color: '#303030'
          },
          extraCssText: 'box-shadow: 0 0 5px #b6ccdc'
        },
        series: [{
          name: '投资类型',
          type: 'pie',
          radius: ['65%', '85%'],
          label: {
            normal: {
              show: false
            }
          },
          selectedMode: 'multiple',
          data: val
        }]
      });
    }
  },
  mounted() {
    let all_charts = document.querySelectorAll('#main');
    echarts.init(all_charts[all_charts.length - 1]);
    this.$el.style.height = this.height;
    this.$el.style.width = this.width;
  }
}
</script>
<style lang="scss" scoped>
.pie-chart {
  float: left;
  #charts {
    display: flex;
    justify-content: center;
    position: relative;
    float: left;
    margin-left: 10px;
  }
  .round-assist-center {
    position: absolute;
    top: 30%;
    left: 25%;
    width: 50%;
    height: 40%;
    border-radius: 50%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .round-assist-center .left-data,
  .round-assist-center .right-data {
    width: 50px;
    height: 50px;
    font-size: 14px;
    line-height: 2rem;
    float: left;
    text-align: center;
    cursor: pointer;
  }
  .divide {
    position: relative;
    float: left;
    top: 22px;
    z-index: 0;
    display: inline-block;
    height: 35px;
    width: 1px;
    background: #666;
  }
  .btn-need-rebalance {
    font-size: 14px;
  }
}
</style>
