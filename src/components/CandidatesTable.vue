<template>
  <div>
    <table class="candidates__table">
      <tr class="candidates__table-header">
        <th
          v-for="(column, columnIdx) in columns"
          :key="columnIdx"
          class="candidates__table-header-item"
          scope="col"
        >
          {{ column }}
        </th>
      </tr>
      <tr
        v-for="(candidate, candidateIdx) in candidates"
        :key="candidateIdx"
        class="candidates__table-row"
      >
        <td
          v-for="(column, columnIdx) in Object.keys(columns)"
          :key="columnIdx"
          class="candidates__table-header-item"
        >
          {{ candidate[column] ? candidate[column] : '-' }}
        </td>
        <td class="candidates__table-actions">
          <button @click="viewCandidate(candidate.id)">
            View
          </button>
          <button @click="editCandidate(candidate.id)">
            Edit
          </button>
        </td>
      </tr>
    </table>
    <CandidatesPagination />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'
import CandidatesPagination from '@/components/CandidatesPagination.vue'
import { Candidate } from '@/types/api'

export default Vue.extend({
  components: {
    CandidatesPagination
  },
  data() {
    return {
      columns: {
        [Candidate.ID]: 'ID',
        [Candidate.FirstName]: 'First name',
        [Candidate.LastName]: 'Last name',
        [Candidate.Email]: 'Email'
      },
    }
  },
  computed: {
    ...mapGetters(['candidates']),
  },
  methods: {
    viewCandidate(id: number) {
      this.$router.replace({hash: `#view-${id}`})
    },
    editCandidate(id: number) {
      this.$router.replace({hash: `#edit-${id}`})
    },
  }
})
</script>

<style lang="scss">
.candidates {
  
  &__table {
    width: 100%;
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
    padding: 1.6rem 0;

    @include text('body')
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