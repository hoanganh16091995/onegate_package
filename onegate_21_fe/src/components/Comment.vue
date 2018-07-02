<template>
  <div class="comment-temp">
    <v-expansion-panel expand class="expansion-blue">
			<v-expansion-panel-content v-bind:value="expanded">
				<v-card class="comments__container">
					<v-card-text>
						<div id="comments-container-el"></div>
					</v-card-text>
				</v-card>
			</v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import 'jquery-textcomplete'
import '../store/jquery_comment'
export default {
  props: ['dossierId'],
  data: () => ({
    usersComment: [{
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
      vm.$store.dispatch('loadUsersComment', vm.dossierId).then(result => {
        vm.usersComment = result
      })
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
        let promise = vm.$store.dispatch('loadCommentItems', vm.dossierId)
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
        data.id = vm.dossierId
        vm.$store.dispatch('postComment', data).then(result => {
          vm.comment = result
          vm.formatComment(vm.comment)
          onSuccess(vm.comment)
        })
      },
      putComment: function (data, onSuccess, onError) {
        data.id = vm.dossierId
        vm.$store.dispatch('putComment', data).then(result => {
          vm.comment = result
          vm.formatComment(vm.comment)
          onSuccess(vm.comment)
        })
      },
      deleteComment: function (data, onSuccess, onError) {
        data.id = vm.dossierId
        vm.$store.dispatch('deleteComment', data).then(result => {
          onSuccess()
        })
      },
      upvoteComment: function (data, onSuccess, onError) {
        data.id = vm.dossierId
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
          formData.append('className', 'org.opencps.dossiermgt.model.Dossier')
          formData.append('classPK', vm.dossierId)
          formData.append('parent', comment.parent != null ? comment.parent : 0)
          formData.append('fileName', comment.file.name)
          formData.append('fileType', comment.file.type)
          formData.append('fileSize', comment.file.size)
          formData.append('pings', comment.pings.join())
          // formData.append('email', 'congtrinh0209@gmail.com')
          // formData.append('fullName', 'Công Trình')
          formData.append('email', themeDisplay.getUserId())
          formData.append('fullName', themeDisplay.getUserName())
          $.ajax({
            url: vm.initData.commentApi + '/uploads',
            dataType: 'json',
            type: 'POST',
            headers: {
              'groupId': themeDisplay.getScopeGroupId()
              // 'groupId': 55301
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
        let url = vm.initData.commentApi + '/org.opencps.dossiermgt.model.Dossier/' + vm.dossierId + '?start=0&end=10&sort=modified_Number&order=true'
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
    }
    //
  }
}
</script>

