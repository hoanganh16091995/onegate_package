<template>
  <div>
    
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
  props: ['formCode'],
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
  }),
  beforeCreate () {
    var vm = this
    vm.$nextTick(function () {
      vm.$store.dispatch('loadInitResource').then(function (result) {
        vm.initData = result
        if (vm.initData !== null) {
        }
      })
    })
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      let vm = this
      let query = newRoute.query
    }
  }
}
</script>
