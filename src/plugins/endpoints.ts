import {hostname} from '@/globals'

export default {
  candidates: (page?: number) => `${hostname}/candidates${page ? `?_page=${page}` : ''}`,
  candidate: (id: number) => `${hostname}/candidates/${id}`
}