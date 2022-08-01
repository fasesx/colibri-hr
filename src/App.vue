<template>
  <div id="app">
    <header>
      <nav id="nav">
        <router-link
          class="nav-link"
          to="/candidates"
        >
          Candidates
        </router-link>
        <router-link to="/statistics">
          Statistics
        </router-link>
      </nav>
    </header>
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
    @include text('big');
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.nav-link {
    @include text('title');
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
}
</style>
