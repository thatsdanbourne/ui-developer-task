<template>
  <div class="sidebar">
    <transition name="backdrop">
      <div
        v-if="sidebarOpen"
        class="backdrop"
        @click="closeSidebar"
      />
    </transition>
    <transition
      name="sidebar"
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
              name="list-item"
              tag="ul"
            >
              <div
                v-for="(item) in filteredSavedItems"
                :key="item.id"
              >
                <li
                  v-if="item.type === 'job'"
                  class="saved-item"
                >
                  <div>
                    <template>
                      <div class="item-title">
                        {{ item.title }}
                      </div>
                      <div>Company: {{ item.company_name }}</div>
                      <div>Deadline: {{ parseDate(item.deadline) }}</div>
                    </template>
                  </div>
                  <div
                    class="bin-icon"
                    @click="removeItem(item)"
                  >
                    <i class="fas fa-trash" />
                  </div>
                </li>
                <li
                  v-if="item.type === 'company'"
                  class="saved-item"
                >
                  <div>
                    <template>
                      <a class="item-title">
                        {{ item.name }}
                      </a>
                    </template>
                  </div>
                  <div
                    class="bin-icon"
                    @click="removeItem(item)"
                  >
                    <i class="fas fa-trash" />
                  </div>
                </li>
              </div>
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
import { mapActions, mapMutations, mapGetters } from 'vuex';

export default {
  data() {
    return {
      filterBy: 'all',
    };
  },
  computed: {
    ...mapGetters(['getShortlistedItems', 'getShortlistedJobs', 'getShortlistedCompanies']),
    sidebarOpen() {
      return this.$store.state.sidebarOpen;
    },
    filteredSavedItems() {
      switch (this.filterBy) {
        case 'jobs':
          return this.getShortlistedJobs;
        case 'companies':
          return this.getShortlistedCompanies;
        default:
          return this.getShortlistedItems;
      }
    },
  },
  methods: {
    ...mapActions(['removeJobFromShortlist', 'removeCompanyFromShortlist']),
    ...mapMutations(['TOGGLE_SIDEBAR']),
    closeSidebar() {
      this.TOGGLE_SIDEBAR();
    },
    removeItem(item) {
      if (item.type === 'job') {
        this.removeJobFromShortlist(item.id);
      } else if (item.type === 'company') {
        this.removeCompanyFromShortlist(item.id);
      }
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

<style scoped>
.backdrop {
  background-color: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
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
  min-width: 300px;
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
  height: calc(100% - 50px);
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s ease;
}

.saved-item .bin-icon {
  padding: 10px;
}

.saved-item .bin-icon:hover {
  color: red;
  cursor: pointer;
}

.item-title {
  font-weight: bold;
  max-width: 90%;
  height: 2.6em;
  overflow: hidden;
}

.filter-section {
  width: 20%;
  border-left: 1px solid #dddddd;
}

.filter-item {
  cursor: pointer;
  height: 75px;
  margin: 5px 20px;
  border-bottom: 2px solid transparent;
}

.filter-item i {
  position: absolute;
  transform: translateX(-50%) translateY(50%);
  transition: all 0.1s ease;

}

.filter-section .underline {
  border-bottom: 2px solid #32b056;
  color: #32b056;
  transition: all 0.1s ease;
}

/* Animations */

.sidebar-enter, .sidebar-leave-to {
  transform: translateX(100%);
}

.sidebar-enter-active, .sidebar-leave-active {
  transition: all 0.5s ease;
}

.sidebar-move {
  transition: all 0.3s ease;
}

.backdrop-enter, .backdrop-leave-to {
  opacity: 0;
}

.backdrop-enter-active, .backdrop-leave-active {
  transition: all 0.5s ease;
}

.list-item-enter, .list-item-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.list-item-enter-active, .list-item-leave-active {
  transition: all 0.5s ease;
}

.list-item-leave-active {
  transition: all 0.5s ease;
  position: absolute;
}

.list-item-move {
  transition: all 0.5s ease;
}

@media screen and (max-width: 1300px) {
  .body {
    flex-direction: column-reverse;
  }

  .body ul {
    border-top: 1px solid #dddddd;
  }

  .saved-list {
    width: 100%;
    font-size: 0.9em;
  }

  .saved-item {
    height: 50px;
  }

  .filter-section {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
  }

  .filter-item {
    margin: 0 20px;
    font-size: 0.75em;
  }
}

@media screen and (max-width: 700px) {
  .panel {
    width: 90%;
    height: 90%;
    border-radius: 15px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .body {
    height: calc(100% - 50px);
  }

  .sidebar-enter, .sidebar-leave-to {
  opacity: 0;
}
}
</style>
