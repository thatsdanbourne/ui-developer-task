<template>
  <div class="notification">
    <span v-if="!followedCompany">
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
      </div>
    </span>
    <span v-else>
      <h3>{{ notification.job.company_name }}</h3>
      <p>Company added to your saved items</p>
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      followedCompany: false,
    };
  },
  created() {
    setTimeout(() => {
      this.removeNotification(this.notification.id);
    }, 5000);
  },
  methods: {
    ...mapActions(['removeNotification', 'followCompany']),
    followCompanyClicked(companyID, companyName) {
      this.followCompany({
        company_id: companyID,
        company_name: companyName,
      });

      this.followedCompany = true;
    },
  },
};
</script>

<style scoped>
.notification {
  /* width: 100%;
  height: 100%; */
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-bottom: 20px;
}

.follow-button {
    width: 100%;
    height: 40px;
    color: white;
    background-color: green;
    border-radius: 5px;
    border: none
}
</style>
