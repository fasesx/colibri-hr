import {ICandidate} from '@/types/api'
import { IState, IPagination } from './types'
import { MutationTree } from 'vuex'
import Vue from 'vue'

const mutations: MutationTree<IState> = {
  setCandidates(state, candidates: ICandidate[]) {
    state.candidates = candidates
  },
  setSelectedCandidate(state, candidate: ICandidate) {
    state.selectedCandidate = candidate
  },
  setPagination(state, pagination: IPagination) {
    console.log(pagination)
    state.pagination = pagination
  },
  updateCandidate(state, payload: ICandidate) {
    const candidateIdx = state.candidates.findIndex(candidate => candidate.id === payload.id)
    console.log('updateCandidate')
    console.log(candidateIdx)
    Vue.set(state.candidates, candidateIdx, payload)
  }
}

export default mutations