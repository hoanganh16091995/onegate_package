<template>
  <v-form v-model="validTNHS" ref="formTiepNhanHoSo" lazy-validation>
    <content-placeholders class="mt-3" v-if="loading">
      <content-placeholders-text :lines="1" />
    </content-placeholders>
    <div v-else class="row-header" style="margin-top: 6px;">
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
    <dich-vu-chuyen-phat-ket-qua ref="dichvuchuyenphatketqua" v-if="subStatusNew === false"></dich-vu-chuyen-phat-ket-qua>
    <div class="text-center mt-2">
      <v-btn color="primary" v-on:click.native="luuHoSo" v-if="thongTinChungHoSo.dossierStatus === 'new'">
        Lưu &nbsp;
        <v-icon>save</v-icon>
      </v-btn>
      <v-btn color="primary" v-on:click.native="tiepNhanHoSo" v-if="thongTinChungHoSo.dossierStatus === 'new'">
        Tiếp nhận &nbsp;
        <v-icon>save</v-icon>
      </v-btn>
      <v-btn color="primary" v-on:click.native="boSungHoSo" v-if="thongTinChungHoSo.dossierStatus === 'waiting'">
        Bổ sung &nbsp;
        <v-icon>save</v-icon>
      </v-btn>
      <v-btn color="primary" v-if="thongTinChungHoSo.dossierStatus === 'releasing'" :to="'/danh-sach-ho-so/' + index + '/tra-ket-qua/' + id">
        Trả kết quả &nbsp;
        <v-icon>send</v-icon>
      </v-btn>
      <v-btn color="primary" @click="goBack">
        Quay lại &nbsp;
        <v-icon>undo</v-icon>
      </v-btn>
    </div>
  </v-form>
</template>

<script>
// import router from '@/router'
// import * as utils from '../store/onegate_utils'
import ThongTinChung from './TiepNhanHoSo_ThongTinChung.vue'
import ThongTinChuHoSo from './TiepNhanHoSo_ThongTinChuHoSo.vue'
import ThanhPhanHoSo from './TiepNhanHoSo_ThanhPhanHoSo.vue'
import LePhi from './TiepNhanHoSo_LePhi.vue'
import DichVuChuyenPhatKetQua from './TiepNhanHoSo_DichVuChuyenPhatKetQua.vue'

export default {
  props: ['index', 'id'],
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
    },
    subStatusNew () {
      return this.$store.getters.subStatusNew
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
        console.log(vm.$refs)
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
      window.history.back()
    }
  }
}
</script>
