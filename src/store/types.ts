import {ICandidate} from '@/types/api'

export interface IPagination {
  first?: string
  last?: string
  next?: string
  prev?: string
}

export interface IState {
  candidates: ICandidate[]
  selectedCandidate: ICandidate
  pagination: IPagination
}