<template>
  <div>
    <div id="field1"></div>
    
    <v-layout wrap class="menu_header_list" :class='{"no__border__bottom": btnDynamics === null || btnDynamics === undefined || btnDynamics === "undefined" || (btnDynamics !== null && btnDynamics !== undefined && btnDynamics !== "undefined" && btnDynamics.length === 0)}'>
      <v-flex xs12 class="px-2">
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
      <v-btn color="primary" v-for="(item, index) in btnDynamics" v-bind:key="index" 
        v-on:click.native="btnActionEvent(item, index)" 
        v-if="String(item.form).indexOf('VIEW') < 0"
        :loading="loadingAction && index === indexAction"
        :disabled="loadingAction && index === indexAction"
      >
        {{item.title}}
        <span slot="loader">Loading...</span>
      </v-btn>
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
        <td class="text-xs-center px-0 py-0">
          <v-menu bottom left :nudge-left="30" :nudge-top="15" v-if="btnDynamics !== null || btnDynamics !== undefined || btnDynamics !== 'undefined'">
            <v-btn slot="activator" icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="(item, i) in btnDynamics" :key="i" v-if="String(item.form) !== 'NEW'">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-btn flat class="mx-0 px-0 my-0 py-0" block v-else>
            Chi tiết
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-right layout wrap" style="position: relative;">
      <div class="flex pagging-table px-2"> 
        <tiny-pagination :total="hosoDatasTotal" :page="hosoDatasPage" custom-class="custom-tiny-class" 
          @tiny:change-page="paggingData" ></tiny-pagination> 
      </div>
    </div>
    <v-dialog v-model="dialogAction" max-width="400" transition="fade-transition" persistent>
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title class="headline">{{itemAction.title}}</v-card-title>
          <v-btn icon dark class="mx-0 my-0 absolute__btn_panel" @click.native="dialogAction = false">
            <v-icon>clear</v-icon>
          </v-btn>
          <v-progress-linear v-if="loadingAction" class="my-0" :indeterminate="true"></v-progress-linear>
          <v-card-text class="pb-0 pt-4">
            <v-layout wrap>
              <v-flex xs12 class="px-2 pb-3">
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
              <v-flex xs12 class="px-2">
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
                  :rules="[v => !!v || 'dịch vụ bắt buộc phải chọn.']"
                  required
                ></v-select>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-3" flat="flat" @click.native="dialogAction = false"
              :loading="loadingAction"
              :disabled="loadingAction"
            >
            Quay lại
            <span slot="loader">Loading...</span>
            </v-btn>
            <v-btn color="primary" flat="flat" @click.native="doSubmitDialogAction(itemAction)"
              :loading="loadingAction"
              :disabled="loadingAction"
            >
            Đồng ý
            <span slot="loader">Loading...</span>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
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
    valid: true,
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
    templateNo: '',
    dialogAction: false,
    loadingAction: false,
    indexAction: -1,
    itemAction: {
      title: ''
    }
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
        vm.processListTTHC(currentQuery)
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
        if (vm.listThuTucHanhChinh === null || vm.listThuTucHanhChinh === undefined || (vm.listThuTucHanhChinh !== null && vm.listThuTucHanhChinh !== undefined && vm.listThuTucHanhChinh.length === 0)) {
          vm.processListTTHC(currentQuery)
        }
      }
    }
  },
  methods: {
    processListTTHC (currentQuery) {
      let vm = this
      console.log('processTTHC', (currentQuery.hasOwnProperty('service_config') && String(currentQuery.service_config) !== '0'))
      vm.$store.dispatch('loadListThuTucHanhChinh').then(function (result) {
        vm.listThuTucHanhChinh = result
        console.log('listThuTucHanhChinh', vm.listThuTucHanhChinh)
        if (currentQuery.hasOwnProperty('service_config') && String(currentQuery.service_config) !== '0') {
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
          vm.dichVuSelected = null
          vm.govAgencyCode = ''
          vm.serviceCode = ''
          vm.templateNo = ''
        }
        vm.doLoadingDataHoSo()
      })
    },
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
      } else {
        vm.templateNo = ''
      }
      vm.govAgencyCode = item.govAgencyCode
      vm.serviceCode = item.serviceCode
      vm.$router.push({
        path: current.path + queryString
      })
    },
    btnActionEvent (item, index) {
      let vm = this
      vm.itemAction = item
      vm.indexAction = index
      console.log('vm.itemAction', vm.itemAction)
      if (String(item.form) === 'NEW') {
        let isOpenDialog = true
        if (vm.dichVuSelected !== null && vm.dichVuSelected !== undefined && vm.dichVuSelected !== 'undefined' && vm.listDichVu !== null && vm.listDichVu !== undefined && vm.listDichVu.length === 1) {
          isOpenDialog = false
        }
        if (isOpenDialog) {
          vm.dialogAction = true
        } else {
          vm.doCreateDossier()
        }
      }
    },
    doCreateDossier () {
      let vm = this
      let data = {
        serviceCode: vm.serviceCode,
        govAgencyCode: vm.govAgencyCode,
        templateNo: vm.templateNo
      }
      vm.loadingAction = true
      vm.$store.dispatch('postDossier', data).then(function (result) {
        vm.loadingAction = false
        vm.indexAction = -1
        router.push({
          path: '/danh-sach-ho-so/' + vm.index + '/ho-so/' + result.dossierId + '/' + vm.itemAction.form,
          query: vm.$router.history.current.query
        })
      })
    },
    doSubmitDialogAction (item) {
      let vm = this
      if (vm.$refs.form.validate()) {
        vm.doCreateDossier()
      }
    }
  }
}
</script>
