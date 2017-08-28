<template>
  <div class="summary-header"
       :class="{'no-margin-left': currentPage === 'history'}">
    <div v-if="currentPage !== 'summary'">
      <div class="item" v-if="!$store.state.isSFC || ($store.state.isSFC && $store.state.isMocked)">
        <div class="item-title">{{$t('summaryHeader.totalValue')}}</div>
        <div class="item-detail" :class="{small: accData.total_value > 100000, xsmall: accData.total_value > 1000000}">{{accData.total_value | formatMoney(accData.region)}}</div>
      </div>
      <div class="item" v-if="$store.state.isSFC && !$store.state.isMocked" :class="{really: $store.state.currentPage !== 'difference'}">
        <div class="item-title">{{$t('summary.notInvestment')}}</div>
        <div class="item-detail" :class="{small: accData.total_value > 100000, xsmall: accData.total_value > 1000000}">{{accData.total_value | formatMoney(accData.region)}}</div>
      </div>
      <div class="item" v-if="client === 'guodu' && showCash === true">
        <div class="item-title">{{$t('summaryHeader.cash')}}</div>
        <div class="item-detail">{{cash | formatMoney(accData.region)}}</div>
      </div>
      <div class="item" v-if="shown">
        <div class="item-title">{{$t('summaryHeader.totalReturn')}}</div>
        <div class="item-detail">{{accData.total_return | formatMoney(accData.region)}}</div>
      </div>

      <div class="item" v-if="shown">
        <div class="item-title">{{$t('summaryHeader.returnRate')}}</div>
        <div class="item-detail">{{accData.return_rate || 0}}%</div>
      </div>
    </div>

    <div class="chart-annotation" v-if="currentPage === 'summary'">
      <div class="risk-type" :class="{hidden: riskType == 0}">{{$t('result.risktype_' + riskType)}}</div>
      <div class="annual-return">
        <div class="right">{{earnRatio}}%</div>
        <div class="left">{{earnRatioMessage}}</div>
      </div>
    </div>

  </div>
</template>
<script>
import service from '../../service';

export default {
  mixins: [service],
  props: {
    accData: {
      type: Object,
    },
    showCash: {
      type: Boolean,
      default: false,
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
  data() {
    return {
      account: {
        region: 'HK',
      },
      client: '',
      // cash: 0,
      earnRatioMessage: this.$t('summaryHeader.earnRatio'),
    };
  },
  computed: {
    shown() {
      // SFC only
      if (this.$store.state.isSFC === true) {
        // Not enough money
        if (this.accData.status === 30) {
          return false;
        }
      }
      return true;
    },
    cash() {
      return this.$store.state.cashGuodu;
    },
    // accData() {
    //   return this.$store.state.accData;
    // },
    isSFC() {
      return this.$store.state.isSFC;
    },
  },
  watch: {
    // accData(val) {
    //   this.account = val;
    // },
  },
  mounted() {
    // this.cash = this.$store.state.cash;
    // this.$root.eventHub.$on('cashChange', (data)=>{
    //   this.cash = data;
    // });
    // this.cash = sessionStorage.getItem('cash');
    this.client = this.checkUserClient();

    if (this.$store.getters.isSFC) {
      this.earnRatioMessage = this.$t('summaryHeader.earnRatioSpecial');
    }
  },
  beforeDestroy() {
    this.$root.eventHub.$off('cashChange');
  },
};
</script>
<style lang="scss" scoped>
.summary-header {
  // display: inline-block;
  height: 100%;
  @media screen and (min-width: 375px) {
    margin-left: 45px;
    margin-right: 30px;
  }

  .item {
    margin-top: 11px;
    margin-bottom: 11px;
    &.really {
      margin-top: 54px;
    }
  }

  .item-title {
    // font-family: PingFangSC-Regular;
    font-size:12px;
    color:#5d5d5d;
    letter-spacing:-0.29px;
    text-align:left;
    margin-bottom: 3px;
  }
  .item-detail {
    // // font-family: NotoSansCJKsc-DemiLight;
    font-size:20px;
    color:#000000;
    line-height: 1.2;
    letter-spacing:-0.58px;
    text-align:left;
  }
  @media screen and (max-width: 320px) {
    .small {
      font-size: 18px;
    }
    .xsmall {
      font-size: 16px;
    }
  }

  .chart-annotation {
    text-align: left;
    // margin-left: 35px;
    // float: left;
    .risk-type {
      font-size: 24px;
      color: #313131;

      margin-top: 17px;
      margin-bottom: 26px;
      &.hidden {
        visibility: hidden;
      }
    }
    .annual-return {
      margin-top: -14px;

      .left {
        font-size: 12px;
        color: #6d6d6d;
        margin: 5px 0;
      }
      .right {
        margin-top: 30px;
        font-size: 36px;
        color: #313131;
        margin-bottom: 12px;
      }
    }
  }
}
</style>
