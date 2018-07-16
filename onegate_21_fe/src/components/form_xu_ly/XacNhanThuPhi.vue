<template>
  <v-flex xs12 v-if="payment_type === 5">
    <div class="mt-2 text-bold">Xác nhận thu phí:</div>
    <div class="pl-3 fee-info">
      <v-checkbox :label="`Phí phải nộp: ${currency(payments.feeAmount)} VNĐ`" v-model="checkPaid"></v-checkbox>
      <span class="red--text">* </span> Đánh dấu để xác định người làm thủ tục đã hoàn thành nộp phí.
    </div>
  </v-flex>
</template>

<script>

export default {
  props: {
    payments: {
      type: Object,
      default: () => {}
    },
    payment_type: {
      type: Number,
      default: () => 5
    }
  },
  data: () => ({
    dossierId: '',
    loadingAction: false,
    feeAmount: '',
    checkPaid: false
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    loadingTable () {
      return this.$store.getters.loadingTable
    }
  },
  created () {
    var vm = this
    vm.$nextTick(function () {})
  },
  methods: {
    initData (data) {
      var vm = this
      vm.dossierId = data
      vm.$store.dispatch('getDetailDossier', data).then(resultDossier => {
        vm.$store.dispatch('loadDossierPayments', resultDossier).then(function (result) {
          vm.feeAmount = result.feeAmount
        }).catch(function (reject) {
          console.log(reject)
        })
      }).catch(reject => {
        console.log(reject)
      })
    },
    currency (value) {
      if (value) {
        let moneyCur = (value / 1).toFixed(0).replace('.', ',')
        return moneyCur.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      }
      return ''
    }
  }
}
</script>
