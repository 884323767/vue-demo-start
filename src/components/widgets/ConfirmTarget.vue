<template id="modal-template">
  <div class="vmodal" v-show="showModal">
    <transition name="fade" mode="out-in">
      <div class="vmodal-wrapper">
        <div v-if="special === false">
          <div class="vmodal-container" v-if="type == 1">
            <content select=".modal-header">
              <div class="vmodal-header" v-if="!isGuest && isConvoy">
                {{$t("confirmTarget.header")}}
              </div>
              <div class="vmodal-header" v-if="!isGuest && !isConvoy">
                {{$t("confirmTarget.guoduHeader")}}
              </div>
              <div class="vmodal-header" v-if="isGuest">
                {{$t("confirmTarget.notification")}}
              </div>
            </content>
            <div class="vmodal-body" v-if="!isGuest">
              <div class="message-box">
                <div>{{$t("confirmTarget.totalValue")}}： {{accData.total_value | formatMoney(accData.region)}}</div>
                <div>{{$t("confirmTarget.riskType")}}： {{$t('result.risktype_' + riskType)}}</div>
                <div>{{$t("confirmTarget.date")}}： {{dateNow()}}</div>
              </div>
            </div>
            <div class="vmodal-body guest" v-if="isGuest">
              <div>{{$t("confirmTarget.loginRequired")}}</div>
            </div>
            <div class="vmodal-footer">
              <button @click="cancel" class="btn btn-cancel">{{$t("confirmTarget.cancel")}}</button>
              <button @click="confirm" class="btn btn-confirm" :class="{disabled: confirmDisable}">{{$t("confirmTarget.confirm")}}</button>
            </div>
          </div>
          <div class="vmodal-container type2" v-if="type == 2">
            <content select=".modal-header">
              <div class="vmodal-header">{{$t("confirmTarget.accountConfirmHeader")}}</div>
            </content>
            <div class="vmodal-body">
              <div class="title">{{title}}</div>
              <div class="note" v-if="!isConvoy">{{$t("confirmTarget.contact")}}
                <br>
                <br>
                <a href="">4006-800-288</a> <span>{{$t("confirmTarget.China")}}</span>
                <br>
                <br>
                <a href="">+852-3418-0288</a> <span>{{$t("confirmTarget.HongKongMacau")}}</span>
              </div>
              <div class="note" v-if="isConvoy">{{$t("confirmTarget.contactConvoy")}}</div>
            </div>
            <div class="vmodal-footer">
              <button @click="cancel" class="btn btn-confirm center">{{$t("confirmTarget.confirm")}}</button>
            </div>
          </div>
          <div class="vmodal-container type3" v-if="type == 3">
            <content select="modal-header">
              <div class="vmodal-header">
                {{$t("confirmTarget.notification")}}
              </div>
              <!-- <div class="vmodal-header" v-if="$store.state.isSFC">
                {{$t("confirmTarget.notification")}}
              </div> -->
              <i class="close" @click="close"></i>
            </content>
            <div class="vmodal-body small"  v-if="!$store.state.isSFC">
              {{$t("confirmTarget.cancelRiskModification")}}
            </div>
            <div class="vmodal-body small"  v-if="$store.state.isSFC">
              <!-- {{$t("confirmTarget.confirmQuestion")}} -->
              您的風險問卷已完成<br>風險承受能力： {{$t('result.risktype_' + riskType)}}
            </div>
            <div class="vmodal-footer" v-if="!$store.state.isSFC">
              <button @click="leftClickHandle" class="btn btn-cancel">{{$t("confirmTarget.confirm")}}</button>
              <button @click="rightClickHandle" class="btn btn-confirm" :class="{disabled: confirmDisable}">{{$t("confirmTarget.redoQuestionnaire")}}</button>
            </div>
            <div class="vmodal-footer" v-if="$store.state.isSFC">
              <button @click="rightClickHandle" class="btn btn-cancel">{{$t("confirmTarget.redoQuestionnaire")}}</button>
              <button @click="leftClickHandle" class="btn btn-confirm" :class="{disabled: confirmDisable}">{{$t("confirmTarget.confirm")}}</button>
            </div>
          </div>
        </div>

        <div v-if="special === true">
          <div class="vmodal-container type4">
            <content select="modal-header">
              <div class="vmodal-header" v-if="!titleContent">
                {{warningTitle}}
              </div>
              <div class="vmodal-header" v-if="titleContent">
                {{titleContent}}
              </div>
            </content>
            <div class="vmodal-body" v-if="fixed === false">
              <div v-html="sentence"></div>
            </div>
            <div class="vmodal-body" v-if="fixed === true">
              <p>{{$t("confirmTarget.requestDenied")}}<span class="orange">{{$t("confirmTarget.tradingTime")}}</span>{{$t("confirmTarget.HongKongTradingDays")}}</p>
            </div>
            <div class="vmodal-footer">
              <button @click="cancel" class="btn btn-confirm" :class="{disabled: confirmDisable}">{{this.buttonText}}</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import service from '../../service';

