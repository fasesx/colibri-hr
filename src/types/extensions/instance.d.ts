import Vue from 'vue'

interface CustomRoutes {
  candidates: () => string
  candidate: (id: number) => string
}

declare module 'vue/types/vue' {
  interface Vue {
    $endpoints: CustomRoutes
  }
}