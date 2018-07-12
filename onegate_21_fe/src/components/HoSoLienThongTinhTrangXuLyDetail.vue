<template>
  <div>
    <v-expansion-panel expand class="expansion-p0">
      <v-expansion-panel-content :value="true">
        <div slot="header">
          <div class="background-triangle-small">I. </div>THÔNG TIN HỒ SƠ
        </div>
        <thongtinchunghoso :dataDetail="thongTinLienThong"></thongtinchunghoso>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!--  -->
    <v-expansion-panel expand class="expansion-p0">
      <v-expansion-panel-content :value="true">
        <div slot="header">
          <div class="background-triangle-small">II. </div>TÌNH TRẠNG XỬ LÝ LIÊN THÔNG
        </div>
        <!--  -->
        <v-card>
          <v-expansion-panel expand class="expansion-p0">
            <v-expansion-panel-content :value="true">
              <div slot="header" class="pl-3">
                CƠ QUAN LIÊN THÔNG: {{thongTinLienThong.govAgencyName}}
              </div>
              <v-card class="bdt-0">
                <v-card-text>
                  <v-layout wrap>
                    <v-flex xs12 sm2>
                      <content-placeholders class="mt-1" v-if="loading">
                        <content-placeholders-text :lines="1" />
                      </content-placeholders>
                      <v-subheader v-else class="pl-0 text-header">Tình trạng: </v-subheader>
                    </v-flex>
                    <v-flex xs12 sm10>
                      <content-placeholders class="mt-1" v-if="loading">
                        <content-placeholders-text :lines="1" />
                      </content-placeholders>
                      <v-subheader v-else class="pl-0 text-header header-text-field">  {{thongTinLienThong.dossierSubStatusText}} </v-subheader>
                    </v-flex>
                    <!--  -->
                    <v-flex xs12 sm2>
                      <content-placeholders class="mt-1" v-if="loading">
                        <content-placeholders-text :lines="1" />
                      </content-placeholders>
                      <v-subheader v-else class="pl-0 text-header">Ngày gửi hồ sơ: </v-subheader>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <content-placeholders class="mt-1" v-if="loading">
                        <content-placeholders-text :lines="1" />
                      </content-placeholders>
                      <v-subheader v-else class="pl-0 text-header header-text-field"> {{thongTinLienThong.submitDate|dateTimeView}}</v-subheader>
                    </v-flex>
                    <!--  -->
                    <v-flex xs12 sm2>
                      <content-placeholders class="mt-1" v-if="loading">
                        <content-placeholders-text :lines="1" />
                      </content-placeholders>
                      <v-subheader v-else class="pl-0 text-header">Ngày tiếp nhận: </v-subheader>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <content-placeholders class="mt-1" v-if="loading">
                        <content-placeholders-text :lines="1" />
                      </content-placeholders>
                      <v-subheader v-else class="pl-0 text-header header-text-field"> {{thongTinLienThong.receiveDate|dateTimeView}}</v-subheader>
                    </v-flex>
                    <!--  -->
                    <v-flex xs12 sm2>
                      <content-placeholders class="mt-1" v-if="loading">
                        <content-placeholders-text :lines="1" />
                      </content-placeholders>
                      <v-subheader v-else class="pl-0 text-header">Ngày hẹn trả: </v-subheader>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <content-placeholders class="mt-1" v-if="loading">
                        <content-placeholders-text :lines="1" />
                      </content-placeholders>
                      <v-subheader v-else class="pl-0 text-header header-text-field"> {{thongTinLienThong.dueDate|dateTimeView}}</v-subheader>
                    </v-flex>
                    <!--  -->
                    <v-flex xs12 sm2>
                      <content-placeholders class="mt-1" v-if="loading">
                        <content-placeholders-text :lines="1" />
                      </content-placeholders>
                      <v-subheader v-else class="pl-0 text-header">Ngày hoàn thành: </v-subheader>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <content-placeholders class="mt-1" v-if="loading">
                        <content-placeholders-text :lines="1" />
                      </content-placeholders>
                      <v-subheader v-else class="pl-0 text-header header-text-field"> {{thongTinLienThong.releaseDate|dateTimeView}}</v-subheader>
                    </v-flex>
                    <!--  -->
                    <v-flex xs12 sm2>
                      <content-placeholders class="mt-1" v-if="loading">
                        <content-placeholders-text :lines="1" />
                      </content-placeholders>
                      <v-subheader v-else class="pl-0 text-header">Chi tiết nhật ký: </v-subheader>
                    </v-flex>
                    <!-- <v-flex xs12 sm10></v-flex> -->
                    <v-flex xs12 sm10>
                      <content-placeholders class="mt-1" v-if="loading">
                        <content-placeholders-text :lines="5" />
                      </content-placeholders>
                      <div class="mb-1" v-for="item in lienThongLogs" :key="item.dossierSyncId">
                        - {{item.createDate|dateTimeView}}: {{item.actionName}}
                      </div>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card>
        <!--  -->
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
import router from '@/router'
import thongtinchunghoso from './form_xu_ly/ThongTinChungHoSo.vue'
export default {
  components: {
    'thongtinchunghoso': thongtinchunghoso
  },
  data: () => ({
    thongTinLienThong: {},
    lienThongLogs: []
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {},
  created () {
    var vm = this
    vm.$nextTick(function () {})
  },
  methods: {
    initData (classPK) {
      var vm = this
      vm.$store.dispatch('getDetailDossier', classPK).then(result => {
        vm.thongTinLienThong = result
      }).catch(reject => {
        console.log(reject)
      })
      let data = {
        dossierId: classPK,
        info: 1
      }
      vm.$store.dispatch('loadDossierSyncs', data).then(result => {
        vm.lienThongLogs = result
      }).catch(reject => {
        console.log(reject)
      })
    },
    goBack () {
      window.history.back()
    }
  },
  filters: {
    dateTimeView (arg) {
      if (arg) {
        let value = new Date(arg)
        return `${value.getDate().toString().padStart(2, '0')}/${(value.getMonth() + 1).toString().padStart(2, '0')}/${value.getFullYear()}  ${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}`
      } else {
        return ''
      }
    }
  }
}
</script>
