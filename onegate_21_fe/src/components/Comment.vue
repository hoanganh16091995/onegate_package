<template>
  <div class="comment-temp">
    <div style="position: relative; overflow: hidden" class="jquery-comments comp_activity_comment">
      <v-expansion-panel class="expansion-pl-transparent" >
        <v-expansion-panel-content hide-actions :value="true" class="activity_comment">
          <div slot="header"><div class="background-triangle-small"> <v-icon size="18" color="white">star_rate</v-icon> </div>Ý KIẾN CHÍNH THỨC</div>
          <v-card>
            <v-card-text>
              <div class="panel-heading">
                <div class="px-0 py-0">
                  <div row class="mx-0 mb-2" v-if="commentId === ''">
                    <v-layout wrap>
                      <img src="https://viima-app.s3.amazonaws.com/media/user_profiles/user-icon.png" class="profile-picture">
                      <v-text-field
                        class="textarea-wrapper xs12"
                        placeholder="Nhập ý kiến chính thức"
                        textarea
                        rows="2"
                        v-model="official_opinion"
                      ></v-text-field>
                    </v-layout>
                    <v-flex text-right>
                      <v-btn small class="primary mr-2" @click="addCmtOfficial" style="height: 24px;width: 71px">
                        Lưu
                      </v-btn>
                      <v-btn small class="primary" @click="official_opinion = ''" style="height: 24px;width: 71px">
                        Xóa
                      </v-btn>
                    </v-flex>
                  </div>
                  <div class="overflowComment" :class="argStyle?'fullEl':'lessEl'">
                    <v-layout wrap class="mx-0 " v-for="item in comment_official" :key="item.commentId" v-if="item.commentId">
                      <v-flex xs12 class="commentClass mt-1 pb-1">
                        <div class="media">
                          <img :src="item.pictureUrl" class="profile-picture">
                          <div class="media-body">
                            <div class="media-heading"><span class="text-bold name highlight-font-bold">{{nameCreateCmt(item.userId, item.fullname)}}</span>
                              <span class="time_right text-gray mt-1 mr-2">{{item.createDate|dateTimeView}}</span>
                            </div>
                            <div class="contentClass">{{item.content}}</div>
                            <span class="action" v-if="userId === item.userId">
                              <button class="action-delete" @click="deleteCmtOfficial">Xóa</button>
                              <i class="fas fa-trash" style="color: red"></i>
                            </span>
                          </div>
                        </div>
                      </v-flex>
                    </v-layout>
                  </div>
                  <v-flex v-if="!argStyle"><span class="action-show primary--text mx-2 my-2" @click="clickXemthem">Xem thêm</span></v-flex>
                  <v-flex v-if="argStyle"><span class="action-show primary--text mx-2 my-2" @click="clickXemthem">Rút gọn</span></v-flex>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>

    <div>
      <v-expansion-panel class="expansion-pl-transparent">
        <v-expansion-panel-content hide-actions :value="true">
          <div slot="header"><div class="background-triangle-small"> <v-icon size="18" color="white">star_rate</v-icon> </div>Ý KIẾN TRAO ĐỔI</div>
          <v-card class="comments__container">
            <v-card-text>
              <div id="comments-container-el"></div>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import 'jquery-textcomplete'
