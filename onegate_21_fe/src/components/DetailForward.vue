<template>
  <div>
    <tiep-nhan-ho-so-detail 
      v-if="formCode === 'NEW' || formCode === 'UPDATE'" 
      ref="tiepnhanhosodetail"
    ></tiep-nhan-ho-so-detail>
    <xem-chi-tiet-ho-so-detail 
      v-if="formCode === 'VIEW_01'" 
      ref="xemchitiethosodetail"></xem-chi-tiet-ho-so-detail>
    <hoan-thien-bo-sung-ho-so-detail
      v-if="formCode === 'ACTION_03' && (step === '500' || step === '510')"
      ref="hoanthienbosunghosodetail"></hoan-thien-bo-sung-ho-so-detail>
    <!-- <tiep-nhan-ho-so-truc-tuyen-detail ref="tiepnhanhosotructuyendetail"></tiep-nhan-ho-so-truc-tuyen-detail> -->
    <tra-ket-qua-detail 
      v-if="formCode === 'ACTION_03' && (step === '300' || step === '301')"
      ref="traketquadetail"></tra-ket-qua-detail>
    <fee-detail 
      v-if="formCode === 'ACTION_03' && step === '600'"
      ref="feedetail"></fee-detail>
    <!-- <chuyen-phat-ket-qua-detail ref="chuyenphatketquadetail"></chuyen-phat-ket-qua-detail> -->
  </div>
</template>

<script>
import ChamQuaHanDetail from './ChamQuaHanDetail.vue'
import ChuyenPhatKetQuaDetail from './ChuyenPhatKetQuaDetail.vue'
import FeeDetail from './FeeDetail.vue'
import HoanThienBoSungHoSoDetail from './HoanThienBoSungHoSoDetail.vue'
import HoSoLienThongDetail from './HoSoLienThongDetail.vue'
import HoSoLienThongTinhTrangXuLyDetail from './HoSoLienThongTinhTrangXuLyDetail.vue'
import TiepNhanHoSoDetail from './TiepNhanHoSoDetail.vue'
import TiepNhanHoSoTrucTuyenDetail from './TiepNhanHoSoTrucTuyenDetail.vue'
import TraKetQuaDetail from './TraKetQuaDetail.vue'
import XemChiTietHoSoDetail from './XemChiTietHoSoDetail.vue'

export default {
  props: ['id', 'formCode'],
  components: {
    'cham-qua-han-detail': ChamQuaHanDetail,
    'chuyen-phat-ket-qua-detail': ChuyenPhatKetQuaDetail,
    'fee-detail': FeeDetail,
    'hoan-thien-bo-sung-ho-so-detail': HoanThienBoSungHoSoDetail,
    'ho-so-lien-thong-detail': HoSoLienThongDetail,
    'ho-so-lien-thong-tinh-trang-xu-ly-detail': HoSoLienThongTinhTrangXuLyDetail,
    'tiep-nhan-ho-so-detail': TiepNhanHoSoDetail,
    'tiep-nhan-ho-so-truc-tuyen-detail': TiepNhanHoSoTrucTuyenDetail,
    'tra-ket-qua-detail': TraKetQuaDetail,
    'xem-chi-tiet-ho-so-detail': XemChiTietHoSoDetail
  },
  data: () => ({
    initData: null,
    step: ''
  }),
  beforeCreate () {
    var vm = this
    vm.$nextTick(function () {
      let currentQuery = vm.$router.history.current.query
      if (currentQuery.hasOwnProperty('step')) {
        vm.step = currentQuery.step
      }
      vm.$store.dispatch('loadInitResource').then(function (result) {
        vm.initData = result
        if (vm.initData !== null) {
          let tiepnhanhosodetail = vm.$refs.tiepnhanhosodetail
          let hoanthienbosunghosodetail = vm.$refs.hoanthienbosunghosodetail
          let traketquadetail = vm.$refs.traketquadetail
          let feedetail = vm.$refs.feedetail
          let chuyenphatketquadetail = vm.$refs.chuyenphatketquadetail
          if (tiepnhanhosodetail !== null && tiepnhanhosodetail !== undefined && tiepnhanhosodetail !== 'undefined') {
            vm.$refs.tiepnhanhosodetail.initData(vm.id)
          } else if (hoanthienbosunghosodetail !== null && hoanthienbosunghosodetail !== undefined && hoanthienbosunghosodetail !== 'undefined') {
            vm.$refs.hoanthienbosunghosodetail.initData(vm.id)
          } else if (traketquadetail !== null && traketquadetail !== undefined && traketquadetail !== 'undefined') {
            vm.$refs.traketquadetail.initData(vm.id)
          } else if (feedetail !== null && feedetail !== undefined && feedetail !== 'undefined') {
            vm.$refs.feedetail.initData(vm.id)
          } else if (chuyenphatketquadetail !== null && chuyenphatketquadetail !== undefined && chuyenphatketquadetail !== 'undefined') {
            vm.$refs.chuyenphatketquadetail.initData(vm.id)
          }
        }
      })
    })
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      let vm = this
      let query = newRoute.query
      if (query.hasOwnProperty('step')) {
        vm.step = query.step
      }
    }
  }
}
</script>
