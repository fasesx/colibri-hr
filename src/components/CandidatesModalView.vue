<template>
  <SharedModal title="Candidate Data">
    <CandidatesModalItem
      name="ID:"
      :value="selectedCandidate.id"
    />
    <CandidatesModalItem
      name="First name:"
      :value="selectedCandidate.first_name"
    />
    <CandidatesModalItem
      name="Last name:"
      :value="selectedCandidate.last_name"
    />
    <CandidatesModalItem
      name="Email:"
      :value="selectedCandidate.email"
    />
    <CandidatesModalItem
      name="Industry:"
      :value="selectedCandidate.industry"
    />
    <CandidatesModalItem
      name="Salary:"
      :value="selectedCandidate.salary"
    />
    <CandidatesModalItem
      name="YOE:"
      :value="selectedCandidate.years_of_experience"
    />
  </SharedModal>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import SharedModal from '@/components/SharedModal.vue'
import CandidatesModalItem from './CandidatesModalItem.vue'

export default Vue.extend({
  components: {
    SharedModal,
    CandidatesModalItem
  },
  computed: {
    ...mapGetters(['selectedCandidate']),
  },
  created() {
    const id = Number(this.$route.hash.split('-')[1])
    this.$store.dispatch('getCandidate', id)
  },
})
</script>