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
      v-model="candidate.first_name"
      name="First name:"
      editable="first_name"
    />
    <CandidatesModalItem
      v-model="selectedCandidate.last_name"
      name="Last name:"
      editable="last_name"
    />
    <CandidatesModalItem
      v-model="selectedCandidate.email"
      name="Email:"
      editable="email"
    />
    <CandidatesModalItem
      v-model="selectedCandidate.industry"
      name="Industry:"
      editable="industry"
    />
    <CandidatesModalItem
      v-model="selectedCandidate.salary"
      name="Salary:"
      editable="salary"
    />
    <CandidatesModalItem
      v-model="selectedCandidate.years_of_experience"
      name="YOE:"
      editable="years_of_experience"
    />
    <button @click="onSave">
      Save
    </button>
  </SharedModal>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import SharedModal from '@/components/SharedModal.vue'
import CandidatesModalItem from './CandidatesModalItem.vue'
import { ICandidate } from '@/types/api'

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
    candidate: {
      get(): ICandidate {
        return this.selectedCandidate
      },
      set(value: ICandidate): void {
        this.$store.commit('setSelectedCandidate', value)
      }
    }
  },
  async created() {
    const id = Number(this.$route.hash.split('-')[1])
    await this.$store.dispatch('getCandidate', {id})
    this.pending = false
  },
  methods: {
    onSave() {
      this.$store.dispatch('patchCandidate')
      this.$router.replace({hash: ''})
    }
  }
})
</script>