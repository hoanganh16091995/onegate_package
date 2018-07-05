<template>
  <div>
    <content-placeholders class="mt-3" v-if="loading">
      <content-placeholders-text :lines="1" />
    </content-placeholders>
    <div v-else class="row-header" style="margin-top: 6px;">
      <div class="background-triangle-big"> TRẢ KẾT QUẢ </div> 
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
    <v-layout row wrap>
      <v-flex xs12 sm12>
        <v-card class="mb-2">
          <!-- <v-toolbar dark color="primary" height="40">
            <v-toolbar-title class="white--text" style="font-size: 15px;">Thông tin chung</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar> -->
          <v-card-title primary-title>
            <v-layout row wrap>
              <v-flex xs12 sm6 class="mb-2">
                <span>Loại hồ sơ: </span> 
              </v-flex>
              <v-flex xs12 sm6>
                <v-chip small class="pl-0">
                  Hồ sơ trực tuyến
                </v-chip>
              </v-flex>
              <v-flex xs12 sm6 class="mb-2">
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <span v-else>Mã hồ sơ: {{thongTinChiTietHoSo.dossierIdCTN}}</span> 
              </v-flex>
              <v-flex xs12 sm6 class="mb-2">
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <span v-else>Ngày tiếp nhận: {{thongTinChiTietHoSo.receiveDate|dateTimeView}}</span>
              </v-flex>
              <v-flex xs12 sm6 class="mb-2">
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <span v-else>Chủ hồ sơ: {{thongTinChiTietHoSo.applicantName}}</span>
              </v-flex>
              <v-flex xs12 sm12 class="mb-2">
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <span v-else>Địa chỉ: {{thongTinChiTietHoSo.address}}</span>
              </v-flex>
              <v-flex xs12 sm6 class="mb-2">
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <span v-else>Người nộp: {{thongTinChiTietHoSo.delegateName}}</span>
              </v-flex>
              <v-flex xs12 sm6 class="mb-2">
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <span v-else>Số CMND: {{thongTinChiTietHoSo.applicantIdNo}}</span>
              </v-flex>
              <v-flex xs12 sm12 class="mb-3">
                <span>Kết quả trả:</span>
                <v-data-table
                :headers="headers"
                :items="resultFiles"
                class="elevation-1 mt-2 table-landing table-bordered"
                hide-actions
                >
                <template slot="items" slot-scope="props">
                  <td class="text-xs-center" style="width: 5%;">{{ props.index + 1 }}</td>
                  <td class="text-xs-left">{{ props.item.so_giay }}</td>
                  <td class="text-xs-left">{{ props.item.ngay_cap }}</td>
                  <td class="text-xs-left">{{ props.item.ten_giay }}</td>
                </template>
              </v-data-table>
              </v-flex>
              <v-flex xs12 sm12>
                <v-checkbox :label="'Phí phải nộp: ' + thongTinChiTietHoSo.fee + 'VNĐ'" v-model="checkboxFee"></v-checkbox> 
              </v-flex>
              <v-flex xs12 sm12>
                <div class="text-right mt-2">
                  <v-btn color="primary" v-on:click.native="daTra">
                    Đã trả &nbsp;
                    <v-icon>save</v-icon>
                  </v-btn>
                  <v-btn color="primary" @click="goBack">
                    Quay lại &nbsp;
                    <v-icon>undo</v-icon>
                  </v-btn>
                </div>
              </v-flex>
            </v-layout>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  export default {
    data: () => ({
      checkboxFee: false,
      resultFiles: [{
        so_giay: 'ABC#1234',
        ngay_cap: '1/6/2018',
        ten_giay: 'Giấy chứng nhận abcxyz.....'
      }],
      thongTinChiTietHoSo: {
        dossierIdCTN: '182CB683',
        receiveDate: 1529409276000,
        applicantName: 'Lê việt Đức',
        dossierId: '67501',
        address: 'Phường Tân Hồng, Thị xã Từ Sơn, Tỉnh Bắc Ninh',
        releaseDate: 1529409276000,
        dossierStatusText: 'Đang xử lý',
        durationDate: 3,
        delegateName: 'Lê việt Đức',
        applicantIdNo: '123456778',
        fee: '1.000.000.000'
      },
      headers: [{
        text: 'STT',
        align: 'center',
        sortable: false,
        value: 'stt'
      },
      {
        text: 'Số giấy',
        align: 'left',
        sortable: true,
        value: 'so_giay'
      },
      {
        text: 'Ngày cấp',
        align: 'left',
        sortable: true,
        value: 'ngay_cap'
      },
      {
        text: 'Tên giấy',
        align: 'left',
        sortable: true,
        value: 'ten_giay'
      }]
    }),
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    components: {
    },
    created () {
    },
    watch: {
    },
    methods: {
      initData (data) {
        var vm = this
        vm.$store.dispatch('getDetailDossier', data).then(resultDossier => {
          vm.thongTinChiTietHoSo = resultDossier
        })
      },
      goBack () {
        window.history.back()
      },
      daTra () {
        console.log('Đã tra')
      }
    },
    filters: {
      dateTimeView (arg) {
        if (arg) {
          let value = new Date(arg)
          return `${value.getDate().toString().padStart(2, '0')}/${(value.getMonth() + 1).toString().padStart(2, '0')}/${value.getFullYear()} | ${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}`
        }
        //  else {
        //   if (!arg) {
        //     return ''
        //   }
        //   const [date, time] = date.split(' ')
        //   const [day, month, year] = date.split('/')
        //   const [hour, minute] = time.split(':')
        //   return `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year} | ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        // }
      }
    }
  }
</script>
