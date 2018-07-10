<template>
  <v-form v-model="validTNHS" ref="formTiepNhanHoSo" lazy-validation>
    <content-placeholders class="mt-3" v-if="loading">
      <content-placeholders-text :lines="1" />
    </content-placeholders>
    <div v-else class="row-header">
      <div class="background-triangle-big"> TIẾP NHẬN HỒ SƠ </div> 
      <div class="layout row wrap header_tools row-blue">
        <div class="flex solo text-ellipsis">
          
        </div> 
        <div class="flex text-right" style="margin-left: auto;">
          <v-btn flat class="my-0 mx-0 btn-border-left" @click="goBack" active-class="temp_active">
            Quay lại &nbsp;
            <v-icon size="16">undo</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <thong-tin-chung ref="thongtinchung"></thong-tin-chung>
    <thong-tin-chu-ho-so ref="thongtinchuhoso"></thong-tin-chu-ho-so>
    <thanh-phan-ho-so ref="thanhphanhoso"></thanh-phan-ho-so>
    <le-phi ref="lephi"></le-phi>
    <dich-vu-chuyen-phat-ket-qua ref="dichvuchuyenphatketqua"></dich-vu-chuyen-phat-ket-qua>
    <v-tabs icons-and-text centered class="mb-4">
      <v-tabs-slider color="primary"></v-tabs-slider>
      <v-tab href="#tab-1">
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
// import router from '@/router'
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
    validTNHS: false
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
      }).catch(reject => {
      })
    },
    luuHoSo () {
    },
    tiepNhanHoSo () {
    },
    boSungHoSo () {
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
