<template>
  <v-form v-model="validTNHS" ref="formTiepNhanHoSo" lazy-validation>
    <div style="position: relative;">
      <v-expansion-panel class="expansion-pl">
        <v-expansion-panel-content hide-actions value="1">
          <div slot="header"><div class="background-triangle-small"> I. </div>THÔNG TIN CHUNG</div>
          <thong-tin-chung ref="thongtinchung"></thong-tin-chung>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>
    <!--  -->
    <thong-tin-chu-ho-so ref="thongtinchuhoso"></thong-tin-chu-ho-so>
    <!--  -->
    <div style="position: relative;">
      <v-expansion-panel class="expansion-pl">
        <v-expansion-panel-content hide-actions value="1">
          <div slot="header">
            <div class="background-triangle-small"> IV.</div>
            THÀNH PHẦN HỒ SƠ &nbsp;&nbsp;&nbsp;&nbsp; 
          </div>
          <thanh-phan-ho-so ref="thanhphanhoso"></thanh-phan-ho-so>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>
    <!--  -->
    <div style="position: relative;">
      <v-expansion-panel class="expansion-pl">
        <v-expansion-panel-content hide-actions value="1">
          <div slot="header"><div class="background-triangle-small"> V. </div>LỆ PHÍ</div>
          <le-phi ref="lephi"></le-phi>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>
    <!--  -->
    <div style="position: relative;">
      <v-expansion-panel class="expansion-pl">
        <v-expansion-panel-content hide-actions value="1">
          <div slot="header"><div class="background-triangle-small"> VI. </div>DỊCH VỤ CHUYỂN PHÁT KẾT QUẢ</div>
          <dich-vu-chuyen-phat-ket-qua ref="dichvuchuyenphatketqua"></dich-vu-chuyen-phat-ket-qua>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>
    <!--  -->
    <v-tabs icons-and-text centered class="mb-4">
      <v-tabs-slider color="primary"></v-tabs-slider>
      <v-tab href="#tab-1" @click="luuHoSo">
        <v-btn flat class="px-0 py-0 mx-0 my-0">
          Lưu &nbsp;
          <v-icon>save</v-icon>
        </v-btn>
      </v-tab>
      <v-tab href="#tab-2"> 
        <v-btn flat class="px-0 py-0 mx-0 my-0">
          Tiếp nhận &nbsp;
          <v-icon>save</v-icon>
        </v-btn>
      </v-tab>
      <v-tab href="#tab-3">
        <v-btn flat class="px-0 py-0 mx-0 my-0">
          Bổ sung &nbsp;
          <v-icon>save</v-icon>
        </v-btn>
      </v-tab>
      <v-tab href="#tab-4">
        <v-btn flat class="px-0 py-0 mx-0 my-0">
          Trả kết quả &nbsp;
          <v-icon>send</v-icon>
        </v-btn>
      </v-tab>
      <v-tab href="#tab-5" @click="goBack">
        <v-btn flat class="px-0 py-0 mx-0 my-0">
          Quay lại &nbsp;
          <v-icon>undo</v-icon>
        </v-btn>
      </v-tab>
    </v-tabs>
  </v-form>
</template>

<script>
import router from '@/router'
// import * as utils from '../store/onegate_utils'
import ThongTinChung from './TiepNhan/TiepNhanHoSo_ThongTinChung.vue'
import ThongTinChuHoSo from './TiepNhan/TiepNhanHoSo_ThongTinChuHoSo.vue'
import ThanhPhanHoSo from './TiepNhan/TiepNhanHoSo_ThanhPhanHoSo.vue'
import LePhi from './TiepNhan/TiepNhanHoSo_LePhi.vue'
import DichVuChuyenPhatKetQua from './TiepNhan/TiepNhanHoSo_DichVuChuyenPhatKetQua.vue'

