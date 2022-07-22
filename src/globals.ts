import Vue from 'vue'

const hostname = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000': 'https://hostname'
Vue.prototype.$hostname = hostname

export {
    hostname,
}