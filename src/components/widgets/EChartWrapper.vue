<template>
  <div class="echart-wrapper">
    <div class="echart-wrapper-left"
         :class="{'large': currentPage !== 'summary'}" >
      <VueECharts class="pie" :options="options" :initOptions="pieInitData"></VueECharts>
      <roundAssistCenter :riskRatio="riskRatio" ></roundAssistCenter>
    </div>
    <summary-header
      :accData="accData"
      :showCash="showCash"
      :earnRatio="earnRatio"
      :riskType="riskType"
      :currentPage="currentPage" v-if="!$store.state.isSFC"/>
  </div>
</template>

<script>
import VueECharts from 'vue-echarts';

import roundAssistCenter from './RoundAssistCenter';
import summaryHeader from './SummaryHeader';

export default {
  props: {
    options: {
      type: Object,
    },
    pieInitData: {
      type: Object,
    },
    riskRatio: {
      type: Number,
    },
    accData: {
      type: Object,
    },
    showCash: {
      type: Boolean,
    },
    riskType: {
      type: Number,
    },
    earnRatio: {
      type: Number,
    },
    currentPage: {
      type: String,
    },
  },
  components: {
    summaryHeader,
    VueECharts,
    roundAssistCenter,
  },
};
</script>

<style lang="scss">

.echart-wrapper {
  display: flex;
  height: auto;
  .echart-wrapper-left {
    .pie {
      float: left;
      height: 150px;
      width: 150px;
    }
    margin-top: 10px;
    margin-bottom: 20px;
    margin-left: 10px;
    .large {
      @media screen and (min-width: 375px) {
        transform: scale(1.1);
        .pie {
          margin-left: 30px;
        }
      }

      @media screen and (min-width: 414px) {
        transform: scale(1.2);
        .pie {
          margin-left: 60px;
        }
      }
    }
  }
}
</style>
