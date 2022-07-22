import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import {IState} from './types'
import state from './state'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const store: StoreOptions<IState> = {
  state,
  mutations,
  getters,
}

export default new Vuex.Store<IState>(store)
