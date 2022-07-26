// import { ICandidate } from "@/types/api"
import { ActionTree } from "vuex"
import { IState } from "./types"
import {endpoints} from '@/plugins'

const actions: ActionTree<IState, any> = {
  getCandidates({commit}, page: number): void {
    fetch(endpoints.candidates(page))
      .then(response => {
        const linkHeader = response.headers.get('Link')?.split(', ') || []
        const linkHeadersArray = linkHeader.map( header => header.split( "; " ) );
        const linkHeadersMap = linkHeadersArray.map( header => {
          const thisHeaderRel = header[1].replace( /"/g, "" ).replace( "rel=", "" );
          const thisHeaderUrl = header[0].slice( 1, -1 ).split('?_page=')[1];
          return [ thisHeaderRel, Number(thisHeaderUrl) ]
        })
        commit('setPagination', Object.fromEntries( linkHeadersMap ))
        return response.json()
      })
      .then((data) => {
        commit('setCandidates', data)
      })
  },
  getCandidate({commit}, id: number): void {
    fetch(endpoints.candidate(id))
      .then(response => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        commit('setSelectedCandidate', data)
      })
  }
}

export default actions