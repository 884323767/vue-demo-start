<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {

    }
  },
  methods: {
    init() {
    }
  },
  mounted() {
    //test for vuex
    console.log(this.$store.state.cash);
    this.$store.commit("CHANGE_CASH",1000);
    console.log(this.$store.state.cash);
    //test for i18n
    console.log(this.$t('app.setting'));


    this.$nextTick(function () {
      this.init();
    })
  },
  beforeDestroy() {

  }
};
</script>

<style lang="scss">
@import './sass/common';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
