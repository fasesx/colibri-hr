<template>
  <LayoutDefault>
    <div class="candidates">
      <CandidatesTable />
    </div>
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
  created() {
    this.$store.dispatch('getCandidates', {page: 1})
  },
})
</script>

<style lang="scss">
.candidates {
  background: white;
}
</style>