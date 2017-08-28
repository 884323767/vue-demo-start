<template>
  <div class="summary-animation">
    <div class="box">
      <p class="stage">{{$t('summaryAnimation.stage1')}}</p>
      <p class="stage">{{$t('summaryAnimation.stage2')}}</p>
      <p class="stage">{{$t('summaryAnimation.stage3')}}</p>
      <p class="stage">{{$t('summaryAnimation.stage4')}}</p>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss">
.summary-animation {
  margin-top: 100px;

  animation-duration: 3s;
  animation-name: up;
  animation-fill-mode: forwards;
  animation-delay: 0.5s;

  .circle {
    background:#b5b7ba;
    width: 17px;
    height: 17px;
    border-radius:100%;
    background: url(../../assets/tick.svg) no-repeat;
    display: inline-block;
    content: "";
  }

  .inactive {
    opacity:0.35;
  }

  .box {
    display: flex;
    flex-direction: column;
    align-items: center;

    @keyframes show {
      0% {
        opacity: 0.35;
      }

      50% {
        opacity: 1;
      }

      100% {
        opacity: 0.35;
      }
    }

    .stage {
      &::before {
        @extend .circle;
      }

      $commands: 5;
      @for $i from 0 to $commands {
        &:nth-child(#{$i}) {
          animation-delay: $i * 0.5s;
        }
      }

      // font-family:NotoSansCJKsc-Regular;
      font-size:18px;
      color:#2a3139;
      letter-spacing:0;
      text-align:left;
      margin: 14px;

      opacity: 0.35;

      animation-duration: 1s;
      animation-name: show;
      animation-fill-mode: forwards;
    }

  }

}
</style>