export default {
  mixins: [service],
  props: {
    show: {
      type: Boolean,
      // required: true,
    },
    type: {
      type: Number,
      default: 1,
    },
    riskType: {
      type: Number,
      default: 0
      // required: true,
    },
    accData: {
      type: Object,
      // required: true,
    },
    leftClick: {
      type: Function,
      default: () => {},
        // required: true,
    },
    rightClick: {
      type: Function,
      default: () => {},
        // required: true,
    },
    isGuest: {
      type: Boolean,
      default: false,
    },
    isConvoy: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '可用资金不足',
    },
  },
  data() {
    return {
      showModal: this.show,
      confirmDisable: false,
      sentence: '',
      buttonText: '',
      special: false,
      warningTitle: '通知',
      fixed: false,
      titleContent: false
    };
  },
  methods: {
    gotoQuestion() {
      this.navigateToQuestion();
    },
    showTarget(isChanged = false, sentence, buttonText, fixed = false, titleContent = false) {
      this.$root.eventHub.$emit('scrollable', false);
      this.showModal = true;
      if (isChanged === true) {
        // Change sentence and buttonText
        this.sentence = sentence;
        this.buttonText = buttonText;
        this.special = true;
        this.fixed = fixed;
        this.titleContent = titleContent;
        return;
      }
      this.special = false;
      this.showModal = true;
      // No scroll
    },
    dateNow() {
      let date = new Date().toISOString().slice(0, 10);
      date = `${date.replace('-', '年').replace('-', '月')}日`;
      return date;
    },
    confirm() {
      if (this.isGuest) {
        if (location.host.indexOf('uat') === -1) {
          location.hash = '#!/login';
          location.reload();
        } else {
          location.href = 'http://ats.kuaiex.com/home/link?op=out';
        }
      } else {
        if(this.$store.state.isSFC){
          this.navigate('order');
          this.$root.eventHub.$emit('scrollable', true);
          return;
        }
        this.$root.eventHub.$emit('confirmTarget', true);
      }

      // Enable scroll
      this.$root.eventHub.$emit('scrollable', true);
    },
    cancel() {
      this.$root.eventHub.$emit('cancelTarget', true);
      this.showModal = false;
      this.$root.eventHub.$emit('scrollable', true);
      this.leftClick();
      // Enable scroll
    },
    close() {
      this.$root.eventHub.$emit('cancelTarget', true);
      this.showModal = false;
      this.$root.eventHub.$emit('scrollable', true);
    },
    leftClickHandle() {
      this.$root.eventHub.$emit('scrollable', true);
      this.$root.eventHub.$emit('cancelTarget', true);
      this.leftClick();
    },
    rightClickHandle() {
      this.$root.eventHub.$emit('cancelTarget', true);
      this.$root.eventHub.$emit('scrollable', true);
      this.rightClick();
    },
    target() {
      if (!this.confirmDisable) {
        if (this.isConvoy) {
          this.confirmDisable = true;
          const accid = sessionStorage.getItem('accid');
          if(this.$store.state.isSFC && this.$store.state.accData.trade_counter === 0){
            this.postMockTarget({}, accid).then((res) => {
              // console.log('summary -> statement');
              console.log('statement -> overview');

              // this.navigateToStatement();
              this.navigateToOverview();

              this.$root.eventHub.$emit('showTabs', 1);
              setTimeout(() => {
                this.confirmDisable = false;
              }, 200);
            }).catch((res) => {
              this.confirmDisable = false;
              const err = res.body.errors;
              if (err && err[0] === 'this account does not need rebalancing') {
                this.$f7.router.load(this.$f7.views[0], {
                  url: 'overview',
                });
                this.$root.eventHub.$emit('showTabs', 1);
                return;
              }
              console.error(err);
              util.errHandle(this, 'postTarget wrong! ', err);
            });
          } else {
            this.postTarget({}, accid).then((res) => {
              // console.log('summary -> statement');
              console.log('statement -> overview');

              // this.navigateToStatement();
              this.navigateToOverview();

              this.$root.eventHub.$emit('showTabs', 1);
              setTimeout(() => {
                this.confirmDisable = false;
              }, 200);
            }).catch((res) => {
              this.confirmDisable = false;
              const err = res.body.errors;
              if (err && err[0] === 'this account does not need rebalancing') {
                this.$f7.router.load(this.$f7.views[0], {
                  url: 'overview',
                });
                this.$root.eventHub.$emit('showTabs', 1);
                return;
              }
              console.error(err);
              util.errHandle(this, 'postTarget wrong! ', err);
            });
          }
        } else {
          this.confirmDisable = true;
          const accid = sessionStorage.getItem('accid');
          this.postInvConfirm({}, accid).then((res) => {
            // TODO inverter confirm
            // this.$f7.router.load(this.$f7.views[0], {
            //   url: 'overview',
            // });
            this.navigateToPortfolioOpinion();
            // this.$root.eventHub.$emit('showTabs', 1);
            setTimeout(() => {
              this.confirmDisable = false;
              this.showModal = false;
            }, 200);
          }).catch((res) => {
            this.confirmDisable = false;
            const err = res.body.errors;

            const confirmed = 'target already confirmed by investor';
            if (err && err[0] === confirmed) {
              this.navigateToPortfolioOpinion();
              return;
            }
            this.showModal = false;
            console.error(err);
            window.util.errHandle(this, 'postTarget wrong! ', err);
          });
        }
      }
    },
    init() {
      const self = this;
      this.$root.eventHub.$off('confirmTarget');
      this.$root.eventHub.$on('confirmTarget', () => {
        self.$emit('confirmChange', false);
        self.showModal = false;
        self.showConfirm = false;
        self.target();
      });
      this.$root.eventHub.$off('cancelTarget');
      this.$root.eventHub.$on('cancelTarget', () => {
        self.$emit('confirmChange', false);
        self.showModal = false;
        self.showConfirm = false;
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
};
</script>
<style lang="scss" scoped>
.vmodal {
  position: fixed;
  transform: translateZ(0);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: table;
  transition: opacity .3s ease;
  z-index: 99999990;
  &-wrapper {
    display: table-cell;
    vertical-align: middle;
    .btn {
      position: relative;
      border-radius: 3px;
      font-size: 12px;
      width: 114px;
      height: 28px;
      background-color: #ffffff;
      &-cancel {
        border: 1px solid #3e454d;
        left: 11px;
      }
      &-confirm {
        border: 1px solid #ff4200;
        color: #ff4200;
      }
    }
  }
  &-container {
    background: #fff;
    width: 82%;
    padding-bottom: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    margin: 0 auto;
  }
  &-enter,
  &-leave {
    opacity: 0;
  }
  &-enter &-container,
  &-leave &-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  &-header {
    height: 47px;
    line-height: 47px;
    background-color: #f5f5f5;
    text-align: center;
    font-size: 18px;
    color: #3e454d;
    border: 1px solid #e5e5e5;
  }
  &-body {

    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 20px auto;
    width: 100%;
    white-space: normal;

    .message-box {
      margin-top: 3px;
    }

    font-size: 14px;
    line-height: 23px;
    white-space: nowrap;
    &.guest {
      width: 100%;
      text-align: center;
    }
  }

  &-footer {
    display: flex;
    justify-content: space-around;
    margin: 20px auto;

    .btn {
      height: 36px;
      line-height: 35px;
      font-size: 18px;
      border-radius: 3px;
      width: 35%;
      &-cancel {
        border: 1px solid #949494;
        color: #949494;
      }
      &-confirm {
        background: #ff9c47;
        color: #ffffff;
        border: none;
      }
    }
  }

  .type2 {
    .title {
      margin-bottom: 17px;
      font-size: 18px;
      color: #3e454d;
      letter-spacing: -0.61px;
      text-align: center;
    }
    .note {
      font-size: 12px;
      color: #3e454d;
      letter-spacing: 0;
      line-height: 15px;
      text-align: center;
      a {
        font-size: 14px;
        color: #3e454d;
      }
      span {
        font-size: 14px;
        color: #3e454d;
      }
    }
    .vmodal-footer {
      text-align: center;
      .btn-confirm {
        float: none;
      }
    }
  }

  .type3 {
    position: relative;
    .vmodal-body {
      font-size: 18px;
      color: #3e454d;
      text-align: center;
      width: auto;
      padding-left: 0;
      @media screen and (max-width: 320px) {
        &.small {
          padding-left: 0;
          font-size: 16px;
        }
      }
    }

    .close {
      display: inline-block;
      opacity: 0.6;
      background: url(../../assets/close.svg) no-repeat center;
      background-size: 50% 50%;
      width: 30px;
      height: 30px;
      position: absolute;
      right: 10px;
      top: 9px;
    }
  }

  .type4 {
    .vmodal-body {
      padding: 5px 40px;

      // font-family:PingFangSC-Regular;
      font-size:14px;
      color:#3e454d;
      letter-spacing:0;
      line-height:25px;
      white-space: normal;

      .orange {
        color: #ffb474;
      }
    }

    .vmodal-footer {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
