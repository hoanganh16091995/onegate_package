<template>
  <div class="ketqua-detail">
    <content-placeholders class="mt-3" v-if="loading">
      <content-placeholders-text :lines="1" />
    </content-placeholders>
    <div v-else class="row-header">
      <div class="background-triangle-big"> <span>TRẢ KẾT QUẢ HỒ SƠ</span> </div>
      <div class="layout row wrap header_tools row-blue">
        <div class="flex xs8 sm10 pl-3 text-ellipsis text-bold" >
          Đăng ký, cấp Giấy chứng nhận quyền sử dụng đất, quyền sở hữu nhà ở và tài sản khác gắn liền với đất lần đầu đối với tài sản gắn liền với đất mà chủ sở hữu không đồng thời là người sử dụng đất
        </div>
        <div class="flex xs4 sm2 text-right" style="margin-left: auto;">
          <v-btn flat class="my-0 mx-0 btn-border-left" @click="redirectBack" active-class="temp_active">
          Quay lại &nbsp;
            <v-icon size="16">undo</v-icon>
          </v-btn>
        </div>
      </div> 
    </div>
    <v-expansion-panel expand class="expansion-p0">
      <v-expansion-panel-content :value="true">
        <div slot="header">
          <div class="background-triangle-small">I. </div>THÔNG TIN HỒ SƠ
        </div>
        <v-card>
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 text-header">Thủ tục: </v-subheader>
              </v-flex>
              <v-flex xs12 sm10>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 header-text-field">  Đăng ký, cấp Giấy chứng nhận quyền sử dụng đất, quyền sở hữu nhà ở và tài sản khác gắn liền với đất lần đầu đối với tài sản gắn liền với đất mà chủ sở hữu không đồng thời là người sử dụng đất </v-subheader>
              </v-flex>
              <!--  -->
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Mã hồ sơ: </v-subheader>
              </v-flex>
              <v-flex xs12 sm4>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 header-text-field"> 123123</v-subheader>
              </v-flex>
              <!--  -->
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Ngày tiếp nhận: </v-subheader>
              </v-flex>
              <v-flex xs12 sm4>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 header-text-field"> 20/08/2017 - 09:15</v-subheader>
              </v-flex>
              <!--  -->
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Chủ hồ sơ: </v-subheader>
              </v-flex>
              <v-flex xs12 sm10>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 header-text-field">  Trịnh Công Trình </v-subheader>
              </v-flex>
              <!--  -->
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Địa chỉ: </v-subheader>
              </v-flex>
              <v-flex xs12 sm10>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 header-text-field">  Số 255 - Ngõ 55 - Mỗ Lao - Hà Đông - Hà Nội </v-subheader>
              </v-flex>
              <!--  -->
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Người nộp: </v-subheader>
              </v-flex>
              <v-flex xs12 sm4>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 header-text-field"> Trịnh Công Trình </v-subheader>
              </v-flex>
              <!--  -->
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Số CMND: </v-subheader>
              </v-flex>
              <v-flex xs12 sm4>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 header-text-field"> Trịnh Công Trình </v-subheader>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!--  -->
    <v-expansion-panel expand class="expansion-p0 ex-table">
      <v-expansion-panel-content :value="true">
        <div slot="header">
          <div class="background-triangle-small"> II. </div>GIẤY TỜ TRẢ KẾT QUẢ
        </div>
        <v-card>
          <v-card-text class="px-0">
            <!--  -->
            <content-placeholders v-if="loadingTable">
              <content-placeholders-img />
              <content-placeholders-heading />
            </content-placeholders>
            <v-data-table v-else
              :headers="headers"
              :items="ketquaItems"
              item-key="no"
              class="table-bordered"
              hide-actions
              :no-data-text="'Không có giấy tờ trả kết quả'"
            >
              <template slot="headerCell" slot-scope="props">
                <v-tooltip bottom>
                  <span slot="activator">
                    {{ props.header.text }}
                  </span>
                  <span>
                    {{ props.header.text }}
                  </span>
                </v-tooltip>
              </template>
              <template slot="items" slot-scope="props">
                <td class="text-xs-center" style="width:5%"> {{ props.index + 1 }} </td>
                <td class="text-xs-left" style="width:10%"> {{ props.item.no }} </td>
                <td class="text-xs-left" style="width:10%"> {{ props.item.date|dateTimeView }} </td>
                <td class="text-xs-left" style="width:75%"> {{props.item.name}} </td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!--  -->
    <v-flex xs12 style="background: white">
      <content-placeholders class="mt-1" v-if="loading">
        <content-placeholders-text :lines="1" />
      </content-placeholders>
      <div v-else class="pl-3 py-2 fee-info">
        <v-checkbox :label="`Phí phải nộp: ${currency(fee)} VNĐ`" v-model="checkPaid"></v-checkbox>
        <span class="red--text">* </span> Đánh dấu để xác định người làm thủ tục đã hoàn thành nộp phí.
      </div>
    </v-flex>
    
  </div>
</template>

<script>
import router from '@/router'
export default {
  props: ['index', 'id'],
  data: () => ({
    headers: [{
      text: 'STT',
      align: 'center',
      sortable: false
    },
    {
      text: 'Số giấy',
      align: 'center',
      sortable: false
    },
    {
      text: 'Ngày cấp',
      align: 'center',
      sortable: false
    },
    {
      text: 'Tên giấy tờ',
      align: 'center',
      sortable: false
    }
    ],
    ketquaItems: [{
      no: '1234',
      date: 1529413502000,
      name: 'Giấy tờ trả kết quả 1'
    },
    {
      no: '1234-A',
      date: 1529413502000,
      name: 'Giấy tờ trả kết quả 2'
    },
    {
      no: '1234-B',
      date: 1529413502000,
      name: 'Giấy tờ trả kết quả 3'
    }
    ],
    checkPaid: false,
    fee: 1000000
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    loadingTable () {
      return this.$store.getters.loadingTable
    },
    thongTinChungHoSo () {
      return this.$store.getters.thongTinChungHoSo
    },
    thongTinChuHoSo () {
      return this.$store.getters.thongTinChuHoSo
    },
    thongTinNguoiNopHoSo () {
      return this.$store.getters.thongTinNguoiNopHoSo
    },
    lePhi () {
      return this.$store.getters.lePhi
    }
  },
  created () {
    var vm = this
    vm.$nextTick(function () {
      let promise = vm.$store.dispatch('getDetailDossier', vm.id)
      promise.then(function (result) {
        vm.$store.dispatch('loadAllDossierTemplates', vm.$store.getters.thongTinChungHoSo).then(function (result) {
          vm.ketquaItems = result.filter((val, index) => {
            return val.partType === 2
          })
        }).catch(function (reject) {
          console.log(reject)
        })
      }).catch(function (reject) {
        console.log(reject)
      })
    })
  },
  methods: {
    redirectBack () {
      window.history.back()
    },
    currency (value) {
      if (value) {
        let moneyCur = (value / 1).toFixed(0).replace('.', ',')
        return moneyCur.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      }
      return ''
    }
  },
  filters: {
    dateTimeView (arg) {
      if (arg) {
        let value = new Date(arg)
        return `${value.getDate().toString().padStart(2, '0')}/${(value.getMonth() + 1).toString().padStart(2, '0')}/${value.getFullYear()}`
      } else {
        return ''
      }
    }
  }
}
</script>
