import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './action'
import * as mutations from './mutation'
Vue.use(Vuex)
const state = {
  currentUser: null,
  isLogin: false,
  token: '',
  cateList: []
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default store
