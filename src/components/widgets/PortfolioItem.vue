<template>
  <div
    :class="{'show-border': itemName === 'name', 'shorter': itemName === 'data'}"
    class="PortfolioItem">
    <div :class="{'accordion-position': itemName === 'name'}">
      <div class="flex-box">
        <div class="icon-color"
             :style="'width:12px;background-color:'+item.color+';'"
             :class="{'bg-center': isGeneral === true}"
             v-if="itemName === 'name'"></div>

        <div class="left" :class="{'center': isGeneral === true}">
          <div class="data-guodu" v-if="itemName === 'data'">{{item.data}}</div>
          <div class="item-title" v-if="itemName === 'name'">
            {{item.name}}
          </div>
          <div class="detail-box" v-if="isGeneral === false">
            <span class="area"></span><span class="id">{{item.id}}</span>
          </div>
        </div>

        <div class="right" :class="{'center': itemName === 'data'}">
          <div class="graph-percentage" v-if="itemName === 'name'">{{item.percentage}}</div>
          <div v-if="itemName === 'name'" class="item-value">{{item.value | formatMoney(region, true)}}</div>
          <div v-if="itemName === 'data'" class="amount">{{item.money | formatMoney(region, true)}}</div>
        </div>

        <div class="detail-image" v-if="display === true"></div>
      </div>
    </div>


    <div class="accordion-item-content item-description-box" v-if="display === true">
      <p class="item-description" v-if="$store.state.isSFC" @click="goETFDetail(item.url)">{{ item.desc }}</p>
      <p class="item-description" v-if="!$store.state.isSFC">{{ item.desc }}</p>
    </div>

    <div v-if="display === false">
      <div class="display-box">
        <p class="item-description">{{ item.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import service from '../../service';

export default {
  mixins: [service],
  props: {
    item: {
      type: Object,
    },
    region: {
      type: String,
    },
    display: {
      type: Boolean,
      default: true,
    },
    itemName: {
      type: String,
      default: 'name',
    },
    isGeneral: {
      type: Boolean,
      default: false,
    },
    currentPage: {
      type: String,
    },
  },
  data() {
    return {
      convoy: false,
    };
  },
  methods: {
    goETFDetail(url) {
      window.open(url);
    }
  },
  mounted() {
    this.convoy = this.$store.userClient;
    // this.convoy = this.isConvoy();
  },
};
</script>

<style lang="scss">
@import "../../sass/variables";
.shorter {
  height: 45px;
}
.PortfolioItem {
  .show-border {
    border-bottom: 1px solid #f0f0f0;
    padding-top: $item-top;
  }
  // padding-bottom: $item-top - $description-top - $description-bottom;
  padding-bottom: 0;

  color: black;

  .flex-box {
    display: flex;
    flex-direction: row;

    justify-content: flex-end;

    // https://stackoverflow.com/questions/23621650

    .left {
      margin-right: auto;
      width: 100%;
    }

    .center {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .bg-center {
      margin-top: 8px;
    }
  }

  .accordion-position {
    padding-left: 21px;
    padding-right: $iuid-right;
  }

  .detail-image {
    $width: 3px;
    $height: 12px;

    background-image: url(../../assets/detail.svg);
    background-size: $width $height;
    background-repeat: no-repeat;

    margin-top: $height / 2 + 1px;
    margin-left: 10px;
    width: $width;

  }

  .item-title {
    // font-family: PingFangSC-Regular;
    font-size:14px;
    line-height: 16px;
    color:#313131;
    letter-spacing:0;
    text-align:left;
  }

  .data-guodu {
    font-size:14px;
    letter-spacing:-0.58px;
    text-align:left;
    line-height: 1.5;
    color:#000000;
    letter-spacing:0;
  }

  .item-value {
    // font-family:Roboto-Regular;
    font-size:12px;
    line-height: 14px;
    color:#313131;
    letter-spacing:0;
    text-align:right;
  }

  .icon-color {
    height: 12px;
    margin-top: 2px;
    margin-right: 4px;
    min-width: 12px;
  }

  .graph-percentage {
    text-align: right;
    width: 100px;
    line-height: 16px;
    font-size: 14px;
    color: #7c7c7c;
  }

  .underlying-amount {
    line-height: 24px;
    text-align: left;
    color: #313131;
    font-size: 12px;
  }

  .content-block {
    padding: 0 18px;
    line-height: 1.5;
  }

  .item-content {
    height: inherit;
  }

  .item-description-box {
    margin-top: $description-top;
    .accordion-item-expanded & {
      margin-bottom: $description-bottom;
    }
    padding-left: 37px;
    padding-right: 21px;
  }

  .display-box {
    @extend .item-description-box;

    margin-bottom: $description-bottom;
  }

  .item-description {
    opacity:0.7;
    // font-family: PingFangSC-Regular;
    font-size:10px;
    color:#3e454d;
    letter-spacing:0;
    line-height:15px;
    text-align:left;
  }

  .detail-box {
    font-size: 12px;
    display: inline-block;
    transform: scale(0.75);
    margin-left: -5px;
    .area {
      // font-family: PingFangSC-Regular;
      // font-size: $smallText;
      // background: $orange;
      // color:#ffffff;
      // letter-spacing:-0.18px;
      background: url(../../assets/hk.svg) center no-repeat;
      background-size: contain;
      height: 18*0.6px;
      width: 30*0.6px;
      display: inline-block;
      vertical-align: top;
    }

    .id {
      // font-family: PingFangSC-Regular;
      color:#313131;
      letter-spacing:-0.18px;
      margin-left: 3px;
    }
  }

  .amount {
    font-size:18px;
    color:#787878;
    letter-spacing:-0.43px;
    text-align:right;
    width: 100%;
  }
}
</style>
