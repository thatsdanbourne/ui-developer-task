<template>
  <div
    class="notification"
    @mouseover="resetTimeout()"
    @mouseleave="startTimeout()"
  >
    <template v-if="notification.itemType === 'job'">
      <template v-if="!clickedFollowedCompany">
        <div class="title">
          {{ notification.job.title }} at {{ notification.job.company_name }}
        </div>
        <div class="message">
          <p v-if="notification.notificationType === 'shortlisted'">
            Job added to saved items
          </p>
          <p v-else>
            Job removed from saved items
          </p>
        </div>
        <div
          v-if="notification.notificationType === 'shortlisted'"
          class="follow"
        >
          <hr>
          <div
            v-if="!followingCompany"
            class="follow-company"
          >
            <p>Would you like to follow {{ notification.job.company_name }}?</p>
            <p>You'll be first to hear about new jobs and be notified about upcoming deadlines</p>
            <button
              class="follow-button"
              @click="followCompanyClicked(
                notification.job.company_id,
                notification.job.company_name)"
            >
              FOLLOW {{ notification.job.company_name.toUpperCase() }}
            </button>
          </div>
          <template v-else>
            <p>You already follow {{ notification.job.company_name }}</p>
          </template>
        </div>
      </template>
      <template v-else>
        <h3>{{ notification.job.company_name }}</h3>
        <p>Company added to your saved items</p>
      </template>
    </template>
    <template v-else-if="notification.itemType === 'company'">
      <h3>{{ notification.company.name }}</h3>
      <p v-if="notification.notificationType === 'shortlisted'">
        Company added to your saved items
      </p>
      <p v-else>
        Company removed from your saved items
      </p>
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
    ...mapGetters(['getShortlistedCompanies']),
    followingCompany() {
      if (this.getShortlistedCompanies.map(
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
    ...mapActions(['removeNotification', 'addCompanyToShortlist']),
    followCompanyClicked(companyID, companyName) {
      this.addCompanyToShortlist({
        id: companyID,
        name: companyName,
      });

      this.clickedFollowedCompany = true;
      this.startTimeout();
    },
    startTimeout() {
      this.timeoutID = setTimeout(() => {
        this.removeNotification(this.notification.id);
      }, 3500);
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

  .title {
    font-weight: bold;
  }

.follow-button {
  cursor: pointer;
  width: 100%;
  height: 40px;
  color: white;
  background-color: #32b056;
  border-radius: 5px;
  border: none
}

@media screen and (max-width: 1300px) {
  .notification {
    padding: 10px;
    background-color: white;
    font-size: 0.75rem;
    width: 100%;
  }

  .follow-button {
    font-size: 0.75rem;
  }

  .notification {
    text-align: left;
    font-size: 0.9rem;
    margin: 10px auto;
  }

  .follow-company > p, hr {
    display: none;
  }
}

</style>
