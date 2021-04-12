<template>
  <main class="Search-Container">
    <ol class="Job">
      <li class="Job-item Group">
        <a
          class="Job-logo"
          href=""
        >
          <img
            src="https://dbx9jsyriv02l.cloudfront.net/website/company-profile/397/397_75x75_1427720360.jpg?response-expires=Wed%2C%2003%20Apr%202019%2009%3A28%3A59%20GMT"
            alt="hi"
          >
        </a>
        <a
          class="Job-link"
          href=""
        >
          <span class="Job-info">
            <span class="Job-company">Oracle</span>
            <span class="Job-desc">Data Scientist Placement - London</span>
          </span>
          <span class="Job-meta">
            <i class="far fa-calendar-alt" /> 6th April 2018,
            <i class="fas fa-pound-sign" /> 18,000 - 19,000,
            Placement Year (10 Months+)
          </span>
        </a>
        <a
          href=""
          class="IconLike"
        >
          <span class="IconHeart IconHeart--like">
            <i class="far fa-heart" />
          </span>
        </a>
      </li>
    </ol>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SearchPage',

  data() {
    return {
      remote: {
        results: [],
      },
      config: {
        getResultsUrl: '/api/search/jobs',
      },
      ui: {
        loading: true,
      },
    };
  },

  mounted() {
    this.getResults();
  },

  methods: {
    getResults() {
      axios.get(this.config.getResultsUrl).then((response) => {
        this.remote.results = response.data;
      });
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
    margin:0 0 60px 0;
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
  }
</style>
