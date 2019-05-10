import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    name: '',
    token: '',
    currentMedicationID: '',
    medCurrentPage: 'list',
    currentCheckListID: '',
    checkCurrentPage: 'checkList',
    currentHistoryID: '',
    historyCurrentPage: 'list',
    medicalOrderID: ''
  },
  mutations: {
    set_token (state, token) {
      state.token = token
      console.log('state.token:' + state.token)
    },
    del_token (state) {
      state.token = ''
      console.log('state.token:' + state.token)
    },
    set_name (state, name) {
      state.name = name
      console.log('state.name:' + state.name)
    },
    del_name (state) {
      state.name = ''
      console.log('state.name:' + state.name)
    },
    set_userDept (state, name) {
      state.userDept = name
      console.log('state.userDept:' + state.userDept)
    },
    set_userDeptID (state, name) {
      state.userDeptID = name
      console.log('state.userDept:' + state.userDeptID)
    },
    set_currentMedicationID (state, ID) {
      state.currentMedicationID = ID
      console.log('state.token:' + state.currentMedicationID)
    },
    del_currentMedicationID (state) {
      state.currentMedicationID = ''
      console.log('state.token:' + state.currentMedicationID)
    },
    set_medCurrentPage (state, page) {
      state.medCurrentPage = page
      console.log('state.medCurrentPage:' + state.medCurrentPage)
    },
    set_currentHistoryID (state, ID) {
      state.currentHistoryID = ID
      console.log('state.token:' + state.currentHistoryID)
    },
    del_currentHistoryID (state) {
      state.currentHistoryID = ''
      console.log('state.token:' + state.currentHistoryID)
    },
    set_historyCurrentPage (state, page) {
      state.historyCurrentPage = page
      console.log('state.historyCurrentPage:' + state.historyCurrentPage)
    },
    set_checkCurrentPage(state, page){
      state.checkCurrentPage = page
      console.log('state.checkCurrentPage:' + state.checkCurrentPage)
    },
    set_currentCheckListID (state, ID) {
      state.currentCheckListID = ID
      console.log('state.token:' + state.currentCheckListID)
    },
    set_medicalOrderID (state, ID) {
      state.medicalOrderID = ID
      console.log('state.medicalOrderID:' + state.medicalOrderID)
    },
    del_medicalOrderID (state) {
      state.medicalOrderID = ''
      console.log('state.medicalOrderID:' + state.medicalOrderID)
    }
  }
})
