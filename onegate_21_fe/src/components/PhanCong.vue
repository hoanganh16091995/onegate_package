<template>  
  <div class="phancong" style="background-color: white">
    <div xs12 v-if="loading">
      <content-placeholders class="mt-1">
        <content-placeholders-text :lines="1" />
      </content-placeholders>
    </div>
    <div xs12 v-else>
      <div v-if="type === 1" v-for="(item, index) in dataPhanCong" v-bind:key="item.userId" style="display: inline-block">
        <v-layout wrap >
          <v-flex class="pt-1">
            <span>{{item.userName}}</span>&nbsp;
          </v-flex>
          <v-flex>
            <v-checkbox v-model="item.assigned"
            @change = 'changeAssigned($event, index)'
            ></v-checkbox> &nbsp;&nbsp;&nbsp;&nbsp;
          </v-flex>
        </v-layout>
      </div>
      <div v-if="type === 2" v-for="(item, index) in dataPhanCong" v-bind:key="item.userId" style="display: inline-block">
        <v-layout wrap class="my-1">
          <v-flex class="pt-1">{{item.userName}}</v-flex> &nbsp; &nbsp;
          <v-flex>
            <v-select
              :items="assignedtype_items"
              :value="item.assigned"
              item-text="text"
              item-value="value"
              return-object
              hide-selected
              @change = 'changeAssigned($event, index)'
              style="max-width: 160px"
            ></v-select>
          </v-flex>
          &nbsp; &nbsp;
        </v-layout>
      </div>
      
    </div>
  </div>
</template>

<script>
import router from '@/router'
export default {
  props: ['assign_items', 'type', 'id'],
  data: () => ({
    assignedtype_items: [
      {text: 'Không có phân công', value: 0},
      {text: 'Thực hiện chính', value: 1},
      {text: 'Thực hiện phối hợp', value: 2},
      {text: 'Theo dõi', value: 3}
    ]
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    dataPhanCong () {
      return this.$store.getters.dataPhanCong
    }
  },
  created () {
    var vm = this
    vm.$nextTick(function () {
      this.$store.commit('setDataPhanCong', vm.assign_items)
      console.log('dataPhanCong', vm.dataPhanCong)
    })
  },
  methods: {
    initData (data) {},
    redirectBack () {
      window.history.back()
    },
    changeAssigned (event, index) {
      var vm = this
      console.log('value-index', event, index)
      if (vm.type === 1) {
        if (event === true) {
          vm.dataPhanCong[index].assigned = 1
        } else {
          vm.dataPhanCong[index].assigned = 0
        }
        console.log('dataPhanCong-change', vm.$store.getters.dataPhanCong)
      } else {
        vm.dataPhanCong[index].assigned = event.value
        console.log('dataPhanCong-change', vm.$store.getters.dataPhanCong)
      }
    }
  }
}
</script>
