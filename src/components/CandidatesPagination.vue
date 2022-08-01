<template>
  <nav class="candidates-pagination">
    <router-link
      class="candidates-pagination__button"
      :class="{'candidates-pagination__button--disabled': !hasPrevPage}"
      :to="prevPage"
    >
      &lt;
    </router-link>
    <router-link
      class="candidates-pagination__button"
      :class="{'candidates-pagination__button--disabled': !hasNextPage}"
      :to="nextPage"
    >
      &gt;
    </router-link>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters(['candidates', 'pagination']),
    hasNextPage() {
      return !!this.pagination.next
    },
    hasPrevPage() {
      return !!this.pagination.prev
    },
    nextPage() {
      return {
        name: "Candidates",
        params: {
          page: this.pagination.next
        }
      }
    },
    prevPage() {
      return {
        name: "Candidates",
        params: {
          page: this.pagination.prev !== 1 ? this.pagination.prev : undefined
        }
      }
    }
  }
})
</script>

<style lang="scss">
.candidates-pagination {
  margin-top: 1.6rem;
  display: flex;
  justify-content: center;

  :last-child {
    margin-left: 0.8rem;
  }

  &__button {
    cursor: pointer;
    padding: 0.2rem 1.5rem;
    background-color: #f0f0f0;
    border: 1px outset #000;
    border-radius: $radius;
    text-decoration: none;
    user-select: none;
    @include text('body');

    &--disabled {
      pointer-events: none;
      opacity: 0.4;
    }
  }
}
</style>