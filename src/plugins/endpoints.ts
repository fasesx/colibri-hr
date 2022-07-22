import Vue from "vue";
import {hostname} from '@/globals'

export default {
    candidates: () => `${hostname}/candidates`,
    candidate: (id: number) => `${hostname}/candidates/${id}`
}