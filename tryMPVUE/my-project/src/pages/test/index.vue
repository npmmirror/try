<template>
  <div>

    <p>pages/test/test.wxml</p>

    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo"> 登录</button>
    <button @tap='getAllUser'>读取所有用户</button>
    <button @tap='chooseFile'>上传图片</button>
    <img v-if="imgSrc" :src="imgHost+imgSrc">

  </div>
</template>

<script>
  // const $ = require('@/utils/request.js')0
  const service = require('@/utils/service.js')
  // pages/test/test.js
  export default {
    name: 'index',
    data () {
      return {
        imgSrc: '',
        imgHost: 'http://localhost:3000/uploads/'
      }
    },
    methods: {
      bindGetUserInfo: function (e) {
        console.log(e)
        service.updateUserInfo(e.mp.detail.userInfo)
      },

      getAllUser: function () {
        service.getAllUser({
          pageSize: 1,
          pageNo: 1
        })
      },

      chooseFile: function () {
        wx.chooseImage({
          count: 2, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            wx.uploadFile({
              url: 'http://localhost:3000/upload/dir',
              filePath: res.tempFilePaths[0],
              name: 'file',
              formData: {
                dir: 'pic'
              },
              success: (res) => {
                const response = res.data
                const data = JSON.parse(response)
                this.imgSrc = data.data.path
              },
              fail: (res) => {
                wx.showToast({
                  icon: 'none',
                  title: '图片上传失败'
                })
              }

            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  img{
    width: 350rpx;
    height: 350rpx;
    background: red;
  }
</style>
