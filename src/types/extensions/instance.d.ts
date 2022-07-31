/* eslint-disable @typescript-eslint/interface-name-prefix */
import Vue from 'vue'

interface ICustomRoutes {
  candidates: () => string
  candidate: (id: number) => string
}

declare module 'vue/types/vue' {
  interface Vue {
    $endpoints: ICustomRoutes
  }
}