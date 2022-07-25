<template>
  <LayoutDefault>
    <div class="candidates">
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
          v-for="(candidate, candidateIdx) in candidatesPag"
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
        </div>
      </div>
      <div>
        <button
          v-if="hasNextPage"
          @click="increasePage"
        >
          Increase page
        </button>
      </div>
    </div>
  </LayoutDefault>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import { ICandidate } from '@/types/api'

export default Vue.extend({
  components: {
    LayoutDefault
  },
  data() {
    return {
      columns: {
        'id': 'ID',
        'first_name': 'First name',
        'last_name': 'Last name',
        'email': 'Email'
      },
      pageSize: 15,
      pageNumber: 1,
      maxPage: 0,
    }
  },
  computed: {
    ...mapGetters(['candidates']),
    candidatesPag(): ICandidate[] {
      const {pageSize, pageNumber} = this
      return this.candidates.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    },
    hasNextPage(): boolean {
      return this.pageNumber < this.maxPage
    },
  },
  watch: {
    candidates: {
      deep: true,
      handler(newValue) {
        if (newValue.length > 0) this.calcMaxPage()
      }
    }
  },
  created() {
    this.calcMaxPage()
  },
  methods: {
    calcMaxPage() {
      this.maxPage = Math.ceil(this.candidates.length / this.pageSize)
    },
    increasePage() {
      this.pageNumber += 1
    }
  },
})
</script>

<style lang="scss">
.candidates {
  background: white;

  &__table {
    box-shadow: 0px 2px 10px rgba(0,0,0,12%);
    border-radius: $radius;
  }

  &__table-header {
    display: grid;
    grid-template-columns: 5rem repeat(3, minmax(0, 1fr));
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
    grid-template-columns: 5rem repeat(3, minmax(0, 1fr));
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
}
</style>