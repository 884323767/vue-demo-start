<template>
  <div class="portfolio_item_main">
    <f7-block-title :class="titleClass" v-show="display">{{itemTitle}}</f7-block-title>
    <div class="title-box" v-if="secondItem === false && convoy === false">
      <div class="title left">
        {{title}}
      </div>
      <div class="title">
        {{secondTitle}}
      </div>
    </div>
    <div class="divide-box" v-if="$store.state.isSFC"></div>

    <ul class="accordion-list" :class="{'convoy':convoy}">
      <li class="accordion-item"
        v-for="item in itemData"
        v-if="display">
        <a href="#" class="item-content item-link">
          <PortfolioItem
            :item="item"
            :region="itemData.region"
            :isGeneral="isGeneral"
            :currentPage="currentPage" />
        </a>
      </li>

      <li class="accordion-item" v-for="item in itemData" v-if="display === false">
        <PortfolioItem
          :item="item"
          :region="itemData.region"
          :display="display"
          :isGeneral="isGeneral"
          :currentPage="currentPage" />
      </li>
    </ul>
  </div>
</template>

<script>
import PortfolioItem from './PortfolioItem';
import service from '../../service';

export default {
  mixins: [service],
  props: {
    itemTitle: {
      type: String,
      required: true,
    },
    itemData: {
      type: Array,
      required: true,
    },
    display: {
      type: Boolean,
    },
    titleClass: {
      type: String,
      default: 'stock',
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
  },
  data() {
    return {
      secondItem: false,
      convoy: false,
      title: '',
      secondTitle: '',
    };
  },
  mounted() {
    let secondItem;
    if (this.currentPage === 'portfolioOpinion' && this.titleClass === 'bond') {
      secondItem = true;
    } else {
      secondItem = false;
    }
    this.secondItem = secondItem;
    switch (this.currentPage) {
      case 'portfolioOpinion':
      case 'overview':
        this.title = this.$t('portfolioContainer.nameAndCode');
        this.secondTitle = this.$t('portfolioContainer.amount');
        break;
      case 'summary':
        if(this.$store.getters.isSFC){
          this.title = this.$t('portfolioContainer.nameAndCode');
        } else {
          this.title = this.$t('portfolioContainer.classification');
        }
        this.secondTitle = this.$t('portfolioContainer.tradingAmount');
        break;
      default:
        console.error('currentPage is not in range');
    }


    this.convoy = false;
    // this.convoy = this.checkUserClient();
  },
};
</script>

<style lang="scss">
@import "../../sass/variables";
.portfolio_item_main {
  color:$gray;
  left: 38px;

  .title-box {
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    margin-right: $iuid-right + 13px;
    padding-top: 3px;
    padding: 10px 0;
    color: $black;

    .left {
      margin-right: auto;
      margin-left: $iuid-left - 2px;
    }
  }


  li {
    background: $white;
    margin-top: 1px;
    // padding-right: 15px;
    padding-left: 4px;
    .f_r, .f_l {
      height: 60px;
      line-height: 60px;
    }
    .right_text {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      .money {
        font-size: 18px;
      }
    }
    .right_arrow {
      vertical-align: text-top;
    }
  }

  .stock {
    background-color: $yellow;
  }

  .bond {
    text-align: center;
    background-color: $white-blue;
  }

  .convoy {
    .accordion-item:first-child {
      padding-top: 7px;
    }
  }
}
</style>
