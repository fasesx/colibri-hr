import Vue from "vue";
import {hostname} from '@/globals'

export default {
  candidates: () => `${hostname}/candidates?_page=1`,
  candidate: (id: number) => `${hostname}/candidates/${id}`
}