<template>
  <main
    class="Search-Container"
  >
    <ol class="Job">
      <li
        v-for="job in remote.results"
        :key="job.id"
        class="Job-item Group"
      >
        <a
          class="Job-logo"
          href=""
        >
          <img
            :src="job.logo"
            alt="hey!"
          >
        </a>
        <a
          class="Job-link"
          href=""
        >
          <span class="Job-info">
            <span class="Job-company">{{ job.company_name }}
              <i
                v-if="getShortlistedCompanies.map(item => item.id).includes(job.company_id)"
                class="follow-check fas fa-check"
                @click.prevent="unfollowComapny({
                  id: job.company_id,
                  name: job.company_name
                })"
              />
              <i
                v-else
                class="follow-plus fas fa-plus"
                @click.prevent="followComapny({
                  id: job.company_id,
                  name: job.company_name
                })"
              />
            </span>
            <span class="Job-desc">{{ job.title }}</span>
          </span>
          <span class="Job-meta">
            <i class="far fa-calendar-alt" /> {{ parseDate(job.deadline) }},
            <i class="fas fa-pound-sign" /> {{ job.salary }},
            {{ job.duration }}
          </span>
        </a>
        <a class="IconLike">
          <span
            class="IconHeart IconHeart--like"
            @click="toggleShortlisted(job)"
          >
            <i
              :class="getShortlistedJobIDs.includes(job.id) ? 'fas' : 'far'"
              class="fa-heart"
            />
          </span>
        </a>
      </li>
    </ol>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SearchPage',

  data() {
    return {
      remote: {
        results: [],
      },
      ui: {
        loading: true,
      },
    };
  },
  computed: {
    ...mapGetters(['getShortlistedJobs', 'getShortlistedCompanies']),
    getShortlistedJobIDs() {
      return this.getShortlistedJobs.map((item) => item.id);
    },
  },
  mounted() {
    this.getResults().then((data) => {
      this.remote.results = data;
    });
  },
  methods: {
    ...mapActions(['addNotification', 'addJobToShortlist', 'removeJobFromShortlist', 'addCompanyToShortlist', 'removeCompanyFromShortlist', 'getResults']),
    toggleShortlisted(job) {
      if (this.getShortlistedJobIDs.includes(job.id)) {
        // remove job
        this.removeJobFromShortlist(job.id);
        this.addNotification({ job, itemType: 'job', notificationType: 'unshortlisted' });
      } else {
        // add job
        this.addJobToShortlist(job);
        this.addNotification({ job, itemType: 'job', notificationType: 'shortlisted' });
      }
    },
    unfollowComapny(company) {
      this.removeCompanyFromShortlist(company.id);
      this.addNotification({ company, itemType: 'company', notificationType: 'unshortlisted' });
    },
    followComapny(company) {
      this.addCompanyToShortlist(company);
      this.addNotification({ company, itemType: 'company', notificationType: 'shortlisted' });
    },
    parseDate(dateString) {
      const timestamp = Date.parse(dateString);

      if (Number.isNaN(timestamp)) {
        // likely a string e.g. 'Ongoing', return original string
        return dateString;
      }

      const dateObj = new Date(timestamp);
      return dateObj.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
    },
  },
};
</script>

<style scoped type="text/scss" lang="scss">
.Search-Container {
  width: 700px;
  margin: auto;
  padding: 0 15px;
}

.Job {
  margin: 0 0 60px 0;
  width: 100%;
  padding: 0;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  /*padding: 0;*/
  text-align: left;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);
}

a {
  text-decoration: none;
}

.Job-item {
  padding: 15px;
  border-bottom: 1px solid #dddddd;
  display: block;
  list-style: none;
  position: relative;
  &:last-child {
    border: none;
  }
}

.follow-check {
  color: #32b056;
}

.follow-plus {
  color: #999999;
}

span {
  display: block;
}

.Job-meta {
  display: block;
  color: #666;
}

.Job-desc {
  font-size: 18px;
  font-weight: 700;
}

.Job-link {
  padding-left: 15px;
  width: calc(100% - 130px);
}

.Job-item,
.Group {
  display: flex;
}

.IconHeart {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translate(0, -50%);
  i {
    color: red;
    font-size: 25px;
  }
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

@media screen and (max-width: 700px) {
  .Search-Container {
    width: 90%;
    padding: 1em;
  }
}

</style>
