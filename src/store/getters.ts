import { ICandidate } from "@/types/api"
import { GetterTree } from "vuex"
import { IPagination, IState } from "./types"

const getters: GetterTree<IState, any> = {
  candidates(state): ICandidate[] {
    return state.candidates
  },
  pagination(state): IPagination {
    return state.pagination
  }
}

export default getters