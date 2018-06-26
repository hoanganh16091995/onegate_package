import Vue from 'vue'
import Vuex from 'vuex'
import toastr from 'toastr'
import axios from 'axios'
import support from './support.json'
// import router from '@/router'

Vue.use(toastr)
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    initData: null,
    loading: false,
    loadingTable: false,
    loadingDynamicBtn: false,
    error: null,
    user: null,
    index: 0,
    trangThaiHoSoList: null,
    listThuTucHanhChinh: null
  },
  actions: {
    clearError ({commit}) {
      commit('clearError')
    },
    loadInitResource ({commit, state}) {
      if (state.initData == null) {
        return new Promise((resolve, reject) => {
          let param = {}
          let orginURL = window.location.href
          let coma = window.location.href.lastIndexOf('#/')
          if (coma > 0) {
            orginURL = window.location.href.substr(0, coma)
          }
          axios.get(orginURL + support.renderURLInit, param).then(function (response) {
            let serializable = response.data
            commit('setInitData', serializable)
            resolve(serializable)
          }).catch(function (error) {
            console.log(error)
            reject(error)
            commit('setInitData', {abc: 123})
          })
        })
      } else {
        return new Promise((resolve, reject) => {
          resolve(state.initData)
        })
      }
    },
    loadMenuConfigToDo ({commit, state}) {
      commit('setLoadingDynamicBtn', true)
      if (state.trangThaiHoSoList === null) {
        return new Promise((resolve, reject) => {
          store.dispatch('loadInitResource').then(function (result) {
            let param = {
              headers: {
                groupId: state.initData.groupId
              }
            }
            axios.get(state.initData.menuConfigToDo, param).then(function (response) {
              let serializable = response.data
              let menuData = []
              let index = 0
              for (let key in serializable.data) {
                let current = serializable.data[key]
                let menuDetail = {
                  'index': index,
                  'active': false,
                  'title': current['menuName'],
                  'id': current['menuGroup'],
                  'action': 'description',
                  'action_active': 'play_arrow',
                  'queryParams': current['queryParams']
                }
                index = index + 1
                let tableConfig = current['tableConfig']
                let buttonConfig = current['buttonConfig']
                if (tableConfig !== '' && tableConfig !== undefined && tableConfig !== 'undefined' && String(tableConfig).indexOf('{') !== -1 && String(tableConfig).indexOf('}') !== -1) {
                  menuDetail['tableConfig'] = JSON.parse(tableConfig)
                }
                if (buttonConfig !== '' && buttonConfig !== undefined && buttonConfig !== 'undefined' && String(buttonConfig).indexOf('{') !== -1 && String(buttonConfig).indexOf('}') !== -1) {
                  menuDetail['buttonConfig'] = JSON.parse(buttonConfig)
                }
                if (current.hasOwnProperty('steps')) {
                  if (current.steps.length > 1) {
                    menuDetail['items'] = current.steps
                  } else {
                    let stepsItems = []
                    stepsItems.push(current.steps)
                    menuDetail['items'] = stepsItems
                  }
                }
                menuData.push(menuDetail)
              }
              commit('setLoadingDynamicBtn', false)
              commit('setMenuConfigToDo', menuData)
              resolve(menuData)
            }).catch(function (error) {
              commit('setLoadingDynamicBtn', false)
              console.log(error)
              reject(error)
            })
          })
        })
      } else {
        return new Promise((resolve, reject) => {
          commit('setLoadingDynamicBtn', false)
          resolve(state.trangThaiHoSoList)
        })
      }
    },
    loadListThuTucHanhChinh ({commit, state}) {
      if (state.trangThaiHoSoList === null) {
        return new Promise((resolve, reject) => {
          store.dispatch('loadInitResource').then(function (result) {
            let param = {
              headers: {
                groupId: state.initData.groupId
              }
            }
            axios.get(state.initData.getListThuTucHanhChinh, param).then(function (response) {
              let serializable = response.data
              let thuTucArray = Array.from(serializable.data)
              thuTucArray.unshift({
                'serviceConfigId': '0',
                'serviceName': 'Toàn bộ thủ tục'
              })
              commit('setListThuTucHanhChinh', thuTucArray)
              resolve(thuTucArray)
            }).catch(function (error) {
              console.log(error)
              reject(error)
            })
          })
        })
      } else {
        return new Promise((resolve, reject) => {
          resolve(state.listThuTucHanhChinh)
        })
      }
    },
    loadingDataHoSo ({commit, state}, filter) {
      commit('setLoadingTable', true)
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let param = {
            headers: {
              groupId: state.initData.groupId
            },
            params: {
              start: filter.page * 15 - 15,
              end: filter.page * 15,
              agency: filter.agency,
              service: filter.service,
              template: filter.template
            }
          }
          axios.get(filter.queryParams, param).then(function (response) {
            let serializable = response.data
            commit('setLoadingTable', false)
            resolve(serializable)
          }).catch(function (error) {
            commit('setLoadingTable', false)
            console.log(error)
            reject(error)
          })
        })
      })
    },
    loadingCounterHoSo ({commit, state}, filter) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          let param = {
            headers: {
              groupId: state.initData.groupId
            }
          }
          axios.get(state.initData.counterMenuStep, param).then(function (response) {
            let serializable = response.data
            resolve(serializable)
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
        })
      })
    }
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setLoadingTable (state, payload) {
      state.loadingTable = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    setIndex (state, payload) {
      state.index = payload
    },
    setInitData (state, payload) {
      state.initData = payload
    },
    setMenuConfigToDo (state, payload) {
      state.trangThaiHoSoList = payload
    },
    setLoadingDynamicBtn (state, payload) {
      state.loadingDynamicBtn = payload
    },
    setListThuTucHanhChinh (state, payload) {
      state.listThuTucHanhChinh = payload
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    loadingTable (state) {
      return state.loadingTable
    },
    error (state) {
      return state.error
    },
    index (state) {
      return state.index
    },
    loadingMenuConfigToDo (state) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadMenuConfigToDo').then(function (result) {
          resolve(result)
        })
      })
    },
    loadingInitData (state) {
      return state.initData
    },
    loadingDynamicBtn (state) {
      return state.loadingDynamicBtn
    },
    loadingListThuTucHanhChinh () {
      return new Promise((resolve, reject) => {
        store.dispatch('loadListThuTucHanhChinh').then(function (result) {
          resolve(result)
        })
      })
    }
  }
})