export default {
  props: ['index', 'id', 'formCode'],
  components: {
    'thong-tin-chung': ThongTinChung,
    'thong-tin-chu-ho-so': ThongTinChuHoSo,
    'thanh-phan-ho-so': ThanhPhanHoSo,
    'le-phi': LePhi,
    'dich-vu-chuyen-phat-ket-qua': DichVuChuyenPhatKetQua
  },
  data: () => ({
    validTNHS: false,
    dossierId: ''
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    thongTinChungHoSo () {
      return this.$store.getters.thongTinChungHoSo
    }
  },
  created () {
    var vm = this
    vm.$nextTick(function () {
      console.log(vm.index)
    })
  },
  watch: {
  },
  methods: {
    initData: function (data) {
      var vm = this
      vm.$store.dispatch('getDetailDossier', data).then(result => {
        // call initData thong tin chu ho so
        vm.$refs.thongtinchuhoso.initData(result)
        // call initData thanh phan ho so
        vm.$refs.thanhphanhoso.initData(result)
        // call initData dich vu ket qua
        vm.$refs.dichvuchuyenphatketqua.initData(result)

        vm.$refs.thongtinchung.initData(result)
        vm.dossierId = data
      }).catch(reject => {
      })
    },
    luuHoSo () {
      var vm = this
      console.log('luu Ho So--------------------')
      vm.$store.commit('setPrintPH', false)
      let thongtinchung = this.$refs.thongtinchung.thongTinChungHoSo
      let thongtinchuhoso = this.$refs.thongtinchuhoso.thongTinChuHoSo
      let thongtinnguoinophoso = this.$refs.thongtinchuhoso.thongTinNguoiNopHoSo
      let thanhphanhoso = this.$refs.thanhphanhoso.dossierTemplateItems
      let lephi = this.$refs.lephi.lePhi
      let dichvuchuyenphatketqua = this.$refs.dichvuchuyenphatketqua.dichVuChuyenPhatKetQua
      console.log('validate TNHS formThongtinchuhoso.validate()', vm.$refs.formTiepNhanHoSo.validate())
      if (vm.$refs.formTiepNhanHoSo.validate()) {
        vm.$store.dispatch('getCpsAuthen').then(resultAuthen => {
          let dossierFiles = vm.$refs.thanhphanhoso.dossierFilesItems
          let dossierTemplates = thanhphanhoso
          let listAction = []
          let listDossierMark = []
          if (dossierTemplates) {
            dossierTemplates.forEach(function (val, index) {
              if (val.partType === 1) {
                val.cps_auth = resultAuthen
                val['dossierId'] = vm.dossierId
                listDossierMark.push(vm.$store.dispatch('postDossierMark', val))
              }
            })
            dossierFiles.forEach(function (value, index) {
              if (value.eForm) {
                value.cps_auth = resultAuthen
                value['dossierId'] = vm.dossierId
                listAction.push(vm.$store.dispatch('putAlpacaForm', value))
              }
            })
          }
          // let dataVNPOST = {
          //   senderProvince: 10,
          //   senderAddress: thongtinnguoinophoso.delegateApplicantName,
          //   senderName: thongtinnguoinophoso.senderName,
          //   senderTel: thongtinnguoinophoso.delegateContactTelNo,
          //   receiverName: thongtinnguoinophoso.delegateApplicantName,
          //   receiverAddress: dichvuchuyenphatketqua.postalAddress,
          //   receiverTel: dichvuchuyenphatketqua.postalTelNo,
          //   receiverProvince: dichvuchuyenphatketqua.vnPostCode
          // }
          Promise.all(listDossierMark).then(values => {
          }).catch(function (xhr) {
          })
          // vm.$store.dispatch('postVNPOST', dataVNPOST).then(function (result) {
          //   console.log('VNPOST Sucess-------------')
          // }).catch(function (xhr) {
          //   console.log('VNPOST Error-------------')
          // })
          Promise.all(listAction).then(values => {
            console.log(values)
            let tempData = Object.assign(thongtinchung, thongtinchuhoso, thongtinnguoinophoso, thanhphanhoso, lephi, dichvuchuyenphatketqua)
            console.log('data put dossier -->', tempData)
            vm.$store.dispatch('getCpsAuthen').then(resultAuthenPut => {
              tempData['cps_auth'] = resultAuthenPut
              tempData['dossierId'] = vm.dossierId
              vm.$store.dispatch('putDossier', tempData).then(function (result) {
              })
            }).catch(reject => {
              console.log(reject)
            })
          }).catch(reject => {
            console.log('reject=============', reject)
          })
        }).catch(reject => {
        })
      }
    },
    tiepNhanHoSo () {
      var vm = this
      vm.$store.commit('setPrintPH', false)
      let thongtinchung = this.$store.getters.thongTinChungHoSo
      let thongtinchuhoso = this.$store.getters.thongTinChuHoSo
      let thongtinnguoinophoso = this.$store.getters.thongTinNguoiNopHoSo
      let thanhphanhoso = this.$store.getters.thanhPhanHoSo
      let lephi = this.$store.getters.lePhi
      let dichvuchuyenphatketqua = this.$store.getters.dichVuChuyenPhatKetQua
      console.log('thongtinchung:', thongtinchung)
      console.log('thongtinchuhoso:', thongtinchuhoso)
      console.log('thongtinnguoinophoso:', thongtinnguoinophoso)
      console.log('thanhphanhoso:', thanhphanhoso)
      console.log('lephi:', lephi)
      console.log('dichvuchuyenphatketqua:', dichvuchuyenphatketqua)
      // Save dossier mark and save Alpaca
      console.log('validate TNHS formThongtinchuhoso.validate()', vm.$refs.formTiepNhanHoSo.validate())
      let tempData = Object.assign(thongtinchung, thongtinchuhoso, thongtinnguoinophoso, thanhphanhoso, lephi, dichvuchuyenphatketqua)
      console.log('tempData------------', tempData)
      vm.$store.dispatch('getCpsAuthen').then(result => {
        let dataPostAction = {
          dossierId: vm.dossierId,
          actionCode: 10000,
          cps_auth: result
        }
        vm.$store.dispatch('postAction', dataPostAction).then(function (result) {
          // utils.showMessageToastr('success', 'Tiếp nhận hồ sơ thành công')
          router.push('/danh-sach-ho-so/2')
        })
      }).catch(reject => {
      })
    },
    boSungHoSo () {
      var vm = this
      console.log('luu Ho So--------------------')
      vm.$store.commit('setPrintPH', false)
      let thongtinchung = this.$refs.thongtinchung.thongTinChungHoSo
      let thongtinchuhoso = this.$refs.thongtinchuhoso.thongTinChuHoSo
      let thongtinnguoinophoso = this.$refs.thongtinchuhoso.thongTinNguoiNopHoSo
      let thanhphanhoso = this.$refs.thanhphanhoso.dossierTemplateItems
      let lephi = this.$refs.lephi.lePhi
      let dichvuchuyenphatketqua = this.$refs.dichvuchuyenphatketqua.dichVuChuyenPhatKetQua
      console.log('validate TNHS formThongtinchuhoso.validate()', vm.$refs.formTiepNhanHoSo.validate())
      if (vm.$refs.formTiepNhanHoSo.validate()) {
        vm.$store.dispatch('getCpsAuthen').then(resultAuthen => {
          let dossierFiles = vm.$refs.thanhphanhoso.dossierFilesItems
          let dossierTemplates = thanhphanhoso
          let listAction = []
          let listDossierMark = []
          if (dossierTemplates) {
            dossierTemplates.forEach(function (val, index) {
              if (val.partType === 1) {
                val.cps_auth = resultAuthen
                val['dossierId'] = vm.dossierId
                listDossierMark.push(vm.$store.dispatch('postDossierMark', val))
              }
            })
            dossierFiles.forEach(function (value, index) {
              if (value.eForm) {
                value.cps_auth = resultAuthen
                value['dossierId'] = vm.dossierId
                listAction.push(vm.$store.dispatch('putAlpacaForm', value))
              }
            })
          }
          Promise.all(listDossierMark).then(values => {
          }).catch(function (xhr) {
          })
          Promise.all(listAction).then(values => {
            console.log(values)
            let tempData = Object.assign(thongtinchung, thongtinchuhoso, thongtinnguoinophoso, thanhphanhoso, lephi, dichvuchuyenphatketqua)
            console.log('data put dossier -->', tempData)
            vm.$store.dispatch('getCpsAuthen').then(resultAuthenPut => {
              tempData['cps_auth'] = resultAuthenPut
              tempData['dossierId'] = vm.dossierId
              vm.$store.dispatch('putDossier', tempData).then(function (result) {
                let dataPostAction = {
                  dossierId: vm.dossierId,
                  actionCode: 20000,
                  cps_auth: resultAuthenPut
                }
                vm.$store.dispatch('postAction', dataPostAction).then(function (result) {
                })
              })
            }).catch(reject => {
              console.log(reject)
            })
          }).catch(reject => {
            console.log('reject=============', reject)
          })
        }).catch(reject => {
        })
      }
    },
    goBack () {
      let vm = this
      let currentParams = vm.$router.history.current.params
      let currentQuery = vm.$router.history.current.query
      vm.$router.push({
        path: '/danh-sach-ho-so/' + currentParams.index,
        query: currentQuery
      })
    }
  }
}
</script>
