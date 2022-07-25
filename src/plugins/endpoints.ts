import {hostname} from '@/globals'

export default {
  candidates: (page = 1) => `${hostname}/candidates?_page=${page}`,
  candidate: (id: number) => `${hostname}/candidates/${id}`
}