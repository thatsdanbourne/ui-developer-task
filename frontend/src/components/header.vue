<template>
  <header>
    <p
      href=""
      class="Company"
    >
      Wexler
    </p>
    <div
      class="Counter"
      @click="TOGGLE_SIDEBAR"
    >
      <i class="fas fa-inbox" />
      <span class="Counter-number">
        {{ getShortlistedItems.length }}
      </span>
    </div>
  </header>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';

export default {

  data() {
    return {};
  },
  computed: {
    ...mapGetters(['getShortlistedItems']),
  },
  methods: {
    ...mapMutations(['TOGGLE_SIDEBAR']),
  },
};
</script>

<style scoped type="text/scss" lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 60px;
    background: #fff;
    padding: 0 15px;
    align-items: center;
    box-shadow: 0px 1px 2px rgba(0,0,0,0.08);
    height: 70px;
  }

  .Company {
    font-size: 30px;
    font-weight: 700;
    margin: 0;
  }

  .Counter {
    position: relative;
    cursor: pointer;
  }

  .Counter-number {
    display: inline-block;
    position: relative;
    top: -8px;
    left:-4px;
    height: 20px;
    line-height: 20px;
    color: #fff;
    padding: 0 2px;
    background: red;
    font-weight: 700;
    border-radius: 4px;
  }
</style>
