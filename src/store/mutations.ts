import {ICandidate} from '@/types/api'
import { IState, IPagination } from './types'
import { MutationTree } from 'vuex'

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
  }
}

export default mutations