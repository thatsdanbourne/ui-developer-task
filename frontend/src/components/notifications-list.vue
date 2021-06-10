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
  position: absolute;
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
  transition: all 0.3s ease;
  transition-delay: 0.5s;
}
</style>
