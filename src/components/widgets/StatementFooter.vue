<template>
  <div class="Statement-footer" :class="{'convoy': isConvoy === true}">
    <!-- <div class="message-cash" @click="goFaq" v-if="isConvoy === false">Todo</div> -->
    <div class="message-cash" v-if="isConvoy === true">
      <p class="cash">{{$t('statementFooter.cash')}}</p>
    </div>
    <!-- Actions -->
    <div class="note" v-if="isConvoy === true">{{$t('statementFooter.statementConvoy')}}</div>
    <div class="note" v-if="isConvoy === false">
      <div v-if="situation === 'portfolioOpinion'">
        {{$t('statementFooter.statement')}}：<br />
        {{$t('statementFooter.statement1')}}
      </div>

      <div v-if="situation === 'code' || situation === 'summary'">
        {{$t('statementFooter.statement')}}：<br />
        {{$t('statementFooter.statement2')}}
      </div>

      <div v-if="situation === 'overview'">
        {{$t('statementFooter.statement')}}：<br />
        {{$t('statementFooter.statement1')}}<br />
        {{$t('statementFooter.nextDay')}}
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    isConvoy: {
      type: Boolean,
    },
    situation: {
      type: String,
      default: 'code',
    },
  },
  methods: {
    goFaq() {
      location.href = 'http://www.guodu.com.hk/fintech/Faq.html';
    },
  },
};
</script>

<style lang="scss">
.convoy .Statement-footer{
  .message-cash {
    margin-top: 19px;
    margin-left: 20px;
    .cash {
      font-size: 12px;
      color: #919191;
      padding-bottom: 1px;
      border-bottom: none;
      letter-spacing: 0;
      width: 24px;
    }
  }
}
.Statement-footer {
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  $totalMarginLeft: 37px;
  $cashSize: 24px;

  .message-cash {
    margin-top: 19px;
    margin-left: 20px;
    .cash {
      font-size: 12px;
      color: #4a90e2;
      padding-bottom: 1px;
      border-bottom: 1px solid #4a90e2;
      letter-spacing: 0;
      width: 24px;
    }
  }

  .note {
    margin-left: $totalMarginLeft - 7px;
    .convoy & {
      margin-left: 7px;
    }
    padding-bottom: 20px;
    font-size: 12px;
    line-height: 1.5;
    color: #919191;
    text-align: left;
    padding-top: 16px;
    padding-right: 20px;
  }
}
</style>
