<template>
  <LayoutDefault>
    <div class="candidates">
      <CandidatesTable />
    </div>
    <CandidatesModalView v-if="$route.hash.startsWith('#view-')" />
  </LayoutDefault>
</template>

<script lang="ts">
import Vue from 'vue'
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import CandidatesTable from '@/components/CandidatesTable.vue'
import CandidatesModalView from '@/components/CandidatesModalView.vue'

export default Vue.extend({
  components: {
    LayoutDefault,
    CandidatesTable,
    CandidatesModalView,
  },
})
</script>

<style lang="scss">
.candidates {
  background: white;
}
</style>