import { ActionTree } from "vuex"
import { IState } from "./types"
import { endpoints } from '@/plugins'
// import { ICandidate } from '@/types/api'

const actions: ActionTree<IState, any> = {
  getCandidates({commit}, {page}: {page: number}): void {
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
  async getCandidate({commit}, {id}: {id: number}): Promise<void> {
    await fetch(endpoints.candidate(id))
      .then(response => {
        return response.json()
      })
      .then((data) => {
        commit('setSelectedCandidate', data)
      })
  },
  async patchCandidate({commit, getters}) {
    const {selectedCandidate} = getters
    const response = await fetch(endpoints.candidate(selectedCandidate.id), {
      method: 'PATCH',
      body: JSON.stringify(selectedCandidate),
      headers: {
        'Content-type': 'application/json',
      },
    })
    const data = await response.json()
    commit('updateCandidate', data)
  }
}

export default actions