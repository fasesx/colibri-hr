<template>
  <LayoutDefault>
    <main class="candidates">
      <CandidatesTable />
    </main>
    <CandidatesModalView v-if="$route.hash.startsWith('#view-')" />
    <CandidatesModalEdit v-if="$route.hash.startsWith('#edit-')" />
  </LayoutDefault>
</template>

<script lang="ts">
import Vue from 'vue'
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import CandidatesTable from '@/components/CandidatesTable.vue'
import CandidatesModalView from '@/components/CandidatesModalView.vue'
import CandidatesModalEdit from '@/components/CandidatesModalEdit.vue'

export default Vue.extend({
  components: {
    LayoutDefault,
    CandidatesTable,
    CandidatesModalView,
    CandidatesModalEdit
  },
  watch: {
    '$route.params': {
      handler(params) {
        this.$store.dispatch('getCandidates', {page: params.page || 1})
      },
      immediate: true
    }
  }
})
</script>

<style lang="scss">
.candidates {
  background: white;
}
</style>