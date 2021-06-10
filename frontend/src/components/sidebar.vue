<template>
  <div class="sidebar">
    <transition name="fade">
      <div
        v-if="sidebarOpen"
        class="backdrop"
        @click="closeSidebar"
      />
    </transition>
    <transition
      name="slide"
    >
      <div
        v-if="sidebarOpen"
        class="panel"
      >
        <!-- header -->
        <div class="header">
          <h3>Saved Items</h3>
          <div
            class="close-icon"
            @click="closeSidebar"
          >
            <i class="fas fa-times" />
          </div>
        </div>
        <!-- body -->
        <div class="body">
          <div class="saved-list">
            <transition-group
              name="scale"
              tag="ul"
            >
              <li
                v-for="(item, i) in filteredSavedItems"
                :key="i"
                class="saved-item"
              >
                <template v-if="item.type === 'job'">
                  <div class="item-title">
                    {{ item.title }}
                  </div>
                  <div>Company: {{ item.company_name }}</div>
                  <div>Deadline: {{ item.deadline }}</div>
                </template>
                <template v-else-if="item.type === 'company'">
                  <div class="item-title">
                    {{ item.company_name }}
                  </div>
                </template>
              </li>
            </transition-group>
          </div>
          <div class="filter-section">
            <div
              class="filter-item"
              :class="filterBy === 'all' ? 'underline' : ''"
              @click="filterBy = 'all'"
            >
              <i class="fas fa-list-ul fa-2x" />
            </div>
            <div
              class="filter-item"
              :class="filterBy === 'jobs' ? 'underline' : ''"
              @click="filterBy = 'jobs'"
            >
              <i class="fas fa-heart fa-2x" />
            </div>
            <div
              class="filter-item"
              :class="filterBy === 'companies' ? 'underline' : ''"
              @click="filterBy = 'companies'"
            >
              <i class="fas fa-building fa-2x" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  data() {
    return {
      filterBy: 'all',
    };
  },
  computed: {
    ...mapGetters(['getShortlistedJobs', 'getFollowedCompanies']),
    sidebarOpen() {
      return this.$store.state.sidebarOpen;
    },
    filteredSavedItems() {
      const jobs = this.getShortlistedJobs.map((job) => {
        const item = job;
        item.type = 'job';
        return item;
      });

      const companies = this.getFollowedCompanies.map((company) => {
        const item = company;
        item.type = 'company';
        return item;
      });

      switch (this.filterBy) {
        case 'jobs':
          return jobs;
        case 'companies':
          return companies;
        default:
          return jobs.concat(companies);
      }
    },
  },
  methods: {
    ...mapMutations(['TOGGLE_SIDEBAR']),
    closeSidebar() {
      this.TOGGLE_SIDEBAR();
    },
  },
};
</script>

<style scoped>
.backdrop {
  background-color: rgba(0,0,0,0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  cursor: pointer;
}

.panel {
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 25%;
  border-radius: 15px 0 0 15px;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid #dddddd;
}

.close-icon {
  cursor: pointer;
}

.body {
  width: 100%;
  height: 100%;
  display: flex;
}

.saved-list {
  width: 80%;
  overflow-y: scroll;
}

.body ul {
  padding: 0;
  margin: 0;
}

.saved-item {
  text-align: left;
  padding: 20px;
  height: 100px;
  border-bottom: 1px solid #dddddd;
  list-style: none;
}

.item-title {
  font-weight: bold;
}

.filter-section {
  width: 20%;
  border-left: 1px solid #dddddd;
}

.filter-item {
  cursor: pointer;
  height: 75px;
  margin-top: 20px;
}

.filter-item i {
  position: absolute;
  transform: translateX(-50%) translateY(50%);
}

.filter-section .underline {
  border-bottom: 2px solid blue;
  color: blue;
}

/* Animations */

.slide-enter, .slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.5s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}

.scale-enter, .scale-leave-to {
  transform: scale(0.6);
  opacity: 0;
}

.scale-enter-active, .scale-leave-active {
  transition: all 0.5s ease;
  position: absolute;
}

.scale-move {
  transition: all 0.3s ease;
}
</style>
