<template>
  <div class="accordion-item reason-item">
    <div class="reason-container accordion-item-toggle" @click="toggleReason">
      <div class="reason">{{$t('recommendationReason.reason')}}</div>
      <div class="reason-icon" :class="{ 'reason-icon-active': reasonShow }"></div>
    </div>
    <div class="reason-detail accordion-item-content">{{reasonDetail}}</div>
  </div>
</template>

<script>
export default {
  props: {
    reasonDetail: {
      type: String,
    },
  },
  data() {
    return {
      reasonShow: false,
    };
  },
  methods: {
    toggleReason() {
      this.reasonShow = !this.reasonShow;
    },
    openReason() {
      console.log('opened');
      this.reasonShow = true;
      // Open Accordion, please add custom CSS selector
      this.$f7.accordionOpen('.reason-item');
    },
  },
};
</script>

<style lang="scss">
.reason-item {
  padding-right: 0px;
  padding-left: 0px;
  border-bottom: 1px solid #f0f0f0;
  .reason-container {
    display: flex;
    justify-content: space-between;
    // height: 44px;
    line-height: 44px;
    margin: 0 20px;
    align-items: center;
    .reason {
      font-size: 18px;
      color: #000000;
    }
    .reason-icon {
      height: 24px;
      width: 24px;
      background: url(../../assets/reason-icon.png) no-repeat center;
      background-size: contain;
    }

    .reason-icon-active {
      transform: rotate(180deg);
    }
  }

  .reason-detail {
    margin: 0 20px;
    bottom: 10px;
    color: #787878;
    letter-spacing: -0.58px;
    line-height: 23px;
    text-align: left;
    font-size: 11px;
  }
}
</style>
