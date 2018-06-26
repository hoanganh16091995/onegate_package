<template>
  <div>
    <v-layout wrap class="menu_header_list" :class='{"no__border__bottom": btnDynamics === null || btnDynamics === undefined || btnDynamics === "undefined" || (btnDynamics !== null && btnDynamics !== undefined && btnDynamics !== "undefined" && btnDynamics.length === 0)}'>
      <v-flex xs12 sm6 class="px-2">
        <v-select
          :items="listThuTucHanhChinh"
          v-model="thuTucHanhChinhSelected"
          label="Thủ tục:"
          autocomplete
          placeholder="chọn thủ tục hành chính"
          item-text="serviceName"
          item-value="serviceConfigId"
          return-object
          :hide-selected="true"
          @change = "changeServiceConfigs"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm6 class="px-2">
        <v-select
          :items="listDichVu"
          v-model="dichVuSelected"
          label="Dịch vụ:"
          autocomplete
          placeholder="chọn dịch vụ"
          item-text="optionName"
          item-value="processOptionId"
          return-object
          :hide-selected="true"
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout wrap v-if="loadingDynamicBtn">
      <v-flex xs12 sm6>
      </v-flex>
      <v-flex xs12 sm2>
       <content-placeholders class="mt-3">
        <content-placeholders-text :lines="1" />
      </content-placeholders>
      </v-flex>
      <v-flex xs12 sm2>
       <content-placeholders class="mt-3">
        <content-placeholders-text :lines="1" />
      </content-placeholders>
      </v-flex>
      <v-flex xs12 sm2>
       <content-placeholders class="mt-3">
        <content-placeholders-text :lines="1" />
      </content-placeholders>
      </v-flex>
    </v-layout>
    <div v-if="!loadingDynamicBtn" class="btn_wrap_actions">
      <v-btn color="primary" v-for="(item, index) in btnDynamics" v-bind:key="index">{{item.title}}</v-btn>
    </div>
    <content-placeholders v-if="loadingTable">
      <content-placeholders-text :lines="22" />
    </content-placeholders>
    <v-data-table v-else
        :headers="headers"
        :items="hosoDatas"
        :total-items="hosoDatasTotal"
        v-model="selected"
        item-key="dossierIdCTN"
        select-all
        class="table-landing table-bordered"
        hide-actions
      >
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
          <span slot="activator">
            {{ props.header.text }}
          </span>
          <span>
            {{ props.header.text }}
          </span>
        </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox
            v-model="props.selected"
            primary
            hide-details
            color="primary"
          ></v-checkbox>
        </td>
        <td>{{ hosoDatasPage * 15 - 15 + props.index + 1 }}</td>

        <td v-for="(itemHeader, indexHeader) in headers" v-bind:key="indexHeader"
          :class="itemHeader['class_column']"
          v-if="itemHeader.hasOwnProperty('value')"
        >
          {{ props.item[itemHeader.value] }}
        </td>
        <td class="text-xs-center">
          <v-menu bottom left :nudge-left="30" :nudge-top="15">
            <v-btn slot="activator" icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="(item, i) in btnDynamics" :key="i">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
              <v-list-tile v-if="btnDynamics === null || btnDynamics === undefined || btnDynamics === 'undefined'">
                <v-list-tile-title>Xem chi tiết</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-right layout wrap" style="position: relative;">
      <div class="flex pagging-table px-2"> 
        <tiny-pagination :total="hosoDatasTotal" :page="hosoDatasPage" custom-class="custom-tiny-class" 
          @tiny:change-page="paggingData" ></tiny-pagination> 
      </div>
    </div>
  </div>
</template>

