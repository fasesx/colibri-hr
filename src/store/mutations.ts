import {ICandidate} from '@/types/api'
import { IState } from './types'
import { MutationTree } from 'vuex'

const mutations: MutationTree<IState> = {
  setCandidates(state, candidates: ICandidate[]) {
    state.candidates = candidates
  }
}

export default mutations