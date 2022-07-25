<template>
  <div id="app">
    <div id="nav">
      <router-link to="/candidates">
        Candidates
      </router-link> |
      <router-link to="/statistics">
        Statistics
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters(['candidates'])
  },
  created() {
    fetch(this.$endpoints.candidates())
      .then(response => {
        const Link = response.headers.get('Link')?.split(',')
        console.log(Link?.find(link => link.includes('last'))?.split('_page=').pop()?.slice(0, 2))
        return response.json()
      })
      .then(json => {
        this.$store.commit('setCandidates', json)
      })
  },
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
