<template>
  <div class="candidates__pagination">
    <button
      :disabled="!hasPrevPage"
      @click="decreasePage"
    >
      &lt;
    </button>
    <button
      :disabled="!hasNextPage"
      @click="increasePage"
    >
      &gt;
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters(['candidates', 'pagination']),
    hasNextPage(): boolean {
      return !!this.pagination.next
    },
    hasPrevPage(): boolean {
      return !!this.pagination.prev
    }
  },
  methods: {
    increasePage() {
      this.$store.dispatch('getCandidates', this.pagination.next)
    },
    decreasePage() {
      this.$store.dispatch('getCandidates', this.pagination.prev)
    }
  },
})
</script>

<style lang="scss">
.candidates {

  &__pagination {
    margin-top: 1.6rem;
    display: flex;
    justify-content: center;

    :last-child {
      margin-left: 0.8rem;
    }
  }
}
</style>