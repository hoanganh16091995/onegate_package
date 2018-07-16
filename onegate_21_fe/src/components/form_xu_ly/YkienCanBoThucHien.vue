<template>
  <div class="layout wrap px-3" style="display: block; width: 100%;">
    <v-form v-model="valid">
        Ý kiến cán bộ <span class="red--text text--darken-3">*</span>:
        <v-text-field
        v-model="ykien"
        textarea
        :rows="2"
        :rules="[v => !!v || 'lý do bắt buộc phải nhập']"
        ></v-text-field>
    </v-form>
  </div>
</template>
<script>
  export default {
    data: () => ({
      ykien: '',
      valid: false
    }),
    methods: {
      initData (data) {
        var vm = this
        vm.$store.dispatch('getDetailDossier', data).then(resultDossier => {
          vm.thongTinChiTietHoSo = resultDossier
        })
      }
    }
  }
</script>
