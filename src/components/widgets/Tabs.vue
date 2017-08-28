<template>
  <div class="tabs-container">
    <div class="tabs" v-if="selectedNav !== 0 ">
    <div class="tab_link" :class="{activ_color:selectedNav == 1}">
      <a @click="goToPage('overview')" data-view="overview">
        <div class="logo-acc tab_logo" :class="{active:selectedNav == 1}"></div>
        <div class="tab_link_text " :class="{active:selectedNav == 1}">{{firstTab}}</div>
      </a>
    </div>
    <div class="tab_link" :class="{activ_color:selectedNav == 2}">
      <a @click="goToPage('history')" data-view="history">
        <div class="logo-history tab_logo" :class="{active:selectedNav == 2}"></div>
        <div class="tab_link_text" :class="{active:selectedNav == 2}">{{$t('tabs.history')}}</div>
      </a>
    </div>
    <div class="tab_link" :class="{activ_color:selectedNav == 3}">
      <a @click="goToPage('result')" data-view="result">
        <div class="logo-pref tab_logo" :class="{active:selectedNav == 3}"></div>
        <div class="tab_link_text" :class="{active:selectedNav == 3}">{{$t('tabs.result')}}</div>
      </a>
    </div>
    <div class="tab_link" :class="{activ_color:selectedNav == 4}">
      <a @click="goToPage('trade')" data-view="trade">
        <div class="logo-records tab_logo" :class="{active:selectedNav == 4}"></div>
        <div class="tab_link_text" :class="{active:selectedNav == 4}">{{$t('tabs.trade')}}</div>
      </a>
    </div>
  </div>
    <div v-if="selectedNav === 0">
      <!-- Do something -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstTab: this.$t('tabs.overview'),
    };
  },
  computed: {
    selectedNav() {
      return this.$store.getters.selectedNav;
    },
    isSFC() {
      return this.$store.getters.isSFC;
    },
  },
  methods: {
    goToPage(targetPage) {
      this.$root.eventHub.$emit('scrollable', true);

      //      let targetPage = url;
      const accStatus = +sessionStorage.getItem('accStatus');
      const tradeCounter = +sessionStorage.getItem('tradeCounter');

      // accStatus 25: INV_CONFIRM 国度确认用户生成投资意见
      // accStatus 27: PLANNER_CONFIRM 后台确认用户生成投资意见
      // accStatus 20: DriftOverflow 需要调仓（因为调整风险类型）

      // tradeCounter: 用户下单次数
      // totalValue: 用户金钱
      if (targetPage === 'overview') {
        // Always navigate to statement if statement is shown but not signed
        const statementIsShown = sessionStorage.getItem('statementIsShown');
        const statementIsConfirmed = sessionStorage.getItem('statementIsConfirmed');
        const previousUrl = sessionStorage.getItem('previousUrl');
        // if (statementIsShown === 'true' && statementIsConfirmed === 'false' && previousUrl !== 'login') {
          // targetPage = 'statement';
        // }
        // Navigate to Portfolio Opinion when the user is waiting
        // Portfolio Opinion

        if (accStatus === 25 || accStatus === 27) {
          targetPage = 'portfolio_opinion';
        } else if (tradeCounter === 0) {
          // If No trade record
          // 需要调仓
          if (accStatus === 20) {
            targetPage = 'summary';
          } else if (accStatus === 0 && this.totalValue === 0) {
            targetPage = 'summary';
          }
        }
      }

      if (targetPage !== 'statement') {
        const menuItems = [{
          name: 'setting',
          disable: true,
        }, {
          name: 'back',
          disable: false,
        }];
        this.$root.eventHub.$emit('hideMenuItem', menuItems);
      }
      // this.$f7.router.load(this.$f7.views[0], {
      //   url: targetPage,
      // });
      this.$store.dispatch('navigateToPage', { page: targetPage });
    },
  },
  mounted() {
    if (this.isSFC === true) {
      this.firstTab = this.$t('tabs.currentStatus');
    }
  },
};
</script>

<style lang="scss">
.tabs {
  z-index: 9999;
  width: 100%;
  box-sizing: border-box;
  background-color: rgba(247, 247, 247, 1);
  height: 49px;
  border-top: 1px solid #bababa;
  position: fixed;
  bottom: 0;
  box-shadow: 0px -2px 5px 0px rgba(223, 223, 223, 0.49);
  .tab_link {
    height: 50px;
    line-height: 50px;
    float: left;
    width: 25%;
    box-sizing: border-box;
    text-align: center;
    a {
      display: block;
      color: rgba(127, 125, 125, 0.92);
      width: 100%;
      height: 100%;
    }
    &.activ_color > a {
      color: #fff;
    }
  }
}
</style>
