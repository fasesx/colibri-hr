<template>
  <SharedModal
    v-if="!pending"
    title="Candidate Data"
  >
    <CandidatesModalItem
      v-model="selectedCandidate.id"
      name="ID:"
    />
    <CandidatesModalItem
      v-model="selectedCandidate.first_name"
      name="First name:"
    />
    <CandidatesModalItem
      v-model="selectedCandidate.last_name"
      name="Last name:"
    />
    <CandidatesModalItem
      v-model="selectedCandidate.email"
      name="Email:"
    />
    <CandidatesModalItem
      v-model="selectedCandidate.industry"
      name="Industry:"
    />
    <CandidatesModalItem
      v-model="selectedCandidate.salary"
      name="Salary:"
    />
    <CandidatesModalItem
      v-model="selectedCandidate.years_of_experience"
      name="YOE:"
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
  data() {
    return {
      pending: true,
    }
  },
  computed: {
    ...mapGetters(['selectedCandidate']),
  },
  async created() {
    const id = Number(this.$route.hash.split('-')[1])
    await this.$store.dispatch('getCandidate', {id})
    this.pending = false
  },
})
</script>