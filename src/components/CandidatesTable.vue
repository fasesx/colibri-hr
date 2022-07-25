<template>
  <div>
    <div class="candidates__table">
      <div class="candidates__table-header">
        <p
          v-for="(column, columnIdx) in columns"
          :key="columnIdx"
          class="candidates__table-header-item"
        >
          {{ column }}
        </p>
      </div>
      <div
        v-for="(candidate, candidateIdx) in candidates"
        :key="candidateIdx"
        class="candidates__table-row"
      >
        <p
          v-for="(column, columnIdx) in Object.keys(columns)"
          :key="columnIdx"
          class="candidates__table-header-item"
        >
          {{ candidate[column] ? candidate[column] : '-' }}
        </p>
        <div class="candidates__table-actions">
          <button @click="viewCandidate(candidate.id)">
            View
          </button>
          <button @click="editCandidate(candidate.id)">
            Edit
          </button>
        </div>
      </div>
    </div>
    <CandidatesPagination />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'
import CandidatesPagination from '@/components/CandidatesPagination.vue'

export default Vue.extend({
  components: {
    CandidatesPagination
  },
  data() {
    return {
      columns: {
        'id': 'ID',
        'first_name': 'First name',
        'last_name': 'Last name',
        'email': 'Email'
      },
    }
  },
  computed: {
    ...mapGetters(['candidates']),
  },
  methods: {
    viewCandidate(id: number) {
      this.$router.push({hash: `#view-${id}`})
    },
    editCandidate(id: number) {
      this.$router.push({hash: `#edit-${id}`})
    },
  }
})
</script>

<style lang="scss">
.candidates {
  
  &__table {
    box-shadow: 0px 2px 10px rgba(0,0,0,12%);
    border-radius: $radius;
  }

  &__table-header {
    display: grid;
    grid-template-columns: 5rem repeat(4, minmax(0, 1fr));
    padding: 0 1.6rem;
    box-shadow: 0px 4px 10px rgb(0 0 0 / 6%)
  }

  &__table-header-item {
    justify-self: start;
    font-size: 1.5rem;
    padding: 1.6rem 0;
  }

  &__table-row {
    display: grid;
    grid-template-columns: 5rem repeat(4, minmax(0, 1fr));
    padding: 0 1.6rem;
    position: relative;

    &:not(:last-child):after {
      content: ' ';
      position: absolute;
      bottom: 0;
      left: 1.6rem;
      right: 1.6rem;
      height: 0.1rem;
      background: rgba(0,0,0,6%);
    }
  }

  &__table-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    :last-child {
      margin-left: 0.8rem;
    }
  }
}
</style>