import '../store/jquery_comment'
export default {
  props: ['classPK', 'className'],
  data: () => ({
    usersComment: [
      {
        id: 1,
        fullname: 'Trịnh Công Trình',
        email: 'trinhtc@fds.vn.com',
        pictureUrl: 'https://app.viima.com/static/media/user_profiles/user-icon.png'
      },
      {
        id: 2,
        fullname: 'Thái Hoàng Anh',
        email: 'anhth@fds.vn',
        pictureUrl: 'https://app.viima.com/static/media/user_profiles/user-icon.png'
      }
    ],
    userId: 101,
    comment_official: [],
    official_opinion: '',
    commentId: '',
    argStyle: true,
    commentValue: true,
    comment_hidden: true,
    comment: [],
    less: true,
    hidden__text: false,
    expanded: true
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    initData () {
      return this.$store.getters.loadingInitData
    }
  },
  watch: {},
  created () {
    var vm = this
    vm.$nextTick(function () {
      vm.$store.dispatch('loadUsersComment', vm.classPK).then(result => {
        vm.usersComment = result
      })
      vm.getcomment_official()
    })
  },
  mounted () {
    var vm = this
    $('#comments-container-el').comments({
      profilePictureURL: 'https://viima-app.s3.amazonaws.com/media/user_profiles/user-icon.png',
      textareaRows: 2,
      enableAttachments: true,
      enableHashtags: true,
      enablePinging: true,
      postCommentOnEnter: false,
      forceResponsive: false,
      readOnly: false,
      textareaPlaceholderText: 'Thêm bình luận mới',
      newestText: 'Mới nhất',
      oldestText: 'Cũ nhất',
      popularText: 'Phổ biến',
      attachmentsText: 'Đính kèm',
      sendText: 'Gửi',
      replyText: 'Trả lời',
      editText: 'Sửa',
      editedText: 'Đã sửa',
      youText: 'Bạn',
      saveText: 'Ghi lại',
      deleteText: 'Xóa',
      // viewAllRepliesText: 'Xem tất cả câu trả lời',
      hideRepliesText: 'Ẩn câu trả lời',
      noCommentsText: 'Không có bình luận nào',
      noAttachmentsText: 'Không có tệp đính kèm',
      attachmentDropText: 'Kéo thả tệp đính kèm',
      fieldMappings: {
        id: 'commentId',
        parent: 'parent',
        userId: 'userId',
        created: 'createdDate',
        modified: 'modifiedDate',
        content: 'content',
        fileURL: 'fileUrl',
        fileMimeType: 'fileType',
        fileName: 'fileName',
        pings: 'pings',
        creator: 'userId',
        fullname: 'fullname',
        profileURL: 'profileUrl',
        profilePictureURL: 'pictureUrl',
        isNew: 'isNew',
        createdByAdmin: 'isAdmin',
        createdByCurrentUser: 'createdByCurrentUser',
        upvoteCount: 'upvoteCount',
        userHasUpvoted: 'userHasUpvoted',
        email: 'email',
        className: 'className',
        classPK: 'classPK'
      },
      timeFormatter: function (time) {
        if (time !== null) {
          var dt = time.split(/\ |\s/)
          if (dt.length === 2) {
            var d = dt[0].split(/\-|\s/)
            return (d.slice(0, 3).reverse().join('/')) + ' ' + dt[1]
          } else {
            return time
          }
        }
        return ''
      },
      getUsers: function (onSuccess, onError) {
        onSuccess(vm.usersComment)
      },
      getComments: function (onSuccess, onError) {
        let data = {
          'classPK': vm.classPK,
          'className': vm.className
        }
        let promise = vm.$store.dispatch('loadCommentItems', data)
        promise.then(result => {
          var data = []
          $.each(result, function (index, item) {
            vm.comment = item
            vm.formatComment(vm.comment)
            data.push(vm.comment)
          })
          onSuccess(data)
        }).catch(reject => {
          onSuccess([])
          onError()
        })
      },
      postComment: function (data, onSuccess, onError) {
        data.classPK = vm.classPK
        data.className = vm.className
        vm.$store.dispatch('postComment', data).then(result => {
          vm.comment = result
          vm.formatComment(vm.comment)
          onSuccess(vm.comment)
        })
      },
      putComment: function (data, onSuccess, onError) {
        data.classPK = vm.classPK
        data.className = vm.className
        vm.$store.dispatch('putComment', data).then(result => {
          vm.comment = result
          vm.formatComment(vm.comment)
          onSuccess(vm.comment)
        })
      },
      deleteComment: function (data, onSuccess, onError) {
        data.classPK = vm.classPK
        data.className = vm.className
        vm.$store.dispatch('deleteComment', data).then(result => {
          onSuccess()
        })
      },
      upvoteComment: function (data, onSuccess, onError) {
        data.classPK = vm.classPK
        data.className = vm.className
        vm.$store.dispatch('upvoteComment', data).then(result => {
          vm.comment = result
          vm.formatComment(vm.comment)
          onSuccess(vm.comment)
        })
      },
      uploadAttachments: function (comments, onSuccess, onError) {
        var responses = 0
        var successfulUploads = []
        console.log('comments===', comments)
        var serverResponded = function () {
          responses++
          if (responses === comments.length) {
            if (successfulUploads.length === 0) {
              onError()
            } else {
              onSuccess(successfulUploads)
            }
          }
        }
        $(comments).each(function (index, comment) {
          var formData = new FormData()
          $(Object.keys(comment)).each(function (index, key) {
            var value = comment[key]
            if (value) {
              formData.append(key, value)
            }
          })
          formData.append('file', comment.file)
          formData.append('className', vm.className)
          formData.append('classPK', vm.classPK)
          formData.append('parent', comment.parent != null ? comment.parent : 0)
          formData.append('fileName', comment.file.name)
          formData.append('fileType', comment.file.type)
          formData.append('fileSize', comment.file.size)
          formData.append('pings', comment.pings.join())
          formData.append('email', 'congtrinh0209@gmail.com')
          formData.append('fullName', 'Công Trình')
          // formData.append('email', themeDisplay.getUserId())
          // formData.append('fullName', themeDisplay.getUserName())
          $.ajax({
            url: vm.initData.commentApi + '/uploads',
            dataType: 'json',
            type: 'POST',
            headers: {
              // 'groupId': themeDisplay.getScopeGroupId()
              'groupId': 55301
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (comment) {
              vm.formatComment(comment)
              successfulUploads.push(vm.comment)
              serverResponded()
            },
            error: function (xhr, data) {
              serverResponded()
            }
          })
        })
      },
      appendNewComments: function (commentJSONs, onSuccess, onError) {
        const config = {
          headers: {
            'groupId': vm.group_id
          }
        }
        let commentById = {}
        let oldCommentsId = commentJSONs.map(function (c) {
          commentById[c.id] = c.id + '' + c.userHasUpvoted + '' + c.upvoteCount + '' + c.content
          return c.id
        })
        let url = vm.initData.commentApi + '/org.opencps.dossiermgt.model.Dossier/' + vm.classPK + '?start=0&end=10&sort=modified_Number&order=true'
        axios.get(url, config).then(function (response) {
          let data = []
          let dataEdited = []
          if (response.hasOwnProperty('data')) {
            var serializable = response.data.data
            let curId = 0
            let code = ''
            for (var key in serializable) {
              vm.comment = serializable[key]
              curId = vm.comment['commentId']
              code = vm.comment['commentId'] + '' + vm.comment['userHasUpvoted'] + '' + vm.comment['upvoteCount'] + '' + vm.comment['content']
              vm.formatComment(vm.comment)
              /* check return if not exist */
              if (oldCommentsId.indexOf(curId) === -1) {
                data.push(vm.comment)
              } else if (code !== commentById[curId]) {
                /* if have changed */
                dataEdited.push(vm.comment)
              }
            }
            onSuccess(data, dataEdited)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    })
  },
  methods: {
    formatComment: function (comment) {
      var vm = this
      vm.comment = comment
      if (comment.parent === 0) {
        vm.comment.parent = null
      }
      if (comment.fileName === '') {
        vm.comment.fileName = null
      }
      if (comment.fileType === '') {
        vm.comment.fileType = null
      }
      if (comment.fileUrl === '') {
        vm.comment.fileUrl = null
      }
      if (comment.pictureUrl === '') {
        vm.comment.pictureUrl = 'https://viima-app.s3.amazonaws.com/media/user_profiles/user-icon.png'
      }
      vm.comment.fullname = comment.fullname
      vm.comment.pings = comment.pings.toString().split(',')
      vm.comment.createdDate = vm.dateTimeView(vm.comment.createDate)
      vm.comment.modifiedDate = vm.dateTimeView(vm.comment.modifiedDate)
    },
    dateTimeView (arg) {
      if (arg) {
        let value = new Date(arg)
        return `${value.getDate().toString().padStart(2, '0')}/${(value.getMonth() + 1).toString().padStart(2, '0')}/${value.getFullYear()} ${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}`
      } else {
        return ''
      }
    },
    // action ý kiến chính thức
    getcomment_official: function () {
      var vm = this
      vm.commentId = ''
      let data = {
        'classPK': vm.classPK,
        'className': vm.className
      }
      vm.$store.dispatch('getcomment_official', data).then(result => {
        for (var key in result) {
          if (vm.userId === result[key].userId) {
            vm.commentId = result[key].commentId
            // vm.official_opinion=serializable.data[key].content
            break
          }
        }
        vm.comment_official = result
        if (result.length > 3) {
          vm.argStyle = false
        } else {
          vm.argStyle = true
        }
        console.log('result', result)
      })
      .catch(reject => {
        vm.comment_official = []
      })
    },
    getreload: function () {
      var vm = this
      vm.commentId = ''
      vm.comment_official = []
      vm.getcomment_official()
    },
    addCmtOfficial: function () {
      var vm = this
      if (vm.official_opinion !== '') {
        let data = {
          'classPK': vm.classPK,
          'className': vm.className,
          'official_opinion': vm.official_opinion
        }
        vm.$store.dispatch('addCmtOfficial', data).then(result => {
          setTimeout(function () {
            vm.getreload()
          }, 500)
          vm.commentId = result.commentId
          // showMessageToastr('success', 'Cập nhật thành công')
        })
        .catch(reject => {
          console.log(reject)
          // showMessageByAPICode(error.response.status, error.response.data)
        })
      }
    },
    deleteCmtOfficial: function () {
      var vm = this
      if (vm.commentId !== '') {
        let data = {
          'commentId': vm.commentId
        }
        vm.$store.dispatch('deleteCmtOfficial', data).then(result => {
          // showMessageToastr('success', 'Xóa thành công')
          vm.official_opinion = ''
          setTimeout(function () {
            vm.getreload()
          }, 500)
          vm.commentId = ''
        })
        .catch(reject => {
          // showMessageToastr('error', 'Xóa thất bại')
          console.log(reject)
        })
      }
    },
    clickXemthem: function () {
      var vm = this
      vm.argStyle = !vm.argStyle
    },
    nameCreateCmt (userId, name) {
      var vm = this
      if (vm.userId === userId) {
        return 'Bạn'
      } else {
        return name
      }
    }
  },
  filters: {
    dateTimeView (arg) {
      if (arg) {
        let value = new Date(arg)
        return `${value.getDate().toString().padStart(2, '0')}/${(value.getMonth() + 1).toString().padStart(2, '0')}/${value.getFullYear()}  ${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}`
      } else {
        return ''
      }
    }
  }
}
</script>
<style type="text/css">
  .textarea-wrapper .input-group__input {
    border: 1px solid #CCC !important;
    padding-top: 10px !important;
  }
  .action {
    display: inline-block;
  }
  .action-delete {
    cursor: pointer;
    font-size: 0.9em;
    opacity: 1;
    pointer-events: auto;
    color: #999;
    font-weight: bold;
  }
  .action-delete:hover {
    color: #666
  }
  .comp_activity_comment .commentClass{
    border-bottom: 1px solid #ddd;
  }
  .comp_activity_comment .commentClass .contentClass{
    white-space: pre-line;
  }
  .comp_activity_comment .action-show{
    float: right;
    cursor: pointer;
  }
  .comp_activity_comment .commentClass i{
    font-size: 3.4em;
  }
  .time_right{
    float: right;
    font-size: 0.8em;
    color: #666;
  }
  .media-heading{
    margin: 0!important;
  }
  .comp_activity_comment .btn{
    margin-right: 0;
  }
  .activity_comment{
    max-width: 100%;
  }
  .overflowComment::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 8px;
    background-color: #F5F5F5;
  }
  .overflowComment::-webkit-scrollbar{
    width: 8px;
    background-color: #F5F5F5;
  }
  .overflowComment::-webkit-scrollbar-thumb{
    border-radius: 8px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: rgb(181, 181, 181);
  }
  .fullEl {
    height: auto;
    overflow: hidden
  }
  .lessEl {
    height: 250px;
    overflow: auto
  }
</style>

