<template>
  <transition-group
    name="slide"
    class="notifications-list"
  >
    <notification
      v-for="notification in getNotifications"
      :key="notification.id"
      :notification="notification"
    />
  </transition-group>
</template>

<script>
import { mapGetters } from 'vuex';
import Notification from './notification.vue';

export default {
  components: {
    Notification,
  },
  computed: {
    ...mapGetters(['getNotifications']),
  },
};
</script>

<style scoped>
.notifications-list {
  position: fixed;
  top: 80px;
  right: 0;
  margin-right: 15px;
  width: 300px;
}

.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.slide-enter-active {
  transition: all 0.5s ease;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.5s ease;
  position: absolute;
}

.slide-move {
  transition: all 0.5s ease;
}

@media screen and (max-width: 1300px) {
  .notifications-list {
    top: 10px;
    right: 0px;
    left: 0px;
    width: 75%;
    margin: 0 auto;
    display: block;
  }

  .slide-enter, .slide-leave-to {
    opacity: 0;
    transform: translateY(-100%);
  }

  .slide-move {
    transition: all 0.5s ease;
  }
}
</style>
