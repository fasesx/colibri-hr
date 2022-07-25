<template>
  <LayoutDefault>
    <div class="candidates">
      <CandidatesTable />
    </div>
  </LayoutDefault>
</template>

<script lang="ts">
import Vue from 'vue'
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import CandidatesTable from '@/components/CandidatesTable.vue'

export default Vue.extend({
  components: {
    LayoutDefault,
    CandidatesTable
  },
})
</script>

<style lang="scss">
.candidates {
  background: white;
}
</style>