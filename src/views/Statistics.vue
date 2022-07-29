<template>
  <LayoutDefault>
    <div class="statistics">
      <label
        class="statistics__text"
        for="group-by-select"
      >
        Group by:
      </label>
      <select
        id="group-by-select"
        v-model="selectedGroupBy"
      >
        <option
          v-for="option in optionsGroupBy"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
      <label
        class="statistics__text"
        for="average-value"
      >
        Average field:
      </label>
      <select
        id="average-value"
        v-model="selectedAverageValue"
      >
        <option
          v-for="option in optionsAverageValue"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
      <SharedBarChart
        :chart-data="chartData"
        :styles="{
          height: '200rem',
          position: 'relative'
        }"
      />
    </div>
  </LayoutDefault>
</template>

<script lang="ts">
import Vue from 'vue'
import SharedBarChart from '@/components/SharedBarChart.vue'
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import { mapGetters } from 'vuex'
import { average } from '@/utils'
import { Candidate, ICandidate, CandidateField } from '@/types/api'

export default Vue.extend({
  name: 'Statistics',
  components: {
    SharedBarChart,
    LayoutDefault
  },
  data() {
    return {
      chartData: {},
      selectedGroupBy: Candidate.Industry,
      selectedAverageValue: Candidate.YearsOfExperience,
      handlerFns: {} as {[key: string]: (_: CandidateField) => number},
      optionsGroupBy: [
        { text: 'Industry', value: Candidate.Industry },
        { text: 'Years of experience', value: Candidate.YearsOfExperience },
      ],
      optionsAverageValue: [
        { text: 'Age', value: Candidate.DateOfBirth },
        { text: 'Years of experience', value: Candidate.YearsOfExperience },
        { text: 'Salary', value: Candidate.Salary }
      ]
    }
  },
  computed: {
    ...mapGetters(['candidates']),
  },
  watch: {
    selectedGroupBy() {
      this.updateChartData()
    },
    selectedAverageValue() {
      this.updateChartData()
    }
  },
  async created() {
    await this.$store.dispatch('getCandidates')
    this.handlerFns = {
      [Candidate.DateOfBirth]: this.getAge
    }
    this.updateChartData()
  },
  methods: {
    getAge(dateString: CandidateField) {
      const dateStringArr = dateString?.toString().split('/') || []
      const dateStringP = `${dateStringArr[2]}-${dateStringArr[1]}-${dateStringArr[0]}`
      const today = new Date()
      const birthDate = new Date(dateStringP)
      let age = today.getFullYear() - birthDate.getFullYear()
      const month = today.getMonth() - birthDate.getMonth()
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    },
    updateChartData() {
      this.chartData = average<ICandidate>(this.candidates, this.selectedGroupBy, this.selectedAverageValue, this.handlerFns[this.selectedAverageValue])
    }
  },
})
</script>

<style lang="scss">
.statistics {
  &__text {
    @include text('body');
    font-weight: 600;
  }
}
</style>
