import { createLocalVue, shallowMount } from '@vue/test-utils'
import Statistics from '@/views/Statistics.vue'
import Vuex, { Store } from 'vuex'
import { Candidate } from '@/types/api'
import { average } from '@/utils'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Statistics.vue', () => {
  let actions, getters
  let store: Store<unknown>
  let candidates: unknown[] = []

  beforeEach(() => {
    actions = {
      getCandidates: jest.fn()
    }
    getters = {
      candidates: () => candidates
    }
    store = new Vuex.Store({
      actions,
      getters
    })
  })

  it('Chart data is calculated correctly for 1 entry', async () => {
    const industryName = "INDUSTRY"
    const averageValue = 4
    candidates = [{
      "id":1,
      "first_name":"Loutitia",
      "last_name":"Steaning",
      "email":"lsteaning0@usnews.com",
      "date_of_birth":"13/05/1978",
      "industry":industryName,
      "salary":98803.83,
      "years_of_experience": averageValue
    }]
    const wrapper = shallowMount(Statistics, {store, localVue})
    wrapper.setData({
      selectedGroupBy: Candidate.Industry,
      selectedAverageValue: Candidate.YearsOfExperience
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.chartData).toStrictEqual({
      labels: [industryName],
      datasets: [{
        data: [averageValue]
      }]
    })
  })

  it('Chart data is calculated correctly for multiple entries', async () => {
    const industryName = "INDUSTRY"
    const industryName2 = "INDUSTRY_2"
    candidates = [{
      "id":1,
      "first_name":"Loutitia",
      "last_name":"Steaning",
      "email":"lsteaning0@usnews.com",
      "date_of_birth":"13/05/1978",
      "industry":industryName,
      "salary":98803.83,
      "years_of_experience": 1
    },
    {
      "id":2,
      "first_name":"Loutitia",
      "last_name":"Steaning",
      "email":"lsteaning0@usnews.com",
      "date_of_birth":"13/05/1978",
      "industry":industryName,
      "salary":98803.83,
      "years_of_experience": 9
    },
    {
      "id":3,
      "first_name":"Loutitia",
      "last_name":"Steaning",
      "email":"lsteaning0@usnews.com",
      "date_of_birth":"13/05/1978",
      "industry":industryName2,
      "salary":98803.83,
      "years_of_experience": 1
    },
    {
      "id":4,
      "first_name":"Loutitia",
      "last_name":"Steaning",
      "email":"lsteaning0@usnews.com",
      "date_of_birth":"13/05/1978",
      "industry":industryName2,
      "salary":98803.83,
      "years_of_experience": 4
    }]
    const wrapper = shallowMount(Statistics, {store, localVue})
    wrapper.setData({
      selectedGroupBy: Candidate.Industry,
      selectedAverageValue: Candidate.YearsOfExperience
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.chartData).toStrictEqual({
      labels: [industryName, industryName2],
      datasets: [{
        data: [5, 2.5]
      }]
    })
  })

  it('Chart data is calculated correctly (age is calculated from date_of_birth)', async () => {
    candidates = [{
      "id":1,
      "first_name":"Loutitia",
      "last_name":"Steaning",
      "email":"lsteaning0@usnews.com",
      "date_of_birth":"13/05/1978",
      "industry": "N/A",
      "salary":98803.83,
      "years_of_experience": 4
    },
    {
      "id":2,
      "first_name":"Loutitia",
      "last_name":"Steaning",
      "email":"lsteaning0@usnews.com",
      "date_of_birth":"13/05/1978",
      "industry": "N/A",
      "salary":98803.83,
      "years_of_experience": 4
    }]
    const wrapper = shallowMount(Statistics, {store, localVue})
    wrapper.setData({
      selectedGroupBy: Candidate.Industry,
      selectedAverageValue: Candidate.DateOfBirth
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.chartData).toStrictEqual({
      labels: ["N/A"],
      datasets: [{
        data: [44]
      }]
    })
  })

  it('Chart data is calculated correctly (years_of_experience is rounded as groupBy)', async () => {
    const salary = 98803.83
    candidates = [{
      "id":1,
      "first_name":"Loutitia",
      "last_name":"Steaning",
      "email":"lsteaning0@usnews.com",
      "date_of_birth":"13/05/1978",
      "industry": "N/A",
      "salary": salary,
      "years_of_experience": 4.4
    },
    {
      "id":2,
      "first_name":"Loutitia",
      "last_name":"Steaning",
      "email":"lsteaning0@usnews.com",
      "date_of_birth":"13/05/1978",
      "industry": "N/A",
      "salary": salary,
      "years_of_experience": 4.4
    }]
    const wrapper = shallowMount(Statistics, {store, localVue})
    wrapper.setData({
      selectedGroupBy: Candidate.YearsOfExperience,
      selectedAverageValue: Candidate.Salary
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.chartData).toStrictEqual({
      labels: [4],
      datasets: [{
        data: [salary]
      }]
    })
  })

  it('Chart data is calculated again when selecting other chart attributes', async () => {
    const industry = "N/A"
    const salary = 98803.83
    candidates = [{
      "id":1,
      "first_name":"Loutitia",
      "last_name":"Steaning",
      "email":"lsteaning0@usnews.com",
      "date_of_birth":"13/05/1978",
      "industry": industry,
      "salary": salary,
      "years_of_experience": 4.4
    },
    {
      "id":2,
      "first_name":"Loutitia",
      "last_name":"Steaning",
      "email":"lsteaning0@usnews.com",
      "date_of_birth":"13/05/1978",
      "industry": industry,
      "salary": salary,
      "years_of_experience": 4.4
    }]
    const wrapper = shallowMount(Statistics, {store, localVue})
    wrapper.setData({
      selectedGroupBy: Candidate.YearsOfExperience,
      selectedAverageValue: Candidate.Salary
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.chartData).toStrictEqual({
      labels: [4],
      datasets: [{
        data: [salary]
      }]
    })

    wrapper.setData({
      selectedGroupBy: Candidate.Industry,
      selectedAverageValue: Candidate.Salary
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.chartData).toStrictEqual({
      labels: [industry],
      datasets: [{
        data: [salary]
      }]
    })
  })
})
