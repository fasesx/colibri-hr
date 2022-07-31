import { average } from '@/utils'
import {CandidateField} from '@/types/api'

describe('Average utility works as intended', () => {

  it('Works with empty array', () => {
    const arr: {[key: string]: number}[] = []
    const obj = average(arr, 'a', 'b')
    expect(obj).toStrictEqual({
      labels: [],
      datasets: [{
        data: []
      }]
    })
  })

  it('Computes averages with 1 entry', () => {
    const arr = [{a: 'Test', b: 5}]
    const obj = average(arr, 'a', 'b')
    expect(obj).toStrictEqual({
      labels: ['Test'],
      datasets: [{
        data: [5]
      }]
    })
  })

  it('Computes averages with many entries', () => {
    const arr = [
      {a: 'Test', b: 5},
      {a: 'Test', b: 3},
      {a: 'Test 2', b: 1},
      {a: 'Test 2', b: 3}
    ]
    const obj = average(arr, 'a', 'b')
    expect(obj).toStrictEqual({
      labels: ['Test', 'Test 2'],
      datasets: [{
        data: [4, 2]
      }]
    })
  })

  it('Computes averages with callback function', () => {
    const arr = [
      {a: 'Test', b: 5},
      {a: 'Test', b: 3},
      {a: 'Test 2', b: 1},
      {a: 'Test 2', b: 3}
    ]
    const obj = average(arr, 'a', 'b', (fv: CandidateField, gb: CandidateField) => {
      return {
        averageFieldValue: Number(fv) + 1,
        groupByValue: `${gb} #`
      }
    })
    expect(obj).toStrictEqual({
      labels: ['Test #', 'Test 2 #'],
      datasets: [{
        data: [5, 3]
      }]
    })
  })

  it('Computes averages and sorts correctly', () => {
    const arr = [{a: 'Test', b: 3}, {a: 'Test 2', b: 5}]
    const obj = average(arr, 'a', 'b')
    expect(obj).toStrictEqual({
      labels: ['Test 2', 'Test'],
      datasets: [{
        data: [5, 3]
      }]
    })
  })
})
