import { ICandidate } from "@/types/api"
import { GetterTree } from "vuex"
import { IState } from "./types"

const getters: GetterTree<IState, any> = {
  candidates(state): ICandidate[] {
    return state.candidates
  }
}

export default getters