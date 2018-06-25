<template>
  <div>
    <v-layout wrap class="menu_header_list">
      <v-flex xs12 sm8 class="px-2">
        <v-select
          :items="items"
          v-model="e1"
          label="Select"
          autocomplete
          placeholder="chon thu tuc hanh chinh"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm4 class="px-2">
        <v-select
          :items="items"
          v-model="e1"
          label="Select"
          autocomplete
          placeholder="chon thu tuc hanh chinh"
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
      <content-placeholders-img />
      <content-placeholders-heading />
    </content-placeholders>
    <v-data-table v-else
        :headers="headers"
        :items="hosoDatas"
        :total-items="hosoDatasTotal"
        v-model="selected"
        item-key="dossierId"
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
            :input-value="props.selected"
            primary
            hide-details
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
            </v-list>
          </v-menu>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import router from '@/router'
export default {
  props: ['index'],
  data: () => ({
    isCallBack: true,
    trangThaiHoSoList: null,
    items: [
      { text: 'State 1' },
      { text: 'State 2' },
      { text: 'State 3' },
      { text: 'State 4' },
      { text: 'State 5' },
      { text: 'State 6' },
      { text: 'State 7' }
    ],
    e1: null,
    btnDynamics: [],
    btnStepsDynamics: [],
    loading: true,
    headers: [],
    hosoDatas: [],
    hosoDatasTotal: 0,
    hosoDatasPage: 1,
    selected: []
  }),
  computed: {
    loadingDynamicBtn () {
      return this.$store.getters.loadingDynamicBtn
    },
    loadingTable () {
      return this.$store.getters.loadingTable
    }
  },
  updated () {
    var vm = this
    vm.$nextTick(function () {
      let currentParams = vm.$router.history.current.params
      if (currentParams.hasOwnProperty('index') && vm.isCallBack) {
        vm.isCallBack = false
        if (vm.trangThaiHoSoList === null) {
          setTimeout(() => {
            vm.$store.dispatch('loadMenuConfigToDo').then(function (result) {
              vm.trangThaiHoSoList = result
              vm.headers = vm.trangThaiHoSoList[vm.index]['tableConfig']['headers']
              vm.btnDynamics = vm.trangThaiHoSoList[vm.index]['buttonConfig']
              vm.doLoadingDataHoSo()
            })
          }, 200)
        }
      }
    })
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      let vm = this
      let currentQuery = router.history.current.query
      if (currentQuery.hasOwnProperty('q')) {
        vm.$store.commit('setLoadingDynamicBtn', true)
        vm.headers = vm.trangThaiHoSoList[vm.index]['tableConfig']['headers']
        vm.btnDynamics = vm.trangThaiHoSoList[vm.index]['buttonConfig']
        if (currentQuery.hasOwnProperty('step')) {
          for (let key in vm.trangThaiHoSoList[vm.index]['items']) {
            let currentStep = vm.trangThaiHoSoList[vm.index]['items'][key]
            if (currentStep.stepCode === currentQuery.step) {
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
        vm.doLoadingDataHoSo()
      }
    }
  },
  methods: {
    doLoadingDataHoSo () {
      let vm = this
      let currentQuery = router.history.current.query
      if (currentQuery.hasOwnProperty('q')) {
        let filter = {
          queryParams: currentQuery.q
        }
        vm.$store.dispatch('loadingDataHoSo', filter).then(function (result) {
          vm.hosoDatas = result.data
          vm.hosoDatasTotal = result.total
        })
      }
    }
  }
}
</script>
