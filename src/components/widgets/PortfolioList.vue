<template>
  <div class="portfolio_main" :class="{'opinion-page': opinion}">
  <div class="top" v-if="!$store.state.isSFC">{{title}}</div>
    <PortfolioItemContainer
      :display="display"
      :itemData="stockData"
      :itemTitle="stockTitle"
      :titleClass="'stock'"
      :currentPage="currentPage"
      :isGeneral="isGeneral" />
    <div class="divide-box" v-if="$store.state.isSFC"></div>
    <PortfolioItemContainer
      :display="display"
      :itemData="bondData"
      :itemTitle="bondTitle"
      :titleClass="'bond'"
      :currentPage="currentPage"
      :isGeneral="isGeneral" />
  </div>
</template>
<script>
import PortfolioItem from './PortfolioItem';
import PortfolioItemContainer from './PortfolioItemContainer';
import service from '../../service';

export default {
  mixins: [service],
  props: {
    title: {
      type: String,
    },
    stockData: {
      type: Array,
    },
    bondData: {
      type: Array,
    },
    accData: {
      type: Object,
    },
    display: {
      type: Boolean,
      default: true,
    },
    opinion: {
      type: Boolean,
      default: false,
    },
    currentPage: {
      type: String,
    },
    isGeneral: {
      type: Boolean,
    },
  },
  components: {
    PortfolioItem,
    PortfolioItemContainer,
  },
  data() {
    return {
      stockTitle: this.$t('portfolioList.stock'),
      bondTitle: this.$t('portfolioList.bonds'),
    };
  },
  mounted() {
    const userClient = this.$store.getters.userClient;
    const isSFC = this.$store.getters.isSFC;
    if (userClient === 'guodu' || isSFC === true) {
      this.stockTitle = this.$t('portfolioList.stockETF');
      this.bondTitle = this.$t('portfolioList.bondsETF');
    }
    if(isSFC) {
      this.stockTitle = this.$t('portfolioList.sfcStockETF');
      this.bondTitle = this.$t('portfolioList.sfcBondsETF');
    }
  },
};
</script>
<style lang="scss">
@import "../../sass/variables";


.sfc.convoy .portfolio_main {
  .stock,
  .bond {
    margin: 0 22px;
    text-align: left;
    font-size: 18px;
    color: #414141;
    font-weight: bold;
    background-color: #fff;
    padding-top: 20px;
  }
  .title-box {
    font-size: 10px;
    color: #9d9d9d;
  } // .bond {
  // }
  .divide-box {}
  .accordion-list {
    margin-top: 10px;
  }
}



.portfolio_main {
  .top {
    background-color: #fff;
    text-align: center;
    font-size: 18px;
    padding: 10px 0;
    color: ＄black;
  }

  // .stock {
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  //   .percent {
  //     flex: 1;
  //   }
  //   .money {
  //     text-align: right;
  //     flex: 1;
  //   }
  // }

  // .bonds {
  //   margin: 0;
  // }

  // .graph-percentage {
  // 	color:$gray;
  // 	margin-left: -8px;
  // }
  // .underlying-amount {
  // 	text-align: center;
  // 	color:$gray;
  // }
  .item-inner {
  	font-size: 14px;
  	&:after {
  		background-color: $white;
  	}
  }
  .item-text {
  	text-align: right;
  }
  ul:before, ul:after {
  	height: 0;
  }
  .content-block-title {
  	margin: 0;
  	background-color: $white;
  	padding: 9px 0;
  	text-align: center;
  	font-size: 14px;
  	color: $black;
  	display: block;
  }

  .list-block {
  	min-height: 46px;
  	min-height: 46px;
  	font-size: 14px;
  	color: $black;
  }

  .item-link {
    // background: #6cf;
  }
}

</style>
