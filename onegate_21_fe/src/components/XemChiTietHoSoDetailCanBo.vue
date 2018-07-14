<template>
  <div class="form-chitiet">
    <content-placeholders class="mt-3" v-if="loading">
      <content-placeholders-text :lines="1" />
    </content-placeholders>
    <div v-else class="row-header" style="margin-top: 6px;">
      <div class="background-triangle-big"> <span>CHI TIẾT HỒ SƠ</span> </div>
      <div class="layout row wrap header_tools row-blue">
        <div class="flex xs8 sm10 pl-3 text-ellipsis text-bold" :title="thongTinChiTietHoSo.serviceName">
          {{thongTinChiTietHoSo.serviceName}}
        </div>
        <div class="flex xs4 sm2 text-right" style="margin-left: auto;">
          <v-btn flat class="my-0 mx-0 btn-border-left" @click="goBack" active-class="temp_active">
          Quay lại &nbsp;
            <v-icon size="16">undo</v-icon>
          </v-btn>
        </div>
      </div> 
    </div>
    <v-expansion-panel class="expansion-pl">
      <v-expansion-panel-content hide-actions value="1">
        <div slot="header"><div class="background-triangle-small"> <v-icon size="18" color="white">star_rate</v-icon> </div>THÔNG TIN CHUNG HỒ SƠ</div>
        <v-card>
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Tên doanh nghiệp: </v-subheader>
              </v-flex>
              <v-flex xs12 sm4>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 header-text-field"> {{thongTinChiTietHoSo.applicantName}}</v-subheader>
              </v-flex>
              <!--  -->
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Thời gian gửi: </v-subheader>
              </v-flex>
              <v-flex xs12 sm4>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 header-text-field"> {{thongTinChiTietHoSo.submitDate|dateTimeView}} </v-subheader>
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
                <v-subheader v-else class="pl-0 header-text-field">  {{thongTinChiTietHoSo.dossierIdCTN}} </v-subheader>
              </v-flex>
              <!--  -->
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Thời gian tiếp nhận: </v-subheader>
              </v-flex>
              <v-flex xs12 sm4>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 header-text-field"> {{thongTinChiTietHoSo.receiveDate|dateTimeView}}</v-subheader>
              </v-flex>
              <!--  -->
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Số hồ sơ: </v-subheader>
              </v-flex>
              <v-flex xs12 sm4>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 header-text-field"> {{thongTinChiTietHoSo.dossierNo}} </v-subheader>
              </v-flex>
              <!--  -->
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Thời hạn xử lý: </v-subheader>
              </v-flex>
              <v-flex xs12 sm4>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 header-text-field"> <i>{{thongTinChiTietHoSo.durationDate}} làm việc</i> </v-subheader>
              </v-flex>
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader :title="!showContactDetail?'Chi tiết liên hệ':'Thu gọn'" v-else class="pl-0 hover-pointer" @click.prevent.stop="showContactDetail = !showContactDetail">
                  Thông tin liên hệ:
                </v-subheader>
              </v-flex>
              <v-flex xs12 sm4>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 header-text-field hover-pointer"> 
                  <span :title="!showContactDetail?'Chi tiết liên hệ':'Thu gọn'" @click.prevent.stop="showContactDetail = !showContactDetail">
                    <v-icon color="primary" v-if="!showContactDetail">keyboard_arrow_down</v-icon>
                    <v-icon color="primary" v-if="showContactDetail">keyboard_arrow_up</v-icon>
                  </span>
                </v-subheader>
              </v-flex>
              <!--  -->
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Trạng thái: </v-subheader>
              </v-flex>
              <v-flex xs12 sm4>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 header-text-field"> {{thongTinChiTietHoSo.dossierStatusText}} </v-subheader>
              </v-flex>
              <v-flex xs12 sm12>
                <v-slide-y-transition>
                  <div v-if="showContactDetail">
                    <v-layout wrap>
                      <v-flex xs12 sm2>
                        <v-subheader class="pl-0"><i>Tên doanh nghiệp: </i></v-subheader>
                      </v-flex>
                      <v-flex xs12 sm4>
                        <v-subheader class="pl-0 header-text-field"> {{thongTinChiTietHoSo.applicantName}} </v-subheader>
                      </v-flex>
                      <v-flex xs12 sm2>
                        <v-subheader class="pl-0"><i>Địa chỉ Email: </i></v-subheader>
                      </v-flex>
                      <v-flex xs12 sm4>
                        <v-subheader class="pl-0 header-text-field"> {{thongTinChiTietHoSo.contactEmail}} </v-subheader>
                      </v-flex>
                      <v-flex xs12 sm2>
                        <v-subheader class="pl-0"><i>Số điện thoại: </i></v-subheader>
                      </v-flex>
                      <v-flex xs12 sm4>
                        <v-subheader class="pl-0 header-text-field"> {{thongTinChiTietHoSo.contactTelNo}} </v-subheader>
                      </v-flex>
                      <v-flex xs12 sm2>
                        <v-subheader class="pl-0"><i>Địa chỉ: </i></v-subheader>
                      </v-flex>
                      <v-flex xs12 sm4>
                        <v-subheader class="pl-0 header-text-field"> {{thongTinChiTietHoSo.address}} </v-subheader>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-slide-y-transition>
              </v-flex>
              
            </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!--  -->
    <div>
      <v-tabs slider-color="primary" style="background-color: #dae8e8;">
        <v-tab key="1" class="mr-2">
        THÀNH PHẦN HỒ SƠ
        </v-tab>
        <v-tab key="2" class="mr-2" @click="loadDossierActions()">
        TIẾN TRÌNH THỤ LÝ
        </v-tab>
        <v-tab key="3" class="mr-2" @click="loadDossierLogs()">
          NHẬT KÝ HỒ SƠ
        </v-tab>
        <v-tab key="4">
          TRAO ĐỔI THẢO LUẬN
        </v-tab>
        <v-tab key="5" @click="loadDossierSyncs()">
          TRAO ĐỔI NỘI BỘ
        </v-tab>
        <!--  -->
        <v-tab-item key="1">
          <v-expansion-panel expand class="my-0 expansion-pl-transparent" style="border: none">
            <v-expansion-panel-content v-bind:value="true">
              <div slot="header" class="text-bold">
                <div class="background-triangle-small"> I.</div>
                Tài liệu nộp
              </div>
              <div v-for="(item, index) in dossierTemplatesTN" v-bind:key="item.partNo">
                <v-card>
                  <v-layout wrap class="px-3 py-1 align-center row-list-style" style="border-bottom: 1px solid #ddd"> 
                    <v-flex xs11>
                      <span class="text-bold" style="position: absolute;">{{index + 1}}.</span> 
                      <div style="margin-left: 30px;">{{item.partName}}</div>
                    </v-flex>
                    <v-flex xs1 class="text-right">
                      <v-tooltip top>
                        <v-btn slot="activator" class="mx-0 my-0" fab dark small color="primary" @click="viewFile(item)" style="height:25px;width:25px">
                          {{item.count}}
                        </v-btn>
                        <span>Xem</span>
                      </v-tooltip>
                    </v-flex>
                  </v-layout>
                </v-card>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel expand class="my-0 expansion-pl-transparent" style="border: none">
            <v-expansion-panel-content v-bind:value="true">
            <div slot="header" class="text-bold">
              <div class="background-triangle-small"> II.</div>
              Kết quả
            </div>
            <div v-for="(item, index) in dossierTemplatesKQ" v-bind:key="item.partNo">
              <v-card>
                <v-layout wrap class="px-3 py-1 align-center row-list-style" style="border-bottom: 1px solid #ddd"> 
                  <v-flex xs11>
                    <span class="text-bold" style="position: absolute;">{{index + 1}}.</span> 
                    <div style="margin-left: 30px;">{{item.partName}}</div>
                  </v-flex>
                  <v-flex xs1 class="text-right">
                    <v-tooltip top>
                      <v-btn slot="activator" class="mx-0 my-0" fab dark small color="primary" @click="viewFile(item)" style="height:25px;width:25px">
                        {{item.count}}
                      </v-btn>
                      <span>Xem</span>
                    </v-tooltip>
                  </v-flex>
                </v-layout>
              </v-card>
            </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel expand class="my-0 expansion-pl-transparent" style="border: none">
            <v-expansion-panel-content v-bind:value="true">
            <div slot="header" class="text-bold">
              <div class="background-triangle-small"> III.</div>
              Văn bản hành chính
            </div>
            <div v-for="(item, index) in documents" v-bind:key="item.documentCode">
              <v-card>
                <v-layout wrap class="px-3 py-1 align-center row-list-style" style="border-bottom: 1px solid #ddd"> 
                  <v-flex xs11>
                    <span class="text-bold" style="position: absolute;">{{index + 1}}.</span> 
                    <div style="margin-left: 30px;">{{item.documentName}}</div>
                  </v-flex>
                  <v-flex xs1 class="text-right">
                    <v-tooltip top>
                      <v-btn slot="activator" class="mx-0 my-0" fab dark small color="primary" @click="viewFile(item)" style="height:25px;width:25px">
                        <v-icon>far fa-eye</v-icon>
                      </v-btn>
                      <span>Xem</span>
                    </v-tooltip>
                  </v-flex>
                </v-layout>
              </v-card>
            </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
           <v-expansion-panel expand class="my-0 expansion-pl-transparent" style="border: none">
            <v-expansion-panel-content v-bind:value="true">
            <div slot="header" class="text-bold">
              <div class="background-triangle-small"> IV.</div>
              Chứng từ thanh toán
            </div>
            <div v-for="(item, index) in payments" :key="item.referenceUid">
              <v-card>
                <v-layout wrap class="px-3 py-1 align-center row-list-style" style="border-bottom: 1px solid #ddd"> 
                  <v-flex xs11>
                    <span class="text-bold" style="position: absolute;">{{index + 1}}.</span> 
                    <div style="margin-left: 30px;">{{item.paymentFee}}</div>
                  </v-flex>
                  <v-flex xs1 class="text-right">
                    <v-tooltip top>
                      <v-btn slot="activator" class="mx-0 my-0" fab dark small color="primary" @click="viewFile(item)" style="height:25px;width:25px">
                        <v-icon>far fa-eye</v-icon>
                      </v-btn>
                      <span>Xem</span>
                    </v-tooltip>
                  </v-flex>
                </v-layout>
              </v-card>
            </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-tab-item>
        <v-tab-item key="2" style="background: #ffff;">
          <!-- <v-layout row wrap>
            <v-flex xs12 sm12>
              <v-select
              :items="filterDossierActionItems"
              v-model="filterDossierAction"
              label="Phân loại"
              item-text="text"
              item-value="value"
              @change="loadDossierActions"
              ></v-select>
            </v-flex>
          </v-layout> -->
          <div>
            <v-data-table :headers="headers" :items="dossierActions" class="table-landing table-bordered"
            hide-actions no-data-text="Không có dữ liệu"
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
              <td class="text-xs-center">{{props.item.groupName}}</td>
              <td class="text-xs-center">{{props.item.fromStepName}}</td>
              <td class="text-xs-center">
                <div v-for="item in props.item.actions" :key="item.stepName">
                  {{item.createDate}} - {{item.actionUser}} <br>
                  <span>{{item.stepName}}</span>
                </div>
              </td>
              <td>
                <span v-if="getMaxDueDate(props.item.actions) > 0" style="color: red">Quá hạn {{props.item.actions|getMaxDueDate}} ngày</span>
                <span v-else style="color: blue">Đang thực hiện</span>
              </td>
            </template>
          </v-data-table>
        </div>
        </v-tab-item>
        <v-tab-item key="3" style="background: #ffff;">
          <div v-for="(item, index) in listHistoryProcessing" v-bind:key="item.dossierLogId" class="list_history_style">
            <td class="px-2 pt-2" :class="index % 2 !== 0 ? 'col-tien-trinh-1' : 'col-tien-trinh-2'">{{ index + 1 }}</td>
            <td class="text-xs-left px-2 py-2">
              <p class="mb-2"> Ông/bà <b>{{ item.author }}</b> 
                <span style="color: #0b72ba">( {{ item.payload.stepName }} )</span>
                <br/>
                <span style="color: #939393">{{ item.createDate | dateTimeView }}</span>
              </p>
              Ý kiến: <span v-html="item.content"></span> <br>
              <p
                class="history__download__link hover-pointer-download"
                title="Tải file"
                v-for="file in item.payload.files"
                :key="file.dossierFileId"
                @click.prevent.stop="downloadFileLogs(file.dossierFileId)"
              >
                <v-icon>file_download</v-icon> 
                <span>{{file.fileName}}</span>
              </p>
            </td>
          </div>
        </v-tab-item>
        <v-tab-item key="4" style="background: #ffff;">
          <comment :classPK="dossierId" :className="className"></comment>
        </v-tab-item>
        <v-tab-item key="5" style="background: #ffff;">
          <!-- <div class="text-xs-right">
            <v-select
              :items="filterDossierSyncItems"
              v-model="filterDossierSync"
              label="Phân loại"
              item-text="text"
              item-value="value"
              @change="loadDossierSyncs"
            ></v-select>
          </div> -->
          <v-data-table :headers="headerSyncs" :items="dossierSyncs" class="table-landing table-bordered"
            hide-actions no-data-text="Không có dữ liệu"
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
              <td class="text-xs-center">
                <div v-if="props.item.actionCode !== 8001 && props.item.actionCode !== 8002">
                  {{props.item.createDate}} : {{props.item.actionName}}
                </div>
              </td>
              <td class="text-xs-center">
                <div v-if="props.item.actionCode === 8001 || props.item.actionCode === 8002">
                  {{props.item.actionUser}} ({{props.item.createDate}}) <br>
                  {{props.item.actionNote}}
                </div>
              </td>
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs>
    </div>
    
  </div>