<script>
import TinyPagination from './pagging/hanghai_pagination.vue'
import router from '@/router'
export default {
  props: ['index'],
  components: {
    'tiny-pagination': TinyPagination
  },
  data: () => ({
    isCallBack: true,
    trangThaiHoSoList: null,
    listDichVu: [],
    dichVuSelected: null,
    btnDynamics: [],
    btnStepsDynamics: [],
    loading: true,
    headers: [],
    hosoDatas: [],
    hosoDatasTotal: 0,
    hosoDatasPage: 1,
    selected: [],
    listThuTucHanhChinh: [],
    thuTucHanhChinhSelected: null,
    govAgencyCode: '',
    serviceCode: '',
    templateNo: ''
  }),
  computed: {
    loadingDynamicBtn () {
      return this.$store.getters.loadingDynamicBtn
    },
    loadingTable () {
      return this.$store.getters.loadingTable
    }
  },
  created () {
    var vm = this
    vm.$nextTick(function () {
      let query = vm.$router.history.current.query
      if (query.hasOwnProperty('page') && query['page'] !== 1) {
        vm.hosoDatasPage = query['page']
      } else {
        vm.hosoDatasPage = 1
      }
    })
  },
  updated () {
    var vm = this
    vm.$nextTick(function () {
      let currentParams = vm.$router.history.current.params
      let currentQuery = vm.$router.history.current.query
      if (currentParams.hasOwnProperty('index') && vm.isCallBack) {
        vm.isCallBack = false
        vm.$store.getters.loadingListThuTucHanhChinh.then(function (result) {
          vm.listThuTucHanhChinh = result
          if (currentQuery.hasOwnProperty('service_config')) {
            for (let key in vm.listThuTucHanhChinh) {
              if (String(vm.listThuTucHanhChinh[key].serviceConfigId) === String(currentQuery.service_config)) {
                vm.thuTucHanhChinhSelected = vm.listThuTucHanhChinh[key]
                if (vm.thuTucHanhChinhSelected !== null && vm.thuTucHanhChinhSelected !== undefined && vm.thuTucHanhChinhSelected.hasOwnProperty('options')) {
                  vm.govAgencyCode = vm.thuTucHanhChinhSelected.govAgencyCode
                  vm.serviceCode = vm.thuTucHanhChinhSelected.serviceCode
                  if (currentQuery.hasOwnProperty('template_no')) {
                    vm.listDichVu = vm.thuTucHanhChinhSelected.options
                    for (let keyDv in vm.listDichVu) {
                      if (vm.listDichVu[keyDv].templateNo === currentQuery.template_no) {
                        vm.dichVuSelected = vm.listDichVu[keyDv]
                        vm.templateNo = vm.dichVuSelected.templateNo
                      }
                    }
                  } else {
                    vm.listDichVu = []
                    vm.dichVuSelected = null
                    vm.govAgencyCode = ''
                    vm.serviceCode = ''
                    vm.templateNo = ''
                  }
                }
                break
              }
            }
          } else {
            vm.thuTucHanhChinhSelected = null
          }
          vm.doLoadingDataHoSo()
        })
        if (vm.trangThaiHoSoList === null) {
          vm.$store.commit('setLoadingDynamicBtn', true)
          setTimeout(() => {
            vm.$store.dispatch('loadMenuConfigToDo').then(function (result) {
              vm.trangThaiHoSoList = result
              vm.headers = vm.trangThaiHoSoList[vm.index]['tableConfig']['headers']
              vm.btnDynamics = vm.trangThaiHoSoList[vm.index]['buttonConfig']
              if (currentQuery.hasOwnProperty('step')) {
                for (let key in vm.trangThaiHoSoList[vm.index]['items']) {
                  let currentStep = vm.trangThaiHoSoList[vm.index]['items'][key]
                  if (String(currentStep.stepCode) === String(currentQuery.step)) {
                    let buttonConfig = currentStep.buttonConfig
                    if (buttonConfig !== '' && buttonConfig !== undefined && buttonConfig !== 'undefined' && String(buttonConfig).indexOf('{') !== -1 && String(buttonConfig).indexOf('}') !== -1) {
                      vm.btnDynamics = JSON.parse(buttonConfig)
                    } else {
                      vm.btnDynamics = []
                    }
                    break
                  }
                }
              }
              vm.$store.commit('setLoadingDynamicBtn', false)
            })
          }, 200)
        }
      }
    })
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      let vm = this
      let currentQuery = newRoute.query
      if (currentQuery.hasOwnProperty('q')) {
        vm.$store.commit('setLoadingDynamicBtn', true)
        vm.headers = vm.trangThaiHoSoList[vm.index]['tableConfig']['headers']
        vm.btnDynamics = vm.trangThaiHoSoList[vm.index]['buttonConfig']
        if (currentQuery.hasOwnProperty('step')) {
          for (let key in vm.trangThaiHoSoList[vm.index]['items']) {
            let currentStep = vm.trangThaiHoSoList[vm.index]['items'][key]
            if (String(currentStep.stepCode) === String(currentQuery.step)) {
              let buttonConfig = currentStep.buttonConfig
              if (buttonConfig !== '' && buttonConfig !== undefined && buttonConfig !== 'undefined' && String(buttonConfig).indexOf('{') !== -1 && String(buttonConfig).indexOf('}') !== -1) {
                vm.btnDynamics = JSON.parse(buttonConfig)
              } else {
                vm.btnDynamics = []
              }
              break
            }
          }
        }
        if (currentQuery.hasOwnProperty('page')) {
          vm.hosoDatasPage = currentQuery.page
        } else {
          vm.hosoDatasPage = 1
        }
        vm.$store.commit('setLoadingDynamicBtn', false)
        console.log('watch: landing')
        vm.doLoadingDataHoSo()
      }
    }
  },
  methods: {
    paggingData (config) {
      let vm = this
      let current = vm.$router.history.current
      let newQuery = current.query
      let queryString = '?'
      newQuery['page'] = ''
      for (let key in newQuery) {
        if (newQuery[key] !== '' && newQuery[key] !== 'undefined' && newQuery[key] !== undefined) {
          queryString += key + '=' + newQuery[key] + '&'
        }
      }
      queryString += 'page=' + config.page
      vm.$router.push({
        path: current.path + queryString
      })
    },
    doLoadingDataHoSo () {
      let vm = this
      let currentQuery = router.history.current.query
      console.log('doLoadingDataHoSo govAgencyCode', vm.govAgencyCode)
      console.log('doLoadingDataHoSo serviceCode', vm.serviceCode)
      console.log('doLoadingDataHoSo templateNo', vm.templateNo)
      if (currentQuery.hasOwnProperty('q')) {
        let filter = {
          queryParams: currentQuery.q,
          page: vm.hosoDatasPage,
          agency: vm.govAgencyCode,
          service: vm.serviceCode,
          template: vm.templateNo
        }
        vm.$store.dispatch('loadingDataHoSo', filter).then(function (result) {
          vm.hosoDatas = result.data
          vm.hosoDatasTotal = result.total
        })
      }
    },
    changeServiceConfigs (item) {
      if (item.hasOwnProperty('options')) {
        this.listDichVu = item.options
      } else {
        this.listDichVu = []
      }
      if (this.listDichVu !== null && this.listDichVu !== undefined && this.listDichVu !== 'undefined' && this.listDichVu.length > 0) {
        this.dichVuSelected = this.listDichVu[0]
        this.templateNo = this.dichVuSelected.templateNo
      } else {
        this.dichVuSelected = null
      }
      let vm = this
      let current = vm.$router.history.current
      let newQuery = current.query
      let queryString = '?'
      newQuery['service_config'] = ''
      newQuery['template_no'] = ''
      for (let key in newQuery) {
        if (newQuery[key] !== '' && newQuery[key] !== 'undefined' && newQuery[key] !== undefined) {
          queryString += key + '=' + newQuery[key] + '&'
        }
      }
      queryString += 'service_config=' + item.serviceConfigId
      if (this.listDichVu !== null && this.listDichVu !== undefined && this.listDichVu !== 'undefined' && this.listDichVu.length > 0) {
        queryString += '&template_no=' + this.dichVuSelected.templateNo
      }
      vm.govAgencyCode = item.govAgencyCode
      vm.serviceCode = item.serviceCode
      vm.$router.push({
        path: current.path + queryString
      })
    }
  }
}
</script>
