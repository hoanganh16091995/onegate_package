<template>
  <div>
    <!-- <tiep-nhan-ho-so-detail ref="tiepnhanhosodetail"></tiep-nhan-ho-so-detail> -->
    <!-- <hoan-thien-bo-sung-ho-so-detail ref="hoanthienbosunghosodetail"></hoan-thien-bo-sung-ho-so-detail> -->
    <!-- <xem-chi-tiet-ho-so-detail rè="xemchitiethosodetail"></xem-chi-tiet-ho-so-detail> -->
    <!-- <tiep-nhan-ho-so-truc-tuyen-detail ref="tiepnhanhosotructuyendetail"></tiep-nhan-ho-so-truc-tuyen-detail> -->
    <!-- <tra-ket-qua-detail rè="traketquadetail"></tra-ket-qua-detail> -->
    <!-- <fee-detail ref="feedetail"></fee-detail> -->
    <chuyen-phat-ket-qua-detail ref="chuyenphatketquadetail"></chuyen-phat-ket-qua-detail>
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
    initData: null
  }),
  beforeCreate () {
    var vm = this
    vm.$nextTick(function () {
      vm.$store.dispatch('loadInitResource').then(function (result) {
        vm.initData = result
        if (vm.initData !== null) {
          console.log(vm.$refs.tiepnhanhosodetail)
          // vm.$refs.tiepnhanhosodetail.initData(vm.id)
          // vm.$refs.hoanthienbosunghosodetail.initData(vm.id)
          vm.$refs.traketquadetail.initData(vm.id)
          vm.$refs.feedetail.initData(vm.id)
          vm.$refs.chuyenphatketquadetail.initData(vm.id)
        }
      })
    })
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      // let vm = this
      // let query = newRoute.query
    }
  }
}
</script>
