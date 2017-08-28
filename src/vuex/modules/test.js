import {
  CHANGE_NAME,
  CHANGE_DEMO
} from '../mutationType.js'

const state = {
  currentLan: "en",
  apiUrl: {
    demo: "demo"
  }
}

const mutations = {
  //切换语言 后期需要
  [CHANGE_NAME](state, lang) {
    state.currentLang = lang;
  },
  [CHANGE_NAME](state, name) {
    state.apiUrl.demo += name;
  }
}
export default {
  state,
  mutations
}