</template>

<script>
// import $ from 'jquery'
import '../store/jquery_comment'
import Comment from './Comment.vue'
export default {
  // props: ['index', 'id'],
  components: {
    'comment': Comment
  },
  data: () => ({
    dossierId: '',
    className: 'org.opencps.dossiermgt.model.Dossier',
    dossierTemplateFiles: [],
    dossierTemplatesItems: [],
    showContactDetail: false,
    listHistoryProcessing: [],
    dossierTemplatesTN: [],
    dossierTemplatesKQ: [],
    thongTinChiTietHoSo: {
    },
    processSteps: [],
    documents: [],
    payments: [],
    dossierActions: [],
    dossierSyncs: [],
    headers: [{
      text: 'Bộ phận',
      align: 'center',
      sortable: false,
      class: 'bophan_column'
    }, {
      text: 'Công việc',
      align: 'center',
      sortable: false,
      class: 'congviec_column'
    }, {
      text: 'Người thực hiện',
      align: 'center',
      sortable: false,
      class: 'nguoithuchien_column'
    }, {
      text: 'Kết quả',
      align: 'center',
      sortable: false,
      class: 'ketqua_column'
    }],
    headerSyncs: [{
      text: 'Nhật kí hồ sơ',
      align: 'center',
      sortable: false,
      class: 'nhatki_column'
    }, {
      text: 'Trao đổi trực tuyến',
      align: 'center',
      sortable: false,
      class: 'traodoitructuyen_column'
    }],
    filterDossierActionItems: [{
      text: 'Tất cả',
      value: ''
    }, {
      text: 'Có thao tác thực hiện',
      value: '1'
    }, {
      text: 'Không thao tác thực hiện',
      value: '2'
    }],
    filterDossierAction: null,
    filterDossierSyncItems: [{
      text: 'Tất cả',
      value: '1,2'
    }, {
      text: 'Thông tin trao đổi',
      value: '2'
    }],
    filterDossierSync: null
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {},
  created () {
    var vm = this
    vm.$nextTick(function () {})
  },
  methods: {
    initData (data) {
      var vm = this
      vm.dossierId = data
      console.log(data)
      vm.$store.dispatch('getDetailDossier', data).then(resultDossier => {
        vm.thongTinChiTietHoSo = resultDossier
        let promise2 = vm.$store.dispatch('loadDossierTemplates', resultDossier)
        promise2.then(function (result) {
          vm.dossierTemplatesItems = []
          vm.dossierTemplatesItems = result
          console.log('dossierTemplatesItems', vm.dossierTemplatesItems)
          vm.dossierTemplatesTN = []
          vm.dossierTemplatesKQ = []
          for (var key in vm.dossierTemplatesItems) {
            if (vm.dossierTemplatesItems[key].partType === 1) {
              vm.dossierTemplatesTN.push(vm.dossierTemplatesItems[key])
            } else if (vm.dossierTemplatesItems[key].partType === 2) {
              vm.dossierTemplatesKQ.push(vm.dossierTemplatesItems[key])
            }
          }
          console.log('dossierTemplatesTN', vm.dossierTemplatesTN)
          console.log('dossierTemplatesKQ', vm.dossierTemplatesKQ)
          vm.$store.dispatch('loadDossierFiles').then(function (result) {
            setTimeout(function () {
              vm.$store.dispatch('getDossierTemplateEdit').then(function (resultTemp) {
                vm.dossierTemplateFiles = resultTemp
                console.log('dossierTemplateFiles', vm.dossierTemplateFiles)
              })
            }, 200)
          })
          // vm.$store.dispatch('loadProcessStep', resultDossier).then(resultProcess => {
          //   vm.processSteps = resultProcess
          // })
          vm.$store.dispatch('loadDossierDocuments', resultDossier).then(resultDocuments => {
            vm.documents = resultDocuments
          })
          vm.$store.dispatch('loadDossierPayments', resultDossier).then(resultPayments => {
            vm.payments = resultPayments
          })
        })
      })
    },
    goBack () {
      window.history.back()
    },
    viewFile (data) {
      this.$store.dispatch('viewFile', data)
    },
    downloadFileLogs (data) {
      var vm = this
      let dataCommit = {
        fileAttachId: data,
        dossierId: vm.id
      }
      this.$store.dispatch('downloadFile', dataCommit)
    },
    loadDossierActions (data) {
      var vm = this
      if (vm.thongTinChiTietHoSo.dossierId) {
        let dataParams = {
          dossierId: vm.thongTinChiTietHoSo.dossierId,
          stepType: data
        }
        vm.$store.dispatch('loadDossierActions', dataParams).then(resultActions => {
          vm.dossierActions = resultActions.data
        })
      }
    },
    loadDossierSyncs (data) {
      var vm = this
      if (vm.thongTinChiTietHoSo.dossierId) {
        let dataParams = {
          dossierId: vm.thongTinChiTietHoSo.dossierId,
          info: data
        }
        vm.$store.dispatch('loadDossierSyncs', dataParams).then(resultSyncs => {
          vm.dossierSyncs = resultSyncs
        })
      }
    },
    loadDossierLogs (data) {
      var vm = this
      data.dossierId = vm.thongTinChiTietHoSo.dossierId
      let promiseHisProcessing = vm.$store.dispatch('getListHistoryProcessingItems', data)
      promiseHisProcessing.then(function (result) {
        vm.listHistoryProcessing = []
        vm.listHistoryProcessing = result
      })
    }
  },
  filters: {
    dateTimeView (arg) {
      if (arg) {
        let value = new Date(arg)
        return `${value.getDate().toString().padStart(2, '0')}/${(value.getMonth() + 1).toString().padStart(2, '0')}/${value.getFullYear()} | ${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}`
      } else {
        return ''
      }
    },
    getMaxDueDate (arr) {
      let maxDue = Math.max.apply(Math, arr.map(function (item) {
        return item.actionOverdue
      }))
      return maxDue
    }
  }
}
</script>
