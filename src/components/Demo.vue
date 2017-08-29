<template>
  <div class="demo">
    <router-link to="/hello">go hello</router-link>
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
    this.$nextTick(function () {
      this.init();
    })
  },
  beforeDestroy() {

  }
}
</script>
<style lang="scss">
.demo {}
</style>
