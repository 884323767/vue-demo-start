<template>
  <div class="round-assist-center pie">
    <div class="inner">
      <div class="left-data" v-show="riskRatio > 0">
        <span class="vStock">{{riskRatio}}%</span>
        <h2>{{$t('roundAssistCenter.shares')}}</h2>
      </div>
      <div class="divide" v-show="riskRatio > 0 && riskRatio < 100"></div>
      <div class="right-data" v-show="riskRatio < 100 && riskRatio !== 0">
        <span class="vBond">{{100 - riskRatio}}%</span>
        <h2>{{$t('roundAssistCenter.bonds')}}</h2>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    riskRatio: {
      type: Number,
    },
  },
}
</script>
<style lang="scss" scoped>
.round-assist-center {
  color: #666;
  .inner {
    width: 81px;
    height: 80px;
    position: relative;
    left: 1px;
  }
  position: absolute;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  .left-data,
  .right-data {
    top: 25px;
    width: 40px;
    height: 50px;
    font-size: 12px;
    line-height: 1.2;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    position: relative;
  }
  .left-data {
    float: left
  }
  .right-data {
    float: right;
  }
  .divide {
    position: relative;
    float: left;
    top: 23px;
    z-index: 0;
    display: inline-block;
    height: 33px;
    width: 1px;
    background: #666;
  }
}
</style>
