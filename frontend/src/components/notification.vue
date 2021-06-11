<template>
  <div
    class="notification"
    @mouseover="resetTimeout()"
    @mouseleave="startTimeout()"
  >
    <template v-if="!clickedFollowedCompany">
      <div class="title">
        {{ notification.job.title }} at {{ notification.job.company_name }}
      </div>
      <div class="message">
        <p v-if="notification.type === 'shortlisted'">
          Job added to saved items
        </p>
        <p v-else>
          Job removed from saved items
        </p>
      </div>
      <div
        v-if="notification.type === 'shortlisted'"
        class="follow"
      >
        <hr>
        <template v-if="!followingCompany">
          <p>Would you like to follow {{ notification.job.company_name }}?</p>
          <p>You'll be first to hear about new jobs and be notified about upcoming deadlines</p>
          <button
            class="follow-button"
            @click="followCompanyClicked(
              notification.job.company_id,
              notification.job.company_name)"
          >
            FOLLOW
          </button>
        </template>
        <template v-else>
          <p>You already follow {{ notification.job.company_name }}</p>
        </template>
      </div>
    </template>
    <template v-else>
      <h3>{{ notification.job.company_name }}</h3>
      <p>Company added to your saved items</p>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      clickedFollowedCompany: false,
      timeoutID: null,
    };
  },
  computed: {
    ...mapGetters(['getFollowedCompanies']),
    followingCompany() {
      if (this.getFollowedCompanies.map(
        (c) => c.id,
      ).includes(this.notification.job.company_id)) {
        return true;
      }
      return false;
    },
  },
  created() {
    this.startTimeout();
  },
  methods: {
    ...mapActions(['removeNotification', 'followCompany']),
    followCompanyClicked(companyID, companyName) {
      this.followCompany({
        id: companyID,
        name: companyName,
      });

      this.clickedFollowedCompany = true;
    },
    startTimeout() {
      this.timeoutID = setTimeout(() => {
        this.removeNotification(this.notification.id);
      }, 5000);
    },
    resetTimeout() {
      clearTimeout(this.timeoutID);
    },
  },
};
</script>

<style scoped>
.notification {
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-bottom: 20px;
  border-radius: 6px;
}

.follow-button {
  cursor: pointer;
  width: 100%;
  height: 40px;
  color: white;
  background-color: green;
  border-radius: 5px;
  border: none
}
</style>
